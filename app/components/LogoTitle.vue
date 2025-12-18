<template>
  <v-toolbar-title class="logo-title-root">
    <img
      class="logo-image"
      :src="src"
      :alt="alt"
    />
  </v-toolbar-title>
</template>

<script setup>
const props = defineProps({
  src: { type: String, default: '/images/logo_avivamiento.png' },
  alt: { type: String, default: 'Avivamiento Monterrey' },
  height: { type: String, default: '35px' },
})
</script>

<style scoped>
/* Base logo styling */
.logo-image {
  display: block;
  width: auto;
  height: 30px; /* Default height */
}

/* Desktop - 1024px and below */
@media (max-width: 1025px) {
  .logo-image {
    height: 28px !important;
  }
}

/* Tablet - 768px and below */
@media (max-width: 769px) {
  .logo-image {
    height: 26px !important;
  }
}

/* Mobile Large - 426px to 425px */
@media (max-width: 426px)  {
  .logo-image {
    height: 24px !important;
  }
}

/* Mobile Medium - 375px to 321px */
@media (max-width: 376px)  {
  .logo-image {
    height: 22px !important;
  }
}

/* Mobile Small - 320px and below */
@media (max-width: 321px) {
  .logo-image {
    height: 20px !important;
  }
}
</style>

