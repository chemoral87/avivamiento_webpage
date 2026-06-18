<template>
  <v-row justify="center" class="mb-2">
    <v-col cols="12" md="10" lg="9">
      <v-card elevation="0" style="border: 1px solid #e0e0e0;">

        <!-- Month nav header -->
        <div class="d-flex align-center justify-space-between px-4 py-2" style="background:#041845;">
          <v-btn icon variant="text" size="small" @click="emit('prev-month')">
            <v-icon color="white">mdi-chevron-left</v-icon>
          </v-btn>
          <span class="text-body-1 font-weight-medium text-white text-capitalize">
            {{ monthNames[calMonth] }} {{ calYear }}
          </span>
          <v-btn icon variant="text" size="small" @click="emit('next-month')">
            <v-icon color="white">mdi-chevron-right</v-icon>
          </v-btn>
        </div>

        <!-- Day-of-week headers -->
        <div class="big-cal-grid px-2 pt-2">
          <div
            v-for="d in ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']"
            :key="d"
            class="big-cal-header text-caption font-weight-bold"
            style="color:#444;"
          >{{ d }}</div>

          <!-- Leading days from previous month -->
          <div
            v-for="cell in leadingCells"
            :key="cell.iso"
            class="big-cal-cell big-cal-other-month"
          >
            <div class="big-cal-day-number text-caption">{{ cell.day }}</div>
            <template v-for="ev in cell.events" :key="ev.id">
              <div
                class="event-pill text-caption"
                :style="{ borderColor: classificationColor(ev.classification) }"
                :title="ev.name"
              >
                <span class="event-pill-name">{{ ev.name }}</span>
                <span v-if="ev.time_start" class="event-pill-time">{{ ev.time_start }}</span>
              </div>
            </template>
          </div>

          <!-- Current + trailing day cells -->
          <div
            v-for="cell in cells"
            :key="cell.iso"
            class="big-cal-cell"
            :class="{
              'big-cal-today':       cell.isToday,
              'big-cal-other-month': cell.otherMonth
            }"
          >
            <div class="big-cal-day-number font-weight-bold" :class="{ 'today-badge': cell.isToday }">
              {{ cell.day }}
            </div>
            <template v-for="ev in cell.events" :key="ev.id">
              <div
                class="event-pill text-caption"
                :style="{ borderColor: classificationColor(ev.classification) }"
                :title="ev.name"
              >
                <span class="event-pill-name">{{ ev.name }}</span>
                <span v-if="ev.time_start" class="event-pill-time">{{ ev.time_start }}</span>
              </div>
            </template>
          </div>
        </div>

        <!-- Legend -->
        <div class="d-flex align-center flex-wrap px-4 pb-3 pt-2" style="gap:12px;">
          <span
            v-for="cls in classifications"
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
import { computed } from 'vue'

const props = defineProps({
  calYear:  { type: Number, required: true },
  calMonth: { type: Number, required: true },
  events:   { type: Array,  default: () => [] },
})

const emit = defineEmits(['prev-month', 'next-month'])

const monthNames = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
]

const today = new Date()

// ── Classification ─────────────────────────────────────────────────────────
const classifications = [
  { value: 'jv3s',        label: 'JV3S',         hex: '#f97316' }, // orange
  { value: 'general',     label: 'General',       hex: '#9e9e9e' }, // grey
  { value: 'jv3s-teen',   label: 'JV3S Teen',     hex: '#2196f3' }, // blue
  { value: 'jv3s-legado', label: 'JV3S Legado',   hex: '#f44336' }, // red
]

const classificationColor = (value) => {
  const map = {
    'jv3s':        '#f97316',
    'general':     '#9e9e9e',
    'jv3s-teen':   '#2196f3',
    'jv3s-legado': '#f44336',
  }
  return map[value] || '#041845'
}

// ── Event map ──────────────────────────────────────────────────────────────
const eventsByDate = computed(() => {
  const map = {}
  props.events.forEach(e => {
    if (!e.start_date) return
    const key = e.start_date.slice(0, 10)
    if (!map[key]) map[key] = []
    map[key].push(e)
  })
  return map
})

// ── Leading cells (prev-month) ─────────────────────────────────────────────
const leadingCells = computed(() => {
  const firstDayOfWeek = new Date(props.calYear, props.calMonth, 1).getDay()
  if (firstDayOfWeek === 0) return []

  const prevMonth       = props.calMonth === 0 ? 11 : props.calMonth - 1
  const prevYear        = props.calMonth === 0 ? props.calYear - 1 : props.calYear
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate()

  return Array.from({ length: firstDayOfWeek }, (_, i) => {
    const d   = daysInPrevMonth - (firstDayOfWeek - 1 - i)
    const iso = `${prevYear}-${String(prevMonth + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
    return { day: d, iso, events: eventsByDate.value[iso] ?? [] }
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

  const lastDayOfWeek = new Date(props.calYear, props.calMonth, daysInMonth).getDay()
  if (lastDayOfWeek < 6) {
    const nextMonth = props.calMonth === 11 ? 0 : props.calMonth + 1
    const nextYear  = props.calMonth === 11 ? props.calYear + 1 : props.calYear
    for (let d = 1; d <= 6 - lastDayOfWeek; d++) {
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
  grid-template-columns: 0.6fr 0.6fr 1fr 1fr 1fr 0.6fr 0.6fr;
  grid-auto-rows: minmax(28px, auto);
  border-top: 1px solid #f0f0f0;
}
.big-cal-header {
  padding: 6px 4px;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
}
.big-cal-cell {
  min-height: 0;
  padding: 4px;
  border-right: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  overflow: hidden;
}
.big-cal-cell:nth-child(7n) { border-right: none; }

.big-cal-today {
  background: #f5f7fc;
  box-shadow: inset 0 0 0 2px orange;
}
.big-cal-other-month .big-cal-day-number { color: #bbb; }

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

/* Event pills — border only, color set via :style binding */
.event-pill {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: transparent;
  color: #333;
  border-radius: 3px;
  padding: 2px 4px;
  margin-bottom: 2px;
  font-size: 10px;
  line-height: 1.3;
  overflow: hidden;
  cursor: default;
  border-width: 3px;
  border-style: solid;
}
.event-pill-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  font-weight: 600;
}
.event-pill-time {
  font-size: 9px;
  opacity: 0.65;
}

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
  .big-cal-cell    { padding: 2px; }
  .event-pill      { font-size: 9px; padding: 1px 2px; }
  .event-pill-time { display: none; }
}
</style>
