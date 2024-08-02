import {
	filesystem,
	getCurrentDir,
	setCurrentDir,
	type Directory,
	type DirectoryItem,
	type envType,
} from "./data";

import { printTermLine, printRawHTML, printImage, terminal } from "./terminal";

type optionType = {
	name: string; // internal name
	long: string | undefined;
	short: string | undefined;
	takesArg: boolean;
};

const fetchInfoCopy = document.getElementById("fetch-row")!.cloneNode(true);

function tryParsePath(path: string | undefined) {
	if (!path) path = getCurrentDir();
	if (path.startsWith("~")) path = `/home/autumn/${path.slice(1)}`;
	if (!path.startsWith("/")) path = `${getCurrentDir()}/${path}`;

	const parts = path.split("/");
	const parsedParts = [];

	for (let i = 0; i < parts.length; i++) {
		if (parts[i] === "") continue;
		if (parts[i] === ".") continue;
		if (parts[i] === "..") parsedParts.pop();
		else parsedParts.push(parts[i]);
	}

	return `/${parsedParts.join("/")}`;
}

export function getObjAtPath(path: string) {
	const parts = path.split("/");
	let obj: DirectoryItem = filesystem;

	for (let i = 0; i < parts.length; i++) {
		if (parts[i] === "") continue;
		if (typeof obj === "object") obj = obj[parts[i]];
		if (i < parts.length - 1 && typeof obj !== "object") return null;
	}

	return obj;
}

async function which(env: envType, command: string) {
	const path = tryGetCommandPath(env, command);

	if (!path) {
		printTermLine(`which: ${command}: command not found`);
		return 1;
	}

	printTermLine(path);
	return 0;
}

export function tryGetCommandPath(env: envType, command: string) {
	if (
		command.startsWith("/") ||
		command.startsWith(".") ||
		command.startsWith("~")
	) {
		return tryParsePath(command);
	}

	const PATHs = env.PATH.split(":");

	for (let i = 0; i < PATHs.length; i++) {
		const obj = getObjAtPath(`${PATHs[i]}/${command}`);
		if (typeof obj === "function") return `${PATHs[i]}/${command}`;
	}

	return null;
}

async function ls(env: envType, ...args: string[]) {
	const availableOptions = [
		{ name: "help", long: "--help", short: "", takesArg: false },
		{ name: "version", long: "--version", short: "", takesArg: false },
		{ name: "all", long: "--all", short: "-a", takesArg: false },
		{ name: "almostAll", long: "--almost-all", short: "-A", takesArg: false },
	] as optionType[];

	const options = await checkOptionsFromArgs(args, availableOptions, "ls");
	if (!options) return 2;

	if (options.help) {
		printTermLine(`Usage: ls [OPTION]... [FILE]...
List information about the FILEs (the current directory by default).

Mandatory arguments to long options are mandatory for short options too.
  -a, --all                  do not ignore entries starting with .
  -A, --almost-all           do not list implied . and ..
      --help                 display this help and exit
      --version              output version information and exit
			
Exit status:
 0  if OK,
 1  if minor problems (e.g., cannot access subdirectory),
 2  if serious trouble (e.g., cannot access command-line argument).`);
		return 0;
	}

	if (options.version) {
		printTermLine(`ls (jsh) 1.0.0`);
		return 0;
	}

	const path = tryParsePath(args.find((arg) => !arg.startsWith("-")));
	let obj = getObjAtPath(path) as Directory;

	let allContents = Object.keys(obj);

	if (!options.all && !options.almostAll) {
		allContents = allContents.filter((content) => content[0] !== ".");
	}

	let dirs = allContents.filter((key) => typeof obj[key] === "object");
	let files = allContents.filter((key) => typeof obj[key] !== "object");

	if (options.all) {
		// add .. and . to the list of directories
		dirs = [".", "..", ...dirs];
	}

	let contents = "";
	if (dirs.length > 0) contents += dirs.join("/ ") + "/ ";
	contents += files.join(" ");

	printTermLine(contents);

	return 0;
}

async function checkOptionsFromArgs(
	args: string[],
	availableOptions: optionType[],
	command: string
) {
	const options = {} as Record<string, string | boolean>;

	// for long options (e.g. --all) they must be on their own
	// while short options (e.g. -a) may (rfc 2119) be grouped together

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];

		if (arg.startsWith("--")) {
			const option = availableOptions.find((opt) => opt.long === arg);

			if (!option) {
				printTermLine(`${command}: unrecognized option '${arg}'`);
				if (availableOptions.find((opt) => opt.long === "--help"))
					printTermLine(`Try '${command} --help' for more information.`);
				return null;
			}

			options[option.name] = true;
		} else if (arg.startsWith("-")) {
			const shortOptions = arg.slice(1).split("");
			for (const shortOption of shortOptions) {
				const option = availableOptions.find(
					(opt) => opt.short === `-${shortOption}`
				);

				if (!option) {
					printTermLine(`${command}: unrecognized option '-${shortOption}'`);
					if (availableOptions.find((opt) => opt.long === "--help"))
						printTermLine(`Try '${command} --help' for more information.`);
					return null;
				}

				options[option.name] = true;
			}
		}
	}

	return options;
}

async function echo(env: envType, ...args: string[]) {
	let text = args.join(" ");
	printTermLine(text);
	return 0;
}

async function env(env: envType) {
	let vars = "";
	for (const [key, value] of Object.entries(env)) {
		vars += `${key}=${value}\n`;
	}
	printTermLine(vars);
	return 0;
}

async function cat(env: envType, file: string) {
	const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
	const fullFilePath = tryParsePath(file);

	const obj = getObjAtPath(fullFilePath);

	if (!obj) {
		printTermLine(`cat: ${file}: No such file or directory`);
		return 1;
	}

	if (typeof obj === "object") {
		printTermLine(`cat: ${file}: Is a directory`);
		return 1;
	}

	if (typeof obj === "function") {
		printTermLine(obj.toString());
	} else if (typeof obj === "string") {
		const extenstion = file.split(".")?.pop()!;

		if (imageExtensions.includes(extenstion)) {
			printImage(obj);
		} else {
			printTermLine(obj);
		}
	} else {
		printTermLine("File type not supported!");
	}

	return 0;
}

async function cd(env: envType, path: string) {
	// special case for cd with no arguments, go to home
	if (!path) path = "/home/autumn";

	path = tryParsePath(path);

	const obj = getObjAtPath(path);

	if (!obj) {
		printTermLine(`cd: The directory ${path} does not exist`);
		return 1;
	}

	if (typeof obj !== "object") {
		printTermLine(`cd: ${path} is not a directory`);
		return 1;
	}

	setCurrentDir(path);

	const magicDirs = {
		"/home/autumn/projects": "/projects",
		"/home/autumn/blog": "/blog",
		"/home/autumn/uses": "/uses",
	} as Record<string, string>;

	if (magicDirs[path]) window.location.href = magicDirs[path];

	return 0;
}

async function pwd(env: envType) {
	printTermLine(getCurrentDir());
	return 0;
}

async function clear(env: envType) {
	terminal.innerHTML = "";
	return 0;
}

async function ping(env: envType, address: string) {
	printTermLine(`PING ${address} 56 data bytes`);
	let failed = false;

	for (let i = 0; i < 5; i++) {
		if (failed) return 1;

		const start = performance.now();
		await fetch(`https://${address}`, { mode: "no-cors" })
			.then(() => {
				const end = performance.now();
				printTermLine(
					`64 bytes from ${address}: icmp_seq=${i + 1} time=${end - start} ms`
				);
			})
			.catch((e) => {
				console.error(e);
				printTermLine(`ping: ${address}: Address not reachable`);
				failed = true;
			});

		if (!failed) await new Promise((resolve) => setTimeout(resolve, 1000));
	}

	return 0;
}

async function tree(env: envType, path: string | undefined) {
	path = tryParsePath(path);

	printTermLine(`.${await treeDir(path)}`);

	return 0;
}

async function treeDir(path: string) {
	path = tryParsePath(path);
	const obj = getObjAtPath(path);
	if (!obj || typeof obj !== "object") return "";

	const items = Object.keys(obj);

	let tree = "";
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		const isLast = i === items.length - 1;
		const connector = isLast ? "└──" : "├──";
		tree += `\n${connector} ${item}`;

		if (typeof obj[item] === "object" && Object.keys(obj[item]).length > 0) {
			const newPath = `${path}/${item}`;
			const isLastDir = i === items.length - 1;
			const indented = await indentTree(await treeDir(newPath), isLastDir);
			tree += `\n${indented}`;
		}
	}

	return tree;
}

async function indentTree(tree: string, isLast: boolean) {
	const lines = tree.split("\n").filter((line) => line.trim() !== "");
	const indent = isLast ? "    " : "│   ";
	const indented = lines.map((line) => `${indent}${line}`).join("\n");
	return `${indented}`;
}

async function help(env: envType) {
	let helpText = "Available commands:\n";
	for (const [command, { desc }] of Object.entries(commands)) {
		helpText += `${command} - ${desc}\n`;
	}

	printTermLine(helpText);

	return 0;
}

async function whoAmI(env: envType) {
	terminal.appendChild(fetchInfoCopy.cloneNode(true));
	return 0;
}

async function fetchMusic(env: envType) {
	printRawHTML(
		`<music-display
			nowPlayingApi="https://music-display.mck.is/now-playing"
			websocketUrl="wss://music-display.mck.is/now-playing-ws">
		</music-display>`
	);

	return 0;
}

export const commands = {
	ls: { fn: ls, desc: "list available directories" },
	echo: { fn: echo, desc: "print text" },
	cat: { fn: cat, desc: "print file contents" },
	cd: { fn: cd, desc: "change directory" },
	pwd: { fn: pwd, desc: "print working directory" },
	help: { fn: help, desc: "display this message" },
	clear: { fn: clear, desc: "clear the terminal" },
	ping: { fn: ping, desc: "ping a server" },
	whoami: { fn: whoAmI, desc: "about me" },
	tree: { fn: tree, desc: "list directory tree" },
	env: { fn: env, desc: "print environment variables" },
	which: { fn: which, desc: "locate a command" },
	"fetch-music": { fn: fetchMusic, desc: "what I'm listening to" },
} as Record<
	string,
	{
		fn: (env: envType, ...args: string[]) => Promise<number>;
		desc: string;
	}
>;

export {
	ls,
	echo,
	cat,
	cd,
	pwd,
	help,
	clear,
	ping,
	whoAmI,
	tree,
	env,
	fetchMusic,
	which,
};
