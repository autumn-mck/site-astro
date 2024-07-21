import { files, dirs, envVars } from "./data";
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
	ping: { fn: ping, desc: "ping a server" },
	whoami: { fn: whoAmI, desc: "about me" },
	steam: { fn: steam, desc: "steam" },
	tree: { fn: tree, desc: "list directory tree" },
	env: { fn: env, desc: "print environment variables" },
	"fetch-music": { fn: fetchMusic, desc: "what I'm listening to" },
} as Record<
	string,
	{ fn: (...args: string[]) => Promise<number>; desc: string }
>;

export function printTermLine(text: string) {
	const pre = document.createElement("pre");
	pre.innerHTML = text;
	terminal.appendChild(pre);
	terminal.scrollTop = terminal.scrollHeight;
}

async function ls() {
	printTermLine(dirs.join("/ ") + "/ " + Object.keys(files).join(" "));
	return 0;
}

async function echo(...args: string[]) {
	let text = args.join(" ");
	// Replace environment variables
	text = text.replace(/\$([A-Z_]+)/g, (_, key) => envVars[key] || "");
	printTermLine(text);
	return 0;
}

async function env() {
	let vars = "";
	for (const [key, value] of Object.entries(envVars)) {
		vars += `${key}=${value}\n`;
	}
	printTermLine(vars);
	return 0;
}

async function cat(file: string) {
	const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
	if (files[file]) {
		if (imageExtensions.includes(file.split(".").pop()!)) {
			const img = document.createElement("img");
			img.src = files[file];
			img.style.maxWidth = "16rem";
			terminal.appendChild(img);
		} else {
			printTermLine(files[file]);
		}

		return 0;
	} else {
		printTermLine(`cat: ${file}: No such file or directory`);
		return 1;
	}
}

async function cd(dir: string) {
	if (dirs.includes(dir)) {
		window.location.href = `/${dir}`;
		return 0;
	} else {
		printTermLine(`cd: The directory '${dir}' does not exist`); // not accurate to bash, but i use fish
		return 1;
	}
}

async function pwd() {
	printTermLine("/home/autumn");
	return 0;
}

async function clear() {
	terminal.innerHTML = "";
	return 0;
}

async function ping(address: string) {
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

async function steam() {
	const url = "https://steamcommunity.com/id/_weird_autumn_";
	window.location.href = `steam://openurl/${url}`;
	printTermLine(`Opening <a href="${url}" target="_blank">Steam profile</a>`);
	return 0;
}

async function tree() {
	let tree = `.\n`;
	for (let i = 0; i < dirs.length; i++) {
		if (i === dirs.length - 1 && Object.keys(files).length === 0) {
			tree += `└── ${dirs[i]}\n`;
		} else {
			tree += `├── ${dirs[i]}\n`;
		}
	}

	for (let i = 0; i < Object.keys(files).length; i++) {
		const file = Object.keys(files)[i];
		if (i === Object.keys(files).length - 1) {
			tree += `└── ${file}\n`;
		} else {
			tree += `├── ${file}\n`;
		}
	}

	printTermLine(tree);

	return 0;
}

async function help() {
	let helpText = "Available commands:\n";
	for (const [command, { desc }] of Object.entries(commands)) {
		helpText += `${command} - ${desc}\n`;
	}

	printTermLine(helpText);

	return 0;
}

async function whoAmI() {
	terminal.appendChild(fetchInfoCopy.cloneNode(true));
	return 0;
}

async function fetchMusic() {
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
	return 0;
}
