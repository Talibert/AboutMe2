import { ref } from 'vue'

const isIntroActive = ref(true)
const isIntroDismissed = ref(false)

/**
 * Composable para gerenciar a exibição e estado da tela de apresentação (Intro Splash).
 * Garante que a animação inicial seja exibida ao carregar o portfólio,
 * e sinaliza exatamente quando o splash sumiu para disparar as animações do Hero.
 */
export function useIntro() {
  function finishIntro(): void {
    isIntroActive.value = false
  }

  function markIntroDismissed(): void {
    isIntroDismissed.value = true
  }

  return {
    isIntroActive,
    isIntroDismissed,
    finishIntro,
    markIntroDismissed,
  }
}
