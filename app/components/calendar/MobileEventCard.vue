<template>
  <div
    :id="`mobile-event-card-${event.id}`"
    class="mobile-event-card"
    :style="{ borderColor: classificationColor(event.classification) }"
    role="link"
    tabindex="0"
    @click="emit('click')"
  >
    <div class="mobile-event-card-content">
      <img
        v-if="event.url_image_s3"
        :src="event.url_image_s3"
        alt=""
        class="mobile-event-card-img"
      />
      <div class="mobile-event-card-text">
        <div class="font-weight-bold text-body-2" style="color:#041845;">{{ event.name }}</div>
        <div v-if="event.time_start" class="text-caption" style="color:#777;">{{ formatEventTime(event.time_start) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { classificationColor } from '~/constants/classifications'
import { formatEventTime } from '~/constants/dates'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])
</script>

<style scoped>
.mobile-event-card {
  border: 2px solid;
  border-radius: 6px;
  padding: 3px;
  background: #fff;
  cursor: pointer;
  transition: background 0.15s;
}

.mobile-event-card:hover,
.mobile-event-card:active {
  background: #f7f8fb;
}

.mobile-event-card-content {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.mobile-event-card-img {
  width: 54px;
  height: 54px;
  object-fit: cover;
  border-radius: 5px;
  flex-shrink: 0;
}

.mobile-event-card-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex-grow: 1;
}
</style>
