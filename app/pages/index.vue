<template>
  <v-app>
    <v-main>
 
      <v-img
        :src="isMobile ? '/images/main_mobile.jpg' : '/images/main.jpg'"
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
