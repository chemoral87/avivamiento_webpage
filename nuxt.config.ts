// nuxt.config.ts - Configuración completa optimizada para Nuxt 4.2.1
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-12-08',
  
  future: {
    compatibilityVersion: 4,
  },

  // SSR habilitado
  ssr: true,

  // ============================================
  // OPTIMIZACIONES DE NITRO (Motor de Nuxt)
  // ============================================
  nitro: {
    // Compresión de assets públicos
    compressPublicAssets: {
      brotli: true,
      gzip: true,
    },
    // Minificación del servidor
    minify: true,
    
    // Configuración del preset y puerto
    preset: 'node-server',
    port: 3002,
    
    // Module side effects para SSR
    moduleSideEffects: ['vue-bundle-renderer'],
    
    // Rollup config
    rollupConfig: {
      external: []
    },
    
    // Prerender rutas estáticas (opcional - descomenta si necesitas)
    // prerender: {
    //   routes: ['/'],
    //   crawlLinks: true,
    // }
  },

  // ============================================
  // OPTIMIZACIONES DE VITE/BUILD
  // ============================================
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
      // Minificación: 'terser' para máxima compresión en producción
      minify: process.env.NODE_ENV === 'production' ? 'terser' : 'esbuild',
      cssMinify: 'esbuild',
      
      // Configuración de Terser para producción
      terserOptions: process.env.NODE_ENV === 'production' ? {
        compress: {
          drop_console: true, // Eliminar console.log
          drop_debugger: true, // Eliminar debugger
          pure_funcs: ['console.log', 'console.info', 'console.debug'], // Eliminar funciones específicas
          passes: 2, // Múltiples pasadas para mejor compresión
        },
        mangle: {
          safari10: true, // Compatibilidad con Safari 10+
        },
        format: {
          comments: false, // Eliminar todos los comentarios
        },
      } : {},
      
      // Target ES moderno para código más pequeño
      target: 'es2020',
      
      // Configuración de Rollup para chunking optimizado
      rollupOptions: {
        output: {
          // Separar chunks manualmente para mejor caché
          manualChunks: (id) => {
            // Vuetify en su propio chunk
            if (id.includes('vuetify')) {
              return 'vuetify';
            }
            // MDI icons separados
            if (id.includes('@mdi/font')) {
              return 'mdi';
            }
            // Otros node_modules en vendor
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          
          // Nombres con hash para cache-busting
          chunkFileNames: '_nuxt/[name]-[hash].js',
          entryFileNames: '_nuxt/[name]-[hash].js',
          assetFileNames: '_nuxt/[name]-[hash].[ext]',
        }
      },
      
      // Optimizaciones adicionales
      assetsInlineLimit: 4096, // Inline assets < 4kb como base64
      cssCodeSplit: true, // Separar CSS por ruta/componente
      reportCompressedSize: false, // Build más rápido
      
      // Chunk size warnings
      chunkSizeWarningLimit: 1000,
    },
    
    // Optimización con esbuild
    esbuild: {
      // Eliminar console.log y debugger en producción
      drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
      
      // Minificación de identificadores
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
    },
    
    // Optimizaciones de servidor dev (opcional)
    server: {
      hmr: {
        overlay: true,
      },
    },
  },

  // ============================================
  // CONFIGURACIÓN DE APP
  // ============================================
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
        
        // Open Graph
        { property: 'og:site_name', content: 'Avivamiento Monterrey' },
        { property: 'og:title', content: 'Pastor Adrian Aguirre | Avivamiento Monterrey' },
        { property: 'og:description', content: 'Iglesia Avivamiento Monterrey dirigida por el Pastor Adrian Aguirre. Únete a nuestra comunidad cristiana en Apodaca, Monterrey.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://avivamientomonterrey.com' },
        { property: 'og:locale', content: 'es_MX' },
        
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Pastor Adrian Aguirre | Avivamiento Monterrey' },
        { name: 'twitter:description', content: 'Iglesia Avivamiento Monterrey - Pastor Adrian Aguirre' },
        
        // Geo tags
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

  // ============================================
  // CONFIGURACIÓN DE ROUTER
  // ============================================
  router: {
    options: {
      // Prefetch de links automático
      linkPrefetchedClass: 'nuxt-link-prefetched',
      
      // Opciones de scroll behavior
      scrollBehaviorType: 'smooth',
    }
  },

  // ============================================
  // FEATURES EXPERIMENTALES DE NUXT 4
  // ============================================
  experimental: {
    // Payload extraction para mejor caché
    payloadExtraction: true,
    
    // Inline route rules
    inlineRouteRules: true,
    
    // View Transitions API (navegación suave entre páginas)
    viewTransition: true,
    
    // Component Islands (opcional - para componentes con interactividad selectiva)
    // componentIslands: true,
    
    // Render JSON payloads inline
    // renderJsonPayloads: true,
  },

  // ============================================
  // MÓDULOS Y VUETIFY
  // ============================================
  modules: [
    '@nuxt/image',
    // Vuetify se agrega con el hook personalizado
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],

  // Transpile Vuetify
  build: {
    transpile: ['vuetify'],
  },

  // ============================================
  // CONFIGURACIÓN DE @nuxt/image
  // ============================================
  image: {
    // Formatos modernos optimizados
    format: ['webp'],
    
    // Calidad de compresión
    quality: 80,
  },

  // ============================================
  // CSS GLOBAL Y CONFIGURACIÓN
  // ============================================
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    // Agrega aquí tus archivos CSS/SCSS globales
    // '~/assets/styles/main.scss',
  ],

  // ============================================
  // POSTCSS (para CSS optimization)
  // ============================================
  postcss: {
    plugins: {
      autoprefixer: {},
      ...(process.env.NODE_ENV === 'production' ? {
        cssnano: {
          preset: ['default', {
            discardComments: {
              removeAll: true, // Eliminar TODOS los comentarios
            },
            normalizeWhitespace: true, // Eliminar espacios
            minifyFontValues: true, // Minificar fuentes
            minifySelectors: true, // Minificar selectores
            mergeLonghand: true, // Combinar propiedades
            mergeRules: true, // Combinar reglas duplicadas
            colormin: true, // Minificar colores
            reduceIdents: false, // No reducir identifiers (para Vuetify)
            zindex: false, // No tocar z-index (puede romper Vuetify)
          }]
        }
      } : {})
    },
  },

  // ============================================
  // VUETIFY CONFIGURATION (desactivado - usando hooks)
  // ============================================
  // Si usas el módulo @nuxtjs/vuetify en lugar del hook, descomenta esto:
  // vuetify: {
  //   moduleOptions: {
  //     treeshaking: true,
  //     styles: {
  //       configFile: 'assets/settings.scss',
  //     },
  //   },
  // },

  // ============================================
  // TYPESCRIPT
  // ============================================
  typescript: {
    strict: false,
    typeCheck: false, // Desactivar para builds más rápidos
    shim: false,
  },

  // ============================================
  // SOURCEMAPS (desactivar en producción)
  // ============================================
  sourcemap: {
    server: false,
    client: false,
  },

  // ============================================
  // DEV SERVER
  // ============================================
  devServer: {
    port: 3002, // Puerto para desarrollo y producción
    host: '0.0.0.0', // Para acceso desde red local
  },

  // ============================================
  // CONFIGURACIONES DE DESARROLLO
  // ============================================
  devtools: {
    enabled: process.env.NODE_ENV === 'development',
  },

  // ============================================
  // HOOKS (opcional - para logging o análisis)
  // ============================================
  hooks: {
    // Log del tamaño del build
    'build:done': () => {
      console.log('✅ Build completado exitosamente')
    }
  },
})