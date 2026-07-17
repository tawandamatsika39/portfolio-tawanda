// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in'}
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/icon'
  ],
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark'
  },
  content: {
    highlight: {
      theme: {
        default: 'min-dark',
        dark: 'min-dark',
        sepia: 'monokai'
      }
    },
    markdown: {
      anchorLinks :  false
    }
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },
  devServer: {
    host: "0.0.0.0"
  }
})