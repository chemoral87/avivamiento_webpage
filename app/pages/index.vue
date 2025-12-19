<template>
  <v-app>
    <AppNavBar 
      :menu-items="menuItems" 
      @toggle-drawer="drawer = !drawer"
      :color="scrolled ? '#041845' : 'transparent'"
      :elevation="scrolled ? 1 : 0"
      :flat="true"
      navbar-class="navbar-transition"
      :custom-style="scrolled ? 'border-bottom: 1px solid rgba(255,255,255,0.1);' : ''"
    />

    <MobileNavDrawer v-model="drawer" :menu-items="menuItems" />

    <v-main class="pa-0" :class="{ 'content-ready': isReady }">
      <!-- Hero Section -->
      <v-container fluid class="hero-section pa-0">
        <div
          class="hero-banner"
          :style="{ 
            height: heroHeight,
            backgroundSize: `100% ${heroBgHeight}`,
            '--hero-bg-height': heroBgHeight
          }"
          role="img"
          aria-label="Iglesia Avivamiento Monterrey - Pastor Adrian Aguirre"
        >
        </div>
      </v-container>

      <!-- Parallax Background Section -->
      <div 
        class="parallax-bg"
        :style="{
          backgroundColor: '#d2d9d7',
          backgroundSize: mobile ? '150% auto' : '100% auto',
        }"
      >
        <!-- Pastores Section -->
        <v-container fluid class="py-0">
          <v-row>
            <v-col cols="12" class="text-center mb-1">
              <p class="section-overline">LIDERAZGO</p>
              <h2 class="section-title">Nuestros Pastores</h2>
            </v-col>
          </v-row>
          
          <v-row justify="center" id="pastors">
            <v-col cols="12" sm="5" md="5" class="d-flex align-stretch">
              <v-card elevation="0" class="pastor-card">
                <v-avatar size="180" class="mb-2">
                  <v-img src="/images/pastor_adrian.webp" alt="Pastor Adrian Aguirre" />
                </v-avatar>
                <h3 class="pastor-name">Adrian Aguirre</h3>
                <p class="pastor-role">Pastor Principal</p>
                <p class="pastor-description">
                  Desde joven, el Pastor Adrián Aguirre respondió al llamado de Dios como evangelista. 
                  Hoy, con más de dos décadas de ministerio, pastorea junto a su esposa Sara Aguirre 
                  la Iglesia Avivamiento Monterrey en Nuevo León, México.
                </p>
              </v-card>
            </v-col>
            
            <v-col cols="12" sm="5" md="5" class="d-flex align-stretch">
              <v-card elevation="0" class="pastor-card">
                <v-avatar size="180" class="mb-2">
                  <v-img src="/images/pastora_sara.webp" alt="Pastora Sara Aguirre" />
                </v-avatar>
                <h3 class="pastor-name">Sara Aguirre</h3>
                <p class="pastor-role">Pastora Principal</p>
                <p class="pastor-description">
                  Bajo su liderazgo, el Espíritu Santo ha traído restauración a familias y salvación 
                  a miles de personas, demostrando que el poder del evangelismo sigue encendiendo corazones.
                </p>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <!-- Horarios Section -->
        <v-container fluid id="horarios" class="py-4">
          <v-container>
            <v-row>
              <v-col cols="12" class="text-center">
                <p class="section-overline">REUNIONES</p>
                <h2 class="section-title">Horarios de Servicio</h2>
              </v-col>
            </v-row>
            
            <v-row justify="center">
              <v-col cols="12" sm="6" md="6">
                <v-card class="schedule-card" elevation="0">
                  <h3 class="schedule-day">Domingo</h3>
                  <p class="schedule-time">11:00 AM</p>
                  <p class="schedule-type">Reunión General</p>
                </v-card>
              </v-col>
              
              <v-col cols="12" sm="6" md="6">
                <v-card class="schedule-card" elevation="0">
                  <h3 class="schedule-day">Miércoles</h3>
                  <p class="schedule-time">8:00 PM</p>
                  <p class="schedule-type">Reunión General</p>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
      </div>

      <!-- Ubicación Section -->
      <v-container 
        id="ubicacion" 
        class="py-4 ubicacion-bg"
        :style="{
          backgroundColor: '#f0f7f5',
          backgroundSize: mobile ? '120% auto' : '100% auto',
        }"
      >
        <v-row>
          <v-col cols="12" class="text-center">
            <p class="section-overline">ENCÚENTRANOS</p>
            <h2 class="section-title">Ubicación</h2>
          </v-col>
        </v-row>
        
        <v-row>
          <v-col cols="12" sm="5" md="5">
            <div class="pa-4">
              <h3 class="location-title">Iglesia Avivamiento Monterrey</h3>
              
              <div class="mb-6">
                <p class="location-label">DIRECCIÓN</p>
                <p class="location-info">
                  Av. Santo Domingo #215, Col. Mezquital, Apodaca, México
                </p>
              </div>

              <div class="mb-6">
                <p class="location-label">TELÉFONO</p>
                <p class="location-info">
                  <a href="tel:+528111651800" class="contact-link">
                    +52 (81) 1165-1800
                  </a>
                </p>
              </div>

              <div class="mb-8">
                <p class="location-label">EMAIL</p>
                <p class="location-info location-email">
                  <a href="mailto:elavivamientomonterrey@hotmail.com" class="contact-link">
                    elavivamientomonterrey@hotmail.com
                  </a>
                </p>
              </div>

              <v-btn
                href="https://maps.app.goo.gl/g7wBuXmhKL114A657"
                target="_blank"
                color="#041845"
                variant="flat"
                size="large"
                block
                class="mt-4 maps-btn"
              >
                Abrir en Google Maps
              </v-btn>
            </div>
          </v-col>
          
          <v-col cols="12" sm="6" md="6">
            <v-card elevation="0" height="65%" class="map-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.758495!2d-100.26967182250972!3d25.746658632809236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662eb6f3a8a27ad%3A0xccd96829e38e7212!2sAVIVAMIENTO%20MONTERREY!5e0!3m2!1ses!2smx!4v1763651018410!5m2!1ses!2smx"
                width="100%"
                height="100%"
                class="map-iframe"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Contacto Section -->
      <div 
        class="contacto-bg"
        :style="{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          backgroundSize: contactoBgSize,
        }"
      >
        <v-container fluid id="contacto" class="py-4">
          <v-container>
            <v-row justify="center">
              <v-col cols="12" md="8" class="text-center">
                <p class="cta-overline">BIENVENIDOS</p>
                <h2 class="cta-title">Únete a Nuestra Comunidad</h2>
                <p class="cta-subtitle">
                  Te invitamos a ser parte de nuestra familia en Cristo
                </p>
                <div class="d-flex flex-wrap justify-center gap-4">
                  <v-btn
                    @click="scrollToSection('horarios')"
                    variant="outlined"
                    size="x-large"
                    color="white"
                    class="cta-btn"
                  >
                    Ver Horarios
                  </v-btn>
                  <v-btn
                    @click="scrollToSection('ubicacion')"
                    variant="flat"
                    size="x-large"
                    color="white"
                    class="cta-btn cta-btn-solid"
                  >
                    Cómo Llegar
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-container>

        <!-- Footer -->
        <v-footer class="footer py-2">
          <v-container>
            <v-row>
              <v-col cols="12" sm="4" md="4" class="text-center text-md-left mb-1 mb-md-0">
                <h3 class="footer-title">Avivamiento Monterrey</h3>
                <p class="footer-description">
                  Una iglesia cristiana comprometida 
                  con la comunidad de Monterrey
                </p>
              </v-col>
              
              <v-col cols="12" sm="4" md="4" class="text-center mb-1 mb-md-0">
                <h3 class="footer-social-title">SÍGUENOS</h3>
                <div class="d-flex justify-center">
                  <v-btn 
                    icon 
                    variant="text" 
                    :href="SOCIAL_MEDIA.facebook" 
                    target="_blank" 
                    class="social-icon"
                  >
                    <v-icon size="28">mdi-facebook</v-icon>
                  </v-btn>
                  <v-btn 
                    icon 
                    variant="text" 
                    :href="SOCIAL_MEDIA.instagram" 
                    target="_blank" 
                    class="social-icon"
                  >
                    <v-icon size="28">mdi-instagram</v-icon>
                  </v-btn>
                 
                  <v-btn 
                    icon 
                    variant="text" 
                    :href="SOCIAL_MEDIA.tiktok" 
                    target="_blank" 
                    class="social-icon"
                  >
                    <v-icon size="28">mdi-music-note</v-icon>
                  </v-btn>
                   <v-btn 
                    icon 
                    variant="text" 
                    :href="SOCIAL_MEDIA.youtube" 
                    target="_blank" 
                    class="social-icon"
                  >
                    <v-icon size="28">mdi-youtube</v-icon>
                  </v-btn>
                  <v-btn 
                    icon 
                    variant="text" 
                    :href="SOCIAL_MEDIA.spotify" 
                    target="_blank" 
                    class="social-icon"
                  >
                    <v-icon size="28">mdi-spotify</v-icon>
                  </v-btn>
                </div>
              </v-col>
              
              <v-col cols="12" sm="4" md="4" class="text-center text-md-right">
                <h3 class="footer-social-title">CONTACTO</h3>
                <p class="footer-contact">+52 (81) 1165-1800</p>
                <p class="footer-contact">elavivamientomonterrey@hotmail.com</p>
              </v-col>
            </v-row>
            
            <v-divider class="footer-divider my-6" />
            
            <v-row>
              <v-col cols="12" class="text-center">
                <p class="footer-copyright">
                  © {{ new Date().getFullYear() }} Avivamiento Monterrey - Todos los derechos reservados v{{ appVersion }}
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-footer>
      </div>
    </v-main>
    <WhatsAppButton />
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useDisplay } from 'vuetify'
import { SOCIAL_MEDIA } from '~/constants/social-media'
import packageJson from '../../../package.json'

const appVersion = packageJson.version
const drawer = ref(false)
const scrolled = ref(false)
const isReady = ref(false)
const { mobile, width } = useDisplay()

const runtimeConfig = useRuntimeConfig()
const loginRoute = runtimeConfig.public.loginRoute

const menuItems = [
  { title: 'Eventos', to: '/calendar' },
  { title: 'Ministerios', to: '/ministerios' },
  { title: 'Horarios', onClick: () => scrollToSection('horarios') },
  { title: 'Ubicación', onClick: () => scrollToSection('ubicacion') },
]

// SEO Configuration
useHead({
  title: 'Pastor Adrian Aguirre | Avivamiento Monterrey | Iglesia Cristiana en Apodaca',
  link: [
    { rel: 'canonical', href: 'https://avivamientomonterrey.com/' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Church',
            name: 'Iglesia Avivamiento Monterrey',
            description: 'Iglesia cristiana evangélica dirigida por el Pastor Adrian Aguirre',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Av. Santo Domingo #215, Col. Mezquital',
              addressLocality: 'Apodaca',
              addressRegion: 'Nuevo León',
              postalCode: '66648',
              addressCountry: 'MX'
            },
            telephone: '+52-81-1165-1800',
            email: 'elavivamientomonterrey@hotmail.com',
            url: 'https://avivamientomonterrey.com',
            sameAs: [
              'https://www.facebook.com/IglesiaAvivamientoMonterrey',
              'https://www.instagram.com/avivamientomonterrey/',
              'https://www.youtube.com/@AvivamientoMonterreyOficial',
              'https://www.tiktok.com/@avivamientomonterrey',
              'https://open.spotify.com/show/3BlpJIaQRraIURcanH5rg1'
            ],
            openingHours: ['Su 11:00-13:00', 'We 20:00-22:00'],
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '25.7729',
              longitude: '-100.1868'
            }
          },
          {
            '@type': 'Person',
            name: 'Adrian Aguirre',
            jobTitle: 'Pastor Principal',
            worksFor: {
              '@type': 'Church',
              name: 'Iglesia Avivamiento Monterrey'
            }
          },
          {
            '@type': 'Person',
            name: 'Sara Aguirre',
            jobTitle: 'Pastora',
            worksFor: {
              '@type': 'Church',
              name: 'Iglesia Avivamiento Monterrey'
            }
          }
        ]
      })
    }
  ]
})

useSeoMeta({
  description: 'Iglesia Avivamiento Monterrey bajo el liderazgo del Pastor Adrian Aguirre y la Pastora Sara Aguirre. Ubicados en Apodaca, Monterrey. Cultos dominicales 11:00 AM. ¡Te esperamos!',
  keywords: 'Adrian Aguirre, Pastor Adrian Aguirre Monterrey, Sara Aguirre, Pastora Sara Aguirre, Avivamiento Monterrey, iglesia Apodaca, iglesia Mezquital Apodaca, cultos cristianos Monterrey, iglesia evangélica Nuevo León',
  ogTitle: 'Pastor Adrian Aguirre | Avivamiento Monterrey',
  ogDescription: 'Iglesia cristiana en Apodaca dirigida por Pastor Adrian Aguirre',
  ogUrl: 'https://avivamientomonterrey.com/',
  ogImage: 'https://avivamientomonterrey.com/images/poster2.webp',
  ogType: 'website',
  ogLocale: 'es_MX',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Pastor Adrian Aguirre | Avivamiento Monterrey',
  twitterDescription: 'Iglesia cristiana en Apodaca dirigida por Pastor Adrian Aguirre',
  twitterImage: 'https://avivamientomonterrey.com/images/poster2.webp'
})

// Computed Properties
const isMobile = computed(() => mobile.value)

const heroHeight = computed(() => {
   const height = Math.round((125 / 1159) * (width.value - 321) + 145) - 40
    return `${height}px`
})

const heroBgHeight = computed(() => {
  // Wait until component is ready and width is available
  if (!isReady.value || !width.value) {
    return '300px' // Default value during SSR/initial render
  }
  //const height = Math.round((125 / 959) * (width.value - 321) + 145)
  const height = Math.round((125 / 1159) * (width.value - 321) + 145)
  return `${height}px`
})

const contactoHeight = computed(() => {

  if(width.value < 321) {
    return '500px'
  }

  const height = Math.round((125 / 959) * (width.value - 321) + 145) - 30
  return `${height}px`
})

const contactoBgHeight = computed(() => {
  // Wait until component is ready and width is available
  if (!isReady.value || !width.value) {
    return '300px' // Default value during SSR/initial render
  }
if(width.value < 321) {
    return '500px'
  }

  const height = Math.round((125 / 959) * (width.value - 321) + 145)
  return `${height}px`
})

const contactoBgSize = computed(() => {
  if (!width.value) return '100% auto'
  
  const currentWidth = width.value
  
  // Gradual transition from 270% at 320px to 100% at 600px
  if (currentWidth <= 320) {
    return '270% auto'
  } else if (currentWidth >= 600) {
    return '100% auto'
  } else {
    // Linear interpolation between 320px and 600px
    const percentage = 270 - ((currentWidth - 320) * 170 / 280)
    return `${Math.round(percentage)}% auto`
  }
})

// Methods
const handleScroll = () => {
  scrolled.value = window.scrollY > 100
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 40
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

// Lifecycle
if (typeof window !== 'undefined') {
  scrolled.value = window.scrollY > 100
}

onMounted(async () => {
  // Wait for next tick to ensure DOM is fully rendered
  await nextTick()
  
  // Wait for width to be available before showing content
  const checkWidth = () => {
    if (width.value) {
      isReady.value = true
      handleScroll()
      window.addEventListener('scroll', handleScroll)
      
      if (window.location.hash) {
        setTimeout(() => {
          const sectionId = window.location.hash.substring(1)
          scrollToSection(sectionId)
        }, 100)
      }
    } else {
      requestAnimationFrame(checkWidth)
    }
  }
  
  checkWidth()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Layout */
.hero-section {
  position: relative;
}

.hero-banner {
  background-image: url('/images/banner_01.webp');
  background-repeat: no-repeat;
  transition: background-size 0.2s ease-out;
  will-change: background-size;
}

/* Section Headers */
.section-overline {
  color: #666;
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.section-title {
  color: #041845;
  font-size: 3rem;
  font-weight: 300;
}

/* Pastor Cards */
.pastor-card {
  border: 1px solid #e0e0e0;
  background-color: rgba(255, 255, 255, 0.5) !important;
  text-align: center;
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease-in-out;
}

.pastor-card:hover {
  transform: translateY(-8px);
}

.pastor-name {
  color: #041845;
  font-size: 1.5rem;
  font-weight: 400;
}

.pastor-role {
  color: #9e9e9e;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.pastor-description {
  color: #333;
  font-size: 1rem;
  line-height: 1.2;
  text-align: justify;
  text-indent: 2em;
}

/* Schedule Cards */
.schedule-card {
  border: 1px solid #e0e0e0;
  background-color: rgba(255, 255, 255, 0.6) !important;
  text-align: center;
  padding: 12px;
  transition: transform 0.3s ease-in-out;
}

.schedule-card:hover {
  transform: translateY(-8px);
}

.schedule-day {
  color: #041845;
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 16px;
}

.schedule-time {
  color: #555;
  font-size: 1.25rem;
  margin-bottom: 8px;
}

.schedule-type {
  color: #888;
  font-size: 0.875rem;
}

/* Location Section */
.location-title {
  color: #041845;
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 4px;
}

.location-label {
  color: #888;
  font-size: 0.75rem;
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.location-info {
  color: #555;
  font-size: 0.875rem;
}

.location-email {
  word-break: break-all;
}

.contact-link {
  color: #041845;
  text-decoration: none;
}

.contact-link:hover {
  color: #1976D2;
}

.maps-btn {
  text-transform: none;
}

.map-card {
  border: 1px solid #e0e0e0;
}

.map-iframe {
  border: 0;
  min-height: 500px;
}

/* CTA Section */
.cta-overline {
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.cta-title {
  color: white;
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 24px;
}

.cta-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.25rem;
  font-weight: 300;
  margin-bottom: 32px;
}

.cta-btn {
  text-transform: none;
  padding: 0 32px;
  cursor: pointer;
}

.cta-btn-solid {
  color: #041845;
}

/* Footer */
.footer {
  background-color: transparent;
  color: white;
}

.footer-title {
  color: white;
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: 16px;
}

.footer-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  line-height: 1.4;
}

.footer-social-title {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  letter-spacing: 2px;
  margin-bottom: 16px;
}

.social-icon {
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0px;
  padding: 0 0px;
}

.footer-contact {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  margin-bottom: 8px;
}

.footer-divider {
  border-color: rgba(255, 255, 255, 0.1);
}

.footer-copyright {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
}

/* Parallax Backgrounds */
.parallax-bg {
  background-image: url('/images/banner_02.webp');
  background-attachment: scroll;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;
  padding: 20px 0;
}

@media (min-width: 1024px) {
  .parallax-bg {
    background-attachment: fixed;
  }
}


.parallax-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 0;
}

.parallax-bg .v-col {
  position: relative;
  z-index: 1;
}

.ubicacion-bg {
  background-image: url('/images/banner_03.webp');
  background-attachment: fixed;
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;
}


.ubicacion-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, .4);
  z-index: 0;
}

.ubicacion-bg .v-row,
.ubicacion-bg .v-col {
  position: relative;
  z-index: 1;
}

.contacto-bg {
  background-color: #000000 !important;
  background-image: url('/images/banner_04.webp');
  background-attachment: scroll;
  background-position: top center;
  background-repeat: no-repeat;
  position: relative;
  transition: background-size 0.2s ease-out;
  will-change: background-size;
}

.contacto-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 0;
}

.contacto-bg .v-container,
.contacto-bg .v-footer {
  position: relative;
  z-index: 1;
}

/* Navbar Transition */
.navbar-transition {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

/* Global Overrides */
:deep(.v-application),
:deep(.v-application__wrap),
:deep(.v-main) {
  background: transparent;
  overflow-x: hidden;
  max-width: 100vw;
}

:deep(.v-main) {
  opacity: 0;
  transition: opacity 0.3s ease-in;
}

:deep(.v-main.content-ready) {
  opacity: 1;
}

:deep(.v-container) {
  max-width: 100%;
}

:deep(.v-container.v-container--fluid) {
  padding-left: 0;
  padding-right: 0;
}

/* Mobile Responsive */
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
  
  .section-title {
    font-size: 2rem;
  }
  
  .cta-title {
    font-size: 2rem;
  }
}
</style>