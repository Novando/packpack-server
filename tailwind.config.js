module.exports = {
  mode: 'jit',
  content: [
    './views/**/*.ejs',
    './src/dependencies/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
}
