<template>
  <div class="d-flex align-center" style="gap:4px;">
    <v-btn icon size="small" variant="text"
      @click.stop="shareOnWhatsApp"
      style="color:#25D366;">
      <v-icon>mdi-whatsapp</v-icon>
    </v-btn>
    <v-btn icon size="small" variant="text"
      @click.stop="shareOnFacebook"
      style="color:#1877F2;">
      <v-icon>mdi-facebook</v-icon>
    </v-btn>
    <v-btn icon size="small" variant="text"
      @click.stop="shareGeneric"
      style="color:#041845;">
      <v-icon>mdi-share-variant</v-icon>
    </v-btn>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: '' },
  text: { type: String, default: '' },
  url: { type: String, default: 'https://avivamientomonterrey.com/calendar' },
})

const shareOnWhatsApp = () => {
  const url = encodeURIComponent(props.url)
  const text = encodeURIComponent(`${props.title} - ${props.text}\n\nMás información:`)
  window.open(`https://wa.me/?text=${text}%20${url}`, '_blank')
}

const shareOnFacebook = () => {
  const url = encodeURIComponent(props.url)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

const shareGeneric = () => {
  if (navigator.share) {
    navigator.share({ title: props.title, text: props.text, url: props.url })
      .catch(() => {})
  } else {
    navigator.clipboard.writeText(`${props.title} - ${props.text}\n\n${props.url}`)
      .then(() => alert('¡Enlace copiado al portapapeles!'))
  }
}
</script>
