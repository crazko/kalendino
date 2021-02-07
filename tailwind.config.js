const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./components/**/*.{ts,tsx}', './layout/**/*.{ts,tsx}', './pages/**/*.{ts,tsx}'],
  darkMode: false,
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      red: colors.rose,
    },
    extend: {
      zIndex: {
        5000: '5000',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
};
