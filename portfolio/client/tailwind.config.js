// Tailwind reads the colours from CSS variables defined in src/index.css.
// That is how one set of class names (bg-background, text-foreground...) works in both light and dark mode.
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        link: 'var(--link)',
        destructive: 'var(--destructive)',
        primary: { DEFAULT: 'var(--primary)', foreground: 'var(--primary-foreground)' },
        secondary: { DEFAULT: 'var(--secondary)', foreground: 'var(--secondary-foreground)' },
        muted: { DEFAULT: 'var(--muted)', foreground: 'var(--muted-foreground)' },
      },
    },
  },
  plugins: [],
};
