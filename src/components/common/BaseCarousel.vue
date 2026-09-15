<script setup lang="ts" generic="T extends Record<string, any> | any">
import { ref, watch, onMounted, onUnmounted } from 'vue'

/**
 * ============================================================================
 * COMPONENTE GENÉRICO DE CARROSSEL (BASE CAROUSEL)
 * ============================================================================
 *
 * Responsável estritamente pela mecânica, transições e interatividade de carrossel:
 * - Movimento deslizante da trilha via CSS transforms;
 * - Suporte a gestos touch/swipe em dispositivos móveis;
 * - Autoplay inteligente com pausa automática no hover;
 * - Setas de navegação nas bordas com degradê suave;
 * - Indicadores de paginação (dots);
 * - Totalmente agnóstico ao tipo de dado exibido (utiliza Scoped Slots e Generics).
 */

const props = withDefaults(
  defineProps<{
    items?: T[]
    loading?: boolean
    autoplayInterval?: number
    showArrows?: boolean
    showDots?: boolean
    getKey?: (item: T, index: number) => string | number
  }>(),
  {
    items: () => [],
    loading: false,
    autoplayInterval: 4000,
    showArrows: true,
    showDots: true,
    getKey: undefined,
  },
)

const emit = defineEmits<{
  slideChange: [index: number, item: T | undefined]
}>()

const currentIndex = ref(0)
const isPaused = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

// Touch / Swipe
let touchStartX = 0
let touchEndX = 0

function resolveKey(item: T, index: number): string | number {
  if (props.getKey) {
    return props.getKey(item, index)
  }
  if (item && typeof item === 'object' && 'id' in item && item.id != null) {
    return String(item.id)
  }
  return index
}

function next() {
  if (props.items.length <= 1) return
  const newIndex = (currentIndex.value + 1) % props.items.length
  goTo(newIndex)
}

function prev() {
  if (props.items.length <= 1) return
  const newIndex = (currentIndex.value - 1 + props.items.length) % props.items.length
  goTo(newIndex)
}

function goTo(index: number) {
  currentIndex.value = index
  emit('slideChange', index, props.items[index])
}

function handleTouchStart(e: TouchEvent) {
  touchStartX = e.changedTouches[0]?.screenX || 0
}

function handleTouchEnd(e: TouchEvent) {
  touchEndX = e.changedTouches[0]?.screenX || 0
  handleSwipe()
}

function handleSwipe() {
  if (props.items.length <= 1) return
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
  stopAutoplay()
  if (props.loading || props.items.length <= 1 || props.autoplayInterval <= 0) return

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

watch(
  () => props.items,
  (newItems) => {
    if (currentIndex.value >= newItems.length) {
      currentIndex.value = Math.max(0, newItems.length - 1)
    }
    startAutoplay()
  },
  { deep: true },
)

watch(
  () => props.loading,
  () => {
    startAutoplay()
  },
)

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
    <!-- ESTADO 1: Carregamento (Loading Skeleton) -->
    <div v-if="loading" class="carousel-viewport carousel-viewport--loading">
      <slot name="loading">
        <div class="skeleton-placeholder">
          <div class="skeleton-shimmer skeleton-line skeleton-line--short" />
          <div class="skeleton-shimmer skeleton-line skeleton-line--title" />
          <div class="skeleton-shimmer skeleton-line" />
          <div class="skeleton-shimmer skeleton-line skeleton-line--mid" />
        </div>
      </slot>
    </div>

    <!-- ESTADO 2: Lista Vazia -->
    <div v-else-if="items.length === 0" class="carousel-viewport carousel-viewport--empty">
      <slot name="empty">
        <div class="empty-placeholder">
          <span class="empty-icon">📂</span>
          <p class="empty-title">Nenhum item disponível</p>
          <p class="empty-sub">A lista de itens do carrossel está vazia.</p>
        </div>
      </slot>
    </div>

    <!-- ESTADO 3: Trilha de Slides -->
    <div v-else class="carousel-viewport">
      <div
        class="carousel-track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(item, index) in items"
          :key="resolveKey(item, index)"
          class="carousel-slide"
          :class="{ 'is-active': index === currentIndex }"
        >
          <!-- Scoped Slot: Entrega o item tipado e o index para customização -->
          <slot :item="item" :index="index" :is-active="index === currentIndex" />
        </div>
      </div>

      <!-- Setas de Navegação -->
      <template v-if="showArrows && items.length > 1">
        <slot name="prev-arrow" :prev="prev">
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
        </slot>

        <slot name="next-arrow" :next="next">
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
        </slot>
      </template>
    </div>

    <!-- Indicadores de Pontos (Dots) -->
    <div v-if="showDots && !loading && items.length > 1" class="carousel-dots">
      <slot
        name="dots"
        :current-index="currentIndex"
        :total="items.length"
        :go-to="goTo"
      >
        <button
          v-for="(_, index) in items"
          :key="index"
          type="button"
          class="dot"
          :class="{ 'is-active': index === currentIndex }"
          :title="`Ir para slide ${index + 1}`"
          @click="goTo(index)"
        />
      </slot>
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

/* Setas de Navegação com degradê uniforme */
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

/* Seta Esquerda: Preto na borda externa -> Clareia de forma uniforme até a cor do card */
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

/* Revelação individual no hover da zona da seta */
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

/* Skeleton Loading Padrão */
.skeleton-placeholder {
  padding: 2.5rem 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  min-height: 240px;
}

.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    var(--color-border) 25%,
    var(--color-background) 50%,
    var(--color-border) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 6px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton-line {
  height: 16px;
  width: 100%;
}

.skeleton-line--short {
  width: 80px;
  height: 20px;
  border-radius: 9999px;
}

.skeleton-line--title {
  width: 240px;
  height: 28px;
}

.skeleton-line--mid {
  width: 65%;
}

/* Empty State Padrão */
.empty-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 2rem;
  min-height: 240px;
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.empty-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0 0 0.25rem 0;
}

.empty-sub {
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.7;
  margin: 0;
}

/* Responsividade Mobile */
@media (max-width: 768px) {
  .nav-arrow {
    width: 44px;
    opacity: 0.7;
  }

  .skeleton-placeholder {
    padding: 1.5rem 2rem;
  }
}
</style>
