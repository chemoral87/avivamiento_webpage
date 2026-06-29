<template>
  <div
    class="big-cal-cell"
    :class="{
      'big-cal-today': cell.isToday,
      'big-cal-other-month': cell.otherMonth,
      'big-cal-has-events': cell.events && cell.events.length && !cell.otherMonth,
      'big-cal-selected': selectedDayIso === cell.iso
    }"
    role="button"
    tabindex="0"
    @click="emit('click-cell', cell)"
    @keydown.enter="emit('click-cell', cell)"
  >
    <div
      class="big-cal-day-number"
      :class="{
        'today-badge': cell.isToday,
        'font-weight-bold': !cell.otherMonth,
        'text-caption': cell.otherMonth
      }"
    >
      {{ cell.day }}
    </div>
    <template v-for="ev in cell.events" :key="ev.id">
      <div
        class="event-pill text-caption d-none d-sm-flex"
        :style="{ borderColor: classificationColor(ev.classification) }"
        :title="ev.name"
        role="link"
        tabindex="0"
        @click.stop="emit('click-event', ev)"
      >
        <div class="event-pill-content">
          <img
            v-if="ev.url_image_s3"
            :src="ev.url_image_s3"
            alt=""
            class="event-pill-img"
          />
          <div class="event-pill-text">
            <span class="event-pill-name">{{ ev.name }}</span>
            <span v-if="ev.time_start" class="event-pill-time">{{ formatEventTime(ev.time_start) }}</span>
          </div>
        </div>
      </div>
    </template>
    <div v-if="cell.events && cell.events.length" class="event-dots d-flex d-sm-none">
      <span
        v-for="ev in cell.events"
        :key="ev.id"
        class="event-dot"
        :style="{ backgroundColor: classificationColor(ev.classification) }"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { classificationColor } from '~/constants/classifications'
import { formatEventTime } from '~/constants/dates'

const props = defineProps({
  cell: {
    type: Object,
    required: true
  },
  selectedDayIso: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['click-cell', 'click-event'])
</script>

<style scoped>
.big-cal-cell {
  min-height: 0;
  padding: 4px;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  container-type: inline-size;
}

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
  cursor: pointer;
  border-width: 3px;
  border-style: solid;
}

.event-pill-content {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
}

.event-pill-img {
  width: 28px;
  height: 28px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}

@container (max-width: 100px) {
  .event-pill-img {
    display: none;
  }
}

.event-pill-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex-grow: 1;
}

.event-pill-name {
  width: 100%;
  font-weight: 600;
  word-break: break-word;
}

.event-pill-time {
  font-size: 11px;
  opacity: 0.8;
}

.big-cal-selected {
  background: #eef1fa;
  box-shadow: inset 0 0 0 2px #041845;
}

.event-dots {
  gap: 3px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2px;
}

.event-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .big-cal-cell {
    padding: 1px;
    min-height: 0;
    cursor: pointer;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  .event-pill {
    font-size: 9px;
    padding: 1px 2px;
  }
  .event-pill-time {
    display: none;
  }
  .big-cal-has-events {
    cursor: pointer;
  }
}
</style>
