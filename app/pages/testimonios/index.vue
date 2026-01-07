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
            <h1 class="text-h3 font-weight-light mb-4" style="color: #041845;">Testimonios</h1>
          </v-col>
      <v-col cols="12" md="8">

        <v-card v-if="!sent" class="pa-6" elevation="1">
          <p class="mb-4">¿Quieres compartir tu testimonio con nosotros? Haz clic abajo para enviarlo.</p>
          <div class="d-flex justify-center">
            <v-btn color="#041845" @click="goToPage('/testimonios/form')">Enviar Testimonio</v-btn>
          </div>
        </v-card>



        <v-snackbar v-model="snackbar" :timeout="4000">{{ snackbarMessage }}</v-snackbar>
      </v-col>
    </v-row>
  </v-container>
  </v-main>
  </v-app>
    

</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
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

const fetchPublicTestimonies = async () => {
  const encoded = encodeBase64(runtimeConfig.public.ORG_ID)
  if (!encoded) return

  // Try the likely publicIndex route first
  const base = runtimeConfig.public.API_URL.replace(/\/$/, '')
  const tryUrls = [
    // `${base}/testimony/publicIndex?org_id=${encodeURIComponent(encoded)}`,
    // `${base}/testimony/public?org_id=${encodeURIComponent(encoded)}`,
    `${base}/testimony/public?org_id=${encodeURIComponent(encoded)}&itemsPerPage=2`
  ]

  for (const url of tryUrls) {
    try {
      const res = await axios.get(url)
      if (res?.status === 200 && res.data) {
        // assuming API returns items in res.data.data or res.data
        testimonies.value = res.data.data ?? res.data ?? []
        return
      }
    } catch (err) {
      // try next URL
      // console.debug('fetchPublicTestimonies url failed', url, err)
    }
  }
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
</style>