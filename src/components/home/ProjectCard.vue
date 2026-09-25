<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { ProjectItem } from '@/types/project'

interface Props {
  project: ProjectItem
  growOnScroll?: boolean
  initialScale?: number
  maxWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  growOnScroll: true,
  initialScale: 0.65,
  maxWidth: 'min(1180px, 80vw)',
})

const cardRef = ref<HTMLElement | null>(null)
const scale = ref(props.growOnScroll ? props.initialScale : 1.0)
const opacity = ref(props.growOnScroll ? 0.45 : 1.0)
const isExpanded = ref(!props.growOnScroll)

let isListening = false

function updateScale(): void {
  if (!props.growOnScroll || isExpanded.value || typeof window === 'undefined') return
  if (!cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight

  // Centro geométrico do card e centro da viewport
  const cardCenter = rect.top + rect.height / 2
  const screenCenter = windowHeight / 2

  // Ponto de entrada: quando o topo do card entra pelo rodapé da tela
  const enterPoint = windowHeight + rect.height * 0.2

  // Progresso do crescimento: vai de 0 (ao entrar no rodapé) até 1.0 (ao chegar no meio da tela)
  const progress = Math.min(Math.max((enterPoint - cardCenter) / (enterPoint - screenCenter), 0), 1)
  const calculatedScale = props.initialScale + progress * (1.0 - props.initialScale)
  const calculatedOpacity = 0.45 + progress * 0.55

  // Regra monotônica: apenas cresce, nunca diminui de volta
  scale.value = Math.max(scale.value, calculatedScale)
  opacity.value = Math.max(opacity.value, calculatedOpacity)

  // Trava permanentemente no tamanho máximo assim que alcança o meio da tela
  if (scale.value >= 0.995) {
    scale.value = 1.0
    opacity.value = 1.0
    isExpanded.value = true
    removeListener()
  }
}

function onScroll(): void {
  window.requestAnimationFrame(updateScale)
}

function attachListener(): void {
  if (isListening || !props.growOnScroll || typeof window === 'undefined') return
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  isListening = true
}

function removeListener(): void {
  if (!isListening || typeof window === 'undefined') return
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  isListening = false
}

onMounted(() => {
  if (props.growOnScroll) {
    updateScale()
    attachListener()
  }
})

onBeforeUnmount(() => {
  removeListener()
})
</script>

<template>
  <article
    ref="cardRef"
    class="project-card"
    :class="{ 'is-expanded': isExpanded }"
    :style="{
      '--card-scale': scale,
      '--card-opacity': opacity,
      '--card-max-width': maxWidth,
      '--accent-color': project.accentColor,
    }"
    :aria-label="`Projeto: ${project.title}`"
  >
    <!-- Lado Esquerdo/Superior: Área Visual / Imagem / Ilustração Temática -->
    <div class="project-media-wrapper">
      <!-- Se houver imagem real fornecida -->
      <img
        v-if="project.image"
        :src="project.image"
        :alt="`Prévia visual do projeto ${project.title}`"
        class="project-image"
      />

      <!-- Espaço reservado / Ilustração temática moderna -->
      <div v-else class="project-placeholder" :class="`theme--${project.previewTheme}`">
        <div class="placeholder-topbar">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
          <span class="preview-filename">{{ project.repoName }} / preview</span>
        </div>

        <div class="placeholder-canvas">
          <!-- Tema Backend / Arquitetura Limpa / Kafka -->
          <template v-if="project.previewTheme === 'backend-architecture'">
            <div class="architecture-diagram">
              <div class="arch-layer core">
                <span class="layer-icon">☕</span>
                <span class="layer-name">Domain & Use Cases</span>
              </div>
              <div class="arch-flow">
                <span class="flow-pill">Kafka Events</span>
                <span class="flow-arrow">⇄</span>
                <span class="flow-pill">Flyway / Postgres</span>
              </div>
              <div class="arch-layer infra">
                <span class="layer-icon">🐳</span>
                <span class="layer-name">Docker & Spring Cloud</span>
              </div>
            </div>
          </template>

          <!-- Tema Frontend SPA / Vue 3 -->
          <template v-else-if="project.previewTheme === 'frontend-spa'">
            <div class="frontend-mockup">
              <div class="mockup-header">
                <span class="mock-tag">⚡ Vite + Pinia</span>
                <span class="mock-tag">Vue 3 Composition</span>
              </div>
              <div class="mockup-body">
                <div class="mock-block main-hero"></div>
                <div class="mock-grid">
                  <div class="mock-block mini"></div>
                  <div class="mock-block mini"></div>
                  <div class="mock-block mini"></div>
                </div>
              </div>
            </div>
          </template>

          <!-- Tema E-commerce / Plataforma -->
          <template v-else>
            <div class="ecommerce-mockup">
              <div class="shop-badge">📦 Catálogo Digital</div>
              <div class="shop-cards-row">
                <div class="shop-item-card">
                  <div class="item-pic"></div>
                  <div class="item-line"></div>
                </div>
                <div class="shop-item-card featured">
                  <div class="item-pic"></div>
                  <div class="item-line"></div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <div class="placeholder-footer">
          <span class="category-tag">{{ project.category }}</span>
          <span class="placeholder-hint">Espaço para captura de tela / demonstração</span>
        </div>
      </div>
    </div>

    <!-- Lado Direito/Inferior: Conteúdo, Tecnologias e Ações -->
    <div class="project-content">
      <div class="project-header">
        <span class="category-badge" :style="{ borderColor: project.accentColor }">
          {{ project.category }}
        </span>
        <div class="project-stats" v-if="project.stars !== undefined || project.forks !== undefined">
          <span v-if="project.stars !== undefined" class="stat-badge" title="Estrelas no GitHub">
            ⭐ {{ project.stars }}
          </span>
          <span v-if="project.forks !== undefined" class="stat-badge" title="Forks no GitHub">
            🍴 {{ project.forks }}
          </span>
        </div>
      </div>

      <h3 class="project-title">
        <a :href="project.githubUrl" target="_blank" rel="noopener noreferrer">
          {{ project.title }}
          <span class="external-icon" aria-hidden="true">↗</span>
        </a>
      </h3>

      <h4 class="project-subtitle">{{ project.subtitle }}</h4>

      <p class="project-description">{{ project.description }}</p>

      <!-- Tecnologias do Projeto -->
      <div class="project-tech-group">
        <h5 class="tech-group-title">Tecnologias & Padrões:</h5>
        <div class="tech-chips">
          <span
            v-for="tech in project.technologies"
            :key="tech"
            class="tech-chip"
          >
            {{ tech }}
          </span>
        </div>
      </div>

      <!-- Ações e Links Externos -->
      <div class="project-actions">
        <a
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-project btn-project--primary"
        >
          <svg class="btn-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
            />
          </svg>
          Ver no GitHub
        </a>

        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-project btn-project--secondary"
        >
          🚀 Demonstração Online
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* ============================================================================
   CARD INDIVIDUAL (COM CRESCIMENTO DINÂMICO ATÉ 80% DA VIEW)
   ============================================================================ */
.project-card {
  width: 100%;
  max-width: var(--card-max-width, min(1180px, 80vw));
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 1.2fr;
  align-items: stretch;
  gap: 2.25rem;

  padding: 2.25rem;
  border-radius: 24px;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);

  transform: scale(var(--card-scale, 0.65));
  opacity: var(--card-opacity, 0.45);
  transform-origin: center center;
  will-change: transform, opacity;
  transition:
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
}

.project-card.is-expanded {
  transform: scale(1);
  opacity: 1;
}

.project-card:hover {
  border-color: var(--accent-color, hsla(160, 100%, 37%, 0.6));
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.08);
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--accent-color, hsla(160, 100%, 37%, 1));
  opacity: 0.85;
}

/* ============================================================================
   ÁREA VISUAL / IMAGEM / PLACEHOLDER TEMÁTICO
   ============================================================================ */
.project-media-wrapper {
  position: relative;
  display: flex;
  align-items: stretch;
  min-height: 280px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.project-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(145deg, var(--color-background) 0%, var(--color-background-mute) 100%);
  padding: 1rem;
}

.placeholder-topbar {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border);
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}
.dot.red { background-color: #ff5f56; }
.dot.yellow { background-color: #ffbd2e; }
.dot.green { background-color: #27c93f; }

.preview-filename {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--color-text);
  opacity: 0.6;
  margin-left: 0.5rem;
}

.placeholder-canvas {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0.5rem;
}

/* Diagrama Backend */
.architecture-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.arch-layer {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 1rem;
  border-radius: 10px;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-heading);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.arch-flow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: #f89820;
}

.flow-pill {
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  background: rgba(248, 152, 32, 0.12);
  border: 1px dashed rgba(248, 152, 32, 0.4);
}

/* Mockup Frontend */
.frontend-mockup {
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mockup-header {
  display: flex;
  gap: 0.4rem;
}

.mock-tag {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  background-color: rgba(66, 184, 131, 0.15);
  color: #42b883;
  border: 1px solid rgba(66, 184, 131, 0.3);
}

.mockup-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mock-block.main-hero {
  height: 48px;
  border-radius: 8px;
  background: linear-gradient(90deg, rgba(66, 184, 131, 0.2) 0%, rgba(49, 120, 198, 0.2) 100%);
}

.mock-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem;
}

.mock-block.mini {
  height: 32px;
  border-radius: 6px;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
}

/* Mockup Ecommerce */
.ecommerce-mockup {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  width: 90%;
}

.shop-badge {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: #38bdf8;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.3);
}

.shop-cards-row {
  display: flex;
  gap: 0.75rem;
  width: 100%;
}

.shop-item-card {
  flex: 1;
  padding: 0.6rem;
  border-radius: 8px;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.shop-item-card.featured {
  border-color: rgba(56, 189, 248, 0.5);
}

.item-pic {
  height: 40px;
  border-radius: 6px;
  background-color: var(--color-background-mute);
}

.item-line {
  height: 8px;
  width: 60%;
  border-radius: 4px;
  background-color: var(--color-border);
}

.placeholder-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.6rem;
  border-top: 1px solid var(--color-border);
}

.category-tag {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-heading);
}

.placeholder-hint {
  font-family: var(--font-body);
  font-size: 0.72rem;
  color: var(--color-text);
  opacity: 0.5;
}

/* ============================================================================
   CONTEÚDO DO CARD (LADO DIREITO)
   ============================================================================ */
.project-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.25rem;
}

.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.category-badge {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-heading);
  padding: 0.25rem 0.7rem;
  border-radius: 6px;
  background-color: var(--color-background);
  border-left: 3px solid;
}

.project-stats {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.stat-badge {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text);
  background-color: var(--color-background);
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
}

.project-title {
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(1.4rem, 2.2vw, 1.85rem);
  font-weight: 700;
  line-height: 1.2;
}

.project-title a {
  text-decoration: none;
  color: var(--color-heading);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: color 0.2s ease;
}

.project-title a:hover {
  color: var(--accent-color, hsla(160, 100%, 37%, 1));
}

.external-icon {
  font-size: 0.9em;
  opacity: 0.6;
  transition: transform 0.2s ease;
}

.project-title a:hover .external-icon {
  transform: translate(2px, -2px);
  opacity: 1;
}

.project-subtitle {
  margin: -0.5rem 0 0;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: hsla(160, 100%, 37%, 1);
}

.project-description {
  margin: 0;
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-text);
  opacity: 0.9;
  line-height: 1.6;
}

/* Tecnologias */
.project-tech-group {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.tech-group-title {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  text-transform: uppercase;
  color: var(--color-text);
  opacity: 0.7;
  letter-spacing: 0.05em;
}

.tech-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.tech-chip {
  font-family: var(--font-mono);
  font-size: 0.76rem;
  padding: 0.28rem 0.65rem;
  border-radius: 6px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-heading);
  font-weight: 500;
  transition: all 0.2s ease;
}

.tech-chip:hover {
  border-color: var(--accent-color, hsla(160, 100%, 37%, 0.8));
  transform: translateY(-1px);
}

/* Botões */
.project-actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-top: 0.5rem;
}

.btn-project {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.65rem 1.25rem;
  border-radius: 10px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-project--primary {
  background-color: var(--color-heading);
  color: var(--color-background) !important;
}

.btn-project--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}

.btn-project--secondary {
  background-color: var(--color-background);
  color: var(--color-heading) !important;
  border: 1px solid var(--color-border);
}

.btn-project--secondary:hover {
  border-color: hsla(160, 100%, 37%, 0.5);
  transform: translateY(-2px);
}

/* ============================================================================
   RESPONSIVIDADE
   ============================================================================ */
@media (max-width: 960px) {
  .project-card {
    grid-template-columns: 1fr;
    max-width: 92vw;
    padding: 1.75rem;
    gap: 1.5rem;
  }

  .project-media-wrapper {
    min-height: 220px;
  }
}

@media (max-width: 600px) {
  .project-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn-project {
    width: 100%;
    justify-content: center;
  }
}
</style>
