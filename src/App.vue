<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import BlankLayout from '@/layouts/BlankLayout.vue'
import IntroSplash from '@/components/common/IntroSplash.vue'
import { useIntro } from '@/composables/useIntro'

const route = useRoute()
const { isIntroActive, finishIntro, markIntroDismissed } = useIntro()

// Mapeamento dos layouts disponíveis
const layouts = {
  default: DefaultLayout,
  auth: AuthLayout,
  blank: BlankLayout,
}

/**
 * Layout computado com fallback automático para 'default'.
 * Sempre que a rota mudar, vamos tentar obter o layout dela.
 */
const currentLayout = computed(() => {
  const layoutKey = route.meta.layout || 'default'
  return layouts[layoutKey] || DefaultLayout
})
</script>

<template>
  <div class="app-root">
    <!-- Tela de apresentação inicial: Guilherme Taliberti com transição suave -->
    <Transition name="splash-fade" @after-leave="markIntroDismissed">
      <IntroSplash
        v-if="isIntroActive"
        name="Guilherme Taliberti"
        subtitle="Analista de Sistemas"
        :duration="2500"
        @finish="finishIntro"
      />
    </Transition>

    <component :is="currentLayout">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </component>
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100vh;
  width: 100%;
}

/* Transição suave de saída da tela de apresentação (splash) para a Home */
.splash-fade-leave-active {
  transition:
    opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    filter 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}

.splash-fade-leave-to {
  opacity: 0;
  transform: scale(1.03);
  filter: blur(8px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

