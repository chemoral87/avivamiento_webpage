<template>
  <v-app>
    <AppNavBar :menu-items="menuItems" @toggle-drawer="drawer = !drawer" />

    <!-- Mobile Navigation Drawer -->
    <MobileNavDrawer v-model="drawer" :menu-items="menuItems" />
     <v-main class="bg-grey-lighten-4">
  <v-container class="py-4">
    <v-row justify="center">
       <v-col cols="12" md="10" lg="8" class="text-center">
            <p class="text-overline mb-2" style="color: #666; letter-spacing: 2px;">Mira lo que ha hecho Dios</p>
            <h1 class="text-h3 font-weight-light mb-0 pb-0" style="color: #041845;">Testimonios</h1>
          </v-col>
      <v-col cols="12" md="8">

        <v-card v-if="!sent" class="pa-4 ma-0" elevation="1">
          <p class="ma-2">¿Quieres compartir tu testimonio con nosotros? Haz clic abajo para enviarlo.</p>
          <div class="d-flex justify-center">
            <v-btn color="#041845" @click="goToPage('/testimonios/form')">Enviar Testimonio</v-btn>
          </div>
        </v-card>

        <div v-if="testimonies.length" class="mt-4">
          <v-row dense>
            <v-col cols="12" v-for="(t, i) in testimonies" :key="i">
              <v-card class="pa-4 mb-4">
                <div class="d-flex justify-space-between align-center mb-2">
                  <div>
               <span class="text-subtitle-1 font-weight-medium"> {{ t.name }}</span>
                    <div class="text-caption" style="color:#666">{{ formatDate(t.created_at) }}</div>
                  </div>
                </div>

                <div v-if="t.categories && t.categories.length" class="mb-2">
                  <v-chip v-for="(c, idx) in t.categories" :key="idx" size="x-small" class="mr-2">{{ c }}</v-chip>
                </div>
   <div class="text-body-1" v-if=" t.description">Testimonio: {{ t.description }}</div>
                <div v-if="t.link" class="my-4">
                  <iframe
                    :src="getEmbedUrl(t.link)"
                    style="width:100%;height:360px;border:0;"
                    allowfullscreen
                  ></iframe>
                </div>

             
              </v-card>
            </v-col>
          </v-row>

          <div class="d-flex justify-center mt-4 testimonies-pagination">
            <div class="d-flex align-center pagination-inner" style="gap:12px;">
              <!-- <v-btn class="pagination-btn" variant="text" :disabled="!pagination.first_page_url" @click="goToFirst">Primera</v-btn> -->
              <v-btn class="pagination-btn" variant="text" :disabled="!pagination.prev_page_url" @click="goToPrev">Anterior</v-btn>
              <div style="display:flex;gap:6px;align-items:center;">
                <v-btn
                  v-for="p in pagesList"
                  :key="p"
                  class="pagination-btn page-number"
                  size="small"
                  :variant="page === p ? 'tonal' : 'text'"
                  :color="page === p ? '#041845' : undefined"
                  @click="setPage(p)">
                  {{ p }}
                </v-btn>
              </div>
              <v-btn class="pagination-btn" variant="text" :disabled="!pagination.next_page_url" @click="goToNext">Siguiente</v-btn>
              <!-- <v-btn class="pagination-btn" variant="text" :disabled="!pagination.last_page_url" @click="goToLast">Última</v-btn> -->
            </div>
          </div>
          <div class="text-center text-caption mt-2">Mostrando {{ pagination.from || 0 }} - {{ pagination.to || 0 }} de {{ pagination.total || 0 }}</div>
        </div>



        <v-snackbar v-model="snackbar" :timeout="4000">{{ snackbarMessage }}</v-snackbar>
      </v-col>
    </v-row>
  </v-container>
  </v-main>
  </v-app>
    

</template>

<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue'
import axios from 'axios'

const formRef = ref(null)
const valid = ref(false)
const submitting = ref(false)
const snackbar = ref(false)
const snackbarMessage = ref('')
const sent = ref(false)

const drawer = ref(false)
const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const loginRoute = runtimeConfig.public.loginRoute


const form = reactive({
  name: '',
  phone_number: '',
  categories: [],
  link: '',
  description: ''
})

const testimonies = ref([])
const page = ref(1)
const perPage = 25
const pagination = ref({})

// Safely encode a string to Base64 (handles Unicode in browsers)
const encodeBase64 = (str) => {
  if (!str) return null
  try {
    return btoa(unescape(encodeURIComponent(str)))
  } catch (e) {
    try {
      return Buffer.from(str, 'utf-8').toString('base64')
    } catch (e2) {
      return null
    }
  }
}

const fetchPublicTestimonies = async (p = page.value) => {
  const encoded = encodeBase64(runtimeConfig.public.ORG_ID)
  if (!encoded) return

  const base = runtimeConfig.public.API_URL.replace(/\/$/, '')
  const url = `${base}/testimony/public?org_id=${encodeURIComponent(encoded)}&itemsPerPage=${perPage}&page=${p}`

  try {
    const res = await axios.get(url)
    if (res?.status === 200 && res.data) {
      pagination.value = res.data
      testimonies.value = res.data.data ?? []
      page.value = res.data.current_page ?? p
    }
  } catch (err) {
    // fallback: try the /testimony?org_id= route
    try {
      const alt = `${base}/testimony?org_id=${encodeURIComponent(encoded)}&itemsPerPage=${perPage}&page=${p}`
      const res2 = await axios.get(alt)
      if (res2?.status === 200 && res2.data) {
        pagination.value = res2.data
        testimonies.value = res2.data.data ?? []
        page.value = res2.data.current_page ?? p
      }
    } catch (err2) {
      // give up silently
    }
  }
}

const getEmbedUrl = (link) => {
  if (!link) return ''
  try {
    const l = link.trim()
    // YouTube watch links
    const ytMatch = l.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
    if (ytMatch && ytMatch[1]) return `https://www.youtube.com/embed/${ytMatch[1]}`
    // youtu.be short link
    const ytb = l.match(/youtu\.be\/([A-Za-z0-9_-]{11})/)
    if (ytb && ytb[1]) return `https://www.youtube.com/embed/${ytb[1]}`
    // default: use the link directly (may not embed correctly for all providers)
    return l
  } catch (e) {
    return link
  }
}

const formatDate = (d) => {
  if (!d) return ''
  try {
    const dt = new Date(d)
    const day = String(dt.getDate()).padStart(2, '0')
    const monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
    const mon = monthNames[dt.getMonth()] || ''
    const year = dt.getFullYear()
    const hours = String(dt.getHours()).padStart(2, '0')
    const mins = String(dt.getMinutes()).padStart(2, '0')
    return `${day} ${mon} ${year} `
  } catch (e) {
    return d
  }
}

// Refetch when page changes (v-pagination updates `page` via v-model)
watch(page, (p) => {
  fetchPublicTestimonies(p)
})

const goToFirst = () => {
  if (pagination.value.first_page_url) page.value = 1
}

const goToPrev = () => {
  if (pagination.value.prev_page_url) page.value = Math.max(1, (page.value || 1) - 1)
}

const goToNext = () => {
  if (pagination.value.next_page_url) page.value = Math.min(pagination.value.last_page || page.value + 1, (page.value || 1) + 1)
}

const goToLast = () => {
  if (pagination.value.last_page) page.value = pagination.value.last_page
}

const getItemNumber = (idx) => {
  const start = pagination.value.from ?? ((page.value - 1) * perPage + 1)
  return start + idx
}

const pagesList = computed(() => {
  const last = pagination.value.last_page || 1
  return Array.from({ length: last }, (_, i) => i + 1)
})

const setPage = (n) => {
  if (!n || n === page.value) return
  page.value = n
}

// Simple sum captcha fields
const numA = ref(0)
const numB = ref(0)
const captchaAnswer = ref('')

const generateCaptcha = () => {
  numA.value = Math.floor(Math.random() * 9) + 1
  numB.value = Math.floor(Math.random() * 9) + 1
  captchaAnswer.value = ''
}

const categoriesOptions = ['Sanidad Física',
'Paz y Salud Mental',
'Provisión y Finanzas',
'Logro Profesional/Academico',
'Restauración Familiar',
'Protección',
'Transformación de Vida',
'Milagro Creativo']

const menuItems = [
  { title: 'Inicio', to: '/' },
  { title: 'Eventos', to: '/calendar' },
  { title: 'Ministerios', to: '/ministerios' },
  { title: 'Horarios', onClick: () => goToSection('/#horarios') },
  { title: 'Ubicación', onClick: () => goToSection('/#ubicacion') },
]

const goToLogin = () => {

  window.open(loginRoute, '_self')
}

const goToPage = (path) => {
  router.push(path)
}

const goToSection = (path) => {
  drawer.value = false
  router.push(path)
}

const resetForm = () => {
  form.name = ''
  form.phone_number = ''
  form.categories = []
  form.link = ''
  form.description = ''
  captchaAnswer.value = ''
  generateCaptcha()
  if (formRef.value && formRef.value.resetValidation) formRef.value.resetValidation()
}

const submit = async () => {
  if (!form.name) {
    snackbarMessage.value = 'Por favor ingresa tu nombre.'
    snackbar.value = true
    return
  }

  // Captcha validation
  const expected = numA.value + numB.value
  if (Number(captchaAnswer.value) !== expected) {
    snackbarMessage.value = 'Por favor responde correctamente la suma de verificación.'
    snackbar.value = true
    return
  }

  submitting.value = true
  try {
    const target = `${runtimeConfig.public.API_URL.replace(/\/$/, '')}/testimony`
    const res = await axios.post(target, {
      name: form.name,
      phone_number: form.phone_number || null,
      categories: form.categories && form.categories.length ? form.categories : null,
      link: form.link || null,
      description: form.description || null,
      org_id: runtimeConfig.public.ORG_ID || null,
      numA: numA.value,
      numB: numB.value,
      captchaAnswer: Number(captchaAnswer.value)
    })

    if (res?.status === 201) {
      sent.value = true
      snackbarMessage.value = 'Gracias, tu testimonio ya fue enviado, en breve lo revisaremos'
      snackbar.value = true
    } else {
      snackbarMessage.value = 'Gracias — tu testimonio fue enviado.'
      snackbar.value = true
      resetForm()
    }
  } catch (err) {
    snackbarMessage.value = 'Error al enviar. Intenta nuevamente.'
    snackbar.value = true
    console.error(err)
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  generateCaptcha()
  fetchPublicTestimonies()
})
</script>

<style scoped>
.section-overline { color: #666; letter-spacing: 2px; margin-bottom: 8px; }
.section-title { color: #041845; font-size: 2.25rem; font-weight: 300; margin-bottom: 16px; }

/* Pagination responsive tweaks */
.testimonies-pagination .pagination-btn {
  font-size: 14px;
  min-width: 40px;
}
.testimonies-pagination .page-number {
  padding: 6px 8px;
}

@media (max-width: 600px) {
  .testimonies-pagination {
    padding: 0 12px;
  }
  .testimonies-pagination .pagination-inner {
    gap: 8px !important;
    flex-wrap: wrap;
    justify-content: center;
  }
  .testimonies-pagination .pagination-btn {
    font-size: 12px;
    min-width: 32px;
    padding: 4px 6px;
    letter-spacing: 0.2px;
  }
  .testimonies-pagination .page-number {
    padding: 4px 6px;
  }
}
</style>