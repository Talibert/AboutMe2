<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HomeHero from '@/components/home/HomeHero.vue'
import FeaturedProjects from '@/components/home/FeaturedProjects.vue'
import BaseCarousel from '@/components/common/BaseCarousel.vue'
import { techService } from '@/api/techService'
import type { TechItem } from '@/types/tech'

const techItens = ref<TechItem[]>([])
const isLoadingFeatures = ref(true)

onMounted(async () => {
  try {
    techItens.value = await techService.getItens()
  } catch (error) {
    console.error('Falha ao carregar as tecnologias da aplicação:', error)
  } finally {
    isLoadingFeatures.value = false
  }
})
</script>

<template>
  <div class="home-view">
    <!-- Hero Principal do Portfólio de Guilherme Taliberti -->
    <HomeHero />

    <!-- Seção de Projetos em Destaque -->
    <FeaturedProjects />

    <!-- Carrossel Genérico exibindo Recursos da Aplicação -->
    <section class="features-carousel-section">
      <BaseCarousel :items="techItens" :loading="isLoadingFeatures">
        <template #default="{ item: techItem, index }">
          <div class="tech-card">
            <div class="tech-card-top">
              <span class="tech-badge">{{ techItem.badge }}</span>
              <span class="tech-counter">{{ index + 1 }} / {{ techItens.length }}</span>
            </div>

            <div class="tech-header">
              <span class="tech-icon">{{ techItem.icon }}</span>
              <h3 class="tech-title">{{ techItem.title }}</h3>
            </div>

            <p class="tech-description">{{ techItem.description }}</p>

            <div v-if="techItem.highlights && techItem.highlights.length > 0" class="tech-highlights">
              <span
                v-for="highlight in techItem.highlights"
                :key="highlight"
                class="tech-tag"
              >
                ✓ {{ highlight }}
              </span>
            </div>
          </div>
        </template>
      </BaseCarousel>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.features-carousel-section {
  width: 100%;
}

/* Card de Tecnologia dentro do BaseCarousel */
.tech-card {
  padding: 2.25rem 3.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-height: 240px;
}

.tech-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tech-badge {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  background-color: hsla(160, 100%, 37%, 0.15);
  color: hsla(160, 100%, 37%, 1);
}

.tech-counter {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text);
  opacity: 0.6;
}

.tech-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.tech-icon {
  font-size: 2.25rem;
  line-height: 1;
}

.tech-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0;
}

.tech-description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.9;
  margin: 0;
}

.tech-highlights {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 0.25rem;
}

.tech-tag {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-heading);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
}

@media (max-width: 768px) {
  .tech-card {
    padding: 1.5rem 2.25rem;
    min-height: auto;
  }

  .tech-title {
    font-size: 1.25rem;
  }

  .tech-description {
    font-size: 0.925rem;
  }
}
</style>
