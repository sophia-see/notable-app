import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
	safelist: [
		{
			pattern: /font-(sans|serif|mono)/
		}
	],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
			"neutral-1000": "#000000",
			"neutral-950": "#0E121B",
			"neutral-900": "#191B25",
			"neutral-800": "#232530",
			"neutral-700": "#2B303B",
			"neutral-600": "#525866",
			"neutral-500": "#717784",
			"neutral-400": "#99A0AE",
			"neutral-300": "#CACFD8",
			"neutral-200": "#E0E4EA",
			"neutral-100": "#F3F5F8",
			"neutral-50": "#F5F7FA",
			"neutral-0": "#FFFFFF",
			
			"blue-700": "#2547D0",
			"blue-500": "#335CFF",
			"blue-50": "#EBF1FF",
			
			"green-500": "#21C16B",
			"green-100": "#D1FBE9",
			
			"red-500": "#FB3748",
			"red-100": "#FFD5D8",

  			background: 'hsl(var(--background))',
  			"background-2": 'hsl(var(--background-2))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
			fontSize: {
				"preset-1": ["24px", {
					fontWeight: 700,
					lineHeight: "120%",
					letterSpacing: "-0.5px"
				}],
				"preset-2": ["20px", {
					fontWeight: 700,
					lineHeight: "120%",
					letterSpacing: "-0.5px"
				}],
				"preset-3": ["16px", {
					fontWeight: 600,
					lineHeight: "120%",
					letterSpacing: "-0.3px"
				}],
				"preset-4": ["14px", {
					fontWeight: 500,
					lineHeight: "120%",
					letterSpacing: "-0.2px"
				}],
				"preset-5": ["14px", {
					fontWeight: 400,
					lineHeight: "130%",
					letterSpacing: "-0.2px"
				}],
				"preset-6": ["12px", {
					fontWeight: 400,
					lineHeight: "120%",
					letterSpacing: "-0.2px"
				}],
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				serif: ["Noto Serif", "serif"],
				mono: ["Source Code Pro", "monospace"],
			}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("tailwind-scrollbar-hide")],
} satisfies Config;
