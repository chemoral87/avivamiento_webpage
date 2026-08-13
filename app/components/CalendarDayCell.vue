<template>
  <div
    class="big-cal-cell"
    :class="{
      'big-cal-today': cell.isToday,
      'big-cal-other-month': cell.otherMonth,
      'big-cal-has-events':
        cell.events && cell.events.length && !cell.otherMonth,
      'big-cal-selected': selectedDayIso === cell.iso,
    }"
    role="button"
    tabindex="0"
    @click="emit('click-cell', cell)"
    @keydown.enter="emit('click-cell', cell)"
  >
    <div
      class="big-cal-day-number d-none d-sm-inline-flex"
      :class="{
        'today-badge': cell.isToday,
        'font-weight-bold': !cell.otherMonth,
        'text-caption': cell.otherMonth,
      }"
    >
      {{ cell.day }}
    </div>
    <div
      class="big-cal-day-number-mobile d-flex d-sm-none"
      :class="{
        'today-badge': cell.isToday,
        'font-weight-bold': !cell.otherMonth,
        'text-caption': cell.otherMonth,
      }"
      v-if="!(cell.events && cell.events.length)"
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
            <span v-if="ev.time_start" class="event-pill-time">{{
              formatEventTime(ev.time_start)
            }}</span>
          </div>
        </div>
      </div>
    </template>
    <div
      v-if="cell.events && cell.events.length"
      class="event-thumb-mobile d-flex d-sm-none"
      :class="{ 'event-thumb-mobile-multi': cell.events.length > 1 }"
    >
      <span
        class="event-thumb-daynum"
        :class="{ 'today-badge': cell.isToday }"
        >{{ cell.day }}</span
      >
      <template v-for="ev in cell.events.slice(0, 4)" :key="ev.id">
        <img
          v-if="ev.url_image_s3"
          :src="ev.url_image_s3"
          alt=""
          class="event-thumb-mobile-img"
        />
      </template>
    </div>
    <div
      v-if="cell.events && cell.events.length"
      class="event-dots d-flex d-sm-none"
    >
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
import { classificationColor } from "~/constants/classifications";
import { formatEventTime } from "~/constants/dates";

const props = defineProps({
  cell: {
    type: Object,
    required: true,
  },
  selectedDayIso: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["click-cell", "click-event"]);
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

.big-cal-day-number-mobile {
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

.event-thumb-mobile {
  position: relative;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 2px;
  margin-top: 0;
  padding-left: 5px;
}

.event-thumb-daynum {
  position: absolute;
  top: 1px;
  left: 1px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background: #041845;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
}

.event-thumb-daynum.today-badge {
  background: #041845;
  box-shadow: 0 0 0 2px orange;
}

.event-thumb-mobile-img {
  width: 100%;
  max-width: 40px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 3px;
}

.event-thumb-mobile-multi .event-thumb-mobile-img {
  max-width: 20px;
}

.event-dots {
  gap: 3px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: auto;
  padding-top: 2px;
}

.event-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .big-cal-cell {
    padding: 1px 2px 1px 9px;
    min-height: 0;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  .big-cal-day-number,
  .big-cal-day-number-mobile {
    width: 18px;
    height: 18px;
    margin-bottom: 1px;
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
