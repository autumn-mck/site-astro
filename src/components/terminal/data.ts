import { cat } from "./commands";

export const user = document.getElementById("terminal")!.dataset.user;

export const envVars = {
	HOME: "/home/autumn",
	SHELL: "/bin/bash",
	LANG: "en_GB.UTF-8",
	DISPLAY: ":0",
	TERM: `xterm-${
		navigator.userAgent.includes("Firefox") ? "firefox" : "chromium"
	}`,
} as Record<string, string>;

export const filesystem = {
	home: {
		autumn: {
			"secret.txt": ":3",
			"me.webp": (document.getElementById("img")! as HTMLImageElement).src,
			projects: {},
			blog: {},
			uses: {},
		},
	},
	usr: {
		bin: {
			bash: "",
			cat: cat,
		},
	},
} as Directory;

export type Directory = {
	[key: string]: DirectoryItem;
};

export type DirectoryItem =
	| Directory
	| string
	| ((...args: string[]) => Promise<number>);
