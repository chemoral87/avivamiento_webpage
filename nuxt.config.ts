// nuxt.config.ts - Configuración corregida
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-12-08',
  
  future: {
    compatibilityVersion: 4,
  },

  ssr: true,

  nitro: {
    compressPublicAssets: {
      brotli: true,
      gzip: true,
    },
    minify: true,
    preset: 'node-server',
    port: 3002,
    moduleSideEffects: ['vue-bundle-renderer'],
  },

  app: {
    head: {
      title: 'Pastor Adrian Aguirre | Avivamiento Monterrey',
      htmlAttrs: {
        lang: 'es'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Iglesia Avivamiento Monterrey dirigida por el Pastor Adrian Aguirre. Únete a nuestra comunidad cristiana en Apodaca, Monterrey, Nuevo León. Cultos dominicales y reuniones de oración.' 
        },
        { 
          name: 'keywords', 
          content: 'Adrian Aguirre, Pastor Adrian Aguirre, Avivamiento Monterrey, iglesia Monterrey, iglesia Apodaca, iglesia cristiana Monterrey, cultos cristianos Monterrey, pastor Monterrey, iglesia evangélica Monterrey' 
        },
        { name: 'author', content: 'Iglesia Avivamiento Monterrey' },
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:site_name', content: 'Avivamiento Monterrey' },
        { property: 'og:title', content: 'Pastor Adrian Aguirre | Avivamiento Monterrey' },
        { property: 'og:description', content: 'Iglesia Avivamiento Monterrey dirigida por el Pastor Adrian Aguirre. Únete a nuestra comunidad cristiana en Apodaca, Monterrey.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://avivamientomonterrey.com' },
        { property: 'og:locale', content: 'es_MX' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Pastor Adrian Aguirre | Avivamiento Monterrey' },
        { name: 'twitter:description', content: 'Iglesia Avivamiento Monterrey - Pastor Adrian Aguirre' },
        { name: 'geo.region', content: 'MX-NLE' },
        { name: 'geo.placename', content: 'Apodaca, Monterrey' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://avivamientomonterrey.com' }
      ]
    },
  },

  modules: [
    '@nuxt/image',
    // Vuetify sin archivo de configuración de estilos
    async (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(
          vuetify({
            autoImport: true,
            styles: 'none', // Desactivar estilos automáticos
          })
        )
      })
    },
  ],

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    
    ssr: {
      noExternal: ['vuetify'],
    },
    
    build: {
      minify: process.env.NODE_ENV === 'production' ? 'terser' : false,
      cssMinify: process.env.NODE_ENV === 'production',
      target: 'es2020',
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules') && !id.includes('vuetify')) {
              if (id.includes('@mdi/font')) return 'mdi';
              return 'vendor';
            }
          },
          chunkFileNames: '_nuxt/[name]-[hash].js',
          entryFileNames: '_nuxt/[name]-[hash].js',
          assetFileNames: '_nuxt/[name]-[hash].[ext]',
        }
      },
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
    },
    
    esbuild: {
      drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
      keepNames: true,
      minifyIdentifiers: process.env.NODE_ENV === 'production',
      minifySyntax: process.env.NODE_ENV === 'production',
      minifyWhitespace: process.env.NODE_ENV === 'production',
    },
    
    optimizeDeps: {
      include: ['vuetify'],
      exclude: ['@mdi/font'],
    },
  },

  experimental: {
    payloadExtraction: true,
    inlineRouteRules: true,
    viewTransition: true,
    componentIslands: true,
    renderJsonPayloads: true,
    localLayerAliases: true,
  },
  
  routeRules: {
    '/': { 
      prerender: true,
      headers: {
        'cache-control': 'public, max-age=3600, s-maxage=3600'
      }
    },
    '/land': { 
      prerender: true,
      headers: {
        'cache-control': 'public, max-age=3600, s-maxage=3600'
      }
    },
    '/calendar': { 
      swr: 3600,
    },
    '/ministerios': { 
      swr: 3600,
    },
  },

  image: {
    format: ['webp'],
    quality: 80,
  },

  // Opción 1: Usar los estilos predeterminados de Vuetify
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
  ],

  // Opción 2: Si necesitas configuraciones personalizadas, crea este archivo
  // y luego descomenta la línea en css:
  // css: [
  //   '@/assets/scss/vuetify.scss',
  //   '@mdi/font/css/materialdesignicons.css',
  // ],

  postcss: {
    plugins: {
      autoprefixer: {},
      ...(process.env.NODE_ENV === 'production' ? {
        cssnano: {
          preset: ['default', {
            discardComments: {
              removeAll: true,
            },
            normalizeWhitespace: true,
            minifyFontValues: true,
            minifySelectors: true,
            mergeLonghand: true,
            mergeRules: true,
            colormin: true,
            reduceIdents: false,
            zindex: false,
          }]
        }
      } : {})
    },
  },

  typescript: {
    strict: false,
    typeCheck: false,
    shim: false,
  },

  sourcemap: process.env.NODE_ENV === 'development',

  devServer: {
    port: 3002,
    host: '0.0.0.0',
  },

  devtools: {
    enabled: process.env.NODE_ENV === 'development',
  },
})