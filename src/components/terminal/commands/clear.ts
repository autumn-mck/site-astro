import { type envType } from "../data";
import { terminal } from "../terminal";

export default async function clear(env: envType) {
	terminal.innerHTML = "";
	return 0;
}
