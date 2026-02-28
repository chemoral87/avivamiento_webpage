// nuxt.config.ts - Configuración corregida
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
      API_URL:  process.env.API_URL || '',
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
    moduleSideEffects: ['vue-bundle-renderer'],
  },

  app: {
    head: {
      title: 'Iglesia Avivamiento Monterrey | Pastor Adrian Aguirre',
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
        { property: 'og:title', content: 'Iglesia Avivamiento Monterrey | Pastor Adrian Aguirre' },
        { property: 'og:description', content: 'Iglesia Avivamiento Monterrey dirigida por el Pastor Adrian Aguirre. Únete a nuestra comunidad cristiana en Apodaca, Monterrey.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://avivamientomonterrey.com' },
        { property: 'og:locale', content: 'es_MX' },
        { property: 'og:image', content: 'https://avivamientomonterrey.com/images/logo_avivamiento_seo.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Logo Avivamiento Monterrey' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Iglesia Avivamiento Monterrey | Pastor Adrian Aguirre' },
        { name: 'twitter:description', content: 'Iglesia Avivamiento Monterrey - Pastor Adrian Aguirre' },
        { name: 'twitter:image', content: 'https://avivamientomonterrey.com/images/logo_avivamiento_seo.png' },
        { name: 'twitter:image:alt', content: 'Logo Avivamiento Monterrey' },
        { name: 'geo.region', content: 'MX-NLE' },
        { name: 'geo.placename', content: 'Apodaca, Monterrey' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
        { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
        { rel: 'icon', type: 'image/x-icon', href: '/images/fav/favicon.ico' },
        { rel: 'canonical', href: 'https://avivamientomonterrey.com' }
      ],
      noscript: [
        { 
          children: '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NP63RVGW" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
          body: true
        }
      ]
    },
  },

  modules: ['@nuxt/image', async (_options, nuxt) => {
    nuxt.hooks.hook('vite:extendConfig', (config) => {
      config.plugins?.push(
        vuetify({
          autoImport: false, // Deshabilitado para tree-shaking manual
          styles: true, // Usar estilos por defecto de Vuetify
        })
      )
    })
  }, '@nuxtjs/sitemap'],

  site: {
    url: 'https://avivamientomonterrey.com',
    name: 'Iglesia Avivamiento Monterrey',
  },

  sitemap: {
    sitemaps: false,
    xsl: false,
  },

  build: {
    transpile: ['vuetify'],
  },

  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 1000,
        ignored: ['**/node_modules/**', '**/.git/**', '**/.nuxt/**', '**/.output/**']
      },
      fs: {
        strict: false,
      },
      hmr: {
        overlay: true,
        protocol: 'ws',
        host: 'localhost',
      },
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    
    plugins: process.env.NODE_ENV === 'production' ? [
      {
        name: 'css-minifier',
        async generateBundle(options, bundle) {
          const cssnano = (await import('cssnano')).default;
          const postcss = (await import('postcss')).default;
          
          for (const [fileName, chunk] of Object.entries(bundle)) {
            if (fileName.endsWith('.css') && 'source' in chunk) {
              const result = await postcss([
                cssnano({
                  preset: ['default', {
                    discardComments: { removeAll: true },
                    normalizeWhitespace: true,
                  }]
                })
              ]).process(chunk.source, { from: undefined });
              
              chunk.source = result.css;
            }
          }
        }
      }
    ] : [],
    
    ssr: {
      noExternal: ['vuetify'],
    },
    
    css: {
      devSourcemap: false,
      preprocessorOptions: {},
    },
    
    build: {
      minify: process.env.NODE_ENV === 'production' ? 'terser' : false,
      target: 'es2020',
      
      terserOptions: process.env.NODE_ENV === 'production' ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
          passes: 2,
          pure_funcs: ['console.log', 'console.info', 'console.debug'],
          dead_code: true,
          conditionals: true,
          evaluate: true,
          booleans: true,
          loops: true,
          unused: true,
          hoist_funs: true,
          keep_fargs: false,
          hoist_vars: false,
          if_return: true,
          join_vars: true,
          side_effects: true,
          sequences: true,
          collapse_vars: true,
          reduce_vars: true,
          toplevel: true,
        },
        mangle: {
          safari10: true,
          keep_classnames: false,
          keep_fnames: false,
          toplevel: true,
        },
        format: {
          comments: false,
          beautify: false,
          ecma: 2020,
          ascii_only: false,
          indent_level: 0,
          max_line_len: false,
          semicolons: true,
          preserve_annotations: false,
          quote_style: 1,
          wrap_iife: false,
        },
      } : {},
      
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules') && !id.includes('vuetify')) {
              if (id.includes('@mdi/font')) return 'mdi';
              return 'vendor';
            }
          },
          chunkFileNames: (chunkInfo) => {
            const timestamp = Date.now();
            return `_nuxt/${chunkInfo.name}-${timestamp}-[hash].js`;
          },
          entryFileNames: (chunkInfo) => {
            const timestamp = Date.now();
            return `_nuxt/${chunkInfo.name}-${timestamp}-[hash].js`;
          },
          assetFileNames: (assetInfo) => {
            const timestamp = Date.now();
            const ext = assetInfo.name?.split('.').pop() || 'asset';
            const name = assetInfo.name?.replace(/\.[^.]+$/, '') || 'asset';
            return `_nuxt/${name}-${timestamp}-[hash].${ext}`;
          },
        }
      },
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
      cssTarget: 'chrome61',
    },
    
    esbuild: {
      drop: process.env.NODE_ENV === 'development' ? [] : ['console', 'debugger'],
      keepNames: false,
      minifyIdentifiers: false,
      minifySyntax: false,
      minifyWhitespace: false,
    },
    
    optimizeDeps: {
      include: ['vuetify'],
      exclude: ['@mdi/font'],
    },
    clearScreen: false,
  },

  experimental: {
    payloadExtraction: true,
    inlineRouteRules: true,
    viewTransition: true,
    componentIslands: false,
    renderJsonPayloads: false,
    localLayerAliases: false,
  },
  
  routeRules: {
    '/': { 
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

  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    '@/assets/styles/global.css',
  ],

  // PostCSS - PurgeCSS DESHABILITADO para evitar problemas con Vuetify
  // Solo usar cssnano para minificación
  postcss: {
    plugins: {
      autoprefixer: {},
      ...(process.env.NODE_ENV === 'production' ? {
        cssnano: {
          preset: ['default', {
            discardComments: { removeAll: true },
            normalizeWhitespace: true,
            minifyFontValues: true,
            minifySelectors: true,
            mergeLonghand: true,
            mergeRules: true,
            colormin: true,
            reduceIdents: false,
            zindex: false,
            minifyGradients: true,
            normalizeUrl: true,
            svgo: true,
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