const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export const appColorsEnv: colorTheme = {
	light: {
		text: "#000",
		background: "#fff",
		tint: tintColorLight,
		tabIconDefault: "#ccc",
		tabIconSelected: tintColorLight,
		primary: "rgb(10, 132, 255)",
		card: "#fff",
		border: "rgb(39, 39, 41)",
		notification: "rgb(255, 69, 58)",
	},
	dark: {
		primary: "rgb(10, 132, 255)",
		card: "rgb(18, 18, 18)",
		text: "rgb(229, 229, 231)",
		border: "rgb(39, 39, 41)",
		notification: "rgb(255, 69, 58)",
		background: "#000",
		tint: tintColorDark,
		tabIconDefault: "#ccc",
		tabIconSelected: tintColorDark,
	},
};

type theme = "light" | "dark";
type color = {
	primary: string;
	background: string;
	card: string;
	text: string;
	border: string;
	notification: string;
	tint?: string;
	tabIconDefault?: string;
	tabIconSelected?: string;
};
interface colorTheme {
	light: color;
	dark: color;
}
