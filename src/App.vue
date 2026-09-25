<script setup lang="ts">
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import IntroSplash from '@/components/common/IntroSplash.vue'
import { useIntro } from '@/composables/useIntro'

const route = useRoute()
const { isIntroActive, finishIntro, markIntroDismissed } = useIntro()
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

    <DefaultLayout>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </DefaultLayout>
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

