<script setup lang="ts">
import HomeHero from '@/components/home/HomeHero.vue'
import FeaturedProjects from '@/components/home/FeaturedProjects.vue'
import TechStackCarousel from '@/components/home/TechStackCarousel.vue'
</script>

<template>
  <div class="home-view">
    <!-- Hero Principal do Portfólio de Guilherme Taliberti -->
    <HomeHero />

    <!-- Seção de Projetos em Destaque -->
    <FeaturedProjects />

    <!-- Carrossel de Tecnologias & Arquitetura -->
    <TechStackCarousel />
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
}
</style>
