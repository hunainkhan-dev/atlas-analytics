/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0e17',
        panel: '#111725',
        card: '#151d2e',
        line: '#1e2740',
        ink: '#e8ecf5',
        muted: '#8493b0',
        brand: '#3b82f6',
        pos: '#34d399',
        neg: '#f87171',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
