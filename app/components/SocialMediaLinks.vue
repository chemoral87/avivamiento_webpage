<template>
  <div>
    <!-- Desktop Social Links -->
    <div v-if="variant === 'desktop'" class="d-flex align-center">
      <v-btn 
        icon 
        variant="text" 
        href="https://www.facebook.com/IglesiaAvivamientoMonterrey" 
        target="_blank"
        :size="size"
        density="compact"
        class="px-4"
        style="color: white;"
      >
        <v-icon :size="iconSize">mdi-facebook</v-icon>
      </v-btn>
      <v-btn 
        icon 
        variant="text" 
        href="https://www.instagram.com/avivamientomonterrey/" 
        target="_blank"
        :size="size"
        density="compact"
        class="px-4"
        style="color: white;"
      >
        <v-icon :size="iconSize">mdi-instagram</v-icon>
      </v-btn>
      <v-btn 
        icon 
        variant="text" 
        href="https://www.tiktok.com/@avivamientomonterrey" 
        target="_blank"
        :size="size"
        density="compact"
        class="px-4"
        style="color: white;"
      >
        <v-icon :size="iconSize">mdi-music-note</v-icon>
      </v-btn>
      <v-btn 
        icon 
        variant="text" 
        href="https://www.youtube.com/@AvivamientoMonterreyOficial" 
        target="_blank"
        :size="size"
        density="compact"
        class="px-4"
        style="color: white;"
      >
        <v-icon :size="iconSize">mdi-youtube</v-icon>
      </v-btn>
      <v-btn 
        icon 
        variant="text" 
        href="https://open.spotify.com/show/3BlpJIaQRraIURcanH5rg1" 
        target="_blank"
        :size="size"
        density="compact"
        class="px-4"
        style="color: white;"
      >
        <v-icon :size="iconSize">mdi-spotify</v-icon>
      </v-btn>
    </div>

    <!-- Mobile Social Links (for drawer) -->
    <template v-else-if="variant === 'mobile'">
      <v-list-item
        href="https://www.facebook.com/IglesiaAvivamientoMonterrey"
        target="_blank"
        style="color: white;"
      >
        <template v-slot:prepend>
          <v-icon>mdi-facebook</v-icon>
        </template>
        <v-list-item-title>Facebook</v-list-item-title>
      </v-list-item>
      <v-list-item
        href="https://www.instagram.com/avivamientomonterrey/"
        target="_blank"
        style="color: white;"
      >
        <template v-slot:prepend>
          <v-icon>mdi-instagram</v-icon>
        </template>
        <v-list-item-title>Instagram</v-list-item-title>
      </v-list-item>
      <v-list-item
        href="https://www.tiktok.com/@avivamientomonterrey"
        target="_blank"
        style="color: white;"
      >
        <template v-slot:prepend>
          <v-icon>mdi-music-note</v-icon>
        </template>
        <v-list-item-title>TikTok</v-list-item-title>
      </v-list-item>
      <v-list-item
        href="https://www.youtube.com/@AvivamientoMonterreyOficial"
        target="_blank"
        style="color: white;"
      >
        <template v-slot:prepend>
          <v-icon>mdi-youtube</v-icon>
        </template>
        <v-list-item-title>YouTube</v-list-item-title>
      </v-list-item>
      <v-list-item
        href="https://open.spotify.com/show/3BlpJIaQRraIURcanH5rg1"
        target="_blank"
        style="color: white;"
      >
        <template v-slot:prepend>
          <v-icon>mdi-spotify</v-icon>
        </template>
        <v-list-item-title>Spotify</v-list-item-title>
      </v-list-item>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'desktop',
    validator: (value) => ['desktop', 'mobile'].includes(value)
  },
  size: {
    type: String,
    default: 'default'
  },
  iconSize: {
    type: [String, Number],
    default: 22
  }
})
</script>
