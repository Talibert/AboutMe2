import { ref } from 'vue'

const isIntroActive = ref(true)

/**
 * Composable para gerenciar a exibição e estado da tela de apresentação (Intro Splash).
 * Garante que a animação inicial seja exibida ao carregar o portfólio,
 * e evita repetições indesejadas durante a navegação interna entre rotas.
 */
export function useIntro() {
  function finishIntro(): void {
    isIntroActive.value = false
  }

  return {
    isIntroActive,
    finishIntro,
  }
}
