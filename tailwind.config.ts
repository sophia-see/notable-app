import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
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
					fontWeight: "bold",
					lineHeight: "120%",
					letterSpacing: "-0.5px"
				}],
				"preset-2": ["20px", {
					fontWeight: "bold",
					lineHeight: "120%",
					letterSpacing: "-0.5px"
				}],
				"preset-3": ["16px", {
					fontWeight: "semibold",
					lineHeight: "120%",
					letterSpacing: "-0.3px"
				}],
				"preset-4": ["14px", {
					fontWeight: "medium",
					lineHeight: "120%",
					letterSpacing: "-0.2px"
				}],
				"preset-5": ["14px", {
					fontWeight: "regular",
					lineHeight: "120%",
					letterSpacing: "-0.2px"
				}],
				"preset-6": ["12px", {
					fontWeight: "regular",
					lineHeight: "120%",
					letterSpacing: "-0.2px"
				}],
			}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
