/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'spe-navy': '#001F54',
        'spe-gold': '#C8A951',
        'spe-blue': {
          50: '#EEF3FF',
          100: '#D9E4FE',
          200: '#B9CCFD',
          300: '#88A9FB',
          400: '#5580F7',
          500: '#2F5AF0',
          600: '#1A3FDB',
          700: '#152EB8',
          800: '#162896',
          900: '#172575',
        },
        'spe-gray': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        'spe-accent': '#3B82F6',
        'spe-teal': '#0D9488',
        'spe-surface': '#FAFBFE',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        secondary: ['Open Sans', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
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
        slideInLeft: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'card': '0 4px 24px -2px rgba(0, 31, 84, 0.06), 0 1px 3px rgba(0, 31, 84, 0.04)',
        'card-hover': '0 20px 50px -8px rgba(0, 31, 84, 0.15), 0 8px 16px -4px rgba(0, 31, 84, 0.06)',
        'glow': '0 0 30px rgba(47, 90, 240, 0.2)',
        'glow-lg': '0 0 60px rgba(47, 90, 240, 0.15)',
        'inner-glow': 'inset 0 2px 20px rgba(47, 90, 240, 0.06)',
        'elevated': '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
} 