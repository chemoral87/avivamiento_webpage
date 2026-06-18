<template>
  <v-app>
    <AppNavBar :menu-items="menuItems" @toggle-drawer="drawer = !drawer" />
    <MobileNavDrawer v-model="drawer" :menu-items="menuItems" />

    <v-main class="bg-grey-lighten-4">
      <v-container class="py-4">

        <!-- Page title -->
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8" class="text-center">
            <p class="text-overline mb-2" style="color: #666; letter-spacing: 2px;">ACOMPAÑANOS</p>
            <h1 class="text-h3 font-weight-light mb-4" style="color: #041845;">Eventos</h1>
          </v-col>
        </v-row>

        <!-- View tabs -->
        <v-row justify="center" class="mb-4">
          <v-col cols="12" md="10" lg="8">
            <div class="view-toggle-bar">
              <button
                class="view-toggle-btn"
                :class="{ active: viewMode === 'calendar' }"
                @click="viewMode = 'calendar'"
              >
                <v-icon size="18" class="mr-1">mdi-calendar-month</v-icon>
                Calendario
              </button>
              <button
                class="view-toggle-btn"
                :class="{ active: viewMode === 'list' }"
                @click="switchToList"
              >
                <v-icon size="18" class="mr-1">mdi-format-list-bulleted</v-icon>
                Listado
              </button>
            </div>
          </v-col>
        </v-row>

        <!-- Loading -->
        <v-row v-if="loadingEvents" justify="center">
          <v-col cols="12" class="text-center py-8">
            <v-progress-circular indeterminate color="#041845" size="48" />
          </v-col>
        </v-row>

        <template v-else>

          <!-- ══════════════════════════════════════════
               CALENDAR VIEW
          ══════════════════════════════════════════ -->
          <template v-if="viewMode === 'calendar'">
            <v-row justify="center" class="mb-2">
              <v-col cols="12" md="10" lg="9">
                <v-card elevation="0" style="border: 1px solid #e0e0e0;">

                  <!-- Month nav header -->
                  <div class="d-flex align-center justify-space-between px-4 py-2" style="background:#041845;">
                    <v-btn icon variant="text" size="small" @click="prevMonth">
                      <v-icon color="white">mdi-chevron-left</v-icon>
                    </v-btn>
                    <span class="text-body-1 font-weight-medium text-white text-capitalize">
                      {{ monthNames[calMonth] }} {{ calYear }}
                    </span>
                    <v-btn icon variant="text" size="small" @click="nextMonth">
                      <v-icon color="white">mdi-chevron-right</v-icon>
                    </v-btn>
                  </div>

                  <!-- Day-of-week headers -->
                  <div class="big-cal-grid px-2 pt-2">
                    <div
                      v-for="d in ['Do','Lu','Ma','Mi','Ju','Vi','Sá']"
                      :key="d"
                      class="big-cal-header text-caption font-weight-medium"
                      style="color:#888;"
                    >{{ d }}</div>

                    <!-- Leading days from previous month -->
                    <div
                      v-for="cell in calLeadingCells"
                      :key="cell.iso"
                      class="big-cal-cell big-cal-other-month"
                    >
                      <div class="big-cal-day-number text-caption">{{ cell.day }}</div>
                      <template v-for="ev in cell.events" :key="ev.id">
                        <div class="event-pill text-caption" :title="ev.name">
                          <span v-if="ev.time_start" class="event-pill-time">{{ ev.time_start }}</span>
                          <span class="event-pill-name">{{ ev.name }}</span>
                        </div>
                      </template>
                    </div>

                    <!-- Day cells -->
                    <div
                      v-for="cell in calCells"
                      :key="cell.iso"
                      class="big-cal-cell"
                      :class="{
                        'big-cal-today': cell.isToday,
                        'big-cal-other-month': cell.otherMonth
                      }"
                    >
                      <div class="big-cal-day-number text-caption" :class="{ 'today-badge': cell.isToday }">
                        {{ cell.day }}
                      </div>
                      <!-- Event pills -->
                      <template v-for="ev in cell.events" :key="ev.id">
                        <div class="event-pill text-caption" :title="ev.name">
                          <span v-if="ev.time_start" class="event-pill-time">{{ ev.time_start }}</span>
                          <span class="event-pill-name">{{ ev.name }}</span>
                        </div>
                      </template>
                    </div>
                  </div>

                  <!-- Legend -->
                  <div class="d-flex align-center px-4 pb-3 pt-1" style="gap:8px;">
                    <span class="event-legend-dot"></span>
                    <span class="text-caption" style="color:#666;">Evento</span>
                  </div>

                </v-card>
              </v-col>
            </v-row>
          </template>

          <!-- ══════════════════════════════════════════
               LIST VIEW
          ══════════════════════════════════════════ -->
          <template v-if="viewMode === 'list'">
            <v-row v-if="!events.length" justify="center">
              <v-col cols="12" md="8" class="text-center py-8">
                <v-icon size="48" color="#ccc" class="mb-4">mdi-calendar-blank-outline</v-icon>
                <p class="text-body-1" style="color: #666;">No hay eventos próximos por el momento.</p>
              </v-col>
            </v-row>

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
                        @click="shareOnFacebook(event.name)"
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

        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const drawer   = ref(false)
const viewMode = ref('calendar') // 'calendar' | 'list'
const router   = useRouter()
const runtimeConfig = useRuntimeConfig()
const loginRoute    = runtimeConfig.public.loginRoute

// ── Data ──────────────────────────────────────────────────────────────────
const events       = ref([])
const loadingEvents = ref(false)

const encodeBase64 = (str) => {
  if (!str) return null
  try { return btoa(unescape(encodeURIComponent(str))) }
  catch (e) {
    try { return Buffer.from(str, 'utf-8').toString('base64') }
    catch { return null }
  }
}

const fetchPublicEvents = async () => {
  const encoded = encodeBase64(runtimeConfig.public.ORG_ID)
  if (!encoded) return
  const base = runtimeConfig.public.API_URL.replace(/\/$/, '')

  // start_date = first visible cell (leading prev-month day, or 1st of current month)
  const firstDayOfWeek    = new Date(calYear.value, calMonth.value, 1).getDay()
  const prevMonth         = calMonth.value === 0 ? 11 : calMonth.value - 1
  const prevYear          = calMonth.value === 0 ? calYear.value - 1 : calYear.value
  const daysInPrevMonth   = new Date(prevYear, prevMonth + 1, 0).getDate()
  const firstVisibleDay   = firstDayOfWeek === 0
    ? 1                                          // no leading cells, starts on the 1st
    : daysInPrevMonth - (firstDayOfWeek - 1)    // first day of prev-month shown
  const firstVisibleMonth = firstDayOfWeek === 0 ? calMonth.value : prevMonth
  const firstVisibleYear  = firstDayOfWeek === 0 ? calYear.value  : prevYear
  const start_date = `${firstVisibleYear}-${String(firstVisibleMonth + 1).padStart(2,'0')}-${String(firstVisibleDay).padStart(2,'0')}`

  // end_date = last Saturday visible (trailing next-month days)
  const daysInMonth    = new Date(calYear.value, calMonth.value + 1, 0).getDate()
  const lastDayOfWeek  = new Date(calYear.value, calMonth.value, daysInMonth).getDay()
  const trailingDays   = lastDayOfWeek < 6 ? 6 - lastDayOfWeek : 0
  const endDateObj     = new Date(calYear.value, calMonth.value, daysInMonth + trailingDays)
  const end_date       = `${endDateObj.getFullYear()}-${String(endDateObj.getMonth() + 1).padStart(2,'0')}-${String(endDateObj.getDate()).padStart(2,'0')}`

  const url = `${base}/church-event/public?org_id=${encodeURIComponent(encoded)}&start_date=${start_date}&end_date=${end_date}`
  loadingEvents.value = true
  try {
    const res = await axios.get(url)
    if (res?.status === 200 && res.data)
      events.value = Array.isArray(res.data) ? res.data : (res.data.data ?? [])
  } catch (err) {
    console.error('Error fetching events:', err)
  } finally {
    loadingEvents.value = false
  }
}

onMounted(() => fetchPublicEvents())

const switchToList = () => {
  viewMode.value = 'list'
  if (!events.value.length) fetchPublicEvents()
}

// ── Calendar view state ───────────────────────────────────────────────────
const today    = new Date()
const calYear  = ref(today.getFullYear())
const calMonth = ref(today.getMonth()) // 0-indexed

const monthNames = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
]

const prevMonth = () => {
  if (calMonth.value === 0) { calMonth.value = 11; calYear.value-- }
  else calMonth.value--
  fetchPublicEvents()
}
const nextMonth = () => {
  if (calMonth.value === 11) { calMonth.value = 0; calYear.value++ }
  else calMonth.value++
  fetchPublicEvents()
}

// Map events by ISO date string for O(1) lookup
const eventsByDate = computed(() => {
  const map = {}
  events.value.forEach(e => {
    if (!e.start_date) return
    const key = e.start_date.slice(0, 10)
    if (!map[key]) map[key] = []
    map[key].push(e)
  })
  return map
})

const calLeadingCells = computed(() => {
  const firstDayOfWeek = new Date(calYear.value, calMonth.value, 1).getDay() // 0=Sun
  if (firstDayOfWeek === 0) return [] // starts on Sunday, no leading cells

  const prevMonth     = calMonth.value === 0 ? 11 : calMonth.value - 1
  const prevYear      = calMonth.value === 0 ? calYear.value - 1 : calYear.value
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate()

  const cells = []
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const d   = daysInPrevMonth - i
    const iso = `${prevYear}-${String(prevMonth + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
    cells.push({ day: d, iso, events: eventsByDate.value[iso] ?? [] })
  }
  return cells
})

const calCells = computed(() => {
  const daysInMonth = new Date(calYear.value, calMonth.value + 1, 0).getDate()
  const cells = []

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${calYear.value}-${String(calMonth.value + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
    cells.push({
      day:        d,
      iso,
      isToday:    calYear.value === today.getFullYear() &&
                  calMonth.value === today.getMonth() &&
                  d === today.getDate(),
      otherMonth: false,
      events:     eventsByDate.value[iso] ?? [],
    })
  }

  // Trailing days from next month to fill up to Saturday (day 6)
  const lastDayOfWeek = new Date(calYear.value, calMonth.value, daysInMonth).getDay()
  if (lastDayOfWeek < 6) {
    const nextMonth = calMonth.value === 11 ? 0 : calMonth.value + 1
    const nextYear  = calMonth.value === 11 ? calYear.value + 1 : calYear.value
    const daysToAdd = 6 - lastDayOfWeek
    for (let d = 1; d <= daysToAdd; d++) {
      const iso = `${nextYear}-${String(nextMonth + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
      cells.push({
        day:        d,
        iso,
        isToday:    false,
        otherMonth: true,
        events:     eventsByDate.value[iso] ?? [],
      })
    }
  }

  return cells
})

// ── Shared helpers ────────────────────────────────────────────────────────
const formatEventDate = (d) => {
  if (!d) return 'Fecha por confirmar'
  try {
    const dt = new Date(d)
    return `${dt.getDate()} de ${monthNames[dt.getMonth()]} ${dt.getFullYear()}`
  } catch { return d }
}

const menuItems = [
  { title: 'Inicio',       to: '/' },
  { title: 'Testimonios',  to: '/testimonios' },
  { title: 'Ministerios',  to: '/ministerios' },
  { title: 'Horarios',     onClick: () => goToSection('/#horarios') },
  { title: 'Ubicación',    onClick: () => goToSection('/#ubicacion') },
]

const goToSection = (path) => { drawer.value = false; router.push(path) }

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

useHead({
  title: 'Eventos | Iglesia Avivamiento Monterrey',
  meta: [{ name: 'description', content: 'Descubre los próximos eventos y actividades especiales de la Iglesia Avivamiento Monterrey.' }]
})
</script>

<style scoped>
/* ── View toggle (tab-style) ────────────────────── */
.view-toggle-bar {
  display: flex;
  justify-content: center;
  border-bottom: 2px solid #e0e0e0;
}
.view-toggle-btn {
  display: inline-flex;
  align-items: center;
  min-width: 140px;
  justify-content: center;
  padding: 10px 20px;
  font-size: 14px;
  font-family: inherit;
  color: #666;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;
  letter-spacing: 0.3px;
}
.view-toggle-btn:hover {
  color: #041845;
}
.view-toggle-btn.active {
  color: #041845;
  border-bottom: 2px solid #041845;
  font-weight: 600;
}

/* ── List view card ─────────────────────────────── */
.event-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.event-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.10);
}

/* ── Big calendar grid ──────────────────────────── */
.big-cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-top: 1px solid #f0f0f0;
}

.big-cal-header {
  padding: 6px 4px;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
}

.big-cal-cell {
  min-height: 80px;
  padding: 4px;
  border-right: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: top;
  overflow: hidden;
}
/* remove right border on last column */
.big-cal-cell:nth-child(7n) { border-right: none; }

.big-cal-today {
  background: #f5f7fc;
  box-shadow: inset 0 0 0 2px orange;
}

.big-cal-other-month .big-cal-day-number {
  color: #bbb;
}

.big-cal-day-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  margin-bottom: 2px;
  font-size: 11px;
  color: #444;
}
.today-badge {
  background: #041845;
  color: #fff !important;
  font-weight: 700;
}

/* Event pills inside calendar cells */
.event-pill {
  display: flex;
  align-items: center;
  gap: 3px;
  background: #041845;
  color: #fff;
  border-radius: 3px;
  padding: 1px 4px;
  margin-bottom: 2px;
  font-size: 10px;
  line-height: 1.4;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: default;
}
.event-pill-time {
  opacity: 0.75;
  flex-shrink: 0;
}
.event-pill-name {
  overflow: hidden;
  text-overflow: ellipsis;
}

.event-legend-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background: #041845;
  flex-shrink: 0;
}

/* Mobile: shrink cells */
@media (max-width: 600px) {
  .big-cal-cell {
    min-height: 52px;
    padding: 2px;
  }
  .event-pill {
    font-size: 9px;
    padding: 1px 2px;
  }
  .event-pill-time { display: none; }
}
</style>
