import { files, dirs } from "./data";
const terminal = document.getElementById("terminalContent")!;
const fetchInfoCopy = document.getElementById("fetch-row")!.cloneNode(true);

export const commands = {
	ls: { fn: ls, desc: "list available directories" },
	echo: { fn: echo, desc: "print text" },
	cat: { fn: cat, desc: "print file contents" },
	cd: { fn: cd, desc: "change directory" },
	pwd: { fn: pwd, desc: "print working directory" },
	help: { fn: help, desc: "display this message" },
	clear: { fn: clear, desc: "clear the terminal" },
	whoami: { fn: whoAmI, desc: "about me" },
	"fetch-music": { fn: fetchMusic, desc: "what I'm listening to" },
} as Record<string, { fn: (...args: string[]) => void; desc: string }>;

export function printTermLine(text: string) {
	const pre = document.createElement("pre");
	pre.textContent = text;
	terminal.appendChild(pre);
}

function ls() {
	printTermLine(dirs.join("/ ") + "/ " + Object.keys(files).join("/ "));
}

function echo(...args: string[]) {
	console.log(args);
	printTermLine(args.join(" "));
}

function cat(file: string) {
	if (files[file]) {
		printTermLine(files[file]);
	} else {
		printTermLine(`cat: ${file}: No such file or directory`);
	}
}

function cd(dir: string) {
	if (dirs.includes(dir)) {
		window.location.href = `/${dir}`;
	} else {
		printTermLine(`cd: The directory '${dir}' does not exist`); // not accurate to bash, but i use fish
	}
}

function pwd() {
	printTermLine("/home/autumn");
}

function clear() {
	terminal.innerHTML = "";
}

function help() {
	let helpText = "Available commands:\n";
	for (const [command, { desc }] of Object.entries(commands)) {
		helpText += `${command} - ${desc}\n`;
	}

	printTermLine(helpText);
}

function whoAmI() {
	terminal.appendChild(fetchInfoCopy.cloneNode(true));
}

function fetchMusic() {
	const musicDisplay = document.createElement("music-display");

	musicDisplay.setAttribute(
		"nowPlayingApi",
		"https://music-display.mck.is/now-playing"
	);
	musicDisplay.setAttribute(
		"websocketUrl",
		"wss://music-display.mck.is/now-playing-ws"
	);
	terminal.appendChild(musicDisplay);
}
