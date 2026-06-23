<template>
  <div class="event-image-wrapper" :style="wrapperStyle" ref="imageWrapper">
    <img
      v-if="shouldLoad"
      v-show="loaded"
      :src="imageSrc"
      class="event-image-blur-bg"
      aria-hidden="true"
      @load="onImageLoad"
      @error="onImageError"
    />
    <img
      v-if="shouldLoad"
      v-show="loaded"
      :src="imageSrc"
      class="event-image-main"
      @load="onImageLoad"
      @error="onImageError"
    />
    <div v-if="!loaded" class="image-placeholder">
      <div class="skeleton-shimmer"></div>
      <div class="loading-spinner">
        <v-progress-circular
          indeterminate
          color="#041845"
          size="48"
          width="4"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const runtimeConfig = useRuntimeConfig()

const props = defineProps({
  src:      { type: String, required: true },
  height:   { type: [String, Number], default: 360 },
  useProxy: { type: Boolean, default: false },
})

const imageWrapper = ref(null)
const shouldLoad = ref(false)
const loaded = ref(false)
let intersectionObserver = null

const wrapperStyle = computed(() => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
}))

const imageSrc = computed(() => {
  if (!props.useProxy || !props.src) return props.src
  const baseUrl = runtimeConfig.public.API_URL
    ? runtimeConfig.public.API_URL.replace(/\/+$/, '').replace(/\/api$/, '')
    : ''
  const proxyUrl = `${baseUrl}/api/image-proxy?url=${encodeURIComponent(props.src)}`
  return proxyUrl
})

const onImageLoad = () => {
  loaded.value = true
}

const onImageError = () => {
  loaded.value = true
}

onMounted(() => {
  if (!imageWrapper.value) return
  const options = {
    root: null,
    rootMargin: '200px',
    threshold: 0.01,
  }
  intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        shouldLoad.value = true
        intersectionObserver.unobserve(entry.target)
      }
    })
  }, options)
  intersectionObserver.observe(imageWrapper.value)
})

onBeforeUnmount(() => {
  if (intersectionObserver) {
    intersectionObserver.disconnect()
  }
})
</script>

<style scoped>
.event-image-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.event-image-blur-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(20px);
  transform: scale(1.1);
  animation: fadeIn 0.6s ease-in-out;
}

.event-image-main {
  position: relative;
  height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  z-index: 1;
  animation: fadeIn 0.6s ease-in-out;
}

.image-placeholder {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  z-index: 0;
}

.skeleton-shimmer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    #e0e0e0 0%,
    #f0f0f0 50%,
    #e0e0e0 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
