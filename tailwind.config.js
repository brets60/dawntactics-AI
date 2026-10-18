/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#0A0E17',
        surface: {
          DEFAULT: '#111827',
          elevated: '#1A2234',
          subtle: '#0F1523',
          border: '#1F2937',
          borderLight: '#374151',
        },
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        role: {
          exp: '#EF4444',     // Crimson
          jungle: '#10B981',  // Emerald
          mid: '#8B5CF6',     // Amethyst
          gold: '#F59E0B',    // Gold
          roam: '#3B82F6',    // Cobalt
        }
      },
      boxShadow: {
        'mythic-gold': '0 0 25px -5px rgba(245, 158, 11, 0.35)',
        'mythic-glow': '0 0 15px 1px rgba(251, 191, 36, 0.4)',
        'blue-glow': '0 0 20px -3px rgba(59, 130, 246, 0.45)',
        'red-glow': '0 0 20px -3px rgba(239, 68, 68, 0.45)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
