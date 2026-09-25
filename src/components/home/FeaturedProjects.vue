<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { githubService, DEFAULT_FEATURED_PROJECTS } from '@/api/githubService'
import type { ProjectItem } from '@/types/project'
import ProjectCard from './ProjectCard.vue'

const projects = ref<ProjectItem[]>(DEFAULT_FEATURED_PROJECTS)
const isLoading = ref(true)

onMounted(async () => {
  try {
    const remoteProjects = await githubService.getFeaturedProjects('Talibert')
    if (remoteProjects && remoteProjects.length > 0) {
      projects.value = remoteProjects
    }
  } catch (error) {
    console.warn('Utilizando dados locais de projetos em destaque:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="featured-projects-section" aria-labelledby="projects-heading">
    <div class="section-header">
      <div class="section-badge">
        <span class="badge-dot"></span>
        <span class="badge-text">PORTFÓLIO & REPOSITÓRIOS</span>
      </div>
      <h2 id="projects-heading" class="section-title">Meus projetos em destaque</h2>
      <p class="section-subtitle">
        Projetos selecionados com foco em Clean Architecture, microsserviços com Java & Spring Boot,
        e interfaces de alto desempenho com Vue 3.
      </p>
    </div>

    <div class="projects-stack">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </div>
  </section>
</template>

<style scoped>
.featured-projects-section {
  width: 100%;
  padding: 4rem 0 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-header {
  text-align: center;
  max-width: 780px;
  margin-bottom: 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: hsla(160, 100%, 37%, 1);
  letter-spacing: 0.08em;
  font-weight: 600;
}

.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: hsla(160, 100%, 37%, 1);
}

.section-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 2.85rem);
  font-weight: 800;
  color: var(--color-heading);
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin: 0;
}

.section-subtitle {
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: var(--color-text);
  opacity: 0.85;
  line-height: 1.6;
  margin: 0;
}

.projects-stack {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
}
</style>
