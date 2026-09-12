<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="layout-default">
    <header class="navbar">
      <div class="nav-container">
        <RouterLink to="/" class="brand">
          <span class="brand-logo">⚡</span>
          <span class="brand-name">BaseFront</span>
        </RouterLink>

        <nav class="nav-links">
          <RouterLink to="/" class="nav-link">Início</RouterLink>
          <RouterLink to="/about" class="nav-link">Sobre</RouterLink>
          <RouterLink to="/login" class="nav-link nav-link--button">Login</RouterLink>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <slot />
    </main>

    <footer class="footer">
      <p>BaseFront Template &copy; {{ new Date().getFullYear() }} - Vue 3 + TypeScript</p>
    </footer>
  </div>
</template>

<style scoped>
.layout-default {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(8px);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-heading);
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: hsla(160, 100%, 37%, 1);
}

.nav-link--button {
  padding: 0.4rem 1rem;
  background-color: hsla(160, 100%, 37%, 1);
  color: #fff !important;
  border-radius: 6px;
  transition: opacity 0.2s ease;
}

.nav-link--button:hover {
  opacity: 0.9;
}

.main-content {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.footer {
  border-top: 1px solid var(--color-border);
  padding: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-text);
  opacity: 0.8;
}
</style>
