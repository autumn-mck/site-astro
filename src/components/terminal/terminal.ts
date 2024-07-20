import { commands, printTermLine } from "./commands";
import { user } from "./data";

function tryRunCommand(command: string) {
	const [cmd, ...args] = command.split(" ");
	if (commands[cmd]) {
		commands[cmd].fn(...args);
	} else {
		printTermLine(
			`bash: ${cmd}: command not found.\nRun 'help' for a list of available commands.`
		);
	}
}

export function onEnterKey(command: string) {
	const typed = document.getElementById("typed")!;
	const caret = document.getElementById("caret")!;
	printTermLine(`[${user}]$ ${command}`);

	if (command.trim() !== "") {
		tryRunCommand(command);
	}

	typed.textContent = "";
	caret.style.opacity = "1";
}
