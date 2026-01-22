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
              Condiciones del Servicio
            </h1>

            <div class="terms-content">
              <p class="text-subtitle-1 text-grey-darken-1 mb-8">
                Última actualización: {{ lastUpdate }}
              </p>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">1. Aceptación de los Términos</h2>
                <p>
                  Al acceder y utilizar el sitio web de Iglesia Avivamiento Monterrey, usted acepta 
                  estar sujeto a estos Términos y Condiciones de Servicio. Si no está de acuerdo con 
                  alguna parte de estos términos, no debe utilizar nuestro sitio web.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">2. Uso del Sitio Web</h2>
                <p class="mb-3">Al utilizar nuestro sitio web, usted se compromete a:</p>
                <ul class="ml-6">
                  <li>Utilizar el sitio únicamente con fines lícitos y legítimos</li>
                  <li>No realizar actividades que puedan dañar, deshabilitar o sobrecargar el sitio</li>
                  <li>No intentar acceder de manera no autorizada a ninguna parte del sitio</li>
                  <li>No utilizar el sitio para transmitir contenido ofensivo, difamatorio o ilegal</li>
                  <li>Respetar los derechos de propiedad intelectual</li>
                </ul>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">3. Propiedad Intelectual</h2>
                <p>
                  Todo el contenido del sitio web, incluyendo pero no limitado a textos, gráficos, 
                  logotipos, imágenes, videos, audio y software, es propiedad de Iglesia Avivamiento 
                  Monterrey o de sus proveedores de contenido y está protegido por las leyes de 
                  derechos de autor y propiedad intelectual.
                </p>
                <p class="mt-3">
                  No está permitido copiar, reproducir, distribuir, transmitir, mostrar, vender, 
                  licenciar o explotar cualquier contenido sin el consentimiento previo por escrito 
                  de Iglesia Avivamiento Monterrey.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">4. Contenido Generado por Usuarios</h2>
                <p>
                  Si usted envía testimonios, comentarios u otro contenido al sitio web, usted otorga 
                  a Iglesia Avivamiento Monterrey una licencia no exclusiva, libre de regalías, 
                  perpetua e irrevocable para usar, reproducir, modificar y publicar dicho contenido 
                  en cualquier medio.
                </p>
                <p class="mt-3">
                  Usted declara y garantiza que posee todos los derechos necesarios sobre el contenido 
                  que envía y que dicho contenido no infringe los derechos de terceros.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">5. Enlaces a Sitios de Terceros</h2>
                <p>
                  Nuestro sitio web puede contener enlaces a sitios web de terceros que no son operados 
                  por nosotros. No tenemos control sobre el contenido, políticas de privacidad o 
                  prácticas de sitios web de terceros y no asumimos responsabilidad por ellos.
                </p>
                <p class="mt-3">
                  Le recomendamos leer los términos y condiciones y políticas de privacidad de cualquier 
                  sitio web de terceros que visite.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">6. Información de Eventos y Actividades</h2>
                <p>
                  La información sobre eventos, horarios y actividades se proporciona de buena fe y 
                  puede estar sujeta a cambios sin previo aviso. Nos reservamos el derecho de modificar, 
                  cancelar o reprogramar cualquier evento o actividad sin responsabilidad.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">7. Limitación de Responsabilidad</h2>
                <p class="mb-3">
                  En la máxima medida permitida por la ley, Iglesia Avivamiento Monterrey no será 
                  responsable de:
                </p>
                <ul class="ml-6">
                  <li>Daños directos, indirectos, incidentales o consecuentes derivados del uso del sitio</li>
                  <li>Errores u omisiones en el contenido del sitio web</li>
                  <li>Interrupciones o suspensiones del servicio</li>
                  <li>Pérdida de datos o información</li>
                  <li>Acceso no autorizado a nuestros servidores</li>
                </ul>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">8. Exención de Garantías</h2>
                <p>
                  El sitio web se proporciona "tal cual" y "según disponibilidad" sin garantías de 
                  ningún tipo, ya sean expresas o implícitas, incluyendo pero no limitado a garantías 
                  de comerciabilidad, idoneidad para un propósito particular o no infracción.
                </p>
                <p class="mt-3">
                  No garantizamos que el sitio web estará disponible de manera ininterrumpida, segura 
                  o libre de errores.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">9. Indemnización</h2>
                <p>
                  Usted acepta indemnizar y mantener indemne a Iglesia Avivamiento Monterrey, sus 
                  directores, empleados, voluntarios y afiliados de cualquier reclamo, demanda, 
                  responsabilidad, daño, pérdida o gasto, incluyendo honorarios razonables de 
                  abogados, que surjan de su uso del sitio web o violación de estos términos.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">10. Modificaciones de los Términos</h2>
                <p>
                  Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier 
                  momento. Las modificaciones entrarán en vigor inmediatamente después de su 
                  publicación en el sitio web. Su uso continuado del sitio después de cualquier 
                  cambio constituye su aceptación de los nuevos términos.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">11. Terminación</h2>
                <p>
                  Nos reservamos el derecho de suspender o terminar su acceso al sitio web en 
                  cualquier momento, sin previo aviso, por cualquier motivo, incluyendo si creemos 
                  que ha violado estos términos.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">12. Ley Aplicable</h2>
                <p>
                  Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes 
                  de los Estados Unidos Mexicanos. Cualquier disputa relacionada con estos términos 
                  estará sujeta a la jurisdicción exclusiva de los tribunales de Monterrey, Nuevo León.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">13. Divisibilidad</h2>
                <p>
                  Si alguna disposición de estos términos se considera inválida o inaplicable, dicha 
                  disposición se eliminará o limitará en la medida mínima necesaria, y las disposiciones 
                  restantes continuarán en pleno vigor y efecto.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-h5 mb-4 font-weight-bold">14. Contacto</h2>
                <p>
                  Si tiene preguntas sobre estos Términos y Condiciones, puede contactarnos a través de:
                </p>
                <ul class="ml-6 mt-3">
                  <li><strong>Email:</strong> contacto@avivamientomty.org</li>
                  <li><strong>Teléfono:</strong> +52 (81) 1234-5678</li>
                  <li><strong>Dirección:</strong> Monterrey, Nuevo León, México</li>
                </ul>
              </section>

              <v-divider class="my-8"></v-divider>

              <p class="text-center text-grey">
                Al utilizar este sitio web, usted reconoce que ha leído, entendido y 
                aceptado estos Términos y Condiciones del Servicio.
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <WhatsAppButton />
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
  title: 'Condiciones del Servicio - Iglesia Avivamiento Monterrey',
  meta: [
    {
      name: 'description',
      content: 'Términos y condiciones de uso del sitio web de Iglesia Avivamiento Monterrey. Conozca las normas y políticas que rigen el uso de nuestros servicios en línea.',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
})
</script>

<style scoped>
.terms-content {
  font-size: 1rem;
  line-height: 1.8;
}

.terms-content h2 {
  color: #041845;
  margin-top: 2rem;
}

.terms-content p {
  margin-bottom: 1rem;
}

.terms-content ul {
  margin-bottom: 1rem;
}

.terms-content li {
  margin-bottom: 0.5rem;
}

.terms-content a {
  color: #1976d2;
  text-decoration: none;
}

.terms-content a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  h1.text-h3 {
    font-size: 1.75rem !important;
  }

  .terms-content h2 {
    font-size: 1.25rem !important;
  }
}
</style>
