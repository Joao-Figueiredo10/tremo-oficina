/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['"Share Tech Mono"', 'monospace'],
        'display': ['"Bebas Neue"', 'cursive'],
      },
      colors: {
        'oficina': {
          'bg':      '#1a1a1a',
          'panel':   '#242424',
          'border':  '#3a3a3a',
          'green':   '#538d4e',
          'yellow':  '#b59f3b',
          'grey':    '#3a3a3c',
          'orange':  '#e07b39',
          'steel':   '#8da0b3',
        }
      },
      animation: {
        'flip': 'flip 0.5s ease-in-out',
        'shake': 'shake 0.4s ease-in-out',
        'bounce-in': 'bounceIn 0.3s ease-out',
        'pulse-border': 'pulseBorder 1s ease-in-out infinite',
      },
      keyframes: {
        flip: {
          '0%':   { transform: 'rotateX(0deg)' },
          '50%':  { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
        bounceIn: {
          '0%':   { transform: 'scale(0.8)', opacity: '0' },
          '60%':  { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseBorder: {
          '0%, 100%': { borderColor: '#e07b39', boxShadow: '0 0 0 0 rgba(224,123,57,0.4)' },
          '50%':      { borderColor: '#ffaa66', boxShadow: '0 0 0 6px rgba(224,123,57,0)' },
        },
      },
    },
  },
  plugins: [],
}
