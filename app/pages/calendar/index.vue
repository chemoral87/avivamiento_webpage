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
            :loading="loadingEvents"
            :fetched="fetchedEvents"
          />

          <CalendarListView
            v-if="viewMode === 'search'"
            :events="searchResults"
            :cal-year="calYear"
            :cal-month="calMonth"
            :is-search="true"
            :loading="loadingEvents"
            :fetched="fetchedEvents"
          />

        </template>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { fetchPublicEvents, fetchSearchEvents } from '~/utils/calendarApi'

const route       = useRoute()
const router      = useRouter()
const drawer      = ref(false)
const viewMode    = ref(route.query.view || 'list')
const runtimeConfig = useRuntimeConfig()
const WEEK_STARTS_ON_MONDAY = true

// ── Calendar nav state ────────────────────────────────────────────────────
const today    = new Date()
const calYear  = ref(Number(route.query.year || today.getFullYear()))
const calMonth = ref(Number(route.query.month !== undefined ? route.query.month : today.getMonth()))

// ── SSR-safe initial fetch via useAsyncData ───────────────────────────────
// Runs on the server during SSR so events are in the initial HTML.
const { data: asyncEvents, pending, refresh } = await useAsyncData(
  'calendar-events',
  () => fetchPublicEvents({
    calYear:  calYear.value,
    calMonth: calMonth.value,
    orgId:    runtimeConfig.public.ORG_ID,
    apiUrl:   runtimeConfig.public.API_URL,
  }),
  { lazy: false }
)

const events        = computed(() => asyncEvents.value ?? [])
const loadingEvents = pending
const fetchedEvents = computed(() => !pending.value)

const searchQuery   = ref('')
const searchResults = ref([])

// ── Native debounce ──────────────────────────────────────────────────────
const debounce = (fn, delay) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

const _fetchSearchEvents = async (query) => {
  loadingEvents.value = true
  try {
    searchResults.value = await fetchSearchEvents({
      query,
      orgId:  runtimeConfig.public.ORG_ID,
      apiUrl: runtimeConfig.public.API_URL,
    })
  } catch (err) {
    console.error('Error fetching search events:', err)
    searchResults.value = []
  } finally {
    loadingEvents.value = false
  }
}

const debouncedSearch = debounce((query) => {
  _fetchSearchEvents(query)
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
}
const nextMonth = () => {
  if (calMonth.value === 11) { calMonth.value = 0; calYear.value++ }
  else calMonth.value++
}

const switchToList = () => {
  viewMode.value = 'list'
}

const switchToSearch = () => {
  viewMode.value = 'search'
}

// Re-fetch when month/year changes
watch([calYear, calMonth], () => {
  refresh()
})

// Sync state to route query
watch([viewMode, calYear, calMonth], ([newView, newYear, newMonth]) => {
  const queryView = route.query.view || 'list'
  const queryYear = Number(route.query.year || today.getFullYear())
  const queryMonth = Number(route.query.month !== undefined ? route.query.month : today.getMonth())

  if (newView !== queryView || newYear !== queryYear || newMonth !== queryMonth) {
    router.replace({
      query: {
        ...route.query,
        view: newView,
        year: newYear.toString(),
        month: newMonth.toString()
      }
    })
  }
})

// Sync route query to state (e.g. browser navigation)
watch(
  () => route.query,
  (newQuery) => {
    const queryView = newQuery.view || 'list'
    const queryYear = Number(newQuery.year || today.getFullYear())
    const queryMonth = Number(newQuery.month !== undefined ? newQuery.month : today.getMonth())

    if (viewMode.value !== queryView) {
      viewMode.value = queryView
    }
    if (calYear.value !== queryYear) {
      calYear.value = queryYear
    }
    if (calMonth.value !== queryMonth) {
      calMonth.value = queryMonth
    }
  },
  { deep: true }
)

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
