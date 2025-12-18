<template>
  <v-app-bar 
    app 
    :color="color"
    :elevation="elevation" 
    height="70"
    :class="navbarClass"
    :flat="flat"
    :style="customStyle"
  >
    <v-container class="d-flex align-center">
      <LogoTitle />
      
      <!-- Desktop Menu -->
      <div class="d-none d-md-flex align-center">
        <v-btn 
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.to"
          :href="item.href"
          @click="item.onClick ? item.onClick() : null"
          variant="text"
          class="mx-0 px-3 text-body-1"
          style="text-transform: none; color: white;"
          :style="item.onClick ? 'cursor: pointer;' : ''"
        >
          {{ item.title }}
        </v-btn>
        <div class="mx-3"></div>
        <SocialMediaLinks variant="desktop" size="default"  />
        <div class="mx-3"></div>
        <v-btn
          @click="handleLoginClick"
          variant="text"
          class="mx-0 px-3 text-body-1"
          style="text-transform: none; color: white;"
        >
          <v-icon left class="mr-1">mdi-account </v-icon>
          Acceso
        </v-btn>
      </div>
      
      <!-- Mobile Menu Button -->
      <v-btn 
        icon 
        variant="text"
        class="d-md-none"
        style="color: white;"
        @click="$emit('toggle-drawer')"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script setup>
const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
    // Cada item debe tener: { title, to?, href?, onClick? }
  },
  color: {
    type: String,
    default: '#041845'
  },
  elevation: {
    type: [Number, String],
    default: 1
  },
  flat: {
    type: Boolean,
    default: false
  },
  navbarClass: {
    type: String,
    default: ''
  },
  customStyle: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['toggle-drawer'])

const runtimeConfig = useRuntimeConfig()
const loginRoute = runtimeConfig.public.loginRoute

const handleLoginClick = () => {
  window.open(loginRoute, '_self')
}
</script>
