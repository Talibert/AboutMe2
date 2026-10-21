<script setup lang="ts">
interface Props {
  githubProfileUrl?: string
}

withDefaults(defineProps<Props>(), {
  githubProfileUrl: 'https://github.com/Talibert?tab=repositories',
})

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div class="error-state" role="alert" aria-live="assertive">
    <span class="error-icon" aria-hidden="true">⚠️</span>
    <h3 class="error-title">Não foi possível obter os projetos</h3>
    <p class="error-desc">
      A API do GitHub não respondeu no momento ou atingiu o limite temporário de requisições.
      Você pode tentar carregar novamente ou acessar os repositórios diretamente no GitHub.
    </p>
    <div class="error-actions">
      <button type="button" class="btn-retry" @click="emit('retry')">
        ↻ Tentar novamente
      </button>
      <a
        :href="githubProfileUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="btn-github-fallback"
      >
        <span>Acessar GitHub direto</span>
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3.5rem 2rem;
  background-color: var(--color-background-soft);
  border: 1px dashed var(--color-border);
  border-radius: 20px;
  max-width: 620px;
  width: 100%;
  gap: 1rem;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 0.25rem;
}

.error-title {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0;
}

.error-desc {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-text);
  opacity: 0.85;
  line-height: 1.55;
  margin: 0;
}

.error-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
  margin-top: 0.75rem;
}

.btn-retry {
  padding: 0.65rem 1.4rem;
  border-radius: 10px;
  background-color: hsla(160, 100%, 37%, 1);
  color: #ffffff;
  border: none;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 14px hsla(160, 100%, 37%, 0.25);
}

.btn-retry:hover {
  opacity: 0.92;
  transform: translateY(-2px);
}

.btn-github-fallback {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.65rem 1.4rem;
  border-radius: 10px;
  background-color: var(--color-background);
  color: var(--color-heading);
  border: 1px solid var(--color-border);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.btn-github-fallback:hover {
  border-color: var(--color-heading);
  transform: translateY(-2px);
}
</style>
