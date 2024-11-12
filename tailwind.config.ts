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
  darkMode: ["class", "class"],
  theme: {
  	screens: {
  		xxs: '350px',
  		xs: '480px',
  		sm: '640px',
  		md: '768px',
  		lg: '1024px',
  		gg: '1080px',
  		xl: '1280px',
  		'2xl': '1536px',
  		'3xl': '1780px',
  		cst: '932px'
  	},
  	extend: {
  		animation: {
  			shimmer: 'shimmer 2s linear infinite',
  			scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
  			flipTop: 'flipTop 1s ease-in',
  			flipBottom: 'flipBottom 1s ease-in'
  		},
  		boxShadow: {
  			input: '`0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`'
  		},
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			montserrat: ["var(--font-montserrat)"]
  		},
  		keyframes: {
  			shimmer: {
  				from: {
  					'backgroundPosition': '0 0'
  				},
  				to: {
  					'backgroundPosition': '-200% 0'
  				}
  			},
  			scroll: {
  				to: {
  					transform: 'translate(calc(-50% - 0.5rem))'
  				}
  			},
  			flipTop: {
  				'0%': {
  					transform: 'rotateX(0deg)'
  				},
  				'100%': {
  					transform: 'rotateX(-180deg)'
  				}
  			},
  			flipBottom: {
  				'0%': {
  					transform: 'rotateX(180deg)'
  				},
  				'100%': {
  					transform: 'rotateX(0deg)'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
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
      require("tailwindcss-animate")
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
