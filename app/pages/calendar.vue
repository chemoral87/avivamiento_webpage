<template>
  <v-app>
    <AppNavBar :menu-items="menuItems" @toggle-drawer="drawer = !drawer" />

    <!-- Mobile Navigation Drawer -->
    <MobileNavDrawer v-model="drawer" :menu-items="menuItems" />

    <v-main class="bg-grey-lighten-4">
      <v-container class="py-4">
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8" class="text-center">
            <p class="text-overline mb-2" style="color: #666; letter-spacing: 2px;">ACOMPAÑANOS</p>
            <h1 class="text-h3 font-weight-light mb-4" style="color: #041845;">Eventos</h1>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="6" lg="5">
            <v-card elevation="0" class="event-card" style="border: 1px solid #e0e0e0; height: 100%;">
              <v-img
                src="/images/poster2.webp"
                height="250"
                cover
                gradient="to bottom, rgba(4,24,69,.3), rgba(4,24,69,.7)"
              >
                <div class="d-flex flex-column fill-height pa-4">
                  <v-chip color="#041845" size="small" class="mb-2" style="width: fit-content;">
                    PRÓXIMAMENTE
                  </v-chip>
                </div>
              </v-img>
              <v-card-text class="pa-6">
                <div class="d-flex align-center mb-3">
                  <v-icon color="#041845" class="mr-2">mdi-calendar</v-icon>
                  <span class="text-body-2" style="color: #666;">Diciembre 2025</span>
                </div>
                <h3 class="text-h5 font-weight-regular mb-3" style="color: #041845;">
                  Fiesta Navideña
                </h3>
                <p class="text-body-2 mb-4" style="color: #555; line-height: 1.8;">
                  Celebra con nosotros la Navidad en una noche llena de alegría, convivencia familiar y actividades especiales para toda la familia.
                </p>
                <div class="d-flex align-center mb-4">
                  <v-icon size="small" color="#666" class="mr-2">mdi-clock-outline</v-icon>
                  <span class="text-body-2" style="color: #666;">Por confirmar</span>
                </div>
                <v-divider class="mb-4"></v-divider>
                <div class="d-flex justify-space-between align-center">
                  <span class="text-body-2 font-weight-medium" style="color: #041845;">Compartir:</span>
                  <div>
                    <v-btn
                      icon
                      size="small"
                      variant="text"
                      @click="shareOnWhatsApp('Fiesta Navideña', 'Celebra con nosotros la Navidad en Avivamiento Monterrey. Diciembre 2025.')"
                      style="color: #25D366;"
                    >
                      <v-icon>mdi-whatsapp</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      size="small"
                      variant="text"
                      @click="shareOnFacebook('Fiesta Navideña')"
                      style="color: #1877F2;"
                    >
                      <v-icon>mdi-facebook</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      size="small"
                      variant="text"
                      @click="shareGeneric('Fiesta Navideña', 'Celebra con nosotros la Navidad en Avivamiento Monterrey. Diciembre 2025.')"
                      style="color: #041845;"
                    >
                      <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6" lg="5">
            <v-card elevation="0" class="event-card" style="border: 1px solid #e0e0e0; height: 100%;">
              <v-img
                src="/images/poster2.jpg"
                height="250"
                cover
                gradient="to bottom, rgba(4,24,69,.3), rgba(4,24,69,.7)"
              >
                <div class="d-flex flex-column fill-height pa-4">
                  <v-chip color="#041845" size="small" class="mb-2" style="width: fit-content;">
                    PRÓXIMAMENTE
                  </v-chip>
                </div>
              </v-img>
              <v-card-text class="pa-6">
                <div class="d-flex align-center mb-3">
                  <v-icon color="#041845" class="mr-2">mdi-calendar</v-icon>
                  <span class="text-body-2" style="color: #666;">Diciembre 2025</span>
                </div>
                <h3 class="text-h5 font-weight-regular mb-3" style="color: #041845;">
                  Obra Navideña
                </h3>
                <p class="text-body-2 mb-4" style="color: #555; line-height: 1.8;">
                  Disfruta de una presentación especial donde celebramos el verdadero significado de la Navidad a través de una obra teatral. Para ti.
                </p>
                <div class="d-flex align-center mb-4">
                  <v-icon size="small" color="#666" class="mr-2">mdi-clock-outline</v-icon>
                  <span class="text-body-2" style="color: #666;">Por confirmar</span>
                </div>
                <v-divider class="mb-4"></v-divider>
                <div class="d-flex justify-space-between align-center">
                  <span class="text-body-2 font-weight-medium" style="color: #041845;">Compartir:</span>
                  <div>
                    <v-btn
                      icon
                      size="small"
                      variant="text"
                      @click="shareOnWhatsApp('Obra Navideña', 'Disfruta de una obra teatral especial celebrando el verdadero significado de la Navidad en Avivamiento Monterrey. Diciembre 2025.')"
                      style="color: #25D366;"
                    >
                      <v-icon>mdi-whatsapp</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      size="small"
                      variant="text"
                      @click="shareOnFacebook('Obra Navideña')"
                      style="color: #1877F2;"
                    >
                      <v-icon>mdi-facebook</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      size="small"
                      variant="text"
                      @click="shareGeneric('Obra Navideña', 'Disfruta de una obra teatral especial celebrando el verdadero significado de la Navidad en Avivamiento Monterrey. Diciembre 2025.')"
                      style="color: #041845;"
                    >
                      <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const loginRoute = runtimeConfig.public.loginRoute

const menuItems = [
  { title: 'Inicio', to: '/' },
  { title: 'Testimonios', to: '/testimonios' },
  { title: 'Ministerios', to: '/ministerios' },
  { title: 'Horarios', onClick: () => goToSection('/#horarios') },
  { title: 'Ubicación', onClick: () => goToSection('/#ubicacion') },
]

const goToLogin = () => {

  window.open(loginRoute, '_self')
}

const goToPage = (path) => {
  router.push(path)
}

const goToSection = (path) => {
  drawer.value = false
  router.push(path)
}

const shareOnWhatsApp = (eventName, description) => {
  const url = encodeURIComponent('https://avivamientomonterrey.com/calendar')
  const text = encodeURIComponent(`${eventName} - ${description}\n\nMás información:`)
  window.open(`https://wa.me/?text=${text}%20${url}`, '_blank')
}

const shareOnFacebook = (eventName) => {
  const url = encodeURIComponent('https://avivamientomonterrey.com/calendar')
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

const shareGeneric = (eventName, description) => {
  if (navigator.share) {
    navigator.share({
      title: eventName,
      text: description,
      url: 'https://avivamientomonterrey.com/calendar'
    }).catch((error) => console.log('Error sharing:', error))
  } else {
    // Fallback: copiar al portapapeles
    const text = `${eventName} - ${description}\n\nhttps://avivamientomonterrey.com/calendar`
    navigator.clipboard.writeText(text).then(() => {
      alert('¡Enlace copiado al portapapeles!')
    })
  }
}

useHead({
  title: 'Eventos | Iglesia Avivamiento Monterrey',
  meta: [
    {
      name: 'description',
      content: 'Descubre los próximos eventos y actividades especiales de la Iglesia Avivamiento Monterrey.'
    }
  ]
})
</script>

<style scoped>
.event-card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.event-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
</style>
