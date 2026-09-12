<template>
  <div class="about-view">
    <h1>Sobre o Template</h1>
    <p>
      Este template foi concebido para acelerar o desenvolvimento de projetos Vue 3,
      fornecendo configurações padrão testadas e preparadas para escalabilidade.
    </p>

    <div class="info-card">
      <h3>Stack Tecnológica</h3>
      <ul>
        <li><strong>Framework:</strong> Vue 3 (Composition API com script setup)</li>
        <li><strong>Bundler:</strong> Vite</li>
        <li><strong>Tipagem:</strong> TypeScript (modo strict)</li>
        <li><strong>Roteamento:</strong> Vue Router 4 com layouts dinâmicos</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.about-view {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-heading);
}

p {
  font-size: 1.05rem;
  color: var(--color-text);
  line-height: 1.6;
}

.info-card {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 1.5rem;
}

.info-card h3 {
  font-size: 1.1rem;
  color: var(--color-heading);
  margin-bottom: 1rem;
}

.info-card ul {
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-card li {
  color: var(--color-text);
}
</style>
