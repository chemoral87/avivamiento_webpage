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
  date: { type: String, default: '' },
  time: { type: String, default: '' },
  url: { type: String, default: '/calendar' },
})

const resolveUrl = () => {
  // Only accessed inside click handlers (100% client-side), so window is safe
  if (props.url.startsWith('http')) return props.url
  return `${window.location.origin}${props.url}`
}

const buildMessage = () => {
  const parts = [props.title]
  const when = [props.date, props.time].filter(Boolean).join(' — ')
  if (when) parts.push(when)
  if (props.text) parts.push(props.text)
  return parts.filter(Boolean).join('\n')
}

const shareOnWhatsApp = () => {
  const url = encodeURIComponent(resolveUrl())
  const text = encodeURIComponent(`${buildMessage()}\nMás información:`)
  const shareUrl = `https://wa.me/?text=${text}%20${url}`

  if (isMobile()) {
    // window.open(_blank) is unreliable on mobile browsers/webviews and can
    // leave behind a blank tab instead of completing the redirect into the
    // WhatsApp app. Navigate in the same tab instead, same as Facebook below.
    window.location.href = shareUrl
  } else {
    window.open(shareUrl, '_blank')
  }
}

const isIOS = () => {
  if (typeof navigator === 'undefined') return false
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

const isMobile = () => {
  if (typeof navigator === 'undefined') return false
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

const shareOnFacebook = () => {
  // Facebook's sharer.php is known to hang/spin on iOS Safari when navigated
  // to directly. Use the native share sheet on iOS instead, which lets the
  // user pick Facebook (or anything else) without the broken redirect.
  if (isIOS() && navigator.share) {
    navigator.share({ title: props.title, text: buildMessage(), url: resolveUrl() }).catch(() => {})
    return
  }

  const url = encodeURIComponent(resolveUrl())
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`

  if (isMobile()) {
    // window.open(_blank) is unreliable on mobile browsers/webviews and can
    // appear to do nothing. Navigate in the same tab instead.
    window.location.href = shareUrl
  } else {
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=600')
  }
}

const shareGeneric = () => {
  if (navigator.share) {
    navigator.share({ title: props.title, text: buildMessage(), url: resolveUrl() })
      .catch(() => {})
  } else {
    navigator.clipboard.writeText(`${buildMessage()}\n\n${resolveUrl()}`)
      .then(() => alert('¡Enlace copiado al portapapeles!'))
  }
}
</script>
