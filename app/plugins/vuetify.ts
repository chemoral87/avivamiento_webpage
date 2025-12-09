import '@mdi/font/css/materialdesignicons.css'
// Importar solo los estilos base necesarios
import 'vuetify/lib/styles/main.sass'
import { createVuetify } from 'vuetify'
// Importar solo los componentes que usas
import { 
  VApp, 
  VAppBar, 
  VMain, 
  VContainer, 
  VRow, 
  VCol, 
  VBtn, 
  VIcon, 
  VImg, 
  VCard, 
  VCardText, 
  VCardTitle,
  VChip,
  VNavigationDrawer,
  VList,
  VListItem,
  VListItemTitle,
  VDivider,
  VFooter,
} from 'vuetify/components'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // Registrar solo los componentes importados
    components: {
      VApp,
      VAppBar,
      VMain,
      VContainer,
      VRow,
      VCol,
      VBtn,
      VIcon,
      VImg,
      VCard,
      VCardText,
      VCardTitle,
      VChip,
      VNavigationDrawer,
      VList,
      VListItem,
      VListItemTitle,
      VDivider,
      VFooter,
    },
    // Desactivar estilos no utilizados
    defaults: {
      VBtn: { 
        variant: 'text',
        density: 'default'
      },
      VCard: {
        elevation: 0
      }
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#041845',
            secondary: '#424242',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FB8C00',
          },
        },
      },
    },
  })
  app.vueApp.use(vuetify)
})

