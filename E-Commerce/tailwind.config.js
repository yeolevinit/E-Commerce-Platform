/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'pacifico': ['Pacifico', 'cursive'],
                'allura': ['Allura', 'cursive'],
                'sacramento': ['Sacramento', 'cursive'],
                'damion': ['Damion', 'cursive'],
                'cookie': ['Cookie', 'cursive'],
                'sans': ['Poppins', 'sans-serif'],
            },

        },
    },
    plugins: [],
}
