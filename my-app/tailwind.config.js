/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        earthYellow: {
          DEFAULT: '#e4b363',
          100: '#37260a',
          200: '#6f4c14',
          300: '#a6721d',
          400: '#da972b',
          500: '#e4b363',
          600: '#e9c282',
          700: '#eed1a1',
          800: '#f4e0c1',
          900: '#f9f0e0',
        },
        onyx: {
          DEFAULT: '#313638',
          100: '#0a0b0b',
          200: '#141617',
          300: '#1e2122',
          400: '#282c2e',
          500: '#313638',
          600: '#576164',
          700: '#7e8a8f',
          800: '#a9b1b4',
          900: '#d4d8da',
        },
        raisinBlack: {
          DEFAULT: '#272932',
          100: '#08080a',
          200: '#0f1013',
          300: '#17181d',
          400: '#1f2027',
          500: '#272932',
          600: '#4b4f60',
          700: '#71768f',
          800: '#a0a4b4',
          900: '#d0d1da'
        },
        seashell: {
          DEFAULT: '#f7ebe8',
          100: '#472219',
          200: '#8e4432',
          300: '#c5705a',
          400: '#deaea1',
          500: '#f7ebe8',
          600: '#f9efed',
          700: '#faf3f1',
          800: '#fcf7f6',
          900: '#fdfbfa'
        },
        jet: {
          DEFAULT: "#3d3a40",
          100: "#0c0c0d",
          200: "#18171a",
          300: "#252327",
          400: "#312f33",
          500: "#3d3a40",
          600: "#645f69",
          700: "#8b8591",
          800: "#b1aeb5",
          900: "#d8d6da"
        },
      },
    },
  },
  plugins: [],
};
