<template>
  <div
    class="event-info-box"
    :style="{
      padding: sizeStyles.padding,
      borderRadius: sizeStyles.borderRadius,
      gap: sizeStyles.gap,
      width: sizeStyles.width
    }"
  >
    <h2
      class="event-name"
      :style="{ fontSize: sizeStyles.nameSize }"
    >
      {{ event.name }}
    </h2>

    <p
      v-if="event.description"
      class="event-desc"
      :style="{ fontSize: sizeStyles.descSize }"
    >
      {{ event.description }}
    </p>

    <div class="info-top-row">
      <div v-if="formattedDateDisplay" class="dates-container">
        <span
          class="date-text"
          :style="{ fontSize: sizeStyles.dateSize }"
        >
          {{ formattedDateDisplay }}
        </span>
      </div>
    </div>

    <div
      class="meta-row"
      :style="{ gap: sizeStyles.gap }"
    >
      <span v-if="event.time_start" class="meta-item" :style="{ fontSize: sizeStyles.metaSize }">
        <v-icon :size="sizeStyles.iconSize" color="rgba(255,255,255,0.7)">mdi-clock-outline</v-icon>
        {{ formatEventTime(event.time_start) }}
      </span>
      <span v-if="event.location" class="meta-item" :style="{ fontSize: sizeStyles.metaSize }">
        <v-icon :size="sizeStyles.iconSize" color="rgba(255,255,255,0.7)">mdi-map-marker-outline</v-icon>
        {{ event.location }}
      </span>
      <v-chip
        v-if="event.classification"
        :size="sizeStyles.chipSize"
        :color="classificationColor(event.classification)"
        variant="flat"
        class="text-white font-weight-bold chip-label"
      >
        {{ classificationLabel(event.classification) }}
      </v-chip>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { classificationColor, classifications } from '~/constants/classifications'
import { formatEventTime, formatEventDate } from '~/constants/dates'

const classificationLabel = (value) => {
  const match = classifications.find(item => item.value === value)
  return match ? match.label : value
}

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value)
  }
})

const eventDates = computed(() => {
  if (props.event.event_dates?.length) {
    // Multiple dates available - display each one
    return props.event.event_dates.map(date => formatEventDate(date))
  } else if (props.event.event_date) {
    // Single date
    return [formatEventDate(props.event.event_date)]
  }
  return []
})

const sizeStyles = computed(() => {
  const sizes = {
    xs: {
      padding: '10px 14px',
      borderRadius: '10px',
      nameSize: '1.05rem',
      descSize: '0.8rem',
      metaSize: '0.8rem',
      dateSize: '0.78rem',
      chipSize: 'x-small',
      iconSize: 13,
      gap: '6px',
      width: '55%'
    },
    sm: {
      padding: '14px 18px',
      borderRadius: '13px',
      nameSize: '1.3rem',
      descSize: '0.9rem',
      metaSize: '0.9rem',
      dateSize: '0.88rem',
      chipSize: 'x-small',
      iconSize: 15,
      gap: '8px',
      width: '68%'
    },
    md: {
      padding: '18px 22px',
      borderRadius: '16px',
      nameSize: '1.6rem',
      descSize: '1.05rem',
      metaSize: '1rem',
      dateSize: '1rem',
      chipSize: 'x-small',
      iconSize: 17,
      gap: '12px',
      width: '82%'
    },
    lg: {
      padding: '24px 28px',
      borderRadius: '20px',
      nameSize: '2rem',
      descSize: '1.25rem',
      metaSize: '1.15rem',
      dateSize: '1.1rem',
      chipSize: 'small',
      iconSize: 20,
      gap: '16px',
      width: '100%'
    }
  }
  return sizes[props.size] || sizes.md
})

// Full weekday names (matches JS Date#getDay() indexing)
const weekdayNamesFull = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

const monthNamesLong = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

const formattedDateDisplay = computed(() => {
  const dates = props.event.event_dates?.length ? props.event.event_dates : (props.event.event_date ? [props.event.event_date] : [])
  
  if (!dates.length) return ''
  
  // Parse date strings into their numeric components (no Date object, no timezone)
  const dateObjects = dates.map(dateStr => {
    const [year, month, day] = dateStr.split('-').map(Number)
    return { year, month, day }
  }).sort((a, b) => a.year - b.year || a.month - b.month || a.day - b.day)
  
  // Build a month-year key for grouping
  const toMonthYearKey = (d) => `${d.month}-${d.year}`
  
  // Group by month/year
  const dateGroups = {}
  dateObjects.forEach(d => {
    const key = toMonthYearKey(d)
    if (!dateGroups[key]) dateGroups[key] = []
    dateGroups[key].push(d)
  })
  
  // Format each group
  const groupStrings = Object.entries(dateGroups).map(([key, datesInMonth]) => {
    // Get day-of-week from the date's numeric parts (no timezone involved)
    const formattedDates = datesInMonth.map(d => {
      const weekday = weekdayNamesFull[new Date(d.year, d.month - 1, d.day).getDay()]
      return `${weekday} ${d.day}`
    })
    
    const monthYearStr = `${monthNamesLong[datesInMonth[0].month - 1]} ${datesInMonth[0].year}`
    
    // Join dates with commas and 'y' before the last one
    let datesStr
    if (formattedDates.length === 1) {
      datesStr = formattedDates[0]
    } else if (formattedDates.length === 2) {
      datesStr = `${formattedDates[0]} y ${formattedDates[1]}`
    } else {
      datesStr = `${formattedDates.slice(0, -1).join(', ')} y ${formattedDates[formattedDates.length - 1]}`
    }
    
    return `${datesStr} de ${monthYearStr}`
  })
  
  return groupStrings.join(' · ')
})
</script>

<style scoped>
.event-info-box {
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.info-top-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.dates-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0;
}

.date-text {
  color: rgba(255, 255, 255, 0.55);
  font-weight: 500;
  letter-spacing: 0.02em;
  display: inline-flex;
  align-items: center;
}

.chip-label {
  font-size: 0.85rem !important;
  height: 24px !important;
  flex-shrink: 0;
}

.event-name {
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 6px 0;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-desc {
  color: rgba(255, 255, 255, 0.65);
  margin: 0 0 10px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: rgba(255, 255, 255, 0.7);
}
</style>
