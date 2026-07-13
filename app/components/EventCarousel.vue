<template>
  <div class="carousel-container-wrapper">
    <v-carousel
      v-model="activeSlide"
      cycle
      :interval="6000"
      hide-delimiter-background
      hide-delimiters
      :show-arrows="isWidescreen ? false : 'hover'"
      :height="isWidescreen ? '100vh' : '77vh'"
      class="overflow-hidden"
      :class="isWidescreen ? 'widescreen-carousel' : 'normal-carousel rounded-xl elevation-3'"
      style="background-color: #041845; width: 100%;"
    >
      <v-carousel-item
        v-for="event in events"
        :key="event.id"
      >
        <EventCarouselItem :event="event" :is-widescreen="isWidescreen" @click="emit('click-event', $event)" />
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  events: {
    type: Array,
    required: true
  },
  isWidescreen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click-event'])

const activeSlide = ref(0)
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
</style>
