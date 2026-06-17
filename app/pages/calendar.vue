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
        <!-- Loading state -->
        <v-row v-if="loadingEvents" justify="center">
          <v-col cols="12" class="text-center py-8">
            <v-progress-circular indeterminate color="#041845" size="48" />
          </v-col>
        </v-row>

        <!-- No events state -->
        <v-row v-else-if="!events.length" justify="center">
          <v-col cols="12" md="8" class="text-center py-8">
            <v-icon size="48" color="#ccc" class="mb-4">mdi-calendar-blank-outline</v-icon>
            <p class="text-body-1" style="color: #666;">No hay eventos próximos por el momento.</p>
          </v-col>
        </v-row>

        <!-- Events list -->
        <v-row v-else justify="center">
          <v-col
            v-for="(event, i) in events"
            :key="event.id ?? i"
            cols="12" md="6" lg="5"
          >
            <v-card elevation="0" class="event-card" style="border: 1px solid #e0e0e0; height: 100%;">
              <v-img
                v-if="event.url_image_s3"
                :src="event.url_image_s3"
                height="220"
                cover
              />
              <v-card-text class="pa-4">
                <h3 class="text-h6 font-weight-regular mb-1" style="color: #041845;">
                  {{ event.name }}
                </h3>
                <p v-if="event.description" class="text-body-2 mb-2" style="color: #555; line-height: 1.6;">
                  {{ event.description }}
                </p>
                <!-- Date · Time · Location on compact rows -->
                <div class="d-flex align-center flex-wrap mb-1" style="gap: 16px;">
                  <span class="d-flex align-center" style="color: #666;">
                    <v-icon size="14" class="mr-1">mdi-calendar</v-icon>
                    <span class="text-caption">{{ formatEventDate(event.start_date) }}</span>
                  </span>
                  <span v-if="event.time_start" class="d-flex align-center" style="color: #666;">
                    <v-icon size="14" class="mr-1">mdi-clock-outline</v-icon>
                    <span class="text-caption">{{ event.time_start }}</span>
                  </span>
                </div>
                <div v-if="event.location" class="d-flex align-center mb-2" style="color: #666;">
                  <v-icon size="14" class="mr-1">mdi-map-marker-outline</v-icon>
                  <span class="text-caption">{{ event.location }}</span>
                </div>
                <v-divider class="mb-2"></v-divider>
                <div class="d-flex justify-space-between align-center">
     
                  <div>
                    <v-btn
                      icon size="small" variant="text"
                      @click="shareOnWhatsApp(event.name, event.description)"
                      style="color: #25D366;"
                    >
                      <v-icon>mdi-whatsapp</v-icon>
                    </v-btn>
                    <v-btn
                      icon size="small" variant="text"
                      @click="shareOnFacebook(event.name)"
                      style="color: #1877F2;"
                    >
                      <v-icon>mdi-facebook</v-icon>
                    </v-btn>
                    <v-btn
                      icon size="small" variant="text"
                      @click="shareGeneric(event.name, event.description)"
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
import { ref, onMounted } from 'vue'
import axios from 'axios'

const drawer = ref(false)
const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const loginRoute = runtimeConfig.public.loginRoute

const events = ref([])
const loadingEvents = ref(false)

// Safely encode a string to Base64 (handles Unicode)
const encodeBase64 = (str) => {
  if (!str) return null
  try {
    return btoa(unescape(encodeURIComponent(str)))
  } catch (e) {
    try {
      return Buffer.from(str, 'utf-8').toString('base64')
    } catch (e2) {
      return null
    }
  }
}

const fetchPublicEvents = async () => {
  const encoded = encodeBase64(runtimeConfig.public.ORG_ID)
  if (!encoded) return

  const base = runtimeConfig.public.API_URL.replace(/\/$/, '')
  const start_date = new Date().toISOString().split('T')[0] // YYYY-MM-DD
  const url = `${base}/church-event/public?org_id=${encodeURIComponent(encoded)}&start_date=${start_date}`

  loadingEvents.value = true
  try {
    const res = await axios.get(url)
    if (res?.status === 200 && res.data) {
      events.value = Array.isArray(res.data) ? res.data : (res.data.data ?? [])
    }
  } catch (err) {
    console.error('Error fetching events:', err)
  } finally {
    loadingEvents.value = false
  }
}

onMounted(() => {
  fetchPublicEvents()
})

const formatEventDate = (d) => {
  if (!d) return 'Fecha por confirmar'
  try {
    const dt = new Date(d)
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    return `${dt.getDate()} de ${monthNames[dt.getMonth()]} ${dt.getFullYear()}`
  } catch (e) {
    return d
  }
}

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
