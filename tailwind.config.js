/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{hbs,html,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
