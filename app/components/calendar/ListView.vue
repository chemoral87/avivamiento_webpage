<template>
  <!-- Empty state -->
  <v-row v-if="!events.length" justify="center">
    <v-col cols="12" md="8" class="text-center py-8">
      <v-icon size="48" color="#ccc" class="mb-4">mdi-calendar-blank-outline</v-icon>
      <p class="text-body-1" style="color: #666;">No hay eventos próximos por el momento.</p>
    </v-col>
  </v-row>

  <!-- Event cards -->
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
          <v-divider class="mb-2" />
          <div class="d-flex align-center" style="gap:4px;">
            <v-btn icon size="small" variant="text"
              @click="shareOnWhatsApp(event.name, event.description)"
              style="color:#25D366;">
              <v-icon>mdi-whatsapp</v-icon>
            </v-btn>
            <v-btn icon size="small" variant="text"
              @click="shareOnFacebook()"
              style="color:#1877F2;">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon size="small" variant="text"
              @click="shareGeneric(event.name, event.description)"
              style="color:#041845;">
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps({
  events: { type: Array, default: () => [] },
})

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

const shareOnWhatsApp = (name, desc) => {
  const url  = encodeURIComponent('https://avivamientomonterrey.com/calendar')
  const text = encodeURIComponent(`${name} - ${desc}\n\nMás información:`)
  window.open(`https://wa.me/?text=${text}%20${url}`, '_blank')
}
const shareOnFacebook = () => {
  const url = encodeURIComponent('https://avivamientomonterrey.com/calendar')
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}
const shareGeneric = (name, desc) => {
  if (navigator.share) {
    navigator.share({ title: name, text: desc, url: 'https://avivamientomonterrey.com/calendar' })
      .catch(() => {})
  } else {
    navigator.clipboard.writeText(`${name} - ${desc}\n\nhttps://avivamientomonterrey.com/calendar`)
      .then(() => alert('¡Enlace copiado al portapapeles!'))
  }
}
</script>

<style scoped>
.event-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.event-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.10);
}
</style>
