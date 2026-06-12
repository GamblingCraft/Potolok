import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', 'shadcn-nuxt'],

  nitro: {
    storage: {
      data: {
        driver: 'fs',
        base: './data/storage',
      },
    },
  },


  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  runtimeConfig: {
    adminLogin: 'propotolok77',
    adminPassword: 'potolok2026!',
    adminSecret: 'sk_admin_propot0l0k_secret_2026',
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      htmlAttrs: { lang: 'ru' },
      meta: [
        { name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  }
})
