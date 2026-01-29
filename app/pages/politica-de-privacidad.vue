<template>
  <v-app>
    <AppNavBar 
      :menu-items="menuItems" 
      @toggle-drawer="drawer = !drawer"
      color="#041845"
      :elevation="1"
    />

    <MobileNavDrawer v-model="drawer" :menu-items="menuItems" />

    <v-main class="pa-0">
      <v-container class="py-12">
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <h1 class="text-h3 text-center mb-8 font-weight-bold">
              Política de Privacidad
            </h1>

            <div class="privacy-content">
              <p class="text-subtitle-1 text-grey-darken-1 mb-8">
                Última actualización: {{ lastUpdate }}
              </p>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">1. Introducción</h2>
                <p>
                  En Iglesia Avivamiento Monterrey, nos comprometemos a proteger su privacidad. 
                  Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos 
                  su información personal cuando visita nuestro sitio web.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">2. Información que Recopilamos</h2>
                <p class="mb-3">Podemos recopilar los siguientes tipos de información:</p>
                <ul class="ml-6">
                  <li><strong>Información de contacto:</strong> nombre, correo electrónico, teléfono cuando usted nos la proporciona voluntariamente</li>
                  <li><strong>Información de uso:</strong> datos sobre cómo usa nuestro sitio web, páginas visitadas y tiempo de navegación</li>
                  <li><strong>Información técnica:</strong> dirección IP, tipo de navegador, sistema operativo</li>
                </ul>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">3. Cómo Usamos su Información</h2>
                <p class="mb-3">Utilizamos la información recopilada para:</p>
                <ul class="ml-6">
                  <li>Responder a sus consultas y solicitudes</li>
                  <li>Enviarle información sobre eventos y actividades de la iglesia</li>
                  <li>Mejorar nuestro sitio web y servicios</li>
                  <li>Cumplir con obligaciones legales</li>
                </ul>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">4. Cookies y Tecnologías Similares</h2>
                <p>
                  Nuestro sitio web utiliza cookies y tecnologías similares para mejorar su 
                  experiencia de navegación. Las cookies son pequeños archivos de texto que 
                  se almacenan en su dispositivo. Puede configurar su navegador para rechazar 
                  cookies, aunque esto puede afectar la funcionalidad del sitio.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">5. Google Analytics</h2>
                <p>
                  Utilizamos Google Analytics para analizar el uso de nuestro sitio web. 
                  Google Analytics recopila información anónima sobre el comportamiento de los 
                  visitantes. Para más información sobre cómo Google usa estos datos, visite 
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">
                    la política de privacidad de Google
                  </a>.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">6. Compartir Información</h2>
                <p>
                  No vendemos, intercambiamos ni transferimos su información personal a terceros 
                  sin su consentimiento, excepto cuando sea necesario para proporcionar nuestros 
                  servicios o cuando lo exija la ley.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">7. Seguridad de la Información</h2>
                <p>
                  Implementamos medidas de seguridad técnicas y organizativas para proteger su 
                  información personal contra acceso no autorizado, alteración, divulgación o 
                  destrucción.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">8. Sus Derechos</h2>
                <p class="mb-3">Usted tiene derecho a:</p>
                <ul class="ml-6">
                  <li>Acceder a su información personal</li>
                  <li>Corregir información inexacta</li>
                  <li>Solicitar la eliminación de su información</li>
                  <li>Oponerse al procesamiento de su información</li>
                  <li>Retirar su consentimiento en cualquier momento</li>
                </ul>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">9. Enlaces a Otros Sitios</h2>
                <p>
                  Nuestro sitio web puede contener enlaces a sitios de terceros. No somos 
                  responsables de las prácticas de privacidad de estos sitios. Le recomendamos 
                  leer sus políticas de privacidad.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">10. Cambios a esta Política</h2>
                <p>
                  Podemos actualizar esta Política de Privacidad periódicamente. La fecha de la 
                  última actualización se indica al inicio de esta página. Le recomendamos revisar 
                  esta política regularmente.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">11. Contacto</h2>
                <p>
                  Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos, 
                  puede contactarnos a través de:
                </p>
                <ul class="ml-6 mt-3">
                  <li><strong>Email:</strong> contacto@avivamientomty.org</li>
                  <li><strong>Teléfono:</strong> +52 (81) 1234-5678</li>
                  <li><strong>Dirección:</strong> Monterrey, Nuevo León, México</li>
                </ul>
              </section>
            </div>
          </v-col>
        </v-row>
      </v-container>


    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const drawer = ref(false)

const menuItems = [
  { title: 'Inicio', to: '/' },
  { title: 'Calendario', to: '/calendar' },
  { title: 'Ministerios', to: '/ministerios' },
  { title: 'Testimonios', to: '/testimonios' },
]

const lastUpdate = 'Enero 2026'

useHead({
  title: 'Política de Privacidad - Iglesia Avivamiento Monterrey',
  meta: [
    {
      name: 'description',
      content: 'Política de privacidad de Iglesia Avivamiento Monterrey. Conoce cómo protegemos tu información personal y tus derechos de privacidad.',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
})
</script>

<style scoped>
.privacy-content {
  font-size: 1rem;
  line-height: 1.8;
}

.privacy-content h2 {
  color: #041845;
  margin-top: 2rem;
}

.privacy-content p {
  margin-bottom: 1rem;
}

.privacy-content ul {
  margin-bottom: 1rem;
}

.privacy-content li {
  margin-bottom: 0.5rem;
}

.privacy-content a {
  color: #1976d2;
  text-decoration: none;
}

.privacy-content a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  h1.text-h3 {
    font-size: 1.75rem !important;
  }

  .privacy-content h2 {
    font-size: 1.25rem !important;
  }
}
</style>
