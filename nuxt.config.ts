import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  future: {
    compatibilityVersion: 4,
  },

  ssr: true,
  
  css: ['@mdi/font/css/materialdesignicons.css'],

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    ssr: {
      noExternal: ['vuetify'],
    },
  },

  app: {
    head: {
      title: 'Avivamiento Monterrey - Pastores Adrian y Sara Aguirre',
      htmlAttrs: {
        lang: 'es'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Iglesia Avivamiento Monterrey - Pastores Adrian Aguirre y Sara Aguirre. Te invitamos a formar parte de nuestra familia cristiana en Monterrey.' 
        },
        { 
          name: 'keywords', 
          content: 'Avivamiento Monterrey, Adrian Aguirre, Sara Aguirre, iglesia Monterrey, iglesia cristiana, pastor Adrian Aguirre, pastora Sara Aguirre' 
        },
        { name: 'author', content: 'Avivamiento Monterrey' },
        { property: 'og:title', content: 'Avivamiento Monterrey - Pastores Adrian y Sara Aguirre' },
        { property: 'og:description', content: 'Iglesia Avivamiento Monterrey - Pastores Adrian Aguirre y Sara Aguirre' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
})
