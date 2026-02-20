import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  ssr: false,

  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/color-mode',
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    public: {
      sandboxifyApiUrl: 'http://localhost:5000',
    },
  },

  supabase: {
    redirect: false,
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
  },

  devtools: { enabled: true },
})
