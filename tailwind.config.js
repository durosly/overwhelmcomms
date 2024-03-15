/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				roboto: ["var(--font-roboto)"],
			},
		},
	},
	daisyui: {
		themes: [
			{
				benchmark: {
					primary: "#1F4774",
					secondary: "#F17406",
					accent: "#eeaf3a",
					neutral: "#070707",
					"base-100": "#faf7f5",
					info: "#3abff8",
					success: "#36d399",
					warning: "#fbbd23",
					error: "#f87272",
				},
			},
		],
	},
	plugins: [require("daisyui")],
};
