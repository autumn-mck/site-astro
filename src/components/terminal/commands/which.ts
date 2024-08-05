import { type envType } from "../data";
import { printTermLine } from "../terminal";
import { tryGetCommandPath } from "./jsh";

export default async function which(env: envType, command: string) {
	const path = tryGetCommandPath(env, command);

	if (!path) {
		printTermLine(`which: ${command}: command not found`);
		return 1;
	}

	printTermLine(path);
	return 0;
}
