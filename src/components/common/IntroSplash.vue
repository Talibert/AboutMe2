<!--
  OBJETIVO DO COMPONENTE:
  1. Exibir em destaque absoluto o nome "Guilherme Taliberti" centralizado na tela.
  2. Criar uma atmosfera moderna com efeitos de iluminação sutil (ambient glow)
     e animação suave de entrada.
  3. Manter a exibição durante 3 segundos (3000ms), acompanhada por uma barra de
     progresso minimalista que enche até 100%.
  4. Ao expirar o tempo, emitir o evento 'finish' para que o App.vue inicie a
     transição CSS suave de saída, revelando a Home View.
  5. Limpar qualquer efeito colateral (como trava de scroll e timers) ao ser desmontado.
-->

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface Props {
  /** Nome principal em destaque no centro da tela */
  name?: string
  /** Texto da badge/etiqueta superior (ex: "Portfólio") */
  subtitle?: string
  /** Tempo total de exibição em milissegundos antes da transição (padrão: 3000ms) */
  duration?: number
}

// withDefaults define os valores padrão caso o componente seja chamado sem props
const props = withDefaults(defineProps<Props>(), {
  name: 'Guilherme Taliberti',
  subtitle: 'Analista de Sistemas',
  duration: 3000,
})

// Informa o componente pai (App.vue) que os 3 segundos acabaram
const emit = defineEmits<{
  (e: 'finish'): void
}>()

/**
 * Trava booleana de segurança:
 * Garante que a função triggerFinish() só seja executada uma única vez,
 * prevenindo disparos duplicados ou condições de corrida.
 */
const isClosing = ref(false)

/**
 * Guarda a referência do setTimeout no Node/Navegador para que possamos
 * cancelá-lo caso o componente seja destruído antes da hora (evita vazamento de memória).
 */
let timer: ReturnType<typeof setTimeout> | null = null

/**
 * Função responsável por encerrar o splash:
 * 1. Ativa a trava de encerramento.
 * 2. Limpa o timer pendente.
 * 3. Notifica o componente pai através de emit('finish').
 */
function triggerFinish() {
  if (isClosing.value) return
  isClosing.value = true

  if (timer) {
    clearTimeout(timer)
    timer = null
  }

  emit('finish')
}

onMounted(() => {
  /**
   * BLOQUEIO DO SCROLL:
   * Enquanto a tela de intro estiver ativa na frente de tudo, não queremos
   * que a rolagem do mouse ou o swipe no celular movimente a Home View que
   * está escondida por baixo. Por isso travamos o overflow do body em 'hidden'.
   */
  if (typeof document !== 'undefined')
    document.body.style.overflow = 'hidden'

  /**
   * DISPARADOR TEMPORIZADO:
   * Inicia a contagem dos 3000ms (props.duration). Quando o tempo expira,
   * chama triggerFinish(), que por sua vez avisa o App.vue para desmontar a intro.
   */
  timer = setTimeout(() => {
    triggerFinish()
  }, props.duration)
})

onBeforeUnmount(() => {
  /**
   * LIMPEZA (CLEANUP):
   * Executado quando o Vue está prestes a remover o componente do DOM:
   * 1. Cancela o timeout caso ainda estivesse agendado.
   * 2. Restaura o scroll natural do body para que a Home View volte a rolar normalmente.
   */
  if (timer) {
    clearTimeout(timer)
    timer = null
  }

  if (typeof document !== 'undefined')
    document.body.style.overflow = ''
})
</script>

<template>
  <!--
    Container Principal:
    - Ocupa 100vw e 100vh fixos no topo de toda a página (z-index: 9999).
    - role="dialog" e aria-modal="true" comunicam a tecnologias assistivas (leitores de tela)
      que se trata de uma camada modal em exibição no momento.
  -->
  <div
    class="intro-splash"
    :class="{ 'is-closing': isClosing }"
    role="dialog"
    aria-modal="true"
    :aria-label="`Apresentação: ${name}`"
  >
    <!--
      Efeito Visual de Iluminação (Ambient Glow):
      - Círculo gradiente desfocado (blur) que pulsa suavemente atrás do nome.
      - aria-hidden="true" esconde este elemento puramente estético de leitores de tela.
    -->
    <div class="ambient-glow" aria-hidden="true"></div>

    <!-- Conteúdo Central: Badge, Nome e Linha de Progresso -->
    <div class="intro-content">

      <!-- Badge / Etiqueta superior (opcional, renderizada se subtitle existir) -->
      <div v-if="subtitle" class="intro-badge">
        <span class="badge-dot"></span>
        <span class="badge-text">{{ subtitle }}</span>
      </div>

      <!-- Nome Principal com tipografia em degradê -->
      <h1 class="intro-name">
        <span class="name-highlight">{{ name }}</span>
      </h1>

      <!--
        Barra de Progresso dos 3 Segundos:
        - track: trilha estática de fundo com borda sutil.
        - bar: elemento animado em CSS cuja duração é sincronizada dinamicamente
               com a prop `duration` (3000ms).
      -->
      <div class="progress-track" aria-hidden="true">
        <div
          class="progress-bar"
          :style="{ animationDuration: `${duration}ms` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ============================================================================
   ESTILOS GERAIS DO CONTAINER DA INTRO
   ============================================================================ */

.intro-splash {
  /* Fixa o elemento para cobrir toda a janela de visualização do navegador */
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  /* z-index altíssimo para ficar acima de qualquer navbar ou layout */
  z-index: 9999;

  /* Centralização perfeita vertical e horizontal */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* Respeita o tema do usuário (claro ou escuro) via variável CSS global */
  background-color: var(--color-background);
  overflow: hidden;

  /* Impede que o usuário selecione o texto como se fosse um documento de texto */
  user-select: none;
  -webkit-user-select: none;
  cursor: default;
}

/* ============================================================================
   ILUMINAÇÃO DE FUNDO (AMBIENT GLOW)
   ============================================================================ */

.ambient-glow {
  position: absolute;
  width: min(600px, 90vw);
  height: min(600px, 90vw);
  border-radius: 50%;
  /* Gradiente radial com o verde acentuado do portfólio dissolvendo para transparente */
  background: radial-gradient(
    circle,
    hsla(160, 100%, 37%, 0.18) 0%,
    hsla(160, 100%, 37%, 0.05) 45%,
    transparent 70%
  );
  filter: blur(50px);
  pointer-events: none; /* Não interfere em nenhum clique */
  animation: glowPulse 4s ease-in-out infinite alternate;
}

/* ============================================================================
   CONTAINER DE CONTEÚDO CENTRAL
   ============================================================================ */

.intro-content {
  position: relative;
  z-index: 2; /* Fica acima do ambient-glow */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  max-width: 90vw;
}

/* ============================================================================
   BADGE / ETIQUETA SUPERIOR
   ============================================================================ */

.intro-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.9rem;
  border-radius: 9999px;
  background: hsla(160, 100%, 37%, 0.08);
  border: 1px solid hsla(160, 100%, 37%, 0.25);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: hsla(160, 100%, 37%, 1);
  margin-bottom: 1.25rem;
  /* Animação suave de subida e fade ao nascer */
  animation: badgeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: hsla(160, 100%, 37%, 1);
  box-shadow: 0 0 8px hsla(160, 100%, 37%, 0.8);
  animation: dotPulse 2s ease-in-out infinite;
}

/* ============================================================================
   NOME PRINCIPAL (TIPOGRAFIA)
   ============================================================================ */

.intro-name {
  /* clamp garante tamanho dinâmico e responsivo entre celular e desktop */
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.035em;
  margin: 0;
  color: var(--color-heading);
  /* Animação de entrada com leve desfoque inicial (motion blur estético) */
  animation: nameIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
}

/*
  Efeito de Texto em Degradê:
  Pinta o texto com um gradiente que vai da cor principal de títulos
  até o verde característico do portfólio.
*/
.name-highlight {
  display: inline-block;
  background: linear-gradient(
    135deg,
    var(--color-heading) 40%,
    hsla(160, 100%, 42%, 0.9) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ============================================================================
   BARRA DE PROGRESSO TEMPORIZADA (3 SEGUNDOS)
   ============================================================================ */

/* Trilha cinza de fundo da barra */
.progress-track {
  width: clamp(140px, 30vw, 220px);
  height: 2px;
  border-radius: 9999px;
  background: var(--color-border);
  overflow: hidden;
  margin-top: 2rem;
  animation: trackIn 0.8s ease 0.3s both;
}

/*
  Preenchimento da barra:
  Começa em width: 0% e vai até 100% usando a duração informada na prop (3000ms).
*/
.progress-bar {
  height: 100%;
  width: 0%;
  border-radius: 9999px;
  background: linear-gradient(
    90deg,
    hsla(160, 100%, 37%, 0.6),
    hsla(160, 100%, 42%, 1)
  );
  box-shadow: 0 0 10px hsla(160, 100%, 37%, 0.5);
  animation-name: progressAdvance;
  animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
  animation-fill-mode: forwards;
}

/* ============================================================================
   KEYFRAMES (ANIMAÇÕES CSS)
   ============================================================================ */

/* Pulso de escala e opacidade para o brilho de fundo */
@keyframes glowPulse {
  0% {
    transform: scale(0.92);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.08);
    opacity: 1;
  }
}

/* Entrada da badge: sobe levemente enquanto ganha opacidade */
@keyframes badgeIn {
  0% {
    opacity: 0;
    transform: translateY(14px) scale(0.94);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Entrada do nome: sobe suavemente e reduz o desfoque inicial */
@keyframes nameIn {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.96);
    filter: blur(6px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

/* Entrada suave da trilha da barra de progresso */
@keyframes trackIn {
  0% {
    opacity: 0;
    transform: scaleX(0.7);
  }
  100% {
    opacity: 1;
    transform: scaleX(1);
  }
}

/* Animação que preenche a barra de 0% a 100% durante os 3 segundos */
@keyframes progressAdvance {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

/* Pulso luminoso no ponto verde da badge */
@keyframes dotPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(0.75);
  }
}

/* ============================================================================
   RESPONSIVIDADE (DISPOSITIVOS MÓVEIS)
   ============================================================================ */

@media (max-width: 640px) {
  .intro-name {
    font-size: clamp(2rem, 8vw, 2.75rem);
  }

  .intro-badge {
    font-size: 0.72rem;
    padding: 0.3rem 0.75rem;
  }
}
</style>
