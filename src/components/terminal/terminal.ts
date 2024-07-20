import { commands, printTermLine } from "./commands";
import { user } from "./data";

async function tryRunCommand(command: string) {
	const [cmd, ...args] = command.split(" ");
	if (commands[cmd]) {
		await commands[cmd].fn(...args);
	} else {
		printTermLine(
			`bash: ${cmd}: command not found.\nRun 'help' for a list of available commands.`
		);
	}
}

export async function onEnterKey(command: string) {
	const typed = document.getElementById("typed")!;
	const caret = document.getElementById("caret")!;
	const input = document.getElementById("input")!;
	input.style.display = "none";

	printTermLine(`[${user}]$ ${command}`);

	if (command.trim() !== "") {
		await tryRunCommand(command);
	}

	typed.textContent = "";
	caret.style.opacity = "1";
	input.style.display = "block";
}
