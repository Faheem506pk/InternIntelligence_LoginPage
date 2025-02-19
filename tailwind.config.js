/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        slideDown: 'slideDown 0.5s ease-out',
        slideUp: 'slideUp 0.5s ease-out',
        slideLeft: 'slideLeft 0.5s ease-out',
        slideRight: 'slideRight 0.5s ease-out',
        fadeIn: 'fadeIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
};