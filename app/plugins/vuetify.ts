import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: '#041845',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: lightTheme,
      },
      variations: false,
      cspNonce: undefined,
    },
    defaults: {
      global: {
        ripple: false,
      },
      VSheet: {
        color: 'white',
      },
      VCard: {
        color: 'white',
      },
    },
  })
  app.vueApp.use(vuetify)
  
  // Force light theme
  if (typeof window !== 'undefined') {
    document.documentElement.setAttribute('data-theme', 'light')
    document.documentElement.style.colorScheme = 'light'
  }
})

