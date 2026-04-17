/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#AE2448',
          dark: '#6E1A37',
          light: '#C4456B',
        },
        secondary: {
          DEFAULT: '#72BAA9',
          dark: '#5A9A8A',
          light: '#8ED4C2',
        },
        bg: {
          light: '#D5E7B5',
          dark: '#1a1a2e',
        },
        card: {
          light: '#FFFFeF',
          dark: '#2a2a2a',
        },
        text: {
          light: '#2D3A2B',
          dark: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}