<template>
  <!-- Empty state -->
  <v-row v-if="!filteredEvents.length" justify="center">
    <v-col cols="12" md="8" class="text-center py-8">
      <v-icon size="48" color="#ccc" class="mb-4">mdi-calendar-blank-outline</v-icon>
      <p class="text-body-1" style="color: #666;">No hay eventos próximos por el momento.</p>
    </v-col>
  </v-row>

  <!-- Event cards -->
  <v-row v-else justify="center">
    <v-col
      v-for="(event, i) in filteredEvents"
      :key="event.id ?? i"
      cols="12" md="6" lg="5"
    >
      <v-card
        elevation="0"
        class="event-card"
        style="border: 1px solid #e0e0e0; height: 100%;"
        role="link"
        tabindex="0"
        @click="goToEvent(event)"
        @keydown.enter="goToEvent(event)"
        @keydown.space.prevent="goToEvent(event)"
      >
        <CalendarBlurImage
          v-if="event.url_image_s3"
          :src="event.url_image_s3"
          :height="220"
        />
        <v-card-text class="pa-4">
          <div class="d-flex align-center justify-space-between mb-1">
            <h3 class="text-h6 font-weight-regular" style="color: #041845;">
              {{ event.name }}
            </h3>
            <v-chip
              v-if="event.classification"
              size="x-small"
              :color="classificationColor(event.classification)"
              variant="flat"
              class="text-white ml-2"
              style="flex-shrink:0;"
            >{{ event.classification }}</v-chip>
          </div>
          <p v-if="event.description" class="text-body-2 mb-2" style="color: #555; line-height: 1.6;">
            {{ event.description }}
          </p>
          <div class="d-flex align-center flex-wrap mb-1" style="gap: 16px;">
            <span class="d-flex align-center" style="color: #666;">
              <v-icon size="14" class="mr-1">mdi-calendar</v-icon>
              <span class="text-caption">{{ formatEventDate(event.event_date ?? event.end_date ?? event.start_date ?? event.publish_date) }}</span>
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
          <v-divider class="mb-2" />
          <SocialShareButtons
            :title="event.name"
            :text="event.description"
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
const router = useRouter()

const props = defineProps({
  events:   { type: Array,  default: () => [] },
  calYear:  { type: Number, default: () => new Date().getFullYear() },
  calMonth: { type: Number, default: () => new Date().getMonth() },
})

const filteredEvents = computed(() =>
  props.events.filter(event => {
    const raw = event.event_date ?? event.end_date ?? event.start_date ?? event.publish_date
    if (!raw) return false
    const dt = new Date(raw)
    return dt.getFullYear() === props.calYear && dt.getMonth() === props.calMonth
  })
)

const classificationColor = (value) => {
  const map = {
    'jv3s':        '#f97316',
    'general':     '#9e9e9e',
    'jv3s-teen':   '#2196f3',
    'jv3s-legado': '#f44336',
  }
  return map[value] || '#041845'
}

const monthNames = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
]

const formatEventDate = (d) => {
  if (!d) return 'Fecha por confirmar'
  try {
    const dt = new Date(d)
    return `${dt.getDate()} de ${monthNames[dt.getMonth()]} ${dt.getFullYear()}`
  } catch { return d }
}

const goToEvent = (event) => {
  if (!event?.slug_name) return
  router.push(`/calendar/${event.slug_name}`)
}
</script>

<style scoped>
.event-card {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.event-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.10);
}
</style>
