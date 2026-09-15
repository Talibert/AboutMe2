<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface FeatureSlide {
  id: string
  icon: string
  badge: string
  title: string
  description: string
  highlights: string[]
}

const defaultSlides: FeatureSlide[] = [
  {
    id: 'pinia',
    icon: '🍍',
    badge: 'Estado Global',
    title: 'Pinia & Persistência',
    description:
      'Gerenciamento de estado reativo com a moderna sintaxe Setup Store e persistência seletiva em localStorage via pinia-plugin-persistedstate.',
    highlights: ['TypeScript Nativo', 'Persistência Seletiva (pick)', 'Stores Modulares'],
  },
  {
    id: 'router',
    icon: '🧭',
    badge: 'Navegação',
    title: 'Vue Router 4 & Layouts',
    description:
      'Sistema de layouts intercambiáveis (Default, Auth, Blank) resolvidos dinamicamente, com proteção de rotas e restauração de scroll.',
    highlights: ['Lazy-Loading (Code-splitting)', 'Guarda de Autenticação', 'Tipagem de RouteMeta'],
  },
  {
    id: 'vite',
    icon: '⚡',
    badge: 'Performance',
    title: 'Vite & TypeScript First',
    description:
      'Ambiente de desenvolvimento com Hot Module Replacement instantâneo e verificação estrita de tipos com vue-tsc.',
    highlights: ['Build em milissegundos', 'TypeScript Strict Mode', 'Alias de caminhos (@/)'],
  },
  {
    id: 'axios',
    icon: '🌐',
    badge: 'Comunicação',
    title: 'Axios & Interceptors',
    description:
      'Cliente HTTP centralizado com injeção automática de token Bearer, tratamento global de status 401 e chave seletora de Mock via .env.',
    highlights: ['Request Interceptors', 'Auto-logout em 401', 'Modo Mock desacoplado'],
  },
  {
    id: 'architecture',
    icon: '📁',
    badge: 'Escalabilidade',
    title: 'Arquitetura Limpa',
    description:
      'Estrutura modular de pastas projetada para que novos projetos cresçam com alta coesão e baixo acoplamento.',
    highlights: ['Separação em Camadas', 'Componentes Reutilizáveis', 'Services Isolados'],
  },
]

const props = withDefaults(
  defineProps<{
    slides?: FeatureSlide[]
    autoplayInterval?: number
  }>(),
  {
    autoplayInterval: 4000,
  },
)

const activeSlides = computed(() => props.slides ?? defaultSlides)

const currentIndex = ref(0)
const isPaused = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

// Touch / Swipe
let touchStartX = 0
let touchEndX = 0

function next() {
  currentIndex.value = (currentIndex.value + 1) % activeSlides.value.length
}

function prev() {
  currentIndex.value = (currentIndex.value - 1 + activeSlides.value.length) % activeSlides.value.length
}

function goTo(index: number) {
  currentIndex.value = index
}

function handleTouchStart(e: TouchEvent) {
  touchStartX = e.changedTouches[0]?.screenX || 0
}

function handleTouchEnd(e: TouchEvent) {
  touchEndX = e.changedTouches[0]?.screenX || 0
  handleSwipe()
}

function handleSwipe() {
  const diff = touchEndX - touchStartX
  if (Math.abs(diff) > 45) {
    if (diff > 0) {
      prev()
    } else {
      next()
    }
  }
}

function startAutoplay() {
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    if (!isPaused.value) {
      next()
    }
  }, props.autoplayInterval)
}

function stopAutoplay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <div
    class="carousel-wrapper"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <!-- Trilha Deslizante (Slider Track) -->
    <div class="carousel-viewport">
      <div
        class="carousel-track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(slide, index) in activeSlides"
          :key="slide.id"
          class="carousel-slide"
          :class="{ 'is-active': index === currentIndex }"
        >
          <div class="slide-card">
            <div class="slide-top">
              <span class="slide-badge">{{ slide.badge }}</span>
              <span class="slide-counter">{{ index + 1 }} / {{ activeSlides.length }}</span>
            </div>

            <div class="slide-header">
              <span class="slide-icon">{{ slide.icon }}</span>
              <h3 class="slide-title">{{ slide.title }}</h3>
            </div>

            <p class="slide-description">{{ slide.description }}</p>

            <div class="slide-highlights">
              <span
                v-for="highlight in slide.highlights"
                :key="highlight"
                class="highlight-tag"
              >
                ✓ {{ highlight }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Setas Embutidas na Altura Total (Invisíveis por padrão, reveladas no hover) -->
      <button
        type="button"
        class="nav-arrow nav-arrow--prev"
        aria-label="Slide anterior"
        title="Slide anterior"
        @click="prev"
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          stroke="currentColor"
          stroke-width="2.5"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        type="button"
        class="nav-arrow nav-arrow--next"
        aria-label="Próximo slide"
        title="Próximo slide"
        @click="next"
      >
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          stroke="currentColor"
          stroke-width="2.5"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>



    <!-- Indicadores de Pontos (Dots) -->
    <div class="carousel-dots">
      <button
        v-for="(slide, index) in activeSlides"
        :key="slide.id"
        type="button"
        class="dot"
        :class="{ 'is-active': index === currentIndex }"
        :title="`Ir para ${slide.title}`"
        @click="goTo(index)"
      />
    </div>
  </div>
</template>

<style scoped>
.carousel-wrapper {
  position: relative;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  user-select: none;
}

.carousel-viewport {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.carousel-wrapper:hover .carousel-viewport {
  border-color: hsla(160, 100%, 37%, 0.4);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.carousel-track {
  display: flex;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.carousel-slide {
  min-width: 100%;
  box-sizing: border-box;
}

.slide-card {
  padding: 2.25rem 3.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-height: 240px;
}

.slide-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.slide-badge {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  background-color: hsla(160, 100%, 37%, 0.15);
  color: hsla(160, 100%, 37%, 1);
}

.slide-counter {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text);
  opacity: 0.6;
}

.slide-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.slide-icon {
  font-size: 2.25rem;
  line-height: 1;
}

.slide-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0;
}

.slide-description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.9;
  margin: 0;
}

.slide-highlights {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 0.25rem;
}

.highlight-tag {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-heading);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
}

/* Setas de Navegação (Embutidas com Altura Total e Fade em Degradê) */
.nav-arrow {
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 90px;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  z-index: 10;
  opacity: 0;
  pointer-events: auto;
  transition: opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1),
              color 0.2s ease;
  color: var(--color-heading);
}

/* Seta Esquerda: Preto na borda externa -> Clareia de forma contínua e uniforme até a cor do card */
.nav-arrow--prev {
  left: 0;
  justify-content: flex-start;
  padding-left: 20px;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.5) 35%,
    rgba(0, 0, 0, 0.18) 70%,
    rgba(0, 0, 0, 0) 100%
  );
}

/* Seta Direita: Clareia do centro até a cor do card -> Preto na borda externa */
.nav-arrow--next {
  right: 0;
  justify-content: flex-end;
  padding-right: 20px;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.5) 35%,
    rgba(0, 0, 0, 0.18) 70%,
    rgba(0, 0, 0, 0) 100%
  );
}

/* Adaptação suave para o tema claro */
:root:not(.dark) .nav-arrow--prev {
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.12) 40%,
    rgba(0, 0, 0, 0) 100%
  );
}

:root:not(.dark) .nav-arrow--next {
  background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.25) 0%,
    rgba(0, 0, 0, 0.12) 40%,
    rgba(0, 0, 0, 0) 100%
  );
}

/* Cada seta só aparece individualmente quando o mouse entra na sua respectiva zona lateral */
.nav-arrow:hover {
  opacity: 1;
}

.nav-arrow:hover svg {
  color: hsla(160, 100%, 37%, 1);
}

.nav-arrow svg {
  transition: transform 0.2s ease, color 0.2s ease;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4));
}

.nav-arrow--prev:hover svg {
  transform: translateX(-4px) scale(1.2);
}

.nav-arrow--next:hover svg {
  transform: translateX(4px) scale(1.2);
}

.nav-arrow:active svg {
  transform: scale(0.92);
}


/* Indicadores de Pontos (Dots) */
.carousel-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--color-border);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.dot:hover {
  background-color: hsla(160, 100%, 37%, 0.5);
}

.dot.is-active {
  width: 28px;
  border-radius: 9999px;
  background-color: hsla(160, 100%, 37%, 1);
}

/* Responsividade Mobile */
@media (max-width: 768px) {
  .slide-card {
    padding: 1.5rem 2.25rem;
    min-height: auto;
  }

  .nav-arrow {
    width: 40px;
    opacity: 0.7;
    pointer-events: auto;
  }

  .slide-title {
    font-size: 1.25rem;
  }

  .slide-description {
    font-size: 0.925rem;
  }
}

</style>
