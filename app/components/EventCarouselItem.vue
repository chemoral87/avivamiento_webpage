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

/* Floating compact info box — bottom-left */
.event-info-box {
  position: absolute;
  bottom: 24px;
  left: 15px;
  z-index: 3;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 14px 18px;
  max-width: min(420px, calc(100% - 68px));
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
  gap: 10px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
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
  top: 220px;
  right: 0px;
  left: unset;
  transform: translateY(0);
}
</style>
