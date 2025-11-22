<template>
  <v-app>
    <v-main>
      <v-img
        src="/images/main.jpg"
        :height="isMobile ? '45vh' : '100vh'"
        cover
      ></v-img>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

useHead({
  title: 'Avivamiento Monterrey'
})
</script>
