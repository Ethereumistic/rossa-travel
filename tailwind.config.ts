import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const plugin = require('tailwindcss/plugin');

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      'xxs': '350px',
      'xs': '480px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'gg': '1080px',
      // => @media (min-width: 1080px) { ... }
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      '3xl': '1780px',
      // => @media (min-width: 1536px) { ... }
      'cst': '932px',
    },
    extend: {
      animation: {
        shimmer: "shimmer 2s linear infinite",
        scroll:
        "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        flipTop: 'flipTop 1s ease-in',
        flipBottom: 'flipBottom 1s ease-in',
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      
      colors: {
        primary: {
          DEFAULT: '#1D4ED8', // Blue-600
          foreground: '#FFFFFF', // White
        },
        secondary: {
          DEFAULT: '#FBBF24', // Amber-400
          foreground: '#1F2937', // Gray-800
        },
        destructive: {
          DEFAULT: '#EF4444', // Red-500
          foreground: '#FFFFFF', // White
        },
        accent: '#4F46E5', // Indigo-600
        input: '#E5E7EB', // Gray-300
      },

      fontFamily: {

        montserrat: ["var(--font-montserrat)"],
      },
      keyframes: {
        shimmer: {
          from: {
            "backgroundPosition": "0 0"
          },
          to: {
            "backgroundPosition": "-200% 0"
          }
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        flipTop: {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(-180deg)' }
        },
        flipBottom: {
          '0%': { transform: 'rotateX(180deg)' },
          '100%': { transform: 'rotateX(0deg)' }
        }
      }
    },
  },
  
  plugins: [
    addVariablesForColors,

    plugin(function ({ addUtilities }: any) {
      const newUtilities = {
        '.brightness-80': {
          filter: 'brightness(80%)'
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden'
        },
        '.preserve-3d': {
          'transform-style': 'preserve-3d'
        },
        '.perspective': {
          'perspective-origin': '50% 50%',
          perspective: '450px'
        },
        '.bg-x-82': {
          'background-position-x': '82%'
        }
      }

      addUtilities(newUtilities)
    }),
  ],
};
 
// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

export default config;
