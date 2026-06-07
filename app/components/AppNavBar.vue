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
        variant="flat"
        :class="['d-md-none', 'mobile-menu-btn', { 'menu-open': drawerOpen }]"
        @click="$emit('toggle-drawer')"
        rounded="pill"
        size="small"
      >
        <v-icon start>mdi-menu</v-icon>
        Menú
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
  },
  drawerOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-drawer'])

const runtimeConfig = useRuntimeConfig()
const loginRoute = runtimeConfig.public.loginRoute

const handleLoginClick = () => {
  window.open(loginRoute, '_self')
}
</script>

<style scoped>
@keyframes slow-blink {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 0px rgba(255, 180, 0, 0);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.08);
    box-shadow: 0 0 12px rgba(21, 101, 192, 0.9);
  }
}

.mobile-menu-btn {
  background-color: #1565C0 !important;
  color: #ffffff !important;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: none;
  letter-spacing: 0.3px;
  animation: slow-blink 2s ease-in-out infinite;
}

.mobile-menu-btn.menu-open {
  animation: none;
  opacity: 1;
  transform: scale(1);
  box-shadow: none;
}
</style>
