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
          <v-row justify="center" class="mt-4 mb-4" dense>
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
                  Ver en Pantalla Completa (Cafetería)
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </template>



        <!-- Loading -->
        <v-row v-if="loadingEvents" justify="center" dense class="ma-auto">
          <v-col cols="12" class="text-center py-12">
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
        <div v-else class="carousel-container-wrapper">
          <v-carousel
            v-model="activeSlide"
            cycle
            :interval="6000"
            hide-delimiter-background
            hide-delimiters
            :show-arrows="isWidescreen ? false : 'hover'"
            :height="isWidescreen ? '100vh' : '550'"
            class="overflow-hidden"
            :class="isWidescreen ? 'widescreen-carousel' : 'normal-carousel rounded-xl elevation-3'"
            style="background-color: #041845; width: 100%;"
          >
            <v-carousel-item
              v-for="event in events"
              :key="event.id"
            >
              <!-- Carousel item content -->
              <div class="carousel-item-wrapper" @click="goToEvent(event.slug_name)">
                <!-- Blur background if there is an image -->
                <div 
                  v-if="event.url_image_s3" 
                  class="blur-bg" 
                  :style="{ backgroundImage: `url(${event.url_image_s3})` }"
                ></div>
                
                <div class="content-overlay">
                  <div class="event-image-container">
                    <img 
                      v-if="event.url_image_s3" 
                      :src="event.url_image_s3" 
                      :alt="event.name"
                      class="event-flyer"
                    />
                    <div v-else class="event-flyer-placeholder">
                      <v-icon size="100" color="white">mdi-calendar</v-icon>
                    </div>
                  </div>

                  <div class="event-details-panel">
                    <div class="d-flex align-center flex-wrap mb-2 tag-date-row" style="gap: 12px;">
                      <v-chip
                        v-if="event.classification"
                        :size="isWidescreen ? 'large' : 'small'"
                        :color="classificationColor(event.classification)"
                        variant="flat"
                        class="text-white font-weight-bold"
                      >
                        {{ event.classification }}
                      </v-chip>
                      <span class="text-white-50 font-weight-bold date-span">
                        {{ formatEventDate(event.event_date) }}
                      </span>
                    </div>

                    <h2 class="font-weight-bold text-white mb-3 text-truncate-2 title-heading">
                      {{ event.name }}
                    </h2>

                    <p v-if="event.description" class="text-white-70 mb-4 text-truncate-3 description-paragraph">
                      {{ event.description }}
                    </p>

                    <div class="d-flex flex-column gap-2 text-white-80 mb-6 info-items-container">
                      <div v-if="event.time_start" class="d-flex align-center info-item">
                        <v-icon :size="isWidescreen ? 24 : 16" class="mr-2" color="white">mdi-clock-outline</v-icon>
                        {{ formatEventTime(event.time_start) }}
                      </div>
                      <div v-if="event.location" class="d-flex align-center info-item">
                        <v-icon :size="isWidescreen ? 24 : 16" class="mr-2" color="white">mdi-map-marker-outline</v-icon>
                        {{ event.location }}
                      </div>
                    </div>

                    <v-btn
                      v-if="!isWidescreen"
                      color="white"
                      variant="elevated"
                      class="text-none font-weight-bold"
                      style="color: #041845 !important;"
                      @click.stop="goToEvent(event.slug_name)"
                    >
                      Más Información
                    </v-btn>
                  </div>
                </div>
              </div>
            </v-carousel-item>
          </v-carousel>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { fetchCarouselEvents } from '~/utils/calendarApi'
import { classificationColor } from '~/constants/classifications'
import { formatEventTime, formatEventDate } from '~/constants/dates'

const route = useRoute()
const router = useRouter()
const runtimeConfig = useRuntimeConfig()

const pageContainer = ref(null)
const events = ref([])
const loadingEvents = ref(false)
const activeSlide = ref(0)
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
  
  // Try to go browser fullscreen for the best cafeteria experience
  const docEl = document.documentElement
  if (docEl.requestFullscreen) {
    docEl.requestFullscreen()
  } else if (docEl.mozRequestFullScreen) { /* Firefox */
    docEl.mozRequestFullScreen()
  } else if (docEl.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    docEl.webkitRequestFullscreen()
  } else if (docEl.msRequestFullscreen) { /* IE/Edge */
    docEl.msRequestFullscreen()
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

.carousel-container-wrapper {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.normal-carousel {
  max-width: 100%;
}

.widescreen-carousel {
  border-radius: 0 !important;
}

/* Exit button floating top-right */
.exit-fullscreen-btn {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 100000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.2s ease;
  background-color: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.exit-fullscreen-btn:hover {
  transform: scale(1.1);
  background-color: rgba(239, 83, 80, 0.8) !important; /* light red tint */
}

/* Show the close button when mouse is moving */
.exit-fullscreen-btn.show-controls {
  opacity: 1;
  pointer-events: auto;
}

/* Carousel item contents */
.carousel-item-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.blur-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(30px) brightness(0.3);
  transform: scale(1.15);
  z-index: 1;
}

.content-overlay {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 40px;
  gap: 40px;
  background: rgba(4, 24, 69, 0.4);
}

.event-image-container {
  flex: 1 1 45%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.event-flyer {
  max-width: 100%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease;
}

.event-flyer-placeholder {
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  max-width: 320px;
  max-height: 320px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed rgba(255, 255, 255, 0.3);
}

.event-details-panel {
  flex: 1 1 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  min-width: 0;
  padding-right: 20px;
}

.text-white-50 {
  color: rgba(255, 255, 255, 0.6) !important;
}

.text-white-70 {
  color: rgba(255, 255, 255, 0.7) !important;
}

.text-white-80 {
  color: rgba(255, 255, 255, 0.8) !important;
}

.gap-2 {
  gap: 8px;
}

.text-truncate-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-truncate-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Base values for fonts */
.title-heading {
  font-size: 2.5rem;
  line-height: 1.2;
}

.description-paragraph {
  font-size: 1.1rem;
  line-height: 1.6;
}

.date-span {
  font-size: 0.95rem;
}

.info-item {
  font-size: 1.05rem;
}

/* Widescreen adaptations */
.widescreen-active .content-overlay {
  padding: 60px 80px;
  gap: 60px;
  background: rgba(4, 24, 69, 0.2);
}

.widescreen-active .event-flyer {
  max-height: 95%;
  border-radius: 20px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
}

.widescreen-active .title-heading {
  font-size: 4rem;
  margin-bottom: 24px !important;
}

.widescreen-active .description-paragraph {
  font-size: 1.6rem;
  margin-bottom: 32px !important;
  -webkit-line-clamp: 4;
}

.widescreen-active .date-span {
  font-size: 1.4rem;
}

.widescreen-active .info-item {
  font-size: 1.5rem;
  margin-bottom: 12px;
}

.widescreen-active .info-items-container {
  gap: 16px;
}

.widescreen-active .tag-date-row {
  margin-bottom: 16px !important;
}

@media (max-width: 768px) {
  .content-overlay {
    flex-direction: column;
    padding: 24px;
    gap: 20px;
  }
  
  .event-image-container {
    flex: 1 1 40%;
    width: 100%;
  }
  
  .event-details-panel {
    flex: 1 1 60%;
    align-items: center;
    text-align: center;
    padding-right: 0;
  }
  
  .event-details-panel .text-truncate-3 {
    -webkit-line-clamp: 2;
  }
  
  .event-details-panel .d-flex {
    justify-content: center;
  }
  
  .widescreen-active .title-heading {
    font-size: 2.2rem;
  }
  
  .widescreen-active .description-paragraph {
    font-size: 1.1rem;
  }
}
</style>
