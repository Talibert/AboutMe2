<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="not-found-view">
    <div class="content">
      <h1 class="status-code">404</h1>
      <h2>Página não encontrada</h2>
      <p>O recurso ou página que você tentou acessar não existe ou foi movido.</p>
      <RouterLink to="/" class="home-btn">Voltar para a página inicial</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.not-found-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.content {
  max-width: 460px;
}

.status-code {
  font-size: 6rem;
  font-weight: 900;
  line-height: 1;
  color: hsla(160, 100%, 37%, 1);
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.75rem;
}

p {
  font-size: 1rem;
  color: var(--color-text);
  opacity: 0.8;
  margin-bottom: 2rem;
}

.home-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: hsla(160, 100%, 37%, 1);
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: opacity 0.2s ease;
}

.home-btn:hover {
  opacity: 0.9;
}
</style>
