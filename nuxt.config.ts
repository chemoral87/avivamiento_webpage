// nuxt.config.ts - Production-ready configuration
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-12-08',
  
  future: {
    compatibilityVersion: 4,
  },

  ssr: false,

  runtimeConfig: {
    public: {
      loginRoute: process.env.NUXT_PUBLIC_LOGIN_ROUTE || '/login',
      API_URL: process.env.API_URL || '',
      ORG_ID: process.env.ORG_ID || '',
    },
  },

  nitro: {
    compressPublicAssets: {
      brotli: true,
      gzip: true,
    },
    minify: true,
    preset: 'node-server',
    port: 3002,
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
          content: 'Iglesia Avivamiento Monterrey dirigida por el Pastor Adrian Aguirre. Únete a nuestra comunidad cristiana en Apodaca, Monterrey, Nuevo León.' 
        },
        { 
          name: 'keywords', 
          content: 'Adrian Aguirre, Pastor Adrian Aguirre, Avivamiento Monterrey, iglesia Monterrey, iglesia Apodaca, iglesia cristiana Monterrey' 
        },
        { name: 'author', content: 'Iglesia Avivamiento Monterrey' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:site_name', content: 'Avivamiento Monterrey' },
        { property: 'og:title', content: 'Pastor Adrian Aguirre | Avivamiento Monterrey' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://avivamientomonterrey.com' },
        { property: 'og:locale', content: 'es_MX' },
        { name: 'geo.region', content: 'MX-NLE' },
        { name: 'geo.placename', content: 'Apodaca, Monterrey' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://avivamientomonterrey.com' }
      ],
    },
  },

  // FIXED: Correct module configuration
  modules: [
    '@nuxt/image',
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify({ autoImport: true }))
      })
    },
  ],

  build: {
    transpile: ['vuetify'],
  },

  css: [
    '@mdi/font/css/materialdesignicons.css',
    'vuetify/lib/styles/main.sass',
    '@/assets/styles/global.css',
  ],

  vite: {
    server: {
      hmr: {
        overlay: true,
        protocol: 'ws',
        host: 'localhost',
      },
      watch: {
        usePolling: true,
        interval: 500,
      },
    },
    
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    
    // FIXED: Critical fix for Vuetify and SSR
    ssr: {
      noExternal: ['vuetify', /\.css$/, /\?vue/],
    },
    
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `
            @use "sass:math";
            @use "sass:color";
            @use "sass:selector";
          `,
          silenceDeprecations: ['if-function', 'color-functions', 'global-builtin', 'import', 'mixed-decls'],
        }
      },
    },
    
    build: {
      minify: 'terser',
      target: 'es2020',
      
      // FIXED: Safer Terser options to avoid "before initialization" errors
      terserOptions: process.env.NODE_ENV === 'production' ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
          // Disable problematic optimizations
          hoist_vars: false,  // This was causing the camelize error
          hoist_funs: false,  // This was causing the camelize error
          reduce_vars: false, // This was causing the camelize error
          // Keep only safe optimizations
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: false,      // Disable unused removal during build
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
        },
      } : false,
      
      rollupOptions: {
        output: {
          // FIXED: Better chunking strategy for Vuetify
          manualChunks: (id) => {
            if (id.includes('node_modules/vuetify')) return 'vuetify'
            if (id.includes('node_modules')) return 'vendor'
            if (id.includes('/plugins/') || id.includes('/composables/')) return 'app-core'
          },
          // Ensure modules are loaded in correct order
          chunkFileNames: 'chunks/[name]-[hash].js',
          entryFileNames: 'entries/[name]-[hash].js',
        }
      },
    },
    
    optimizeDeps: {
      // FIXED: Explicitly include Vuetify dependencies
      include: [
        'vuetify',
        'vuetify/lib/components',
        'vuetify/lib/directives',
        'vuetify/lib/styles/main.sass',
        '@mdi/font/css/materialdesignicons.css',
      ],
      exclude: [],
    },
  },

  experimental: {
    payloadExtraction: true,
    viewTransition: true,
    // FIXED: Enable async context to help with module ordering
    asyncContext: true,
  },
  
  routeRules: {
    '/': { 
      prerender: true,
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

  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },

  typescript: {
    strict: false,
    typeCheck: false,
  },

  // FIXED: Disable sourcemaps in production to avoid bundling issues
  sourcemap: process.env.NODE_ENV === 'development',

  devServer: {
    port: 3002,
    host: '0.0.0.0',
  },

  devtools: {
    enabled: process.env.NODE_ENV === 'development',
  },
})