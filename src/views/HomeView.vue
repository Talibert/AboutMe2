<script setup lang="ts">
import { ref } from 'vue'

const counter = ref(0)
</script>

<template>
  <div class="home-view">
    <section class="hero">
      <div class="badge">Vue 3 + Vite + TypeScript</div>
      <h1 class="hero-title">Template Basefront</h1>
      <p class="hero-subtitle">
        Template profissional pronto para escalar suas aplicações Vue 3 com arquitetura limpa,
        roteamento dinâmico e tipagem estrita.
      </p>
    </section>

    <section class="features-grid">
      <div class="card">
        <div class="card-icon">🧭</div>
        <h3>Vue Router & Layouts</h3>
        <p>Sistema de layouts intercambiáveis (Default, Auth, Blank) e navegação com tipagem estrita.</p>
      </div>

      <div class="card">
        <div class="card-icon">⚡</div>
        <h3>Vite & Performance</h3>
        <p>Hot Module Replacement (HMR) instantâneo e bundling otimizado para produção.</p>
      </div>

      <div class="card">
        <div class="card-icon">🛡️</div>
        <h3>TypeScript First</h3>
        <p>Verificação estrita de tipos em toda a aplicação com suporte a `vue-tsc`.</p>
      </div>

      <div class="card">
        <div class="card-icon">📁</div>
        <h3>Arquitetura Limpa</h3>
        <p>Separação clara de responsabilidades: api, components, composables, stores e utils.</p>
      </div>
    </section>

    <section class="interactive-demo">
      <h3>Teste de Reatividade</h3>
      <p>Contador simples para demonstrar o `ref` da Composition API:</p>
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
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
}

.interactive-demo h3 {
  color: var(--color-heading);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.interactive-demo p {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 1.5rem;
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
</style>
