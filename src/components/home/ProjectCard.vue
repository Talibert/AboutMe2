<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { ProjectItem, ProjectArchitectureDiagram } from '@/types/project'

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

const diagram = computed<ProjectArchitectureDiagram>(() => {
  if (props.project.architectureDiagram) {
    return props.project.architectureDiagram
  }
  // Fallbacks de segurança para compatibilidade com dados parciais ou mocks
  if (props.project.previewTheme === 'frontend-spa') {
    return {
      topLayer: { icon: '⚡', name: 'Vue 3 & Composition API', tag: 'UI & Views' },
      flow: { leftPill: 'Pinia (State)', rightPill: 'Vue Router & Axios', arrow: '⇄' },
      bottomLayer: { icon: '🧪', name: 'Vitest & Playwright E2E', tag: 'Testes & CI' },
    }
  }
  if (props.project.previewTheme === 'ecommerce-platform') {
    return {
      topLayer: { icon: '🎮', name: 'Catálogo & Inventário', tag: 'REST API' },
      flow: { leftPill: 'Spring Security (Auth)', rightPill: 'Transações & Pedidos', arrow: '⇄' },
      bottomLayer: { icon: '🗄️', name: 'Spring Data JPA & Hibernate', tag: 'PostgreSQL' },
    }
  }
  return {
    topLayer: { icon: '☕', name: 'Domain & Use Cases', tag: 'Clean Arch' },
    flow: { leftPill: 'Kafka Events', rightPill: 'Flyway / Postgres', arrow: '⇄' },
    bottomLayer: { icon: '🐳', name: 'Docker & Spring Boot 3', tag: 'Infra & Cloud' },
  }
})

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

      <!-- Ilustração temática moderna / Diagrama de arquitetura padronizado -->
      <div v-else class="project-placeholder" :class="`theme--${project.previewTheme}`">
        <div class="placeholder-topbar">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
          <span class="preview-filename">{{ project.repoName }} / architecture</span>
        </div>

        <div class="placeholder-canvas">
          <div class="architecture-diagram">
            <!-- Camada Superior (Core / Domínio / UI) -->
            <div class="arch-layer top">
              <span class="layer-icon" aria-hidden="true">{{ diagram.topLayer.icon }}</span>
              <span class="layer-name">{{ diagram.topLayer.name }}</span>
              <span v-if="diagram.topLayer.tag" class="layer-tag">{{ diagram.topLayer.tag }}</span>
            </div>

            <!-- Fluxo de Conexão / Mensageria / Estado -->
            <div class="arch-flow">
              <span class="flow-pill">{{ diagram.flow.leftPill }}</span>
              <span class="flow-arrow" aria-hidden="true">{{ diagram.flow.arrow || '⇄' }}</span>
              <span class="flow-pill">{{ diagram.flow.rightPill }}</span>
            </div>

            <!-- Camada Inferior (Infra / Persistência / Testes) -->
            <div class="arch-layer bottom">
              <span class="layer-icon" aria-hidden="true">{{ diagram.bottomLayer.icon }}</span>
              <span class="layer-name">{{ diagram.bottomLayer.name }}</span>
              <span v-if="diagram.bottomLayer.tag" class="layer-tag">{{ diagram.bottomLayer.tag }}</span>
            </div>
          </div>
        </div>

        <div class="placeholder-footer">
          <span class="category-tag">{{ project.category }}</span>
          <span class="diagram-tag">
            <span class="tag-bullet" :style="{ backgroundColor: project.accentColor }"></span>
            Arquitetura em Camadas
          </span>
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

/* ============================================================================
   DIAGRAMA ARQUITETURAL PADRONIZADO (CARDZINHOS ILUSTRATIVOS)
   ============================================================================ */
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
  gap: 0.65rem;
  padding: 0.55rem 1rem;
  border-radius: 12px;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-heading);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.project-card:hover .arch-layer {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
}

.layer-icon {
  font-size: 1.05rem;
  line-height: 1;
}

.layer-name {
  white-space: nowrap;
}

.layer-tag {
  font-size: 0.65rem;
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  background-color: var(--color-background-mute);
  color: var(--color-text);
  opacity: 0.8;
  font-weight: 500;
  letter-spacing: 0.03em;
  margin-left: 0.25rem;
}

.arch-flow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--accent-color, #f89820);
}

.flow-pill {
  padding: 0.25rem 0.65rem;
  border-radius: 8px;
  background: var(--color-background-soft);
  border: 1px dashed currentColor;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s ease, border-style 0.2s ease;
}

.project-card:hover .flow-pill {
  border-style: solid;
}

.flow-arrow {
  font-size: 0.9rem;
  font-weight: 700;
  opacity: 0.85;
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

.diagram-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--color-text);
  opacity: 0.75;
}

.tag-bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
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
