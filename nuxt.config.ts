// nuxt.config.ts
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    ssr: false, // Disable SSR for debugging; change as needed for production
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.API_URL || 'http://localhost:5000/api', // API URL for backend
        },
    },
    css: [
        '~/assets/global.css',
    ],
});
