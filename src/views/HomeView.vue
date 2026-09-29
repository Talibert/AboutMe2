<script setup lang="ts">
import HomeHero from '@/components/home/HomeHero.vue'
import FeaturedProjects from '@/components/home/FeaturedProjects.vue'
import AcademicCarousel from '@/components/home/AcademicCarousel.vue'
</script>

<template>
  <div class="home-view">
    <!-- Hero Principal do Portfólio de Guilherme Taliberti -->
    <HomeHero />

    <!-- Seção de Projetos em Destaque -->
    <FeaturedProjects />

    <!-- Carrossel de Formação Acadêmica & Cursos Técnicos -->
    <AcademicCarousel />
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
}
</style>
