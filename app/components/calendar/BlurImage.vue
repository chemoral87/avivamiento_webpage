<template>
  <div class="event-image-wrapper" :style="wrapperStyle" ref="imageWrapper">
    <img
      v-show="imageLoaded"
      :src="src"
      class="event-image-blur-bg"
      aria-hidden="true"
      loading="lazy"
      @load="onImageLoad"
      @error="onImageError"
    />
    <img
      v-show="imageLoaded"
      :src="src"
      class="event-image-main"
      loading="lazy"
      @load="onImageLoad"
      @error="onImageError"
    />
    <!-- Placeholder/skeleton while loading -->
    <div v-show="!imageLoaded" class="image-placeholder">
      <div class="skeleton-shimmer"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  src:    { type: String, required: true },
  height: { type: [String, Number], default: 360 },
})

const imageWrapper = ref(null)
const imageLoaded = ref(false)
let intersectionObserver = null

const wrapperStyle = computed(() => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
}))

const onImageLoad = () => {
  imageLoaded.value = true
}

const onImageError = () => {
  imageLoaded.value = true // Show error state after timeout
}

// Intersection Observer for more aggressive lazy loading
onMounted(() => {
  if (!imageWrapper.value) return

  const options = {
    root: null,
    rootMargin: '50px', // Start loading 50px before the image comes into view
    threshold: 0.01,
  }

  intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        imageLoaded.value = true
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
