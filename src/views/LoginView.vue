<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const isLoading = ref(false)

function handleLogin() {
  isLoading.value = true

  // Simulação de login para fins de teste no template
  setTimeout(() => {
    localStorage.setItem('token', 'mock-token-basefront')
    isLoading.value = false

    const redirectPath = (route.query.redirect as string) || '/'
    router.push(redirectPath)
  }, 600)
}
</script>

<template>
  <div class="login-view">
    <div class="login-header">
      <h2>Entrar na Conta</h2>
      <p>Acesse o painel do seu projeto</p>
    </div>

    <form class="login-form" @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">E-mail</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="seu@email.com"
          required
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="password">Senha</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="••••••••"
          required
          class="form-input"
        />
      </div>

      <button type="submit" class="submit-btn" :disabled="isLoading">
        <span v-if="isLoading">Entrando...</span>
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<style scoped>
.login-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.login-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.25rem;
}

.login-header p {
  font-size: 0.9rem;
  color: var(--color-text);
  opacity: 0.8;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-heading);
}

.form-input {
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  color: var(--color-text);
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  border-color: hsla(160, 100%, 37%, 1);
}

.submit-btn {
  padding: 0.75rem;
  border-radius: 8px;
  border: none;
  background-color: hsla(160, 100%, 37%, 1);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
  margin-top: 0.5rem;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
