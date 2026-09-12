<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="layout-auth">
    <div class="auth-header">
      <RouterLink to="/" class="back-link">&larr; Voltar para o início</RouterLink>
    </div>

    <div class="auth-wrapper">
      <div class="auth-card">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-auth {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-soft);
  padding: 1.5rem;
}

.auth-header {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.back-link {
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: hsla(160, 100%, 37%, 1);
}

.auth-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-card {
  width: 100%;
  max-width: 440px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
}
</style>
