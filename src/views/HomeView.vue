<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import GitHubProfileCard from '@/components/common/GitHubProfileCard.vue'
import BaseCarousel from '@/components/common/BaseCarousel.vue'
import { techService } from '@/api/techService'
import type { TechItem } from '@/types/tech'

const authStore = useAuthStore()
const counter = ref(0)

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
    <section class="hero">
      <div class="badge">Vue 3 + Vite + TypeScript + Pinia</div>
      <h1 class="hero-title">Template Basefront</h1>
      <p class="hero-subtitle">
        Template profissional pronto para escalar suas aplicações Vue 3 com arquitetura limpa,
        roteamento dinâmico, estado global e tipagem estrita.
      </p>
    </section>

    <!-- Seção do Criador / Demonstração de API Externa -->
    <section class="github-section">
      <GitHubProfileCard username="Talibert" />
    </section>

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


    <section class="interactive-demo">
      <h3>Estado Global (Pinia)</h3>

      <div v-if="authStore.isAuthenticated" class="auth-card logged-in">
        <div class="user-meta">
          <span class="user-icon">🟢</span>
          <div class="user-info">
            <span class="user-name">Logado como <strong>{{ authStore.user?.name }}</strong></span>
            <span class="user-email">{{ authStore.user?.email }}</span>
          </div>
        </div>

        <div class="user-actions">
          <button class="btn-action btn-logout" @click="authStore.logout">Desconectar</button>
        </div>
      </div>

      <div v-else class="auth-card logged-out">
        <div class="user-meta">
          <span class="user-icon">⚪</span>
          <span class="logged-out-text">Nenhum usuário autenticado no momento.</span>
        </div>
        <div class="user-actions">
          <RouterLink to="/login" class="btn-action btn-login">Entrar</RouterLink>
        </div>
      </div>

      <div class="divider"></div>

      <h3>Reatividade Local (para testes)</h3>
      <p class="demo-sub">Contador simples gerenciado via <code>ref()</code>:</p>
      <div class="counter-box">
        <button class="btn btn-secondary" @click="counter--">-</button>
        <span class="counter-value">{{ counter }}</span>
        <button class="btn btn-primary" @click="counter++">+</button>
      </div>
    </section>

  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.github-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.section-title {
  text-align: center;
}

.section-title h3 {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.25rem;
}

.section-title p {
  font-size: 0.95rem;
  color: var(--color-text);
  opacity: 0.75;
}

.hero {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: hsla(160, 100%, 37%, 1);
  background: hsla(160, 100%, 37%, 0.1);
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.hero-title {
  font-size: 2.75rem;
  font-weight: 800;
  line-height: 1.2;
  color: var(--color-heading);
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: var(--color-text);
  opacity: 0.85;
}

.features-carousel-section {
  width: 100%;
}

.interactive-demo {
  text-align: center;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 2rem;
  max-width: 520px;
  margin: 0 auto;
  width: 100%;
}

.interactive-demo h3 {
  color: var(--color-heading);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.auth-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 1.25rem;
  border-radius: 12px;
  margin-top: 1.25rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  text-align: left;
}

.user-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}

.user-icon {
  font-size: 1.15rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.user-name {
  font-size: 0.95rem;
  color: var(--color-heading);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  font-size: 0.8rem;
  color: var(--color-text);
  opacity: 0.75;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.logged-out-text {
  font-size: 0.9rem;
  color: var(--color-text);
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.btn-action {
  padding: 0.4rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: opacity 0.2s ease;
}

.btn-action:hover {
  opacity: 0.85;
}

.btn-profile {
  background-color: hsla(160, 100%, 37%, 0.15);
  color: hsla(160, 100%, 37%, 1);
  border: 1px solid hsla(160, 100%, 37%, 0.3);
}

.btn-login {
  background-color: hsla(160, 100%, 37%, 1);
  color: #fff;
}

.btn-logout {
  background-color: #ef4444;
  color: #fff;
}


.divider {
  height: 1px;
  background-color: var(--color-border);
  margin: 1.5rem 0;
}

.demo-sub {
  font-size: 0.875rem;
  opacity: 0.8;
  margin-bottom: 1.25rem;
}

.counter-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.counter-value {
  font-size: 1.75rem;
  font-weight: 700;
  min-width: 3rem;
  color: var(--color-heading);
}

.btn {
  padding: 0.5rem 1.25rem;
  font-size: 1.25rem;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  cursor: pointer;
  background-color: var(--color-background);
  color: var(--color-text);
  transition: all 0.2s ease;
}

.btn:hover {
  border-color: hsla(160, 100%, 37%, 1);
}

.btn-primary {
  background-color: hsla(160, 100%, 37%, 1);
  color: #fff;
  border-color: hsla(160, 100%, 37%, 1);
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-sm {
  padding: 0.25rem 0.6rem;
  font-size: 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}

.btn-danger {
  background-color: #ef4444;
  color: #fff;
  border: none;
}

.btn-danger:hover {
  opacity: 0.9;
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
