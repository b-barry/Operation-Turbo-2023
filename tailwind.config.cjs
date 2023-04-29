const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-lato)", ...fontFamily.sans],
			},
			lineHeight: {
				title: "1.36",
				mobiletitle: "1.467",
			},
		},
	},
	plugins: [],
}
