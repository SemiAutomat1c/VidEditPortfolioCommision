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
          light: '#C67AFF',
          DEFAULT: '#B44FFF',
        },
        'gray-dark': {
          light: '#E5E7EB',
          DEFAULT: '#1E1E26',
        },
        'gray-light': {
          light: '#4B5563',
          DEFAULT: '#A1A1AA',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 