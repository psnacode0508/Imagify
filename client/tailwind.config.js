/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        cyber: {
          black: '#050507',
          surface: 'rgba(18, 18, 24, 0.75)',
          elevated: 'rgba(26, 26, 36, 0.85)',
          cyan: '#00F0FF',
          magenta: '#FF007A',
          lime: '#D4FF00',
          violet: '#8B5CF6',
          border: 'rgba(255, 255, 255, 0.08)',
          subtle: '#6B7280'
        }
      }
    },
  },
  plugins: [],
}
