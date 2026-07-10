<template>
  <v-row id="calendar-view" dense justify="center" class="mb-2" >
    <v-col cols="12" md="12" lg="12">
      <v-card elevation="0" style="border: 1px solid #e0e0e0;">

        <!-- Month nav header -->
        <div class="d-flex align-center justify-space-between px-4 py-1" style="background:#041845;">
          <button class="month-nav-btn" aria-label="Mes anterior" @click="emit('prev-month')">
            <v-icon size="22">mdi-chevron-left</v-icon>
          </button>
          <span class="text-body-1 font-weight-medium text-white text-capitalize">
            {{ monthNames[calMonth] }} {{ calYear }}
          </span>
          <button class="month-nav-btn" aria-label="Mes siguiente" @click="emit('next-month')">
            <v-icon size="22">mdi-chevron-right</v-icon>
          </button>
        </div>

        <!-- Day-of-week headers -->
        <div class="big-cal-grid">
          <div
            v-for="d in currentWeekdayNames"
            :key="d"
            class="big-cal-header text-caption font-weight-bold"
            style="color:#444;"
          >{{ d }}</div>

          <!-- Leading days from previous month -->
          <CalendarDayCell
            v-for="cell in leadingCells"
            :key="cell.iso"
            :cell="cell"
            :selected-day-iso="selectedDayIso"
            @click-cell="selectDay"
            @click-event="goToEvent"
          />

          <!-- Current + trailing day cells -->
          <CalendarDayCell
            v-for="cell in cells"
            :key="cell.iso"
            :cell="cell"
            :selected-day-iso="selectedDayIso"
            @click-cell="selectDay"
            @click-event="goToEvent"
          />
        </div>

        <!-- Mobile: no-date hint -->
        <div v-if="!selectedDayIso" class="d-flex d-sm-none align-center justify-center px-4 py-3 mobile-hint" style="border-top:1px solid #f0f0f0;">
          <v-icon size="16" class="mr-1" style="color:#041845; opacity:0.6;">mdi-calendar-cursor</v-icon>
          <span class="text-caption" style="color:#555; text-align:center;">
            Seleccione una fecha con punto para ver los eventos
          </span>
        </div>

        <!-- Mobile: selected day events panel -->
        <div v-if="selectedDayEvents.length" class="d-flex d-sm-none flex-column px-3 pb-3 pt-2" style="gap:8px; border-top:1px solid #f0f0f0;">
          <MobileEventCard
            v-for="ev in selectedDayEvents"
            :key="ev.id"
            :event="ev"
            @click="goToEvent(ev)"
          />
        </div>

        <!-- Legend -->
        <div v-if="activeClassifications.length" class="d-flex align-center flex-wrap px-4 pb-3 pt-2" style="gap:12px;">
          <span
            v-for="cls in activeClassifications"
            :key="cls.value"
            class="d-flex align-center"
            style="gap:5px;"
          >
            <span class="legend-dot" :style="{ borderColor: cls.hex }"></span>
            <span class="text-caption" style="color:#555;">{{ cls.label }}</span>
          </span>
        </div>

      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, ref, onUnmounted } from 'vue'
import CalendarDayCell from '../CalendarDayCell.vue'
import MobileEventCard from './MobileEventCard.vue'
import { classifications, classificationColor } from '~/constants/classifications'
import { monthNames, weekdayNamesMondayFirst, weekdayNamesSundayFirst, formatEventTime, formatEventDate } from '~/constants/dates'

const router = useRouter()

const props = defineProps({
  calYear:            { type: Number,  required: true },
  calMonth:           { type: Number,  required: true },
  events:             { type: Array,   default: () => [] },
  // ── Week-start flag ───────────────────────────────────────────────────────
  // true  → week starts on Monday (Lun … Dom)
  // false → week starts on Sunday (Dom … Sáb)
  weekStartsOnMonday: { type: Boolean, default: true },
})

const emit = defineEmits(['prev-month', 'next-month'])

// ── Weekday header labels ──────────────────────────────────────────────────
const currentWeekdayNames = computed(() =>
  props.weekStartsOnMonday ? weekdayNamesMondayFirst : weekdayNamesSundayFirst
)

const today = new Date()
const selectedDayIso = ref(null)

const isMobile = ref(false)

const updateIsMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 600
  }
}

if (typeof window !== 'undefined') {
  updateIsMobile()
  window.addEventListener('resize', updateIsMobile)
  onUnmounted(() => window.removeEventListener('resize', updateIsMobile))
}

const selectDay = (cell) => {
  if (!isMobile.value) return
  if (!cell.events.length) {
    selectedDayIso.value = null
    return
  }
  selectedDayIso.value = selectedDayIso.value === cell.iso ? null : cell.iso
}

// ── Navigation ─────────────────────────────────────────────────────────────

const route = useRoute()

const goToEvent = (event) => {
console.log(event.slug_name)
  if (!event?.slug_name) return
  router.push({
    path: `/calendar/${event.slug_name}`,
    query: route.query
  })
}

// ── Active classifications (only those present in current events) ──────────
const activeClassifications = computed(() => {
  const usedValues = new Set(props.events.map(e => e.classification).filter(Boolean))
  return classifications.filter(cls => usedValues.has(cls.value))
})

// ── Event map ──────────────────────────────────────────────────────────────
const eventsByDate = computed(() => {
  const map = {}
  props.events.forEach(e => {
    const eventDate = e.event_date ?? e.end_date ?? e.start_date ?? e.publish_date
    if (!eventDate) return
    const key = eventDate.slice(0, 10)
    if (!map[key]) map[key] = []
    map[key].push(e)
  })
  return map
})

const selectedDayEvents = computed(() => {
  if (!selectedDayIso.value) return []
  return eventsByDate.value[selectedDayIso.value] ?? []
})

// ── Week-offset helper ─────────────────────────────────────────────────────
// Converts JS getDay() (0=Sun … 6=Sat) to a 0-based column index
// depending on whether the week starts on Monday or Sunday.
const toWeekColumn = (jsDay) => props.weekStartsOnMonday
  ? (jsDay + 6) % 7   // Mon=0 … Sun=6
  : jsDay              // Sun=0 … Sat=6

// ── Leading cells (prev-month) ─────────────────────────────────────────────
const leadingCells = computed(() => {
  const firstCol = toWeekColumn(new Date(props.calYear, props.calMonth, 1).getDay())
  if (firstCol === 0) return []

  const prevMonth       = props.calMonth === 0 ? 11 : props.calMonth - 1
  const prevYear        = props.calMonth === 0 ? props.calYear - 1 : props.calYear
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate()

  return Array.from({ length: firstCol }, (_, i) => {
    const d   = daysInPrevMonth - (firstCol - 1 - i)
    const iso = `${prevYear}-${String(prevMonth + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
    return {
      day: d,
      iso,
      isToday: false,
      otherMonth: true,
      events: eventsByDate.value[iso] ?? []
    }
  })
})

// ── Current + trailing cells ───────────────────────────────────────────────
const cells = computed(() => {
  const daysInMonth = new Date(props.calYear, props.calMonth + 1, 0).getDate()
  const result = []

  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${props.calYear}-${String(props.calMonth + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
    result.push({
      day:        d,
      iso,
      isToday:    props.calYear  === today.getFullYear() &&
                  props.calMonth === today.getMonth() &&
                  d === today.getDate(),
      otherMonth: false,
      events:     eventsByDate.value[iso] ?? [],
    })
  }

  const lastCol = toWeekColumn(new Date(props.calYear, props.calMonth, daysInMonth).getDay())
  if (lastCol < 6) {
    const nextMonth = props.calMonth === 11 ? 0 : props.calMonth + 1
    const nextYear  = props.calMonth === 11 ? props.calYear + 1 : props.calYear
    for (let d = 1; d <= 6 - lastCol; d++) {
      const iso = `${nextYear}-${String(nextMonth + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
      result.push({ day: d, iso, isToday: false, otherMonth: true, events: eventsByDate.value[iso] ?? [] })
    }
  }

  return result
})
</script>

<style scoped>
.big-cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 28px;
  grid-auto-rows: minmax(80px, auto);
  padding: 0;
  border-top: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;
}
.big-cal-header {
  padding: 3px 4px;
  line-height: 22px;
  text-align: center;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
.big-cal-cell {
  min-height: 0;
  padding: 4px;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
.big-cal-cell:nth-child(7n) { border-right: 1px solid #e0e0e0; }

/* Legend */
.legend-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  border: 2px solid;
  background: transparent;
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .big-cal-grid    { grid-template-columns: repeat(7, 1fr); grid-template-rows: 20px; grid-auto-rows: 40px; border-left: 1px solid #ddd; border-top: 1px solid #ddd; }
  .big-cal-header  { padding: 0; line-height: 20px; height: 20px; font-size: 10px; border-right: 1px solid #ddd; border-bottom: 1px solid #ddd; }
  .big-cal-cell    { padding: 1px; min-height: 0; cursor: pointer; border-right: 1px solid #ddd; border-bottom: 1px solid #ddd; }
  .big-cal-cell:nth-child(7n) { border-right: 1px solid #ddd; }
}

.month-nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.55);
  background: rgba(255, 255, 255, 0.10);
  color: #fff;
  cursor: pointer;
  transition: background 0.18s, border-color 0.18s, transform 0.12s;
}

.month-nav-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: #fff;
  transform: scale(1.08);
}

.month-nav-btn:active {
  transform: scale(0.95);
  background: rgba(255, 255, 255, 0.35);
}
</style>
