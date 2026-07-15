<template>
  <div class="carousel-container-wrapper">
    <v-carousel
      v-model="activeSlide"
      cycle
      :interval="interval"
      hide-delimiter-background
      hide-delimiters
      transition="fade-transition"
      reverse-transition="fade-transition"
      :show-arrows="isWidescreen ? false : 'hover'"
      :height="isWidescreen ? '100vh' : '77vh'"
      class="overflow-hidden slow-fade-carousel"
      :class="isWidescreen ? 'widescreen-carousel' : 'normal-carousel rounded-xl elevation-3'"
      style="background-color: #041845; width: 100%;"
    >
      <v-carousel-item
        v-for="event in events"
        :key="event.id"
      >
        <EventCarouselItem :event="event" :is-widescreen="isWidescreen" :info-box-position="infoBoxPosition" :info-size="infoSize" @click="emit('click-event', $event)" />
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  events: {
    type: Array,
    required: true
  },
  isWidescreen: {
    type: Boolean,
    default: false
  },
  interval: {
    type: Number,
    default: 6000
  },
  infoSize: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg'].includes(value)
  }
})

const emit = defineEmits(['click-event'])

const activeSlide = ref(0)

// EventInfoBox cycles to the opposite corner every 3 image cycles so it
// never stays stuck over the same part of the poster for too long. This is
// driven by the carousel's own slide changes (not a disconnected timer),
// so it lines up with what the viewer is actually seeing.
const SLIDES_PER_POSITION = 3
const infoBoxPosition = ref('left-bottom') // 'left-bottom' | 'right-top'
let slideCycleCount = 0

watch(activeSlide, () => {
  slideCycleCount++
  if (slideCycleCount >= SLIDES_PER_POSITION) {
    slideCycleCount = 0
    infoBoxPosition.value = infoBoxPosition.value === 'left-bottom' ? 'right-top' : 'left-bottom'
  }
})
</script>

<style scoped>
.carousel-container-wrapper {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.normal-carousel {
  max-width: 100%;
}

.widescreen-carousel {
  border-radius: 0 !important;
}

/* Slow, smooth crossfade between slides (default Vuetify fade is ~0.3s) */
.slow-fade-carousel :deep(.fade-transition-enter-active),
.slow-fade-carousel :deep(.fade-transition-leave-active) {
  transition: opacity 1.6s ease !important;
}

.slow-fade-carousel :deep(.v-carousel-item) {
  transition: opacity 1.6s ease !important;
}
</style>
