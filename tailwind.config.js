/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // لتمكين الوضع المظلم بناءً على الفئة
  // prefix: 'tw-', // da 3shan t3arod al mui to tailwind
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: '#08D9D6',
        secondary: '#2B3445',
      },
    },
  },
  plugins: [],
};
