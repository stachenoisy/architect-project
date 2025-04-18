export default defineNuxtConfig({
  css: ['@/assets/css/tailwind.css'],

  build: {},

  modules: ['@nuxtjs/tailwindcss'],

  tailwindcss: {
    viewer: false, // Tailwind CSS yapılandırma dosyasını kullan
  },

  runtimeConfig: {
    public: {
      appVersion: '3.16.2',
    },
  },

  compatibilityDate: '2025-04-18',

  ssr: true, // SSR modunun açık olduğundan emin olun
});