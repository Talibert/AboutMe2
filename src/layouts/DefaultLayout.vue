<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'

const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
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

          <!-- Botão de alternância de tema -->
          <button
            type="button"
            class="theme-toggle-btn"
            :title="themeStore.isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'"
            @click="themeStore.toggleTheme"
          >
            {{ themeStore.isDark ? '🌙' : '☀️' }}
          </button>

          <!-- Seção de Usuário / Auth -->
          <template v-if="authStore.isAuthenticated">
            <span class="user-info">👤 {{ authStore.userName }}</span>
            <button type="button" class="logout-btn" @click="handleLogout">Sair</button>
          </template>
          <template v-else>
            <RouterLink to="/login" class="nav-link nav-link--button">Login</RouterLink>
          </template>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <slot />
    </main>

    <footer class="footer">
      <p>BaseFront Template &copy; {{ new Date().getFullYear() }} - Vue 3 + Pinia + TypeScript</p>
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
  gap: 1.25rem;
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

.theme-toggle-btn {
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.35rem 0.6rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.theme-toggle-btn:hover {
  background-color: var(--color-background-soft);
}

.user-info {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-heading);
}

.logout-btn {
  padding: 0.35rem 0.75rem;
  background-color: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background-color: #ef4444;
  color: #fff;
  border-color: #ef4444;
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
