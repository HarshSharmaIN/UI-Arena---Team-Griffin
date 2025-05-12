/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9f5f5',
          100: '#f3ebeb',
          200: '#e7d6d6',
          300: '#d5b3b3',
          400: '#c08585',
          500: '#a85a5a',
          600: '#953e3e',
          700: '#8B0000', // Deep burgundy as primary
          800: '#6d1515',
          900: '#5c1717',
          950: '#350808',
        },
        secondary: {
          50: '#fcfaf5',
          100: '#f8f3e4',
          200: '#f2e4be',
          300: '#ebd08e',
          400: '#e2b859',
          500: '#D4AF37', // Gold as secondary
          600: '#bd8f1a',
          700: '#9d7016',
          800: '#805818',
          900: '#6c4a19',
          950: '#3d2809',
        },
        accent: {
          50: '#f4f8fb',
          100: '#e9f1f6',
          200: '#cde2ed',
          300: '#a0c9dd',
          400: '#6baac8',
          500: '#4a8db1',
          600: '#397295',
          700: '#305c7a',
          800: '#2c4e66',
          900: '#284356',
          950: '#1a2c39',
        },
        success: {
          500: '#10B981',
          600: '#059669',
        },
        warning: {
          500: '#F59E0B',
          600: '#D97706',
        },
        error: {
          500: '#EF4444',
          600: '#DC2626',
        },
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card': '0 10px 30px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}