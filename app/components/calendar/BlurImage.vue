<template>
  <div class="event-image-wrapper" :style="wrapperStyle">
    <img :src="src" class="event-image-blur-bg" aria-hidden="true" />
    <img :src="src" class="event-image-main" />
  </div>
</template>

<script setup>
const props = defineProps({
  src:    { type: String, required: true },
  height: { type: [String, Number], default: 360 },
})

const wrapperStyle = computed(() => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
}))
</script>

<style scoped>
.event-image-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.event-image-blur-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(20px);
  transform: scale(1.1);
}

.event-image-main {
  position: relative;
  height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  z-index: 1;
}
</style>
