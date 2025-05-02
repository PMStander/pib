import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode', '@nuxtjs/device', 'nuxt-icons', '@vueuse/nuxt'],
  colorMode: {
    preference: 'system', // default value
    fallback: 'light', // fallback value if not system preference found
    classSuffix: '', // optional
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  runtimeConfig: {
    // Private keys that are exposed to the server
    apiSecret: process.env.NUXT_API_SECRET,

    // Public keys that are exposed to the client
    public: {
      firebaseConfig: {
        apiKey: process.env.FIREBASE_API_KEY || "AIzaSyDqYtWUWQRoZvYOUZZH9-mBS5YBWkUQQYE",
        authDomain: process.env.FIREBASE_AUTH_DOMAIN || "partners-in-biz.firebaseapp.com",
        projectId: process.env.FIREBASE_PROJECT_ID || "partners-in-biz",
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "partners-in-biz.appspot.com",
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "123456789012",
        appId: process.env.FIREBASE_APP_ID || "1:123456789012:web:1234567890abcdef"
      }
    }
  }
})