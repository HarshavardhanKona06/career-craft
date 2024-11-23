import type { Config } from "tailwindcss";

export default {
  darkMode: ['class'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-light': "var(--background-light)",
        'text-primary-light': "var(--text-primary-light)",
        'text-secondary-light': "var(--text-secondary-light)",
        'lapis-lazuli-light': "var(--lapis-lazuli-light)",
        'coral-light': "var(--coral-light)",

        'background-dark': "var(--background-dark)",
        'text-primary-dark': "var(--text-primary-dark)",
        'text-secondary-dark': "var(--text-secondary-dark)",
        'lapis-lazuli-dark': "var(--lapis-lazuli-dark)",
        'coral-dark': "var(--coral-dark)",
      },
      fontFamily: {
        'space-grotesk': 'var(--font-space-grotesk)',
        'work-sans': 'var(--font-work-sans)',
      }
    },
  },
  plugins: [],
} satisfies Config;
