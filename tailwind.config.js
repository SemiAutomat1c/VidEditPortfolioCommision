/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FFFFFF',
          DEFAULT: '#0A0A0F',
        },
        secondary: {
          light: '#F3F4F6',
          DEFAULT: '#141419',
        },
        accent: {
          pink: '#FF0080',
          purple: '#7928CA',
          blue: '#2563EB',
          cyan: '#00B4D8',
          coral: '#FF4D4D',
          DEFAULT: '#7928CA',
        },
        'gray-dark': {
          light: '#E5E7EB',
          DEFAULT: '#1E1E26',
        },
        'gray-light': {
          light: '#F9FAFB',
          DEFAULT: '#F3F4F6',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-main': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.05)' },
        },
        mesh1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(30px, 20px) scale(1.1)' },
        },
        mesh2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-30px, -20px) scale(1.1)' },
        },
        mesh3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(20px, -30px) scale(1.1)' },
        },
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out infinite 2s',
        'float-slow': 'float 10s ease-in-out infinite 1s',
        'mesh-1': 'mesh1 20s ease-in-out infinite',
        'mesh-2': 'mesh2 25s ease-in-out infinite',
        'mesh-3': 'mesh3 30s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} 