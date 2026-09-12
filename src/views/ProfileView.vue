<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const userInitials = computed(() => {
  const name = authStore.user?.name || 'U'
  return name.slice(0, 2).toUpperCase()
})

const maskedToken = computed(() => {
  if (!authStore.token) return 'Nenhum'
  return `${authStore.token.slice(0, 14)}...${authStore.token.slice(-6)}`
})

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="profile-view">
    <div class="profile-card">
      <!-- Cabeçalho do Perfil -->
      <div class="profile-header">
        <div class="avatar-circle">
          {{ userInitials }}
        </div>
        <div class="profile-title">
          <h2>{{ authStore.user?.name }}</h2>
          <span class="badge-role">{{ authStore.user?.role === 'admin' ? 'Administrador' : 'Usuário' }}</span>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Informações da Conta -->
      <div class="info-section">
        <h3>Dados da Conta</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">ID do Usuário</span>
            <span class="value"><code>{{ authStore.user?.id }}</code></span>
          </div>

          <div class="info-item">
            <span class="label">Endereço de E-mail</span>
            <span class="value">{{ authStore.user?.email }}</span>
          </div>

          <div class="info-item">
            <span class="label">Status da Conta</span>
            <span class="value status-active">
              <span class="dot"></span> Ativa
            </span>
          </div>

          <div class="info-item">
            <span class="label">Sessão Atual (Token)</span>
            <span class="value"><code>{{ maskedToken }}</code></span>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Ações de Sessão -->
      <div class="profile-actions">
        <button class="btn btn-logout" @click="handleLogout">
          Encerrar Sessão
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-view {
  max-width: 680px;
  margin: 1rem auto;
}

.profile-card {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.avatar-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, hsla(160, 100%, 37%, 1), #3b82f6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.profile-title h2 {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.25rem;
}

.badge-role {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  background-color: hsla(160, 100%, 37%, 0.15);
  color: hsla(160, 100%, 37%, 1);
}

.divider {
  height: 1px;
  background-color: var(--color-border);
  margin: 1.75rem 0;
}

.info-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: 1.25rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.label {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-text);
  opacity: 0.7;
}

.value {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-heading);
}

code {
  background-color: var(--color-background);
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  font-size: 0.85rem;
}

.status-active {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #10b981;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #10b981;
}

.profile-actions {
  display: flex;
  justify-content: flex-end;
}

.btn {
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s ease;
}

.btn-logout {
  background-color: #ef4444;
  color: white;
}

.btn-logout:hover {
  opacity: 0.9;
}
</style>
