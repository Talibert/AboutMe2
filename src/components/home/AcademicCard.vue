<script setup lang="ts">
import type { AcademicItem } from '@/types/academic'

interface Props {
  item: AcademicItem
}

defineProps<Props>()
</script>

<template>
  <article
    class="academic-card"
    :style="{ '--accent-color': item.accentColor || 'hsla(160, 100%, 37%, 1)' }"
    :aria-label="`Formação: ${item.title}`"
  >
    <!-- Barra Superior: Janela Estilo macOS / Terminal Acadêmico -->
    <div class="window-titlebar">
      <div class="window-controls" aria-hidden="true">
        <span class="control-dot control-dot--close"></span>
        <span class="control-dot control-dot--minimize"></span>
        <span class="control-dot control-dot--maximize"></span>
      </div>

      <div class="window-breadcrumbs">
        <span class="breadcrumb-icon">📜</span>
        <span class="breadcrumb-protocol">academic://</span>
        <span class="breadcrumb-slug">{{ item.id }}</span>
        <span class="breadcrumb-ext">.edu</span>
      </div>

      <div class="window-status">
        <span
          class="status-pill"
          :class="{ 'status-pill--active': item.status === 'Cursando' || item.status === 'Em andamento' }"
        >
          <span
            class="status-dot"
            :class="{ 'status-dot--pulse': item.status === 'Cursando' || item.status === 'Em andamento' }"
          ></span>
          {{ item.status }}
        </span>
      </div>
    </div>

    <!-- Corpo Principal do Card -->
    <div class="academic-body">
      <!-- Glow ambiente sutil com a cor de assinatura do curso -->
      <div class="ambient-glow" aria-hidden="true"></div>

      <!-- Marca d'água sutil no fundo com o ícone da formação -->
      <div class="watermark-icon" aria-hidden="true">{{ item.icon }}</div>

      <!-- Layout em Grid: Aside minimalista à esquerda e Conteúdo à direita -->
      <div class="academic-grid">
        <!-- Coluna da Esquerda (Aside): Ocupa toda a altura, minimalista sem fundo escuro -->
        <aside class="academic-aside-col">
          <div class="aside-top">
            <span class="type-badge">
              <span class="badge-icon" aria-hidden="true">{{ item.icon }}</span>
              <span class="badge-text">{{ item.type }}</span>
            </span>
          </div>

          <div class="aside-meta-list">
            <div class="meta-field">
              <span class="meta-label">Instituição de Ensino</span>
              <span class="institution-name">{{ item.institution }}</span>
            </div>

            <div class="meta-field">
              <span class="meta-label">Período Letivo</span>
              <span class="period-text">{{ item.period }}</span>
            </div>
          </div>

          <div class="aside-bottom">
            <div class="minimal-credential-tag">
              <span class="minimal-dot" aria-hidden="true"></span>
              <span>Validação Acadêmica</span>
            </div>
          </div>
        </aside>

        <!-- Coluna da Direita: Detalhes da Formação, Descrição e Competências -->
        <div class="academic-details-col">
          <div class="title-header-group">
            <div class="credential-indicator">
              <span class="credential-star" aria-hidden="true">✦</span>
              <span class="credential-text">Credencial Acadêmica</span>
            </div>
            <h3 class="academic-title">{{ item.title }}</h3>
          </div>

          <!-- Descrição estilizada e minimalista -->
          <div class="description-card">
            <p class="academic-description">{{ item.description }}</p>
          </div>

          <!-- Competências & Disciplinas-Chave -->
          <div v-if="item.skills && item.skills.length > 0" class="academic-skills-group">
            <div class="skills-heading-row">
              <span class="skills-code-prefix" aria-hidden="true">//</span>
              <h5 class="skills-heading">Disciplinas & Competências-Chave:</h5>
            </div>

            <div class="skills-chips">
              <span
                v-for="skill in item.skills"
                :key="skill"
                class="skill-chip"
              >{{ skill }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* ============================================================================
   CARD ACADÊMICO (MOLDURA & ESTRUTURA BASE)
   ============================================================================ */
.academic-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-soft);
  position: relative;
  overflow: hidden;
}

/* ============================================================================
   BARRA SUPERIOR (ESTILO macOS / TERMINAL)
   ============================================================================ */
.window-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.5rem;
  background-color: var(--color-background-mute);
  border-bottom: 1px solid var(--color-border);
  user-select: none;
  gap: 1rem;
}

.window-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 54px;
  flex-shrink: 0;
}

.control-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.control-dot--close {
  background-color: #ff5f56;
}

.control-dot--minimize {
  background-color: #ffbd2e;
}

.control-dot--maximize {
  background-color: #27c93f;
}

.window-breadcrumbs {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  color: var(--color-heading);
  letter-spacing: 0.02em;
  opacity: 0.85;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.breadcrumb-icon {
  font-size: 0.85rem;
  opacity: 0.9;
}

.breadcrumb-protocol {
  color: var(--accent-color, hsla(160, 100%, 37%, 1));
  font-weight: 600;
}

.breadcrumb-slug {
  font-weight: 500;
}

.breadcrumb-ext {
  opacity: 0.5;
}

.window-status {
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.22rem 0.65rem;
  border-radius: 9999px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  transition: all 0.2s ease;
}

.status-pill--active {
  color: var(--accent-color, hsla(160, 100%, 37%, 1));
  border-color: var(--accent-color, hsla(160, 100%, 37%, 0.4));
  background-color: var(--color-background-soft);
  box-shadow: 0 0 12px -2px var(--accent-color, hsla(160, 100%, 37%, 0.25));
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: currentColor;
}

.status-dot--pulse {
  box-shadow: 0 0 8px currentColor;
  animation: pulseDot 1.6s infinite ease-in-out;
}

@keyframes pulseDot {
  0%, 100% {
    opacity: 0.35;
    transform: scale(0.9);
  }
  50% {
    opacity: 1;
    transform: scale(1.25);
  }
}

/* ============================================================================
   CORPO PRINCIPAL (ACADEMIC BODY)
   ============================================================================ */
.academic-body {
  position: relative;
  padding: 2.75rem 4rem;
  min-height: 310px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Glow Ambiente Traseiro */
.ambient-glow {
  position: absolute;
  top: -60px;
  right: -60px;
  width: 340px;
  height: 340px;
  background: radial-gradient(circle, var(--accent-color, hsla(160, 100%, 37%, 1)) 0%, transparent 68%);
  opacity: 0.08;
  filter: blur(52px);
  pointer-events: none;
  border-radius: 50%;
}

/* Marca d'água elegante no canto inferior */
.watermark-icon {
  position: absolute;
  right: 1.5rem;
  bottom: -0.8rem;
  font-size: 8.5rem;
  opacity: 0.035;
  user-select: none;
  pointer-events: none;
  line-height: 1;
  filter: grayscale(1);
}

/* ============================================================================
   GRID DE DUAS COLUNAS
   ============================================================================ */
.academic-grid {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 3rem;
  align-items: stretch;
  position: relative;
  z-index: 1;
}

/* ============================================================================
   COLUNA ESQUERDA (ASIDE MINIMALISTA, ALTURA TOTAL, SEM FUNDO ESCURO)
   ============================================================================ */
.academic-aside-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
  padding-right: 2.5rem;
  border-right: 1px solid var(--color-border);
  background: transparent;
  gap: 1.5rem;
}

.aside-top {
  display: flex;
  align-items: center;
}

.type-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.28rem 0.75rem;
  border-radius: 9999px;
  background-color: var(--color-background);
  color: var(--accent-color, hsla(160, 100%, 37%, 1));
  border: 1px solid currentColor;
}

.badge-icon {
  font-size: 0.85rem;
  line-height: 1;
}

.badge-text {
  line-height: 1;
}

.aside-meta-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
}

.meta-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.meta-label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text);
  opacity: 0.6;
}

.institution-name {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-heading);
  line-height: 1.3;
}

.period-text {
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--color-text);
  opacity: 0.9;
}

.aside-bottom {
  display: flex;
  align-items: center;
}

.minimal-credential-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text);
  opacity: 0.65;
}

.minimal-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--accent-color, hsla(160, 100%, 37%, 1));
}

/* ============================================================================
   COLUNA DIREITA: TÍTULO, DESCRIÇÃO & COMPETÊNCIAS
   ============================================================================ */
.academic-details-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.25rem;
}

.title-header-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.credential-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent-color, hsla(160, 100%, 37%, 1));
}

.credential-star {
  font-size: 0.72rem;
}

.academic-title {
  font-family: var(--font-heading);
  font-size: 1.65rem;
  font-weight: 800;
  color: var(--color-heading);
  line-height: 1.22;
  margin: 0;
  letter-spacing: -0.015em;
}

/* Caixa com Borda de Destaque para a Descrição */
.description-card {
  padding: 0.95rem 1.25rem;
  background: var(--color-background);
  border-left: 3.5px solid var(--accent-color, hsla(160, 100%, 37%, 1));
  border-radius: 0 10px 10px 0;
  border-top: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.academic-description {
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--color-text);
  opacity: 0.95;
  margin: 0;
}

/* Grupo de Competências */
.academic-skills-group {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.skills-heading-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.skills-code-prefix {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent-color, hsla(160, 100%, 37%, 1));
}

.skills-heading {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text);
  opacity: 0.75;
  margin: 0;
}

.skills-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.skill-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  padding: 0.3rem 0.7rem;
  border-radius: 8px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-heading);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Marcador pontual colorido sem poluir a string no DOM (compatível com testes) */
.skill-chip::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--accent-color, hsla(160, 100%, 37%, 1));
  flex-shrink: 0;
}

.skill-chip:hover {
  border-color: var(--accent-color, hsla(160, 100%, 37%, 1));
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* ============================================================================
   RESPONSIVIDADE (TABLET & MOBILE)
   ============================================================================ */
@media (max-width: 860px) {
  .academic-body {
    padding: 2rem 2.5rem;
  }

  .academic-grid {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }

  .academic-aside-col {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    padding-right: 0;
    padding-bottom: 1.5rem;
    gap: 1rem;
  }

  .aside-meta-list {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.5rem;
    width: auto;
  }

  .academic-title {
    font-size: 1.4rem;
  }
}

@media (max-width: 640px) {
  .academic-body {
    padding: 1.5rem 1.25rem;
  }

  .window-breadcrumbs {
    display: none;
  }

  .academic-aside-col {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .aside-meta-list {
    flex-direction: column;
    gap: 0.75rem;
  }

  .academic-title {
    font-size: 1.22rem;
  }

  .academic-description {
    font-size: 0.88rem;
  }
}
</style>
