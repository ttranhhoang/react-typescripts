// /** @type {import('tailwindcss').Config} */
/*eslint no-undef: "error"*/
/* eslint-disable no-undef */
module.exports = {
	// content: ['./src/**/*.{js,jsx,ts,tsx}'],
	content: ['./src/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],

	// darkMode: 'class',
	mode: 'jit',
	theme: {
		extend: {
			transitionProperty: {
				height: 'height',
			},
			colors: {
				orange: '#c85312',
				primary: '#c85312',
				secondary: '#041e42',
				dgray: '#6a747c',
				dwhite: '#f8f8f8',
				disable: '#f5f5f5',
				success: '#4bae4f',
				error: '#ef4444',
			},
			animation: {},
		},
	},

	plugins: [],
};
