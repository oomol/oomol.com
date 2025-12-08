/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "../docs/**/*.mdx"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        "oomol-bg-base": "var(--oomol-bg-base)",
        "oomol-bg-container": "var(--oomol-bg-container)",
        "oomol-bg-elevated": "var(--oomol-bg-elevated)",
        "oomol-bg-spotlight": "var(--oomol-bg-spotlight)",
        "oomol-bg-layout": "var(--oomol-bg-layout)",
        "oomol-text-primary": "var(--oomol-text-primary)",
        "oomol-text-secondary": "var(--oomol-text-secondary)",
        "oomol-text-tertiary": "var(--oomol-text-tertiary)",
        "oomol-text-disabled": "var(--oomol-text-disabled)",
        "oomol-border": "var(--oomol-border-default)",
        "oomol-border-subtle": "var(--oomol-border-subtle)",
        "oomol-primary": "var(--oomol-primary)",
        "oomol-primary-hover": "var(--oomol-primary-hover)",
        "oomol-studio": "var(--oomol-studio)",
        "oomol-hub": "var(--oomol-hub)",
        "oomol-app": "var(--oomol-app)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
