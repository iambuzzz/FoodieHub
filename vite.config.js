import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            // Jab bhi frontend '/api' ko call karega,
            // Vite use chupke se laptop ke backend (3000) pe bhej dega
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
                secure: false,
            },
        },
    },
    test: {
        globals: true, // Allows global 'test', 'expect', etc.
        environment: "jsdom", // Use a simulated browser
        setupFiles: "./src/setupTests.js", // Setup file for tests
    },
});
