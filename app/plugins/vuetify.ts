// plugins/vuetify.ts
import { createVuetify } from 'vuetify'

// Importa solo los componentes que usas en tu app
import {
  VApp,
  VMain,
  VContainer,
  VRow,
  VCol,
  VCard,
  VCardText,
  VCardTitle,
  VCardActions,
  VBtn,
  VTextField,
  VTextarea,
  VSelect,
  VForm,
  VSnackbar,
  VChip,
  VIcon,
  VAppBar,
  VToolbarTitle,
  VSpacer,
  VNavigationDrawer,
  VList,
  VListItem,
  VListItemTitle,
  VDivider,
  VImg,
  VAvatar
} from 'vuetify/components'

// Importa directivas si las usas
import { Ripple, Intersect } from 'vuetify/directives'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      VApp,
      VMain,
      VContainer,
      VRow,
      VCol,
      VCard,
      VCardText,
      VCardTitle,
      VCardActions,
      VBtn,
      VTextField,
      VTextarea,
      VSelect,
      VForm,
      VSnackbar,
      VChip,
      VIcon,
      VAppBar,
      VToolbarTitle,
      VSpacer,
      VNavigationDrawer,
      VList,
      VListItem,
      VListItemTitle,
      VDivider,
      VImg,
      VAvatar
    },
    directives: {
      Ripple,
      Intersect,
    },
  })
  
  app.vueApp.use(vuetify)
})