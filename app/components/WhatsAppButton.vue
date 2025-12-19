<template>
  <v-btn
    icon
    color="green"
    class="whatsapp-fab"
    :href="whatsappUrl"
    target="_blank"
    @click="handleClick"
  >
    <v-icon>mdi-whatsapp</v-icon>
  </v-btn>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  phoneNumber: {
    type: String,
    default: '528111651800'
  },
  message: {
    type: String,
    default: 'Hola! Quiero más información sobre Avivamiento Monterrey'
  }
})

const emit = defineEmits(['click'])

const whatsappUrl = computed(() => {
  const encodedMessage = encodeURIComponent(props.message)
  return `https://wa.me/${props.phoneNumber}?text=${encodedMessage}`
})

const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams
    })
  }
}

const handleClick = () => {
  trackEvent('whatsapp_click', {
    event_category: 'engagement',
    event_label: 'WhatsApp Contact Button',
    value: 1
  })
  emit('click')
}
</script>

<style scoped>
.whatsapp-fab {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 9999;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  width: 72px;
  height: 72px;
  min-width: 72px;
  min-height: 72px;
  border-radius: 50%;
  animation: whatsapp-fab-in 0.5s;
}

.whatsapp-fab :deep(.v-icon) {
  font-size: 48px;
}

@keyframes whatsapp-fab-in {
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 600px) {
  .whatsapp-fab {
    width: 54px;
    height: 54px;
    min-width: 54px;
    min-height: 54px;
  }
  
  .whatsapp-fab :deep(.v-icon) {
    font-size: 32px;
  }
}
</style>
