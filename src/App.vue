<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'

const route = useRoute()

// Mapeamento dos layouts disponíveis
const layouts = {
  default: DefaultLayout,
  auth: AuthLayout,
  blank: BlankLayout,
}

// Layout computado com fallback automático para 'default'
const currentLayout = computed(() => {
  const layoutKey = route.meta.layout || 'default'
  return layouts[layoutKey] || DefaultLayout
})
</script>

<template>
  <component :is="currentLayout">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </component>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
