/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", './public/index.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },

      colors : {
        'teal-400' : 'rgb(45 212 191)',
        'teal-600' : 'rgb(13 148 136)',
        'teal-700' : 'rgb(15 118 110)',
      },
    },
  },
  plugins: [],
}

