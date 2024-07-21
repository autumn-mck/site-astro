import { commands, printTermLine } from "./commands";
import { user } from "./data";

async function tryRunCommand(command: string) {
	const [cmd, ...args] = command.split(" ");
	if (commands[cmd]) {
		return await commands[cmd].fn(...args);
	} else {
		printTermLine(
			`bash: ${cmd}: command not found.\nRun 'help' for a list of available commands.`
		);
		return 1;
	}
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
	input.style.display = "none";

	printTermLine(`[${user}]$ ${command}`);

	if (command.trim() !== "") {
		await parseLine(command);
	}

	const terminal = document.getElementById("terminalContent")!;
	terminal.scrollTop = terminal.scrollHeight;

	typed.textContent = "";
	caret.style.opacity = "1";
	input.style.display = "block";
}
