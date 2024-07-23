import { getObjAtPath, tryGetCommandPath } from "./commands";
import { envVars, getCurrentDir } from "./data";

export const terminal = document.getElementById("terminalContent")!;

export function printTermLine(text: string) {
	const pre = document.createElement("pre");
	pre.innerHTML = text;
	terminal.appendChild(pre);
	terminal.scrollTop = terminal.scrollHeight;
}

/**
 * only use this one if you're sure, printTermLine already sets the innerHTML
 */
export function printRawHTML(html: string) {
	const div = document.createElement("div");
	div.innerHTML = html;
	terminal.appendChild(div);
}

export function printImage(src: string) {
	const img = document.createElement("img");
	img.src = src;
	img.style.maxWidth = "16rem";
	terminal.appendChild(img);
}

export function getPrompt() {
	return `[${envVars.USER}@${envVars.hostname} ${getDirForPrompt()}]$`;
}

function getDirForPrompt() {
	if (getCurrentDir() === "/home/autumn") return "~";
	if (getCurrentDir() === "/") return "/";

	const parts = getCurrentDir().split("/");
	return parts[parts.length - 1];
}

async function tryRunCommand(command: string) {
	command = command.replace(/\$([a-zA-Z_]+)/g, (_, key) => envVars[key] || "");
	const [cmd, ...args] = command.split(" ");
	const path = tryGetCommandPath(cmd);

	if (!path) {
		printTermLine(
			`bash: ${cmd}: command not found.\nRun 'help' for a list of available commands.`
		);

		return 1;
	}

	const obj = getObjAtPath(path);
	if (typeof obj === "function") {
		return await obj(...args);
	} else if (typeof obj === "string") {
		runScript(obj);
		return 0;
	}

	return 1; // should never reach here
}

async function parseLine(line: string) {
	if (line.trim() === "") return;
	let commands = line.split("&&");

	for (let i = 0; i < commands.length; i++) {
		let result = await tryRunCommand(commands[i].trim());
		if (result !== 0) return;
	}
}

export async function onEnterKey(command: string) {
	const typed = document.getElementById("typed")!;
	const caret = document.getElementById("caret")!;
	const input = document.getElementById("input")!;
	const prompt = document.getElementById("prompt")!;
	input.style.display = "none";

	printTermLine(`${getPrompt()} ${command}`);

	if (command.trim() !== "") {
		await parseLine(command);
	}

	prompt.innerText = getPrompt();
	const terminal = document.getElementById("terminalContent")!;
	terminal.scrollTop = terminal.scrollHeight;

	typed.textContent = "";
	caret.style.opacity = "1";
	input.style.display = "block";
}

function runScript(script: string) {
	const lines = script.split("\n");

	for (let i = 0; i < lines.length; i++) {
		parseLine(lines[i]);
	}
}
