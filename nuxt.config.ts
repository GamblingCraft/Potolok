import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', 'shadcn-nuxt', '@nuxt/image'],

  image: {
    quality: 80,
    format: ['avif', 'webp'],
    domains: ['images.unsplash.com'],
    screens: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 },
  },

  nitro: {
    storage: {
      data: process.env.KV_REST_API_URL
        ? { driver: 'upstash', url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN }
        : { driver: 'fs', base: './data/storage' },
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
      ],
      link: [
        { rel: 'preconnect', href: 'https://images.unsplash.com' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/Gilroy-Regular.woff2', crossorigin: '' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/Gilroy-Bold.woff2', crossorigin: '' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/Gilroy-Extrabold.woff2', crossorigin: '' },
      ]
    }
  }
})
