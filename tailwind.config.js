/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
  purge: {
    enabled: true,
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  },
}

