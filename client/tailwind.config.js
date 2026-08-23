/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#1e1b4b',
          950: '#0f172a',
        },
        saffron: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
        gold: {
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
        },
        emeraldDeal: '#059669',
        rubyDeal: '#e11d48'
      },
      boxShadow: {
        'card': '0 2px 12px -2px rgba(0, 0, 0, 0.06), 0 4px 16px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(0, 0, 0, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px -3px rgba(99, 102, 241, 0.3)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}