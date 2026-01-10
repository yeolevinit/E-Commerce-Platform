/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#14b8a6', // Teal-500
                'primary-hover': '#0d9488', // Teal-600
                secondary: '#f59e0b', // Amber-500
                'dark-bg': '#020617', // Slate-950
                'card-bg': '#0f172a', // Slate-900
                'text-main': '#f1f5f9', // Slate-100
                'text-muted': '#94a3b8', // Slate-400
            }
        },
    },
    plugins: [],
}
