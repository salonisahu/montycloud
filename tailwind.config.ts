import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Tight", "sans-serif"],
      },
      colors: {
        // System Colors (shadcn/ui)
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        success: "var(--success)",
        "success-foreground": "var(--success-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        // MontyCloud Brand Colors - Blue Focused
        "brand-primary": "var(--brand-primary)",
        "brand-primary-light": "var(--brand-primary-light)",
        "brand-primary-dark": "var(--brand-primary-dark)",
        "brand-secondary": "var(--brand-secondary)",
        "brand-accent": "var(--brand-accent)",
        "brand-neutral": "var(--brand-neutral)",
        "brand-white": "var(--brand-white)",
        "brand-black": "var(--brand-black)",

        // Semantic Colors
        success: "var(--color-success)",
        "success-light": "var(--color-success-light)",
        "success-dark": "var(--color-success-dark)",
        warning: "var(--color-warning)",
        "warning-light": "var(--color-warning-light)",
        "warning-dark": "var(--color-warning-dark)",
        error: "var(--color-error)",
        "error-light": "var(--color-error-light)",
        "error-dark": "var(--color-error-dark)",
        info: "var(--color-info)",
        "info-light": "var(--color-info-light)",
        "info-dark": "var(--color-info-dark)",

        // Blue-Gray Scale
        "blue-gray": {
          50: "var(--blue-gray-50)",
          100: "var(--blue-gray-100)",
          200: "var(--blue-gray-200)",
          300: "var(--blue-gray-300)",
          400: "var(--blue-gray-400)",
          500: "var(--blue-gray-500)",
          600: "var(--blue-gray-600)",
          700: "var(--blue-gray-700)",
          800: "var(--blue-gray-800)",
          900: "var(--blue-gray-900)",
          950: "var(--blue-gray-950)",
        },

        // MontyCloud Blue Scale
        blue: {
          50: "var(--blue-50)",
          100: "var(--blue-100)",
          200: "var(--blue-200)",
          300: "var(--blue-300)",
          400: "var(--blue-400)",
          500: "var(--blue-500)",
          600: "var(--blue-600)",
          700: "var(--blue-700)",
          800: "var(--blue-800)",
          900: "var(--blue-900)",
        },

        // Cyan-Blue Scale
        cyan: {
          50: "var(--cyan-50)",
          100: "var(--cyan-100)",
          200: "var(--cyan-200)",
          300: "var(--cyan-300)",
          400: "var(--cyan-400)",
          500: "var(--cyan-500)",
          600: "var(--cyan-600)",
          700: "var(--cyan-700)",
          800: "var(--cyan-800)",
          900: "var(--cyan-900)",
        },

        // Indigo Scale
        indigo: {
          50: "var(--indigo-50)",
          100: "var(--indigo-100)",
          200: "var(--indigo-200)",
          300: "var(--indigo-300)",
          400: "var(--indigo-400)",
          500: "var(--indigo-500)",
          600: "var(--indigo-600)",
          700: "var(--indigo-700)",
          800: "var(--indigo-800)",
          900: "var(--indigo-900)",
        },

        // Status Colors
        "status-online": "var(--status-online)",
        "status-offline": "var(--status-offline)",
        "status-away": "var(--status-away)",
        "status-busy": "var(--status-busy)",

        // Chart Colors
        "chart-1": "var(--chart-1)",
        "chart-2": "var(--chart-2)",
        "chart-3": "var(--chart-3)",
        "chart-4": "var(--chart-4)",
        "chart-5": "var(--chart-5)",
        "chart-6": "var(--chart-6)",
        "chart-7": "var(--chart-7)",
        "chart-8": "var(--chart-8)",
        "chart-9": "var(--chart-9)",
        "chart-10": "var(--chart-10)",

        // Sidebar Colors
        sidebar: "var(--sidebar)",
        "sidebar-foreground": "var(--sidebar-foreground)",
        "sidebar-primary": "var(--sidebar-primary)",
        "sidebar-primary-foreground": "var(--sidebar-primary-foreground)",
        "sidebar-accent": "var(--sidebar-accent)",
        "sidebar-accent-foreground": "var(--sidebar-accent-foreground)",
        "sidebar-border": "var(--sidebar-border)",
        "sidebar-ring": "var(--sidebar-ring)",

        // Header Colors
        header: "var(--header)",
        "header-foreground": "var(--header-foreground)",
        "header-primary": "var(--header-primary)",
        "header-primary-foreground": "var(--header-primary-foreground)",
        "header-accent": "var(--header-accent)",
        "header-accent-foreground": "var(--header-accent-foreground)",
        "header-border": "var(--header-border)",
        "header-ring": "var(--header-ring)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
export default config;
