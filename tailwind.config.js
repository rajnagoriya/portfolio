/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          dark: '#30364F',
          medium: '#ACBAC4',
          light: '#E1D9BC',
          cream: '#F0F0DB',
        },
      },
    },
  },
  plugins: [daisyui],
}