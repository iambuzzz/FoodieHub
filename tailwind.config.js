// tailwind.config.js
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}", // <-- THIS LINE IS CRITICAL
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
