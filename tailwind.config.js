const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./components/**/*.{ts,tsx}', './layout/**/*.{ts,tsx}', './pages/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      red: colors.rose,
    },
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
