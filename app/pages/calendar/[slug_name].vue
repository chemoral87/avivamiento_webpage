<template>
  <v-app>
    <AppNavBar :menu-items="menuItems" @toggle-drawer="drawer = !drawer" />
    <MobileNavDrawer v-model="drawer" :menu-items="menuItems" />

    <v-main class="bg-grey-lighten-4">
      <v-container class="py-6">
        <v-row v-if="pending" justify="center">
          <v-col cols="12" class="text-center py-8">
            <v-progress-circular indeterminate color="#041845" size="48" />
          </v-col>
        </v-row>

        <v-row v-else-if="event" justify="center">
          <v-col cols="12">  <v-btn
                    variant="outlined"
                    color="#041845"
                    prepend-icon="mdi-arrow-left"
                    @click="router.push('/calendar')"
                  >
                    Ver todos los eventos
                  </v-btn></v-col>
          <v-col cols="12" md="10" lg="8">
            <v-card elevation="0" style="border: 1px solid #e0e0e0; overflow: hidden;">
              <CalendarBlurImage v-if="event.url_image_s3" :src="event.url_image_s3" :height="360" />
              <v-card-text class="pa-5">
             

                <h1 class="text-h4 font-weight-light mb-3" style="color: #041845;">
                  {{ event.name }}
                </h1>

                <div class="d-flex align-center flex-wrap mb-3" style="gap: 18px; color: #666;">
                  <span class="d-flex align-center">
                    <v-icon size="16" class="mr-1">mdi-calendar</v-icon>
                    <span class="text-body-2">{{ formatEventDate(event.event_date ?? event.end_date ?? event.start_date ?? event.publish_date) }}</span>
                  </span>
                  <span v-if="event.time_start" class="d-flex align-center">
                    <v-icon size="16" class="mr-1">mdi-clock-outline</v-icon>
                    <span class="text-body-2">{{ formatEventTime(event.time_start) }}</span>
                  </span>
                  <span v-if="event.location" class="d-flex align-center">
                    <v-icon size="16" class="mr-1">mdi-map-marker-outline</v-icon>
                    <span class="text-body-2">{{ event.location }}</span>
                  </span>
                </div>

                <p v-if="event.description" class="text-body-1 mb-4" style="color: #444; line-height: 1.7;">
                  {{ event.description }}
                </p>

                   <v-chip
                  v-if="event.classification"
                  size="small"
                  :color="classificationColor(event.classification)"
                  variant="flat"
                  class="text-white mb-3"
                >{{ event.classification }}</v-chip>

                <div class="d-flex justify-center align-center flex-wrap" style="gap: 16px;">
                
                  <SocialShareButtons
                    :title="event.name"
                    :text="event.description"
                    :date="formatEventDate(event.event_date ?? event.end_date ?? event.start_date ?? event.publish_date)"
                    :time="event.time_start ? formatEventTime(event.time_start) : ''"
                    :url="`https://avivamientomonterrey.com/calendar/${event.slug_name}`"
                  />
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-else justify="center">
          <v-col cols="12" md="8" class="text-center py-8">
            <v-icon size="48" color="#ccc" class="mb-4">mdi-calendar-alert-outline</v-icon>
            <p class="text-body-1" style="color: #666;">Evento no encontrado.</p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed, ref } from 'vue'
import { classificationColor } from '~/constants/classifications'
import { monthNames, formatEventTime } from '~/constants/dates'

const route = useRoute()
const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const drawer = ref(false)

const encodeBase64 = (str) => {
  if (!str) return null
  try { return btoa(unescape(encodeURIComponent(str))) }
  catch (e) {
    try { return Buffer.from(str, 'utf-8').toString('base64') }
    catch { return null }
  }
}

const normalizeEventDates = (event) => event ? ({
  ...event,
  start_date: event.start_date ?? event.publish_date ?? null,
  end_date: event.end_date ?? event.event_date ?? null,
  publish_date: event.publish_date ?? event.start_date ?? null,
  event_date: event.event_date ?? event.end_date ?? null,
}) : null

const slugName = computed(() => String(route.params.slug_name ?? ''))

const { data, pending } = await useAsyncData(
  'calendar-event-detail',
  async () => {
    const encoded = encodeBase64(runtimeConfig.public.ORG_ID)
    if (!encoded || !slugName.value) return null

    const base = (runtimeConfig.public.API_URL || 'http://localhost:8001/api').replace(/\/$/, '')
    const response = await $fetch(`${base}/church-event/public`, {
      query: {
        org_id: encoded,
        slug_name: slugName.value,
      },
    })
    const event = Array.isArray(response) ? response[0] : (response?.data ?? response)
    return normalizeEventDates(Array.isArray(event) ? event[0] : event)
  },
  { watch: [slugName] }
)

const event = computed(() => data.value)

const formatEventDate = (d) => {
  if (!d) return 'Fecha por confirmar'
  try {
    const dt = new Date(d)
    return `${dt.getDate()} de ${monthNames[dt.getMonth()]} ${dt.getFullYear()}`
  } catch { return d }
}

const menuItems = [
  { title: 'Inicio', to: '/' },
  { title: 'Testimonios', to: '/testimonios' },
  { title: 'Ministerios', to: '/ministerios' },
  { title: 'Horarios', onClick: () => goToSection('/#horarios') },
  { title: 'Ubicación', onClick: () => goToSection('/#ubicacion') },
]
const goToSection = (path) => { drawer.value = false; router.push(path) }

useHead(() => ({
  title: event.value?.name ? `${event.value.name} | Iglesia Avivamiento Monterrey` : 'Evento | Iglesia Avivamiento Monterrey',
  meta: [
    { name: 'description', content: event.value?.description || 'Detalles del evento de Iglesia Avivamiento Monterrey.' },
    { property: 'og:title', content: event.value?.name ? `${event.value.name} | Iglesia Avivamiento Monterrey` : 'Iglesia Avivamiento Monterrey' },
    { property: 'og:description', content: event.value?.description || 'Detalles del evento de Iglesia Avivamiento Monterrey.' },
    { property: 'og:image', content: event.value?.url_image_s3 || 'https://avivamientomonterrey.com/og-default.jpg' },
    { property: 'og:url', content: `https://avivamientomonterrey.com/calendar/${slugName.value}` },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: event.value?.name || 'Iglesia Avivamiento Monterrey' },
    { name: 'twitter:description', content: event.value?.description || 'Detalles del evento de Iglesia Avivamiento Monterrey.' },
    { name: 'twitter:image', content: event.value?.url_image_s3 || 'https://avivamientomonterrey.com/og-default.jpg' },
  ]
}))
</script>

<style scoped>
</style>
