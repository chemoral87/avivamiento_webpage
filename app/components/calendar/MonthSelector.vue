<template>
  <v-row justify="center" class="mb-4">
    <v-col cols="12" md="10" lg="8">
      <div class="month-selector-bar">
        <button class="month-nav-btn" aria-label="Mes anterior" @click="emit('prev')">
          <v-icon size="22">mdi-chevron-left</v-icon>
        </button>
        <span class="month-label text-capitalize">
          {{ monthNames[calMonth] }} {{ calYear }}
        </span>
        <button class="month-nav-btn" aria-label="Mes siguiente" @click="emit('next')">
          <v-icon size="22">mdi-chevron-right</v-icon>
        </button>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
defineProps({
  calYear:  { type: Number, required: true },
  calMonth: { type: Number, required: true },
})

const emit = defineEmits(['prev', 'next'])

const monthNames = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]
</script>

<style scoped>
.month-selector-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #041845;
  border-radius: 4px;
  padding: 6px 8px;
}

.month-label {
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  user-select: none;
}

.month-nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.55);
  background: rgba(255, 255, 255, 0.10);
  color: #fff;
  cursor: pointer;
  transition: background 0.18s, border-color 0.18s, transform 0.12s;
}

.month-nav-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: #fff;
  transform: scale(1.08);
}

.month-nav-btn:active {
  transform: scale(0.95);
  background: rgba(255, 255, 255, 0.35);
}
</style>
