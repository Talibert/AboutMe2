<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import CompactProjectCard from '@/components/projects/CompactProjectCard.vue'
import ProjectCardSkeleton from '@/components/projects/ProjectCardSkeleton.vue'
import { githubService } from '@/api/githubService'
import { DEFAULT_ALL_PROJECTS } from '@/data/projects'
import type { ProjectItem } from '@/types/project'

// Começa vazio para exibir os placeholders modernos enquanto aguarda a resposta da API
const projects = ref<ProjectItem[]>([])
const isLoading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref<string>('Todos')

const categories = ['Todos', 'Backend', 'Frontend', 'Fullstack'] as const

onMounted(async () => {
  try {
    // Delay artificial de 2 segundos para permitir a visualização dos cards de esqueleto modernos
    const delayMs = import.meta.env.MODE === 'test' ? 0 : 1000
    if (delayMs > 0)
      await new Promise((resolve) => setTimeout(resolve, delayMs))

    const remoteProjects = await githubService.getAllProjects('Talibert')
    if (remoteProjects && remoteProjects.length > 0) {
      projects.value = remoteProjects
    } else {
      projects.value = DEFAULT_ALL_PROJECTS
    }
  } catch (error) {
    console.warn('Utilizando dados locais de fallback para todos os projetos:', error)
    projects.value = DEFAULT_ALL_PROJECTS
  } finally {
    isLoading.value = false
  }
})

const filteredProjects = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return projects.value.filter((project) => {
    // Filtro por categoria
    const matchesCategory =
      selectedCategory.value === 'Todos' || project.category === selectedCategory.value

    if (!matchesCategory) return false

    // Filtro por termo de busca
    if (!query) return true

    const inTitle = project.title.toLowerCase().includes(query)
    const inSubtitle = project.subtitle.toLowerCase().includes(query)
    const inDescription = project.description.toLowerCase().includes(query)
    const inTechs = project.technologies.some((tech) => tech.toLowerCase().includes(query))

    return inTitle || inSubtitle || inDescription || inTechs
  })
})

function clearFilters(): void {
  searchQuery.value = ''
  selectedCategory.value = 'Todos'
}
</script>

<template>
  <div class="projects-view">
    <SectionHeader
      badge="PORTFÓLIO & REPOSITÓRIOS"
      title="Todos os Projetos"
      subtitle="Catálogo completo de microsserviços em Java, arquiteturas limpas com Spring Boot & Kafka, e aplicações frontend modernas com Vue 3."
      heading-id="all-projects-heading"
    />

    <!-- Barra de Filtros e Busca -->
    <div class="filters-toolbar">
      <div class="search-input-wrapper">
        <span class="search-icon" aria-hidden="true">🔍</span>
        <input
          v-model="searchQuery"
          type="search"
          class="search-input"
          placeholder="Buscar por nome, tecnologia (ex: Java, Vue, Kafka)..."
          aria-label="Buscar projetos por nome ou tecnologia"
        />
        <button
          v-if="searchQuery"
          type="button"
          class="clear-search-btn"
          title="Limpar busca"
          @click="searchQuery = ''"
        >
          ✕
        </button>
      </div>

      <!-- Filtro por Categorias -->
      <div class="category-tabs" role="tablist" aria-label="Filtrar por categoria">
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          class="category-tab"
          :class="{ 'is-active': selectedCategory === cat }"
          role="tab"
          :aria-selected="selectedCategory === cat"
          @click="selectedCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Indicador de Resultados / Sincronização -->
    <div v-if="isLoading" class="loading-meta" aria-live="polite">
      <span class="loading-pulse-dot" aria-hidden="true"></span>
      <span class="loading-text">Sincronizando repositórios com o GitHub...</span>
    </div>
    <div v-else class="results-meta">
      <span class="results-count">
        Exibindo <strong>{{ filteredProjects.length }}</strong> de
        <strong>{{ projects.length }}</strong> projetos
      </span>
      <button
        v-if="searchQuery || selectedCategory !== 'Todos'"
        type="button"
        class="reset-filters-btn"
        @click="clearFilters"
      >
        Limpar filtros
      </button>
    </div>

    <!-- Grid de Skeletons durante o carregamento -->
    <div v-if="isLoading" class="projects-grid" aria-label="Carregando repositórios...">
      <ProjectCardSkeleton v-for="n in 6" :key="n" />
    </div>

    <!-- Lista de Projetos (Grid Mac com 3 por linha) após carregamento -->
    <div v-else-if="filteredProjects.length > 0" class="projects-grid">
      <CompactProjectCard
        v-for="project in filteredProjects"
        :key="project.id"
        :project="project"
      />
    </div>

    <!-- Estado Vazio (Sem resultados) -->
    <div v-else class="empty-state">
      <span class="empty-icon" aria-hidden="true">📂</span>
      <h3 class="empty-title">Nenhum projeto encontrado</h3>
      <p class="empty-desc">
        Não encontramos nenhum projeto correspondente a "{{ searchQuery }}" na categoria "{{ selectedCategory }}".
      </p>
      <button type="button" class="btn-clear-empty" @click="clearFilters">
        Ver todos os projetos
      </button>
    </div>
  </div>
</template>

<style scoped>
.projects-view {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  padding-bottom: 4rem;
}

/* ============================================================================
   BARRA DE FILTROS E BUSCA
   ============================================================================ */
.filters-toolbar {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
}

.search-input-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1.1rem;
  font-size: 1rem;
  opacity: 0.6;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.85rem 2.75rem 0.85rem 2.85rem;
  border-radius: 14px;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  color: var(--color-heading);
  font-family: var(--font-body);
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
}

.search-input:focus {
  border-color: hsla(160, 100%, 37%, 0.8);
  box-shadow: 0 0 0 3px hsla(160, 100%, 37%, 0.15);
}

.clear-search-btn {
  position: absolute;
  right: 0.9rem;
  background: none;
  border: none;
  color: var(--color-text);
  opacity: 0.6;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  font-size: 0.85rem;
  transition: opacity 0.2s;
}

.clear-search-btn:hover {
  opacity: 1;
}

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
}

.category-tab {
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-tab:hover {
  color: var(--color-heading);
  border-color: hsla(160, 100%, 37%, 0.4);
  transform: translateY(-1px);
}

.category-tab.is-active {
  background-color: hsla(160, 100%, 37%, 1);
  color: #ffffff;
  border-color: hsla(160, 100%, 37%, 1);
  font-weight: 600;
  box-shadow: 0 4px 14px hsla(160, 100%, 37%, 0.25);
}

/* ============================================================================
   METADADOS DOS RESULTADOS & ESTADO DE CARREGAMENTO
   ============================================================================ */
.loading-meta {
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text);
  font-family: var(--font-mono);
}

.loading-pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: hsla(160, 100%, 37%, 1);
  box-shadow: 0 0 10px hsla(160, 100%, 37%, 0.6);
  animation: pulseDot 1.4s infinite ease-in-out;
}

@keyframes pulseDot {
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.85);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.loading-text {
  font-weight: 500;
  opacity: 0.85;
}

.results-meta {
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text);
}

.results-count strong {
  color: var(--color-heading);
}

.reset-filters-btn {
  background: none;
  border: none;
  color: hsla(160, 100%, 37%, 1);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: underline;
  padding: 0.2rem 0.4rem;
}

/* ============================================================================
   GRID DE PROJETOS (3 POR LINHA NO DESKTOP)
   ============================================================================ */
.projects-grid {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
  align-items: stretch;
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 640px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}

/* ============================================================================
   ESTADO VAZIO
   ============================================================================ */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 4rem 1.5rem;
  background-color: var(--color-background-soft);
  border: 1px dashed var(--color-border);
  border-radius: 20px;
  max-width: 600px;
  width: 100%;
  gap: 1rem;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.empty-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0;
}

.empty-desc {
  font-size: 0.95rem;
  color: var(--color-text);
  line-height: 1.5;
  margin: 0;
}

.btn-clear-empty {
  margin-top: 0.75rem;
  padding: 0.65rem 1.4rem;
  border-radius: 10px;
  background-color: var(--color-heading);
  color: var(--color-background);
  border: none;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.btn-clear-empty:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}
</style>
