import { type envType } from "../data";
import { printTermLine } from "../terminal";

export default async function env(env: envType) {
	let vars = "";
	for (const [key, value] of Object.entries(env)) {
		vars += `${key}=${value}\n`;
	}
	printTermLine(vars);
	return 0;
}
