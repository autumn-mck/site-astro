import {
	ls,
	cd,
	cat,
	echo,
	pwd,
	help,
	clear,
	ping,
	whoAmI,
	steam,
	tree,
	env,
	which,
	fetchMusic,
} from "./commands";

export const user = document.getElementById("terminal")!.dataset.user;

export const envVars = {
	PATH: "/usr/bin:/bin",
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
	bin: {
		ls: ls,
		cd: cd,
		cat: cat,
	},
	usr: {
		bin: {
			echo: echo,
			pwd: pwd,
			help: help,
			clear: clear,
			ping: ping,
			whoami: whoAmI,
			steam: steam,
			tree: tree,
			env: env,
			which: which,
			"fetch-music": fetchMusic,
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
