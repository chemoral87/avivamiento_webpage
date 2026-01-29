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
              Eliminación de Datos de Usuario
            </h1>

            <div class="deletion-content">
              <p class="text-subtitle-1 text-grey-darken-1 mb-8">
                Última actualización: {{ lastUpdate }}
              </p>

              <v-alert
                type="info"
                variant="tonal"
                class="mb-8"
              >
                Respetamos su derecho a la privacidad y al control de su información personal. 
                Esta página explica cómo puede solicitar la eliminación de sus datos.
              </v-alert>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">1. Su Derecho a la Eliminación de Datos</h2>
                <p>
                  De acuerdo con las leyes de protección de datos aplicables, usted tiene derecho a 
                  solicitar la eliminación de su información personal que hayamos recopilado a través 
                  de nuestro sitio web o servicios.
                </p>
                <p class="mt-3">
                  Este derecho incluye la eliminación de datos personales como:
                </p>
                <ul class="ml-6 mt-2">
                  <li>Nombre y apellidos</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Número de teléfono</li>
                  <li>Testimonios enviados</li>
                  <li>Información de contacto voluntaria</li>
                  <li>Cualquier otro dato personal proporcionado</li>
                </ul>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">2. Cómo Solicitar la Eliminación</h2>
                <p class="mb-4">
                  Para solicitar la eliminación de sus datos personales, puede utilizar cualquiera 
                  de los siguientes métodos:
                </p>

                <v-card variant="outlined" class="mb-4 pa-4">
                  <h3 class="text-h6 mb-3">
                    <v-icon color="primary" class="mr-2">mdi-email</v-icon>
                    Por Correo Electrónico
                  </h3>
                  <p class="mb-2">
                    Envíe un correo electrónico a: 
                    <a href="mailto:privacidad@avivamientomty.org">privacidad@avivamientomty.org</a>
                  </p>
                  <p class="text-grey-darken-1">
                    Asunto: "Solicitud de Eliminación de Datos Personales"
                  </p>
                </v-card>

                <v-card variant="outlined" class="mb-4 pa-4">
                  <h3 class="text-h6 mb-3">
                    <v-icon color="primary" class="mr-2">mdi-phone</v-icon>
                    Por Teléfono
                  </h3>
                  <p class="mb-0">
                    Llame al: <strong>+52 (81) 1234-5678</strong>
                  </p>
                  <p class="text-grey-darken-1">
                    Horario: Lunes a Viernes, 9:00 AM - 6:00 PM
                  </p>
                </v-card>

                <v-card variant="outlined" class="pa-4">
                  <h3 class="text-h6 mb-3">
                    <v-icon color="primary" class="mr-2">mdi-map-marker</v-icon>
                    En Persona
                  </h3>
                  <p class="mb-0">
                    Visite nuestras oficinas en Monterrey, Nuevo León
                  </p>
                  <p class="text-grey-darken-1">
                    Solicite hablar con el responsable de protección de datos
                  </p>
                </v-card>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">3. Información Requerida</h2>
                <p class="mb-3">
                  Para procesar su solicitud de manera eficiente, por favor proporcione la 
                  siguiente información:
                </p>
                <ul class="ml-6">
                  <li><strong>Nombre completo:</strong> Para identificar sus datos en nuestros sistemas</li>
                  <li><strong>Correo electrónico:</strong> El mismo que utilizó al proporcionar sus datos</li>
                  <li><strong>Descripción de datos:</strong> Qué información desea eliminar (si conoce detalles específicos)</li>
                  <li><strong>Verificación de identidad:</strong> Puede ser necesaria para proteger su privacidad</li>
                </ul>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">4. Tiempo de Procesamiento</h2>
                <v-timeline side="end" density="compact" class="mt-4">
                  <v-timeline-item
                    dot-color="primary"
                    size="small"
                  >
                    <div class="mb-4">
                      <div class="font-weight-bold">1-2 días hábiles</div>
                      <div class="text-grey-darken-1">Confirmación de recepción de su solicitud</div>
                    </div>
                  </v-timeline-item>
                  
                  <v-timeline-item
                    dot-color="primary"
                    size="small"
                  >
                    <div class="mb-4">
                      <div class="font-weight-bold">3-5 días hábiles</div>
                      <div class="text-grey-darken-1">Verificación de identidad (si es necesario)</div>
                    </div>
                  </v-timeline-item>
                  
                  <v-timeline-item
                    dot-color="primary"
                    size="small"
                  >
                    <div>
                      <div class="font-weight-bold">10-15 días hábiles</div>
                      <div class="text-grey-darken-1">Eliminación completa de sus datos</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
                
                <p class="mt-4">
                  Le notificaremos por correo electrónico una vez que se haya completado 
                  la eliminación de sus datos.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">5. Excepciones y Limitaciones</h2>
                <p class="mb-3">
                  En algunos casos, es posible que no podamos eliminar ciertos datos debido a:
                </p>
                <ul class="ml-6">
                  <li>
                    <strong>Obligaciones legales:</strong> Cuando debemos conservar datos para 
                    cumplir con requisitos legales o regulatorios
                  </li>
                  <li>
                    <strong>Finalización de transacciones:</strong> Para completar servicios o 
                    transacciones que usted solicitó
                  </li>
                  <li>
                    <strong>Detección de fraude:</strong> Para detectar y prevenir actividades 
                    fraudulentas o de seguridad
                  </li>
                  <li>
                    <strong>Ejercicio de derechos legales:</strong> Para establecer, ejercer o 
                    defender reclamaciones legales
                  </li>
                  <li>
                    <strong>Datos agregados o anonimizados:</strong> Información que ya no puede 
                    identificarlo personalmente
                  </li>
                </ul>
                <p class="mt-3">
                  Le informaremos si alguna de estas excepciones se aplica a su solicitud.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">6. Consecuencias de la Eliminación</h2>
                <v-alert
                  type="warning"
                  variant="tonal"
                  class="mb-4"
                >
                  <strong>Importante:</strong> La eliminación de sus datos puede tener las 
                  siguientes consecuencias:
                </v-alert>
                <ul class="ml-6">
                  <li>No podremos contactarlo sobre eventos o actividades de la iglesia</li>
                  <li>Perderá acceso a servicios personalizados si los había</li>
                  <li>Sus testimonios publicados serán removidos de nuestro sitio web</li>
                  <li>No podremos responder a consultas previas que haya realizado</li>
                </ul>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">7. Datos en Servicios de Terceros</h2>
                <p>
                  Si sus datos han sido compartidos con servicios de terceros (como Google Analytics 
                  o plataformas de email), debemos notificar a estos servicios sobre su solicitud. 
                  Sin embargo, no podemos garantizar la eliminación inmediata de datos en sistemas 
                  de terceros sobre los cuales no tenemos control directo.
                </p>
                <p class="mt-3">
                  Para datos en servicios como:
                </p>
                <ul class="ml-6 mt-2">
                  <li><strong>Google Analytics:</strong> Los datos se eliminan según las políticas de Google</li>
                  <li><strong>Redes sociales:</strong> Debe solicitar eliminación directamente a la plataforma</li>
                </ul>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">8. Alternativas a la Eliminación</h2>
                <p class="mb-3">
                  Si no está seguro de querer eliminar completamente sus datos, puede considerar 
                  estas alternativas:
                </p>
                <v-card variant="outlined" class="pa-4">
                  <ul class="ml-4">
                    <li class="mb-2">
                      <strong>Corrección de datos:</strong> Actualizar información incorrecta o desactualizada
                    </li>
                    <li class="mb-2">
                      <strong>Restricción de procesamiento:</strong> Limitar cómo usamos sus datos
                    </li>
                    <li class="mb-2">
                      <strong>Oposición al procesamiento:</strong> Detener ciertos usos de sus datos
                    </li>
                    <li>
                      <strong>Portabilidad de datos:</strong> Obtener una copia de sus datos en formato estructurado
                    </li>
                  </ul>
                </v-card>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">9. Confirmación y Seguimiento</h2>
                <p>
                  Una vez completada la eliminación, recibirá una confirmación por escrito. 
                  Esta confirmación incluirá:
                </p>
                <ul class="ml-6 mt-2">
                  <li>Fecha de eliminación</li>
                  <li>Tipos de datos eliminados</li>
                  <li>Número de referencia de su solicitud</li>
                  <li>Información sobre datos que no pudieron ser eliminados (si aplica)</li>
                </ul>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">10. Preguntas Frecuentes</h2>
                
                <v-expansion-panels variant="accordion" class="mt-4">
                  <v-expansion-panel>
                    <v-expansion-panel-title>
                      ¿Puedo solicitar la eliminación de solo algunos datos?
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      Sí, puede solicitar la eliminación de datos específicos. Indíquelo claramente 
                      en su solicitud y haremos nuestro mejor esfuerzo para cumplir con su petición.
                    </v-expansion-panel-text>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-title>
                      ¿Es gratuito solicitar la eliminación de datos?
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      Sí, no cobramos ninguna tarifa por procesar solicitudes de eliminación de datos.
                    </v-expansion-panel-text>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-title>
                      ¿Qué pasa si cambio de opinión después de solicitar la eliminación?
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      Puede cancelar su solicitud antes de que se complete el proceso. Contáctenos 
                      lo antes posible si desea cancelar. Una vez que los datos se hayan eliminado, 
                      no podremos recuperarlos.
                    </v-expansion-panel-text>
                  </v-expansion-panel>

                  <v-expansion-panel>
                    <v-expansion-panel-title>
                      ¿Cómo sé que mis datos realmente fueron eliminados?
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      Le enviaremos una confirmación por escrito detallando qué datos fueron eliminados 
                      y de qué sistemas. Si tiene dudas adicionales, puede contactarnos para verificación.
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">11. Contacto</h2>
                <v-card variant="outlined" class="pa-6">
                  <p class="mb-4">
                    Si tiene preguntas sobre el proceso de eliminación de datos o necesita ayuda 
                    para presentar una solicitud:
                  </p>
                  <v-list density="compact">
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-email</v-icon>
                      </template>
                      <v-list-item-title>
                        <strong>Email:</strong> 
                        <a href="mailto:privacidad@avivamientomty.org">privacidad@avivamientomty.org</a>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-phone</v-icon>
                      </template>
                      <v-list-item-title>
                        <strong>Teléfono:</strong> +52 (81) 1234-5678
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <template v-slot:prepend>
                        <v-icon color="primary">mdi-map-marker</v-icon>
                      </template>
                      <v-list-item-title>
                        <strong>Dirección:</strong> Monterrey, Nuevo León, México
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </section>

              <v-divider class="my-8"></v-divider>

              <v-card color="primary" variant="tonal" class="pa-6 text-center">
                <h3 class="text-h6 mb-3">¿Listo para solicitar la eliminación?</h3>
                <p class="mb-4">
                  Estamos aquí para ayudarle a ejercer sus derechos de privacidad.
                </p>
                <v-btn
                  color="primary"
                  size="large"
                  href="mailto:privacidad@avivamientomty.org?subject=Solicitud de Eliminación de Datos Personales"
                >
                  <v-icon left class="mr-2">mdi-email</v-icon>
                  Enviar Solicitud por Email
                </v-btn>
              </v-card>
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
  title: 'Eliminación de Datos de Usuario - Iglesia Avivamiento Monterrey',
  meta: [
    {
      name: 'description',
      content: 'Solicite la eliminación de sus datos personales. Información sobre cómo ejercer su derecho a la eliminación de datos según las leyes de protección de datos.',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
})
</script>

<style scoped>
.deletion-content {
  font-size: 1rem;
  line-height: 1.8;
}

.deletion-content h2 {
  color: #041845;
  margin-top: 2rem;
}

.deletion-content h3 {
  color: #041845;
}

.deletion-content p {
  margin-bottom: 1rem;
}

.deletion-content ul {
  margin-bottom: 1rem;
}

.deletion-content li {
  margin-bottom: 0.5rem;
}

.deletion-content a {
  color: #1976d2;
  text-decoration: none;
}

.deletion-content a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  h1.text-h3 {
    font-size: 1.75rem !important;
  }

  .deletion-content h2 {
    font-size: 1.25rem !important;
  }
}
</style>
