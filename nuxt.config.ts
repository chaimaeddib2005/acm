// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  pages: true,
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image'
  ],
  
  runtimeConfig: {
    public: {
      wordpressApiUrl: 'https://um6p.acm.org/wordpress/wp-json/wp/v2'
    }
  },
    imports: {
    dirs: ['stores']
  }
})
