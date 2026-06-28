<template>
  <v-app>
    <AppNavBar :menu-items="menuItems" @toggle-drawer="drawer = !drawer" />
    <MobileNavDrawer v-model="drawer" :menu-items="menuItems" />

    <v-main class="bg-grey-lighten-4">
      <v-container class="py-2">

        <!-- Page title -->
        <v-row justify="center" dense>
          <v-col cols="12" md="10" lg="8" class="text-center py-1">
            <p class="text-overline my-0" style="color: #666; letter-spacing: 2px;">ACOMPAÑANOS</p>
            <h1 class="text-h3 font-weight-light my-0" style="color: #041845;">Eventos</h1>
          </v-col>
        </v-row>

        <!-- View toggle -->
        <v-row justify="center" class="mb-0" dense>
          <v-col cols="12" md="10" lg="8" class="py-0">
            <div class="view-toggle-bar">
              <button
                class="view-toggle-btn"
                :class="{ active: viewMode === 'list' }"
                @click="switchToList"
              >
                <v-icon size="18" class="mr-1">mdi-format-list-bulleted</v-icon>
                Listado
              </button>
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
                :class="{ active: viewMode === 'search' }"
                @click="switchToSearch"
              >
                <v-icon size="18" class="mr-1">mdi-magnify</v-icon>
                Búsqueda
              </button>
            </div>
          </v-col>
        </v-row>

        <!-- Search bar -->
        <v-row v-if="viewMode === 'search'" justify="center" class="mt-3" dense>
          <v-col cols="12" md="10" lg="8">
            <v-text-field
              v-model="searchQuery"
              placeholder="Buscar próximos eventos..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="comfortable"
              clearable
              hide-details
              bg-color="white"
              @input="onSearchInput"
              @click:clear="onSearchClear"
            />
          </v-col>
        </v-row>

        <!-- Loading -->
        <v-row v-if="loadingEvents" justify="center" dense>
          <v-col cols="12" class="text-center py-0">
            <v-progress-circular indeterminate color="#041845" size="48" />
          </v-col>
        </v-row>

        <template v-else>

          <!-- Floating Month Selector for List View -->
          <CalendarMonthSelector
            v-if="viewMode === 'list'"
            :cal-year="calYear"
            :cal-month="calMonth"
            @prev="prevMonth"
            @next="nextMonth"
          />

          <CalendarView
            v-if="viewMode === 'calendar'"
            :cal-year="calYear"
            :cal-month="calMonth"
            :events="events"
            :week-starts-on-monday="WEEK_STARTS_ON_MONDAY"
            @prev-month="prevMonth"
            @next-month="nextMonth"
          />

          <CalendarListView
            v-if="viewMode === 'list'"
            :events="events"
            :cal-year="calYear"
            :cal-month="calMonth"
          />

          <CalendarListView
            v-if="viewMode === 'search'"
            :events="searchResults"
            :cal-year="calYear"
            :cal-month="calMonth"
            :is-search="true"
          />

          <!-- Floating Month Selector for List View -->
         <CalendarMonthSelector
            v-if="viewMode === 'list'"
            :cal-year="calYear"
            :cal-month="calMonth"
            @prev="prevMonth"
            @next="nextMonth"
          />

        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { monthNames, WEEK_STARTS_ON_MONDAY } from '~/constants/dates'

// Native debounce — avoids lodash-es dependency
const debounce = (fn, delay) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

const drawer      = ref(false)
const viewMode    = ref('list')
const router      = useRouter()
const runtimeConfig = useRuntimeConfig()

const events        = ref([])
const loadingEvents = ref(false)
const searchQuery   = ref('')
const searchResults = ref([])

// ── Calendar nav state ────────────────────────────────────────────────────
const today    = new Date()
const calYear  = ref(today.getFullYear())
const calMonth = ref(today.getMonth()) // 0-indexed

// ── Helpers ───────────────────────────────────────────────────────────────
const encodeBase64 = (str) => {
  if (!str) return null
  try { return btoa(unescape(encodeURIComponent(str))) }
  catch (e) {
    try { return Buffer.from(str, 'utf-8').toString('base64') }
    catch { return null }
  }
}

// Converts JS getDay() (0=Sun … 6=Sat) to a 0-based grid column
// depending on the WEEK_STARTS_ON_MONDAY flag.
const toWeekColumn = (jsDay) => WEEK_STARTS_ON_MONDAY
  ? (jsDay + 6) % 7   // Mon=0 … Sun=6
  : jsDay              // Sun=0 … Sat=6

const buildDateRange = () => {
  // start_date: first visible cell
  const firstCol      = toWeekColumn(new Date(calYear.value, calMonth.value, 1).getDay())
  const prevMonth     = calMonth.value === 0 ? 11 : calMonth.value - 1
  const prevYear      = calMonth.value === 0 ? calYear.value - 1 : calYear.value
  const daysInPrev    = new Date(prevYear, prevMonth + 1, 0).getDate()
  const firstVisDay   = firstCol === 0 ? 1 : daysInPrev - (firstCol - 1)
  const firstVisMon   = firstCol === 0 ? calMonth.value : prevMonth
  const firstVisYear  = firstCol === 0 ? calYear.value  : prevYear
  const start_date    = `${firstVisYear}-${String(firstVisMon + 1).padStart(2,'0')}-${String(firstVisDay).padStart(2,'0')}`

  // end_date: last visible cell (trailing days fill the row to column 6)
  const daysInMonth = new Date(calYear.value, calMonth.value + 1, 0).getDate()
  const lastCol     = toWeekColumn(new Date(calYear.value, calMonth.value, daysInMonth).getDay())
  const trailing    = lastCol < 6 ? 6 - lastCol : 0
  const endObj      = new Date(calYear.value, calMonth.value, daysInMonth + trailing)
  const end_date    = `${endObj.getFullYear()}-${String(endObj.getMonth() + 1).padStart(2,'0')}-${String(endObj.getDate()).padStart(2,'0')}`

  return { start_date, end_date }
}

const normalizeEventDates = (event) => ({
  ...event,
  start_date: event.start_date ?? event.publish_date ?? null,
  end_date: event.end_date ?? event.event_date ?? null,
  publish_date: event.publish_date ?? event.start_date ?? null,
  event_date: event.event_date ?? event.end_date ?? null,
})

const fetchPublicEvents = async () => {
  const encoded = encodeBase64(runtimeConfig.public.ORG_ID)
  if (!encoded) return

  const base = runtimeConfig.public.API_URL.replace(/\/$/, '')
  const { start_date, end_date } = buildDateRange()
  const url = `${base}/church-event/public?org_id=${encodeURIComponent(encoded)}&start_date=${start_date}&end_date=${end_date}`

  loadingEvents.value = true
  try {
    const res = await axios.get(url)
    if (res?.status === 200 && res.data) {
      const data = Array.isArray(res.data) ? res.data : (res.data.data ?? [])
      events.value = data.map(normalizeEventDates)
    }
  } catch (err) {
    console.error('Error fetching events:', err)
  } finally {
    loadingEvents.value = false
  }
}

const fetchSearchEvents = async (query) => {
  if (!query || !query.trim()) {
    searchResults.value = []
    return
  }

  const encoded = encodeBase64(runtimeConfig.public.ORG_ID)
  if (!encoded) return

  const base = runtimeConfig.public.API_URL.replace(/\/$/, '')
  const url = `${base}/church-event/public?org_id=${encodeURIComponent(encoded)}&search=${encodeURIComponent(query.trim())}`

  loadingEvents.value = true
  try {
    const res = await axios.get(url)
    if (res?.status === 200 && res.data) {
      const data = Array.isArray(res.data) ? res.data : (res.data.data ?? [])
      searchResults.value = data.map(normalizeEventDates)
    }
  } catch (err) {
    console.error('Error fetching search events:', err)
    searchResults.value = []
  } finally {
    loadingEvents.value = false
  }
}

const debouncedSearch = debounce((query) => {
  fetchSearchEvents(query)
}, 400)

const onSearchInput = () => {
  debouncedSearch(searchQuery.value)
}

const onSearchClear = () => {
  searchQuery.value = ''
  searchResults.value = []
}

// ── Navigation ────────────────────────────────────────────────────────────
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

const switchToList = () => {
  viewMode.value = 'list'
  if (!events.value.length) fetchPublicEvents()
}

const switchToSearch = () => {
  viewMode.value = 'search'
}

onMounted(() => fetchPublicEvents())

// ── Nav ───────────────────────────────────────────────────────────────────
const menuItems = [
  { title: 'Inicio',      to: '/' },
  { title: 'Testimonios', to: '/testimonios' },
  { title: 'Ministerios', to: '/ministerios' },
  { title: 'Horarios',    onClick: () => goToSection('/#horarios') },
  { title: 'Ubicación',   onClick: () => goToSection('/#ubicacion') },
]
const goToSection = (path) => { drawer.value = false; router.push(path) }

useHead({
  title: 'Eventos | Iglesia Avivamiento Monterrey',
  meta: [{ name: 'description', content: 'Descubre los próximos eventos y actividades especiales de la Iglesia Avivamiento Monterrey.' }]
})
</script>

<style scoped>
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
  padding: 0px 20px;
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
.view-toggle-btn:hover  { color: #041845; }
.view-toggle-btn.active { color: #041845; border-bottom: 2px solid #041845; font-weight: 600; }
</style>
