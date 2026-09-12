<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const counter = ref(0)
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

    <section class="features-grid">
      <div class="card">
        <div class="card-icon">🍍</div>
        <h3>Pinia & Persistência</h3>
        <p>Gerenciamento de estado modular com suporte nativo a TypeScript e persistência em localStorage.</p>
      </div>

      <div class="card">
        <div class="card-icon">🧭</div>
        <h3>Vue Router & Layouts</h3>
        <p>Sistema de layouts intercambiáveis (Default, Auth, Blank) e navegação com guardas de rota.</p>
      </div>

      <div class="card">
        <div class="card-icon">⚡</div>
        <h3>Vite & Performance</h3>
        <p>Hot Module Replacement (HMR) instantâneo e bundling otimizado para produção.</p>
      </div>

      <div class="card">
        <div class="card-icon">📁</div>
        <h3>Arquitetura Limpa</h3>
        <p>Separação clara de responsabilidades: api, components, composables, stores e utils.</p>
      </div>
    </section>

    <section class="interactive-demo">
      <h3>Estado Global (Pinia)</h3>
      <div v-if="authStore.isAuthenticated" class="auth-status logged-in">
        <p>🟢 Logado como <strong>{{ authStore.user?.name }}</strong> ({{ authStore.user?.email }})</p>
        <button class="btn-sm btn-danger" @click="authStore.logout">Desconectar</button>
      </div>
      <div v-else class="auth-status logged-out">
        <p>⚪ Nenhum usuário autenticado no momento. Acesse a tela de Login para testar a persistência!</p>
      </div>

      <div class="divider"></div>

      <h3>Reatividade Local</h3>
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

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.card {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  border-color: hsla(160, 100%, 37%, 0.5);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

.card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.card p {
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.8;
  line-height: 1.5;
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

.auth-status {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-top: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
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
</style>
