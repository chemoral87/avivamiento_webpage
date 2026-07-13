<template>
  <div class="event-info-box">
  

    <h2 class="event-name">{{ event.name }}</h2>
    <p v-if="event.description" class="event-desc">{{ event.description }}</p>
      <div class="info-top-row">
      <span v-if="displayDate" class="date-text">
        {{ displayDate }}
      </span>
    </div>


    <div class="meta-row">
      <span v-if="event.time_start" class="meta-item">
        <v-icon size="13" color="rgba(255,255,255,0.7)">mdi-clock-outline</v-icon>
        {{ formatEventTime(event.time_start) }}
      </span>
      <span v-if="event.location" class="meta-item">
        <v-icon size="13" color="rgba(255,255,255,0.7)">mdi-map-marker-outline</v-icon>
        {{ event.location }}
      </span>
      <v-chip
        v-if="event.classification"
        size="x-small"
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

const classificationLabel = (value) => {
  const match = classifications.find(item => item.value === value)
  return match ? match.label : value
}
import { formatEventTime, formatEventDateRangeShort } from '~/constants/dates'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const displayDate = computed(() => {
  const dates = props.event.event_dates?.length ? props.event.event_dates : [props.event.event_date]
  return formatEventDateRangeShort(dates)
})
</script>

<style scoped>
.event-info-box {
  width: 100%;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 14px 18px;
}

.info-top-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.chip-label {
  font-size: 0.65rem !important;
  height: 18px !important;
  flex-shrink: 0;
}

.date-text {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.55);
  font-weight: 500;
  letter-spacing: 0.02em;
}

.event-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 4px 0;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-desc {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.65);
  margin: 0 0 8px 0;
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
  gap: 10px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
}
</style>
