<template>
  <v-app>
    <v-main class="bg-grey-lighten-4">
      <div 
        class="fill-height-container" 
        :class="{ 
          'widescreen-active': isWidescreen,
          'hide-cursor': isWidescreen && !showWidescreenControls
        }"
        ref="pageContainer"
        @mousemove="onMouseMove"
      >
        <!-- Page Header & Controls (Hidden in Widescreen Mode) -->
        <template v-if="!isWidescreen">

          <!-- Configuration Controls -->
          <v-row justify="center" class="my-0" dense>
            <v-col cols="12" sm="8" md="6" lg="5">
              <v-card class="pa-4" elevation="0" style="border: 1px solid #e0e0e0; border-radius: 12px;">
                <v-btn
                  block
                  color="#041845"
                  variant="flat"
                  prepend-icon="mdi-monitor"
                  class="text-none font-weight-bold mt-2"
                  @click="enterWidescreen"
                >
                  Ver en Pantalla Completa
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </template>



        <!-- Loading -->
        <v-row v-if="loadingEvents" justify="center" dense class="ma-auto">
          <v-col cols="12" class="text-center py-2">
            <v-progress-circular indeterminate color="#041845" size="48" />
          </v-col>
        </v-row>

        <!-- No Events -->
        <v-row v-else-if="events.length === 0" justify="center" dense class="ma-auto">
          <v-col cols="12" md="10" lg="8" class="text-center py-12">
            <v-card class="pa-8 text-center" elevation="0" style="border: 1px solid #e0e0e0; border-radius: 12px;">
              <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-calendar-blank</v-icon>
              <h3 class="text-h6 font-weight-light mb-2" style="color: #041845;">No hay eventos próximos</h3>
              <p class="text-body-2 text-grey-darken-1">No se encontraron eventos programados para los siguientes {{ days }} días.</p>
              <v-btn
                v-if="isWidescreen"
                variant="outlined"
                color="#041845"
                class="mt-4"
                @click="exitWidescreen"
              >
                Salir de Pantalla Completa
              </v-btn>
            </v-card>
          </v-col>
        </v-row>

        <!-- Event Carousel -->
        <EventCarousel 
          v-else 
          :events="events" 
          :is-widescreen="isWidescreen" 
          @click-event="goToEvent" 
        />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { fetchCarouselEvents } from '~/utils/calendarApi'

const route = useRoute()
const router = useRouter()
const runtimeConfig = useRuntimeConfig()

const pageContainer = ref(null)
const events = ref([])
const loadingEvents = ref(false)
const isWidescreen = ref(false)

// Controls fade in/out when mouse moves in fullscreen
const showWidescreenControls = ref(true)
let mouseMoveTimeout = null

const getInitialDays = () => {
  const queryDays = route.query.nextDays
  if (queryDays && !isNaN(queryDays)) {
    const parsed = parseInt(queryDays, 10)
    if (parsed > 0) return parsed
  }
  return 15
}

const days = ref(getInitialDays())

const isFullDisplayRequested = () => route.query.display === 'full'

const loadEvents = async () => {
  loadingEvents.value = true
  try {
    events.value = await fetchCarouselEvents({
      nextDays: days.value,
      orgId: runtimeConfig.public.ORG_ID,
      apiUrl: runtimeConfig.public.API_URL,
    })
  } catch (error) {
    console.error('Error fetching carousel events:', error)
  } finally {
    loadingEvents.value = false
  }
}

watch(isWidescreen, (val) => {
  if (typeof document !== 'undefined') {
    if (val) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }
})

const goToEvent = (slugName) => {
  if (isWidescreen.value) return // Disable navigations in cafeteria display mode
  router.push({ path: `/calendar/${slugName}` })
}

// Widescreen Fullscreen handlers
const enterWidescreen = () => {
  isWidescreen.value = true

  // Try to go browser fullscreen for the best cafeteria experience.
  // Note: browsers reject this without a real user gesture (e.g. when
  // triggered automatically via ?display=full), so failures are ignored
  // and the widescreen layout still applies on its own.
  const docEl = document.documentElement
  try {
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().catch(() => {})
    } else if (docEl.mozRequestFullScreen) { /* Firefox */
      docEl.mozRequestFullScreen()
    } else if (docEl.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      docEl.webkitRequestFullscreen()
    } else if (docEl.msRequestFullscreen) { /* IE/Edge */
      docEl.msRequestFullscreen()
    }
  } catch {
    // Ignore — the widescreen layout already applied above
  }
}

const exitWidescreen = () => {
  isWidescreen.value = false
  
  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen()
    }
  }
}

// Fullscreen escape key / change detector
const onFullscreenChange = () => {
  const isCurrentlyFullscreen = !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  )
  // Sync state if exited fullscreen via Esc key
  if (!isCurrentlyFullscreen && isWidescreen.value) {
    isWidescreen.value = false
  }
}

const onMouseMove = () => {
  if (!isWidescreen.value) return
  
  showWidescreenControls.value = true
  clearTimeout(mouseMoveTimeout)
  // Hide cursor/controls after 6 seconds of no mouse movement
  mouseMoveTimeout = setTimeout(() => {
    showWidescreenControls.value = false
  }, 6000)
}

onMounted(() => {
  loadEvents()

  // ?display=full → jump straight into widescreen/cafeteria mode
  if (isFullDisplayRequested()) {
    enterWidescreen()
  }

  document.addEventListener('fullscreenchange', onFullscreenChange)
  document.addEventListener('webkitfullscreenchange', onFullscreenChange)
  document.addEventListener('mozfullscreenchange', onFullscreenChange)
  document.addEventListener('MSFullscreenChange', onFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', onFullscreenChange)
  document.removeEventListener('webkitfullscreenchange', onFullscreenChange)
  document.removeEventListener('mozfullscreenchange', onFullscreenChange)
  document.removeEventListener('MSFullscreenChange', onFullscreenChange)
  clearTimeout(mouseMoveTimeout)
  if (typeof document !== 'undefined') {
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
  }
})

// SEO & Head
useHead({
  title: 'Carrusel de Eventos | Iglesia Avivamiento Monterrey',
})
</script>

<style scoped>
.hide-cursor, .hide-cursor * {
  cursor: none !important;
}

.fill-height-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.fill-height-container.widescreen-active {
  background-color: #041845;
  min-height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  overflow: hidden;
}

</style>
