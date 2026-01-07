<template>
  <v-app>
    <AppNavBar :menu-items="menuItems" @toggle-drawer="drawer = !drawer" />

    <!-- Mobile Navigation Drawer -->
    <MobileNavDrawer v-model="drawer" :menu-items="menuItems" />
     <v-main class="bg-grey-lighten-4">
  <v-container class="py-4">
    <v-row justify="center">
       <v-col cols="12" md="10" lg="8" class="text-center">
            <p class="text-overline mb-2" style="color: #666; letter-spacing: 2px;">Cuentanos que ha hecho Dios</p>
            <h1 class="text-h3 font-weight-light mb-4" style="color: #041845;">Testimonios</h1>
          </v-col>
      <v-col cols="12" md="8">

        <v-card v-if="!sent" class="pa-6" elevation="1">
          <v-form ref="formRef" v-model="valid" lazy-validation>
            <v-text-field
              v-model="form.name"
              label="Nombre"
              :rules="[v => !!v || 'El nombre es requerido']"
              required
            />

            <v-text-field
              v-model="form.phone_number"
              label="Teléfono"
              type="tel"
            />

            <v-select
              v-model="form.categories"
              :items="categoriesOptions"
              label="Categorías (opcional)"
              multiple
              chips
              clearable
              variant="outlined"
              class="mb-4"
            />

            <v-text-field
              v-model="form.link"
              label="Enlace o link del video (youtube, tiktok, instagram) (opcional)"
            />

            <v-textarea
              v-model="form.description"
              label="Descripción del testimonio"
              rows="6"
            />

            <v-row  align="center">
              <v-col cols="6">
                <div style="font-weight:500; color:#333;">Por favor responde: <strong  >{{ numA }} + {{ numB }} = </strong><strong style="color:#e53935"> ? </strong> </div>
                <v-text-field
                  v-model="captchaAnswer"
                  label="Respuesta de verificación"
                  type="text"
                  :rules="[v => Number(v) === (numA + numB) || 'Por favor responde correctamente la suma de verificación']"
                />
              </v-col>
              <!-- <v-col cols="4" class="d-flex align-center">
                <v-btn variant="text" @click="generateCaptcha">Regenerar</v-btn>
              </v-col> -->
            </v-row>

            <div class="d-flex justify-end gap-3 mt-4">
              <!-- <v-btn variant="text" color="secondary" @click="resetForm">Limpiar</v-btn> -->
              <v-btn :loading="submitting" color="#041845" @click="submit" :disabled="submitting">Enviar Testimonio</v-btn>
            </div>
          </v-form>
        </v-card>

        <v-card v-else class="pa-6 text-center" elevation="1">
          <div class="text-h4">Gracias !! </div>
          <div class="text-h6">Tu testimonio ya fue enviado, en breve lo revisaremos</div>
          <div class="mt-4">
            <v-btn color="primary" variant="tonal" @click="goToPage('/')">Volver al inicio</v-btn>
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

// Simple sum captcha fields
const numA = ref(0)
const numB = ref(0)
const captchaAnswer = ref('')

const generateCaptcha = () => {
  numA.value = Math.floor(Math.random() * 9) + 1
  numB.value = Math.floor(Math.random() * 9) + 1
  captchaAnswer.value = ''
}

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
      org_id: encodeBase64(runtimeConfig.public.ORG_ID),
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
})
</script>

<style scoped>
.section-overline { color: #666; letter-spacing: 2px; margin-bottom: 8px; }
.section-title { color: #041845; font-size: 2.25rem; font-weight: 300; margin-bottom: 16px; }
</style>