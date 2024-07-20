export const user = document.getElementById("terminal")!.dataset.user;
export const dirs = ["projects", "blog", "uses"];
export const files = {
	"secret.txt": ":3",
	"me.webp": (document.getElementById("img")! as HTMLImageElement).src,
} as Record<string, string>;

export const envVars = {
	HOME: "/home/autumn",
	SHELL: "/bin/bash",
	LANG: "en_GB.UTF-8",
	DISPLAY: ":0",
	TERM: `xterm-${
		navigator.userAgent.includes("Firefox") ? "firefox" : "chromium"
	}`,
} as Record<string, string>;
