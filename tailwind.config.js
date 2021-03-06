module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./node_modules/flowbite/**/*.js"
	],
	theme: {
		colors: {
			spotify_green_primary: "#1ED760",
			spotify_green_primary_alternative: "#1db954",
			spotify_green_secondary: "#1FDF64",
			spotify_text_color: "#222326",
			spotify_purple: "#af2896",
			spotify_yellow: "#f59b23",
			spotify_cyan: "#00a575",
			spotify_red: "#ff4632",
			spotify_red_secondary: "#c23627",
			spotify_red_active: "#a62d1f",
			spotify_pink: "#f573a0",
			spotify_pink_secondary: "#c95f84",
			spotify_pink_active: "#ad5172",
			spotify_blue: "#509bf5",
			spotify_blue_secondary: "#4686d4",
			spotify_blue_active: "#3d78bf"
		},
		fontFamily: {
			sans: ['Roboto', 'sans-serif']
		},
    	extend: {},
	},
	plugins: [
        require('flowbite/plugin')
    ]
}
