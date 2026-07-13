<template>
  <div class="carousel-item-wrapper" @click="emit('click', event.slug_name)">
    <!-- Blurred image fills entire background including sides -->
    <div
      v-if="event.url_image_s3"
      class="blur-bg"
      :style="{ backgroundImage: `url(${event.url_image_s3})` }"
    ></div>

    <!-- Main image centered, full visible -->
    <img
      v-if="event.url_image_s3"
      :src="event.url_image_s3"
      :alt="event.name"
      class="full-image"
    />
    <div v-else class="no-image-bg">
      <v-icon size="120" color="white" style="opacity:0.3">mdi-calendar</v-icon>
    </div>

    <!-- Subtle dark gradient at the bottom -->
    <div class="bottom-gradient"></div>

    <!-- Floating event info box — cycles between corners so it doesn't
         permanently cover the same part of the image/poster -->
    <div class="info-box-anchor" :class="infoBoxPosition">
      <EventInfoBox :event="event" />
    </div>
  </div>
</template>

<script setup>
import { classificationColor } from '~/constants/classifications'
import { formatEventTime, formatEventDate } from '~/constants/dates'


const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  isWidescreen: {
    type: Boolean,
    default: false
  },
  infoBoxPosition: {
    type: String,
    default: 'left-bottom' // 'left-bottom' | 'right-top'
  }
})

const emit = defineEmits(['click'])
</script>

<style scoped>
.carousel-item-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  background: #000;
}

/* Blurred image fills entire slide as background */
.blur-bg {
  position: absolute;
  inset: -20px;
  background-size: cover;
  background-position: center;
  filter: blur(24px) brightness(0.45) saturate(1.2);
  z-index: 0;
}

/* Main image sits centered above the blur bg */
.full-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  z-index: 1;
  transition: transform 8s ease;
}

.carousel-item-wrapper:hover .full-image {
  transform: scale(1.03);
}

.no-image-bg {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #041845 0%, #0a2a6e 100%);
  z-index: 1;
}

/* Gradient overlay only on the bottom third */
.bottom-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 55%;
  background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.4) 40%, transparent 100%);
  z-index: 2;
  pointer-events: none;
}

/* Anchor for the floating info box — cycles between corners.
   width uses min() to constrain to 420px but also responsive on smaller screens */
.info-box-anchor {
  position: absolute;
  z-index: 3;
  width: min(420px, calc(100% - 30px));
  box-sizing: border-box;
  transition: top 0.8s ease, left 0.8s ease, right 0.8s ease;
}

.info-box-anchor.left-bottom {
  top: calc(100% - 24px);
  left: 15px;
  right: unset;
  transform: translateY(-100%);
}

.info-box-anchor.right-top {
  top: 24px;
  right: 15px;
  left: unset;
  transform: translateY(0);
}
</style>
