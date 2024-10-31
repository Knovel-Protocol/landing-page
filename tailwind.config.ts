import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./headers/**/*.{js,ts,jsx,tsx,mdx}",
    "./footers/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./props/**/*.{js,ts,jsx,tsx,mdx}",
    "./icons/**/*.{js,ts,jsx,tsx,mdx}",
    "./buttons/**/*.{js,ts,jsx,tsx,mdx}",
    "./forms/**/*.{js,ts,jsx,tsx,mdx}",
    "./drafts/**/*.{js,ts,jsx,tsx,mdx}",
    "./read/**/*.{js,ts,jsx,tsx,mdx}",
    "./popup/**/*.{js,ts,jsx,tsx,mdx}",
    "./dashboard/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xxl': {'max': '1460px'},
      // => @media (max-width: 1460px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'halfxl': {'max': '1172px'},
      // => @media (max-width: 1172px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'halflg': {'max': '860px'},
      // => @media (max-width: 860) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }

      'ss': {'max': '500px'},
      // => @media (max-width: 500px) { ... }

      'xs': {'max': '430px'},
      // => @media (max-width: 430px) { ... }
      'tall': { 'raw': '(max-height: 800px)' },
      // => @media (min-height: 800px) { ... }
    },
    extend: {
      overscrollBehavior: {
        none: 'none',
      },
      backgroundImage: {
        'signin': "url('/signin-bg.png')",
        'hero-pattern': "url('/bg.png')",
        'features-bg': "url('/features-bg.png')",
        'tech-bg': "url('/tech.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        scroll: {
          '0%': {transform: 'translateX(-127%)' },
          '100%': {transform: 'translateX(0)'}
        },

        scroll2: {
          '0%': {transform: 'translateX(-145%)' },
          '100%': {transform: 'translateX(0)'}
        },
        scroll3: {
          '0%': {transform: 'translateX(-130%)' },
          '100%': {transform: 'translateX(0)'}
        },
        xsscroll: {
          '0%': {transform: 'translateX(-165%)' },
          '100%': {transform: 'translateX(0)'}
        },

        reverseScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-127%)' },
        },

        reverseScroll2: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-145%)' },
        },
        reverseScroll3: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-130%)' },
        },
        xsreverseScroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-165%)' },
        },
        shine: {
          '0%': { 
            opacity: '0.5',
            transform: 'translateX(-100px) skewX(-15deg)',
            transitionProperty: 'opacity, transform',
          },
          '50%': { 
            opacity: '0.6',
            transform: 'translateX(300px) skewX(-15deg)',
            transitionProperty: 'opacity, transform',
          },
          '100%': { 
            opacity: '0.6',
            transform: 'translateX(300px) skewX(-15deg)',
            transitionProperty: 'opacity, transform',
          },
        },
        shine2: {
          '0%': { 
            opacity: '0.5',
            transform: 'translateX(-300px) skewX(-15deg)',
            transitionProperty: 'opacity, transform',
          },
          '50%': { 
            opacity: '0.6',
            transform: 'translateX(400px) skewX(-15deg)',
            transitionProperty: 'opacity, transform',
          },
          '100%': { 
            opacity: '0.6',
            transform: 'translateX(500px) skewX(-15deg)',
            transitionProperty: 'opacity, transform',
          },
        },
        pulsing: {
          '50%': {
            opacity: '0.5', 
            transform: 'rotate(90deg) scale(1.5)'
          },
          '100%': {
            opacity: '0', 
            transform: 'rotate(180deg) scale(1.5)'
          }
        }
      },
      animation: {
        scroll: 'scroll 15s linear infinite',
        scroll2: 'scroll2 15s linear infinite',
        scroll3: 'scroll3 15s linear infinite',
        xsscroll: 'xsscroll 15s linear infinite',
        reverseScroll: 'reverseScroll 15s linear infinite',
        reverseScroll2: 'reverseScroll2 15s linear infinite',
        reverseScroll3: 'reverseScroll3 15s linear infinite',
        xsreverseScroll: 'xsreverseScroll 15s linear infinite',
        shine: 'shine 3s linear infinite',
        shine2: 'shine2 3s linear infinite',
        pulsing: 'pulsing 1s linear infinite'
      }
    },
  },
  plugins: [],
};
export default config;
