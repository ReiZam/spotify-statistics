const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./node_modules/flowbite/**/*.js"
	],
	theme: {
		fontFamily: {
			sans: ['Roboto', 'sans-serif']
		},
    	extend: {},
	},
	plugins: [
        require('flowbite/plugin')
    ]
}
