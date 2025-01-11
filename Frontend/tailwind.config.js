/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Includes all JSX, JS, TS, and TSX files in the `src` folder
  ],  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms'),
  ],
}

