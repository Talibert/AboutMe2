<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import BaseCarousel from '@/components/common/BaseCarousel.vue'
import AcademicCard from './AcademicCard.vue'
import { DEFAULT_ACADEMIC_ITEMS } from '@/data/academic'
import type { AcademicItem } from '@/types/academic'

const academicItems = ref<AcademicItem[]>([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    academicItems.value = DEFAULT_ACADEMIC_ITEMS
  } catch (error) {
    console.error('Falha ao carregar a formação acadêmica:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="academic-section" aria-labelledby="academic-heading">
    <SectionHeader
      badge="FORMAÇÃO & QUALIFICAÇÕES"
      title="Trajetória Acadêmica"
      subtitle="Minha base educacional, graduações superiores e cursos técnicos que fundamentam minha atuação em engenharia de software."
      heading-id="academic-heading"
    />

    <div class="carousel-container">
      <BaseCarousel :items="academicItems" :loading="isLoading">
        <!--
          ===================================================================
          RECEPÇÃO DO SCOPED SLOT (CONSUMO DO ITEM DO CARROSSEL):
          O BaseCarousel expõe o item atual através de slot props.
          Capturamos '{ item: academicItem }' para alimentar o AcademicCard.
          ===================================================================
        -->
        <template #default="{ item: academicItem }">
          <AcademicCard :item="academicItem" />
        </template>
      </BaseCarousel>
    </div>
  </section>
</template>

<style scoped>
.academic-section {
  width: 100%;
  padding: 3.5rem 0 4.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-container {
  width: 92%;
  max-width: 1100px;
  margin: 0 auto;
}

@media (max-width: 1200px) {
  .carousel-container {
    width: 95%;
  }
}

@media (max-width: 768px) {
  .carousel-container {
    width: 100%;
  }
}
</style>
