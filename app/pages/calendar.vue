<template>
  <v-app>
    <v-app-bar 
      app 
      color="#041845"
      elevation="1" 
      height="70"
    >
      <v-container class="d-flex align-center">
        <v-toolbar-title 
          class="text-h6 font-weight-bold" 
          style="color: white;"
        >
          AV MTY
        </v-toolbar-title>
        <v-spacer></v-spacer>
        
        <!-- Desktop Menu -->
        <div class="d-none d-sm-flex align-center">
        <v-btn 
          :to="'/land'" 
          variant="text"
          class="mx-0 px-3 text-body-1"
          style="text-transform: none; color: white;"
        >
          Inicio
        </v-btn>
        <v-btn 
          @click="goToPage('/land#horarios')" 
          variant="text"
          class="mx-0 px-3 text-body-1"
          style="text-transform: none; color: white; cursor: pointer;"
        >
          Horarios
        </v-btn>
        <v-btn 
          @click="goToPage('/land#ubicacion')" 
          variant="text"
          class="mx-0 px-3 text-body-1"
          style="text-transform: none; color: white; cursor: pointer;"
        >
          Ubicación
        </v-btn>
        <v-btn 
          @click="goToPage('/land#contacto')" 
          variant="text"
          class="mx-0 px-3 text-body-1"
          style="text-transform: none; color: white; cursor: pointer;"
        >
          Contacto
        </v-btn>
        <v-divider vertical class="mx-2" style="border-color: rgba(255,255,255,0.3);"></v-divider>
        <v-btn 
          icon 
          variant="text" 
          href="https://www.facebook.com/IglesiaAvivamientoMonterrey" 
          target="_blank"
      
          style="color: white;"
        >
          <v-icon size="24">mdi-facebook</v-icon>
        </v-btn>
        <v-btn 
          icon 
          variant="text" 
          href="https://www.instagram.com/avivamientomonterrey/" 
          target="_blank"
   
          style="color: white;"
        >
          <v-icon size="24">mdi-instagram</v-icon>
        </v-btn>
        <v-btn 
          icon 
          variant="text" 
          href="https://www.tiktok.com/@avivamientomonterrey" 
          target="_blank"
       
          style="color: white;"
        >
          <v-icon size="24">mdi-music-note</v-icon>
        </v-btn>
        <v-btn 
          icon 
          variant="text" 
          href="https://open.spotify.com/show/3BlpJIaQRraIURcanH5rg1" 
          target="_blank"
      
          style="color: white;"
        >
          <v-icon size="24">mdi-spotify</v-icon>
        </v-btn>
        </div>
        
        <!-- Mobile Menu Button -->
        <v-btn 
          icon 
          variant="text"
          class="d-sm-none"
          style="color: white;"
          @click="drawer = !drawer"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="right"
      style="background-color: #041845;"
    >
      <v-list style="background-color: #041845;">
        <v-list-item
          :to="'/land'"
          style="color: white;"
        >
          <v-list-item-title>Inicio</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="goToSection('/land#horarios')"
          style="color: white; cursor: pointer;"
        >
          <v-list-item-title>Horarios</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="goToSection('/land#ubicacion')"
          style="color: white; cursor: pointer;"
        >
          <v-list-item-title>Ubicación</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="goToSection('/land#contacto')"
          style="color: white; cursor: pointer;"
        >
          <v-list-item-title>Contacto</v-list-item-title>
        </v-list-item>
        <v-divider class="my-4" style="border-color: rgba(255,255,255,0.3);"></v-divider>
        <v-list-item
          href="https://www.facebook.com/IglesiaAvivamientoMonterrey"
          target="_blank"
          style="color: white;"
        >
          <template v-slot:prepend>
            <v-icon>mdi-facebook</v-icon>
          </template>
          <v-list-item-title>Facebook</v-list-item-title>
        </v-list-item>
        <v-list-item
          href="https://www.instagram.com/avivamientomonterrey/"
          target="_blank"
          style="color: white;"
        >
          <template v-slot:prepend>
            <v-icon>mdi-instagram</v-icon>
          </template>
          <v-list-item-title>Instagram</v-list-item-title>
        </v-list-item>
        <v-list-item
          href="https://www.tiktok.com/@avivamientomonterrey"
          target="_blank"
          style="color: white;"
        >
          <template v-slot:prepend>
            <v-icon>mdi-music-note</v-icon>
          </template>
          <v-list-item-title>TikTok</v-list-item-title>
        </v-list-item>
        <v-list-item
          href="https://open.spotify.com/show/3BlpJIaQRraIURcanH5rg1"
          target="_blank"
          style="color: white;"
        >
          <template v-slot:prepend>
            <v-icon>mdi-spotify</v-icon>
          </template>
          <v-list-item-title>Spotify</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-4">
      <v-container class="py-16">
        <v-row justify="center">
          <v-col cols="12" md="6" lg="5">
            <v-card elevation="0" class="event-card" style="border: 1px solid #e0e0e0; height: 100%;">
              <v-img
                src="/images/poster2.jpg"
                height="250"
                cover
                gradient="to bottom, rgba(4,24,69,.3), rgba(4,24,69,.7)"
              >
                <div class="d-flex flex-column fill-height pa-4">
                  <v-chip color="#041845" size="small" class="mb-2" style="width: fit-content;">
                    PRÓXIMAMENTE
                  </v-chip>
                </div>
              </v-img>
              <v-card-text class="pa-6">
                <div class="d-flex align-center mb-3">
                  <v-icon color="#041845" class="mr-2">mdi-calendar</v-icon>
                  <span class="text-body-2" style="color: #666;">Diciembre 2025</span>
                </div>
                <h3 class="text-h5 font-weight-regular mb-3" style="color: #041845;">
                  Fiesta Navideña
                </h3>
                <p class="text-body-2 mb-4" style="color: #555; line-height: 1.8;">
                  Celebra con nosotros la Navidad en una noche llena de alegría, convivencia familiar y actividades especiales para toda la familia.
                </p>
                <div class="d-flex align-center">
                  <v-icon size="small" color="#666" class="mr-2">mdi-clock-outline</v-icon>
                  <span class="text-body-2" style="color: #666;">Por confirmar</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6" lg="5">
            <v-card elevation="0" class="event-card" style="border: 1px solid #e0e0e0; height: 100%;">
              <v-img
                src="/images/poster2.jpg"
                height="250"
                cover
                gradient="to bottom, rgba(4,24,69,.3), rgba(4,24,69,.7)"
              >
                <div class="d-flex flex-column fill-height pa-4">
                  <v-chip color="#041845" size="small" class="mb-2" style="width: fit-content;">
                    PRÓXIMAMENTE
                  </v-chip>
                </div>
              </v-img>
              <v-card-text class="pa-6">
                <div class="d-flex align-center mb-3">
                  <v-icon color="#041845" class="mr-2">mdi-calendar</v-icon>
                  <span class="text-body-2" style="color: #666;">Diciembre 2025</span>
                </div>
                <h3 class="text-h5 font-weight-regular mb-3" style="color: #041845;">
                  Obra Navideña
                </h3>
                <p class="text-body-2 mb-4" style="color: #555; line-height: 1.8;">
                  Disfruta de una presentación especial donde celebramos el verdadero significado de la Navidad a través de una obra teatral.
                </p>
                <div class="d-flex align-center">
                  <v-icon size="small" color="#666" class="mr-2">mdi-clock-outline</v-icon>
                  <span class="text-body-2" style="color: #666;">Por confirmar</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)

const goToPage = (path) => {
  navigateTo(path)
}

const goToSection = (path) => {
  drawer.value = false
  navigateTo(path)
}

useHead({
  title: 'Calendario de Eventos - Avivamiento Monterrey',
  meta: [
    {
      name: 'description',
      content: 'Descubre los próximos eventos y actividades especiales de la Iglesia Avivamiento Monterrey.'
    }
  ]
})
</script>

<style scoped>
.event-card {
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.event-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
</style>
