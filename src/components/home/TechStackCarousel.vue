<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
    <div class="section-header">
      <div class="section-badge">
        <span class="badge-dot"></span>
        <span class="badge-text">ECOSSISTEMA & FERRAMENTAS</span>
      </div>
      <h2 id="tech-stack-heading" class="section-title">Tecnologias & Arquitetura</h2>
      <p class="section-subtitle">
        Padrões modernos de engenharia, bibliotecas e ferramentas de alta performance aplicadas em meus projetos.
      </p>
    </div>

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

.section-header {
  text-align: center;
  max-width: 780px;
  margin-bottom: 2.5rem;
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

.carousel-container {
  width: 100%;
  max-width: 1000px;
}
</style>
