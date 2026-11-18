/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        paper: '#F7F7F5',
        ink: '#111315',
        muted: '#6F7479',
        line: '#E6E5E1',
        gold: '#B9822F',
      },
      fontFamily: {
        display: ['Instrument Serif', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Instrument Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        panel: '16px',
        chip: '999px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(17,19,21,0.05), 0 18px 40px -26px rgba(17,19,21,0.28)',
        soft: '0 1px 2px rgba(17,19,21,0.06)',
      },
    },
  },
  plugins: [],
};
