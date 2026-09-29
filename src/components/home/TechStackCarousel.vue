<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import BaseCarousel from '@/components/common/BaseCarousel.vue'
import TechCard from './TechCard.vue'
import { techService } from '@/api/techService'
import type { TechItem } from '@/types/tech'

const techItens = ref<TechItem[]>([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    techItens.value = await techService.getItens()
  } catch (error) {
    console.error('Falha ao carregar as tecnologias da aplicação:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="tech-stack-section" aria-labelledby="tech-stack-heading">
    <SectionHeader
      badge="ECOSSISTEMA & FERRAMENTAS"
      title="Tecnologias & Arquitetura"
      subtitle="Padrões modernos de engenharia, bibliotecas e ferramentas de alta performance aplicadas em meus projetos."
      heading-id="tech-stack-heading"
    />

    <div class="carousel-container">
      <BaseCarousel :items="techItens" :loading="isLoading">
        <!--
          ===================================================================
          RECEPÇÃO DO SCOPED SLOT (O "CONSUMO"):
          Aqui capturamos o objeto disponibilizado pelo BaseCarousel.
          Usamos a desestruturação '{ item: techItem }' para obter o item da vez.
          O BaseCarousel também envia 'index' e 'is-active', mas como este componente
          não precisa deles, apenas não os extraímos (não há desperdício ou erro).
          ===================================================================
        -->
        <template #default="{ item: techItem }">
          <TechCard :item="techItem" />
        </template>
      </BaseCarousel>
    </div>
  </section>
</template>

<style scoped>
.tech-stack-section {
  width: 100%;
  padding: 3.5rem 0 4.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-container {
  width: 100%;
  max-width: 720px;
}
</style>
