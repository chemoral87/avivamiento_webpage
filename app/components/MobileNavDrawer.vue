<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    temporary
    location="right"
    style="background-color: #041845;"
    
  >
    <v-list  style="background-color: #041845;">
      <v-list-item 
  
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.to"
        :href="item.href"
        @click="handleClick(item)"
        style="color: white; cursor: pointer;"
      
      >
        <template v-if="item.icon" v-slot:prepend>
          <v-icon class="mr-2">{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title >{{ item.title }}</v-list-item-title>
      </v-list-item>

      <v-divider class="my-2" thickness="3" style="border-color: rgba(255,255,255,1);"></v-divider>
      
      <SocialMediaLinks variant="mobile" />
      
      <v-divider class="my-2" thickness="3" style="border-color: rgba(255,255,255,1);"></v-divider>
      
      <v-list-item
        @click="handleLoginClick"
        style="color: white; cursor: pointer;"
      >
        <template v-slot:prepend>
          <v-icon class="mr-2">mdi-account</v-icon>
        </template>
        <v-list-item-title>Acceso</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  menuItems: {
    type: Array,
    required: true,
    // Cada item debe tener: { title, to?, href?, onClick?, icon? }
  }
})

const emit = defineEmits(['update:modelValue'])

const runtimeConfig = useRuntimeConfig()
const loginRoute = runtimeConfig.public.loginRoute

const handleClick = (item) => {
  if (item.onClick) {
    emit('update:modelValue', false)
    item.onClick()
  } else if (!item.to && !item.href) {
    emit('update:modelValue', false)
  }
}

const handleLoginClick = () => {
  emit('update:modelValue', false)
  window.open(loginRoute, '_self')
}
</script>
