<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
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
    <SectionHeader
      badge="PORTFÓLIO & REPOSITÓRIOS"
      title="Meus projetos em destaque"
      subtitle="Projetos selecionados com foco em Clean Architecture, microsserviços com Java & Spring Boot, e interfaces de alto desempenho com Vue 3."
      heading-id="projects-heading"
    />

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
  padding: 3.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.projects-stack {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
}
</style>
