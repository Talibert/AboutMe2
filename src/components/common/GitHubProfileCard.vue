<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import githubService from '@/api/githubService'
import type { GitHubUser } from '@/types/github'

const props = defineProps<{
  username: string
}>()

const user = ref<GitHubUser | null>(null)
const isLoading = ref<boolean>(true)
const errorMessage = ref<string | null>(null)

const memberSinceYear = computed(() => {
  if (!user.value?.created_at) return ''
  return new Date(user.value.created_at).getFullYear()
})

async function fetchProfile() {
  isLoading.value = true
  errorMessage.value = null
  try {
    user.value = await githubService.getUserProfile(props.username)
  } catch (error) {
    console.error('Erro ao buscar dados do GitHub:', error)
    errorMessage.value = 'Não foi possível carregar os dados do GitHub no momento.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchProfile()
})
</script>

<template>
  <div class="github-card">
    <!-- Estado: Carregando (Skeleton Placeholder Shimmer) -->
    <div v-if="isLoading" class="skeleton-card">
      <!-- Cabeçalho Skeleton -->
      <div class="card-header">
        <div class="skeleton-shimmer skeleton-avatar"></div>
        <div class="user-titles">
          <div class="name-row">
            <div class="skeleton-shimmer skeleton-title"></div>
            <div class="skeleton-shimmer skeleton-badge"></div>
          </div>
          <div class="skeleton-shimmer skeleton-handle"></div>
        </div>
      </div>

      <!-- Bio Skeleton -->
      <div class="skeleton-shimmer skeleton-bio"></div>

      <!-- Metadados Chips Skeleton -->
      <div class="meta-chips">
        <div class="skeleton-shimmer skeleton-chip"></div>
        <div class="skeleton-shimmer skeleton-chip skeleton-chip--wide"></div>
        <div class="skeleton-shimmer skeleton-chip"></div>
      </div>

      <!-- Estatísticas Skeleton -->
      <div class="stats-grid">
        <div class="skeleton-shimmer skeleton-stat"></div>
        <div class="skeleton-shimmer skeleton-stat"></div>
        <div class="skeleton-shimmer skeleton-stat"></div>
      </div>

      <!-- Botão Skeleton -->
      <div class="skeleton-shimmer skeleton-btn"></div>
    </div>


    <!-- Estado: Erro -->
    <div v-else-if="errorMessage" class="state-error">
      <p>⚠️ {{ errorMessage }}</p>
      <button class="retry-btn" @click="fetchProfile">Tentar novamente</button>
    </div>

    <!-- Estado: Sucesso (Dados carregados) -->
    <div v-else-if="user" class="profile-content">
      <!-- Cabeçalho -->
      <div class="card-header">
        <img
          :src="user.avatar_url"
          :alt="`Avatar de ${user.name || user.login}`"
          class="avatar"
        />

        <div class="user-titles">
          <div class="name-row">
            <h3>{{ user.name || user.login }}</h3>
            <span class="badge-creator">Autor do Template</span>
          </div>
          <a
            :href="user.html_url"
            target="_blank"
            rel="noopener noreferrer"
            class="user-handle"
          >
            @{{ user.login }}
            <span class="external-icon">↗</span>
          </a>
        </div>
      </div>

      <!-- Bio -->
      <p v-if="user.bio" class="bio">
        "{{ user.bio }}"
      </p>

      <!-- Metadados com chips -->
      <div class="meta-chips">
        <span v-if="user.company" class="chip" title="Empresa">
          🏢 {{ user.company }}
        </span>
        <span v-if="user.location" class="chip" title="Localização">
          📍 {{ user.location }}
        </span>
        <span class="chip" title="Ano de entrada no GitHub">
          📅 Desde {{ memberSinceYear }}
        </span>
      </div>

      <!-- Estatísticas do GitHub -->
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-value">{{ user.public_repos }}</span>
          <span class="stat-label">Repositórios</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ user.followers }}</span>
          <span class="stat-label">Seguidores</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ user.following }}</span>
          <span class="stat-label">Seguindo</span>
        </div>
      </div>

      <!-- Ação de rodapé -->
      <div class="card-footer">
        <a
          :href="user.html_url"
          target="_blank"
          rel="noopener noreferrer"
          class="github-btn"
        >
          <span>Ver perfil completo no GitHub</span>
          <span>↗</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.github-card {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 1.75rem;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.github-card:hover {
  border-color: hsla(160, 100%, 37%, 0.4);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* Estados */
.state-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2.5rem 1rem;
  text-align: center;
  color: var(--color-text);
  opacity: 0.85;
}

.retry-btn {
  padding: 0.4rem 0.9rem;
  font-size: 0.85rem;
  border-radius: 6px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
}

.retry-btn:hover {
  border-color: hsla(160, 100%, 37%, 1);
}

/* Skeleton Loading com animação Shimmer (padrão BaseCarousel) */
.skeleton-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    var(--color-border) 25%,
    var(--color-background) 50%,
    var(--color-border) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 6px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton-avatar {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  flex-shrink: 0;
}

.skeleton-title {
  width: 140px;
  height: 22px;
}

.skeleton-badge {
  width: 95px;
  height: 18px;
  border-radius: 9999px;
}

.skeleton-handle {
  width: 90px;
  height: 14px;
  margin-top: 4px;
}

.skeleton-bio {
  width: 100%;
  height: 48px;
  border-radius: 0 8px 8px 0;
}

.skeleton-chip {
  width: 90px;
  height: 28px;
  border-radius: 6px;
}

.skeleton-chip--wide {
  width: 120px;
}

.skeleton-stat {
  height: 62px;
  border-radius: 10px;
}

.skeleton-btn {
  width: 100%;
  height: 40px;
  border-radius: 8px;
}

/* Conteúdo */
.profile-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.avatar {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid hsla(160, 100%, 37%, 0.6);
  flex-shrink: 0;
}

.user-titles {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.name-row h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0;
}

.badge-creator {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  background-color: hsla(160, 100%, 37%, 0.15);
  color: hsla(160, 100%, 37%, 1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.user-handle {
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.75;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  width: fit-content;
  transition: opacity 0.2s ease, color 0.2s ease;
}

.user-handle:hover {
  color: hsla(160, 100%, 37%, 1);
  opacity: 1;
}

.external-icon {
  font-size: 0.75rem;
}

.bio {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--color-text);
  opacity: 0.85;
  font-style: italic;
  margin: 0;
  padding: 0.75rem 1rem;
  background-color: var(--color-background);
  border-left: 3px solid hsla(160, 100%, 37%, 1);
  border-radius: 0 8px 8px 0;
}

.meta-chips {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  text-align: center;
}

.stat-item {
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 0.75rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.stat-value {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-heading);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--color-text);
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-footer {
  display: flex;
}

.github-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 8px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-heading);
  text-decoration: none;
  transition: all 0.2s ease;
}

.github-btn:hover {
  background-color: hsla(160, 100%, 37%, 1);
  border-color: hsla(160, 100%, 37%, 1);
  color: #fff;
}
</style>
