/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./*.html', './src/**/*.{html,ts}'],
    theme: {
        extend: {}
    },
    plugins: [require('@tailwindcss/forms')]
};
