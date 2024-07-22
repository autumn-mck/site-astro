import {
	printTermLine,
	getObjAtPath,
	tryGetCommandPath,
	getPrompt,
} from "./commands";

async function tryRunCommand(command: string) {
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
	}

	return 1; // should never reach here
}

async function parseLine(line: string) {
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
