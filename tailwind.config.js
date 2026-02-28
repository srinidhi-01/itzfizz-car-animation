/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        green: '#3EE04A',
        yellow: '#D4F542',
        sky: '#7DD4F8',
        road: '#1a1a1a',
      },
      fontFamily: {
        black: ['"Arial Black"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
