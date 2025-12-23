// nuxt.config.ts - Production-ready configuration
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-12-08',
  
  future: {
    compatibilityVersion: 4,
  },

  ssr: true,

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

  modules: [
    '@nuxt/image',
    // Simplified Vuetify module setup
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins = config.plugins || []
        config.plugins.push(
          vuetify({
            autoImport: true,
            styles: {
              configFile: undefined, // Let Vuetify handle its own styles
            },
          })
        )
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
    
    ssr: {
      noExternal: ['vuetify', 'vuetify/**'],
    },
    
    css: {
      preprocessorOptions: {
        sass: {
          // Fixed SASS configuration for Vuetify
          additionalData: '@use "sass:math";',
          // Silence Vuetify's Sass deprecation warnings (removed obsolete 'mixed-decls')
          silenceDeprecations: ['if-function', 'color-functions', 'global-builtin', 'import'],
        }
      },
    },
    
    build: {
      minify: false, // TEMPORARILY DISABLED to test if minification is causing the error
      target: 'es2020',
      
      // FIXED: Much safer Terser options to prevent "before initialization" errors
      terserOptions: process.env.NODE_ENV === 'production' ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
          passes: 1, // Reduced from 2 to prevent over-optimization
          // Only enable the safest optimizations
          dead_code: true,
          conditionals: true,
          booleans: true,
          // Removed: unused, hoist_funs, hoist_vars - these cause initialization errors
        },
        mangle: {
          safari10: true,
          // Keep default safe mangling, no custom options
        },
        format: {
          comments: false,
          ecma: 2020,
        },
      } : {},
      
      // FIXED: Simplified rollup output configuration
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('vuetify')) return 'vuetify'
              return 'vendor'
            }
          },
        }
      },
      
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
    },
    
    // FIXED: Less aggressive esbuild options
    esbuild: {
      drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    },
    
    optimizeDeps: {
      include: ['vuetify', '@mdi/font'],
    },
  },

  experimental: {
    payloadExtraction: true,
    viewTransition: true,
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

  // FIXED: Single CSS minification strategy
  postcss: {
    plugins: {
      autoprefixer: {},
      ...(process.env.NODE_ENV === 'production' ? {
        cssnano: {
          preset: ['default', {
            // Safe preset that works with Vuetify
            discardComments: { removeAll: true },
            normalizeWhitespace: true,
            // Removed all aggressive Vuetify-breaking options
          }]
        }
      } : {})
    },
  },

  typescript: {
    strict: false,
    typeCheck: false,
  },

  sourcemap: {
    server: false,
    client: false,
  },

  devServer: {
    port: 3002,
    host: '0.0.0.0',
  },

  devtools: {
    enabled: process.env.NODE_ENV === 'development',
  },
})