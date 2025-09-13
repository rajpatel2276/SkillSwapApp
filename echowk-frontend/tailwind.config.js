/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",,
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    theme: {
    extend: {
      animation: {
        blob: 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
        },
      },
    },
  },
    extend: {
      // Add this back
      animation: {
        'gradient-bg': 'gradient-bg 15s ease infinite',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: { // Your main brand color, like the purple button
          DEFAULT: '#6A238C', // A deep purple
          light: '#8A3FC4',
          dark: '#521B6B',
        },
        // You can add more neutral colors if needed
        neutral: {
          100: '#F5F5F7',
          200: '#EAEAEB',
          800: '#333333',
          900: '#1A1A1A',
        }
      },
      
      keyframes: {
        'gradient-bg': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}