<script setup lang="ts">
/**
 * CompactProjectCard.vue
 *
 * Moldura inspirada nas janelas do macOS para exibição compacta em grid (3 por linha).
 *
 * ORIGEM DAS TECNOLOGIAS (props.project.technologies):
 * 1. Projetos com Curadoria Local: Cadastrados com tags manuais refinadas em DEFAULT_ALL_PROJECTS
 *    (ex: 'Java 21', 'Spring Boot 3', 'Clean Architecture', 'Apache Kafka', 'Docker').
 * 2. Repositórios Dinâmicos do GitHub: Gerados automaticamente pelo githubService a partir de:
 *    - repo.language: Linguagem predominante detectada pelo GitHub (ex: 'Java', 'Vue', 'TypeScript').
 *    - repo.topics: Tópicos/tags cadastrados no repositório no próprio GitHub (ex: 'docker', 'spring').
 */
import type { ProjectItem } from '@/types/project'

interface Props {
  project: ProjectItem
}

defineProps<Props>()
</script>

<template>
  <article
    class="mac-window-card project-card"
    :style="{ '--accent-color': project.accentColor || 'hsla(160, 100%, 37%, 1)' }"
    :aria-label="`Projeto: ${project.title}`"
  >
    <!-- Barra Superior / Moldura Estilo macOS -->
    <div class="window-titlebar">
      <div class="window-controls" aria-hidden="true">
        <span class="control-dot control-dot--close"></span>
        <span class="control-dot control-dot--minimize"></span>
        <span class="control-dot control-dot--maximize"></span>
      </div>

      <div class="window-filename">
        <span class="filename-text">{{ project.repoName }}</span>
      </div>

      <div class="window-badge">
        <span v-if="project.stars !== undefined && project.stars > 0" class="star-badge" title="Estrelas no GitHub">
          ⭐ {{ project.stars }}
        </span>
        <span v-else class="category-indicator">{{ project.category }}</span>
      </div>
    </div>

    <!-- Corpo da Janela / Conteúdo do Projeto -->
    <div class="window-body">
      <div class="card-main-info">
        <h3 class="project-title" :title="project.title">
          {{ project.title }}
        </h3>

        <p class="project-description">
          {{ project.description }}
        </p>

        <!-- 
          Pílulas de Tecnologias:
          - Projetos com Curadoria: definidas manualmente em DEFAULT_ALL_PROJECTS.
          - Projetos do GitHub: linguagem (repo.language) + tags cadastradas no GitHub (repo.topics).
        -->
        <div class="tech-stack-container" aria-label="Tecnologias utilizadas">
          <span
            v-for="tech in project.technologies"
            :key="tech"
            class="tech-chip"
          >
            {{ tech }}
          </span>
        </div>
      </div>

      <!-- Rodapé do Card com Ação do GitHub -->
      <div class="card-actions">
        <a
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-github"
          :title="`Abrir repositório ${project.repoName} no GitHub`"
        >
          <svg class="github-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
            />
          </svg>
          <span>Ver no GitHub</span>
          <span class="external-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* ============================================================================
   MOLDURA ESTILO JANELA DO MAC
   ============================================================================ */
.mac-window-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.08),
    0 0 0 1px hsla(160, 100%, 37%, 0.08);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.mac-window-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-color, hsla(160, 100%, 37%, 0.5));
  box-shadow:
    0 18px 35px -10px rgba(0, 0, 0, 0.15),
    0 0 0 1px var(--accent-color, hsla(160, 100%, 37%, 0.3));
}

/* ============================================================================
   BARRA DE TÍTULO (TOPBAR MAC)
   ============================================================================ */
.window-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0.9rem;
  background-color: var(--color-background-mute);
  border-bottom: 1px solid var(--color-border);
  user-select: none;
}

.window-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 50px;
}

.control-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.control-dot--close {
  background-color: #ff5f56;
}

.control-dot--minimize {
  background-color: #ffbd2e;
}

.control-dot--maximize {
  background-color: #27c93f;
}

.window-filename {
  flex: 1;
  text-align: center;
}

.filename-text {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-heading);
  letter-spacing: 0.02em;
}

.window-badge {
  display: flex;
  justify-content: flex-end;
  width: 60px;
}

.category-indicator {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  padding: 0.15rem 0.45rem;
  border-radius: 6px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  opacity: 0.85;
}

.star-badge {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-heading);
}

/* ============================================================================
   CORPO DA JANELA / CONTEÚDO
   ============================================================================ */
.window-body {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.25rem;
}

.card-main-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.project-title {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--color-heading);
  line-height: 1.3;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-description {
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-text);
  opacity: 0.85;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 3.9rem; /* Mantém uniformidade visual entre os cards */
}

/* ============================================================================
   TECNOLOGIAS (CHIPS COMPACTOS)
   ============================================================================ */
.tech-stack-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.25rem;
}

.tech-chip {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-heading);
  font-weight: 500;
  white-space: nowrap;
}

/* ============================================================================
   BOTÃO GITHUB
   ============================================================================ */
.card-actions {
  display: flex;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border);
}

.btn-github {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-heading);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-github:hover {
  background-color: var(--color-heading);
  color: var(--color-background) !important;
  border-color: var(--color-heading);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.external-arrow {
  font-size: 0.9em;
  opacity: 0.7;
  transition: transform 0.2s ease;
}

.btn-github:hover .external-arrow {
  transform: translate(2px, -2px);
  opacity: 1;
}
</style>
