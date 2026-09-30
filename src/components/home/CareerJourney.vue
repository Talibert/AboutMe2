<script setup lang="ts">
import SectionHeader from '@/components/common/SectionHeader.vue'
import { CAREER_DATA } from '@/data/career'

const career = CAREER_DATA
</script>

<template>
  <section class="career-section" aria-labelledby="career-heading">
    <!-- Cabeçalho da Seção -->
    <SectionHeader
      badge="TRAJETÓRIA & EXPERIÊNCIA"
      title="Jornada Profissional"
      subtitle="Minha progressão de carreira na Élin Duxus Consulting, construindo soluções corporativas escaláveis desde o estágio até a atuação como Analista de Sistemas Jr."
      heading-id="career-heading"
    />

    <div class="career-card-container">
      <article class="mac-window-card career-card" aria-label="Trajetória Profissional de Guilherme Taliberti">
        <!-- Barra de Janela Superior Estilo macOS -->
        <div class="window-titlebar">
          <div class="window-controls" aria-hidden="true">
            <span class="control-dot control-dot--close"></span>
            <span class="control-dot control-dot--minimize"></span>
            <span class="control-dot control-dot--maximize"></span>
          </div>

          <div class="window-breadcrumbs">
            <span class="breadcrumb-icon">💼</span>
            <span class="breadcrumb-protocol">experience://</span>
            <span class="breadcrumb-slug">elin-duxus</span>
            <span class="breadcrumb-ext">/career-progression.ts</span>
          </div>

          <div class="window-status">
            <span class="status-pill status-pill--active">
              <span class="status-dot status-dot--pulse"></span>
              Ativo
            </span>
          </div>
        </div>

        <div class="window-body">
          <div class="ambient-glow" aria-hidden="true"></div>

          <div class="career-grid">
            <aside class="career-milestones-col">
              <div class="col-header">
                <span class="col-prefix">//</span>
                <h4 class="col-title">Marcos de Evolução</h4>
              </div>

              <div class="timeline-track">
                <div
                  v-for="(milestone, index) in career.milestones"
                  :key="milestone.id"
                  class="timeline-item"
                  :class="{
                    'timeline-item--current': milestone.status === 'current',
                    'timeline-item--completed': milestone.status === 'completed',
                  }"
                >
                  <!-- Linha conectora entre os nós -->
                  <div
                    v-if="index < career.milestones.length - 1"
                    class="timeline-connector"
                    aria-hidden="true"
                  ></div>

                  <!-- Marcador / Ponto do Nó -->
                  <div class="timeline-node" aria-hidden="true">
                    <span v-if="milestone.status === 'completed'" class="node-icon">✓</span>
                    <span v-else class="node-pulse-beacon"></span>
                  </div>

                  <!-- Conteúdo do Marco -->
                  <div class="milestone-details">
                    <div class="milestone-header">
                      <span class="milestone-date">{{ milestone.date }}</span>
                      <span
                        v-if="milestone.badge"
                        class="milestone-badge"
                      >
                        {{ milestone.badge }}
                      </span>
                    </div>

                    <h5 class="milestone-role">{{ milestone.role }}</h5>
                    <p v-if="milestone.description" class="milestone-desc">
                      {{ milestone.description }}
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <div class="career-company-col">
              <div class="company-header">
                <div class="company-meta-tag">
                  <span class="meta-tag-star">✦</span>
                  <span>EMPRESA ATUAL & ATUAÇÃO</span>
                </div>

                <h3 class="company-title">{{ career.company }}</h3>

                <div class="company-sub-meta">
                  <span class="company-type">{{ career.companyType }}</span>
                  <span class="meta-dot" aria-hidden="true">•</span>
                  <span class="company-location">📍 {{ career.location }}</span>
                  <span class="meta-dot" aria-hidden="true">•</span>
                  <span class="company-duration">📅 {{ career.period }}</span>
                </div>
              </div>

              <!-- Cargo Atual em Destaque -->
              <div class="current-role-banner">
                <span class="banner-label">Cargo Atual:</span>
                <strong class="banner-role">{{ career.currentRole }}</strong>
              </div>

              <!-- Resumo da Atuação -->
              <p class="company-description">
                {{ career.description }}
              </p>

              <!-- Principais Responsabilidades / Destaques -->
              <div class="responsibilities-group">
                <div class="group-header">
                  <span class="group-prefix">//</span>
                  <h5 class="group-title">Principais Responsabilidades & Entregas:</h5>
                </div>

                <ul class="responsibilities-list">
                  <li
                    v-for="(item, idx) in career.highlights"
                    :key="idx"
                    class="responsibility-item"
                  >
                    <span class="check-bullet" aria-hidden="true">▹</span>
                    <span class="item-text">{{ item }}</span>
                  </li>
                </ul>
              </div>

              <!-- Tecnologias Utilizadas no Dia a Dia -->
              <div class="technologies-group">
                <div class="group-header">
                  <span class="group-prefix">//</span>
                  <h5 class="group-title">Tecnologias & Ferramentas:</h5>
                </div>

                <div class="tech-chips">
                  <span
                    v-for="tech in career.technologies"
                    :key="tech"
                    class="tech-chip"
                  >
                    <span class="chip-accent-dot" aria-hidden="true"></span>
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
/* ============================================================================
   SEÇÃO & CONTAINER
   ============================================================================ */
.career-section {
  width: 100%;
  padding: 3.5rem 0 4.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.career-card-container {
  width: 92%;
  max-width: 1100px;
  margin: 0 auto;
}

@media (max-width: 1200px) {
  .career-card-container {
    width: 95%;
  }
}

@media (max-width: 768px) {
  .career-card-container {
    width: 100%;
  }
}

/* ============================================================================
   MOLDURA ESTILO macOS (MAC WINDOW CARD)
   ============================================================================ */
.career-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  overflow: hidden;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  position: relative;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.career-card:hover {
  border-color: hsla(160, 100%, 37%, 0.4);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
}

/* ============================================================================
   BARRA SUPERIOR (WINDOW TITLEBAR)
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
}

.breadcrumb-protocol {
  color: hsla(160, 100%, 37%, 1);
  font-weight: 600;
}

.breadcrumb-slug {
  font-weight: 500;
}

.breadcrumb-ext {
  opacity: 0.55;
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
}

.status-pill--active {
  color: hsla(160, 100%, 37%, 1);
  border-color: hsla(160, 100%, 37%, 0.4);
  background-color: var(--color-background-soft);
  box-shadow: 0 0 10px -2px hsla(160, 100%, 37%, 0.25);
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: currentColor;
}

.status-dot--pulse {
  box-shadow: 0 0 8px currentColor;
  animation: pulseBeacon 1.6s infinite ease-in-out;
}

@keyframes pulseBeacon {
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
   CORPO DA JANELA (WINDOW BODY)
   ============================================================================ */
.window-body {
  position: relative;
  padding: 2.75rem 3.5rem;
  overflow: hidden;
}

.ambient-glow {
  position: absolute;
  top: -80px;
  right: -80px;
  width: 360px;
  height: 360px;
  background: radial-gradient(circle, hsla(160, 100%, 37%, 0.08) 0%, transparent 70%);
  filter: blur(52px);
  pointer-events: none;
  border-radius: 50%;
}

/* Grid de 2 Colunas */
.career-grid {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 3.5rem;
  align-items: stretch;
  position: relative;
  z-index: 1;
}

/* ============================================================================
   COLUNA ESQUERDA: TIMELINE / MILESTONES
   ============================================================================ */
.career-milestones-col {
  display: flex;
  flex-direction: column;
  padding-right: 2.5rem;
  border-right: 1px solid var(--color-border);
  gap: 1.5rem;
}

.col-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.col-prefix {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  font-weight: 700;
  color: hsla(160, 100%, 37%, 1);
}

.col-title {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-heading);
  margin: 0;
}

.timeline-track {
  display: flex;
  flex-direction: column;
  position: relative;
}

.timeline-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  padding-bottom: 2rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

/* Linha conectora vertical */
.timeline-connector {
  position: absolute;
  left: 13px;
  top: 28px;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    hsla(160, 100%, 37%, 0.6) 0%,
    var(--color-border) 100%
  );
}

/* Marcador / Nó */
.timeline-node {
  position: relative;
  z-index: 2;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: var(--color-background);
  border: 2px solid var(--color-border);
  transition: all 0.25s ease;
}

.timeline-item--completed .timeline-node {
  border-color: hsla(160, 100%, 37%, 0.8);
  background-color: hsla(160, 100%, 37%, 0.1);
  color: hsla(160, 100%, 37%, 1);
}

.node-icon {
  font-size: 0.75rem;
  font-weight: 800;
  line-height: 1;
}

.timeline-item--current .timeline-node {
  border-color: hsla(160, 100%, 37%, 1);
  background-color: var(--color-background);
  box-shadow: 0 0 14px hsla(160, 100%, 37%, 0.4);
}

.node-pulse-beacon {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: hsla(160, 100%, 37%, 1);
  box-shadow: 0 0 8px hsla(160, 100%, 37%, 0.8);
  animation: pulseDot 1.6s infinite ease-in-out;
}

@keyframes pulseDot {
  0%, 100% {
    transform: scale(0.9);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.3);
    opacity: 1;
  }
}

/* Detalhes do Marco */
.milestone-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: 0.1rem;
}

.milestone-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.milestone-date {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  color: hsla(160, 100%, 37%, 1);
  background: hsla(160, 100%, 37%, 0.08);
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  border: 1px solid hsla(160, 100%, 37%, 0.2);
}

.milestone-badge {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.15rem 0.45rem;
  border-radius: 9999px;
  background-color: hsla(160, 100%, 37%, 0.15);
  color: hsla(160, 100%, 37%, 1);
  border: 1px solid hsla(160, 100%, 37%, 0.3);
}

.milestone-role {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0.15rem 0 0;
  line-height: 1.3;
}

.milestone-desc {
  font-family: var(--font-body);
  font-size: 0.84rem;
  line-height: 1.5;
  color: var(--color-text);
  opacity: 0.85;
  margin: 0.35rem 0 0;
}

/* ============================================================================
   COLUNA DIREITA: DADOS DA EMPRESA & ATUAÇÃO
   ============================================================================ */
.career-company-col {
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
}

.company-header {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.company-meta-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: hsla(160, 100%, 37%, 1);
}

.meta-tag-star {
  font-size: 0.72rem;
}

.company-title {
  font-family: var(--font-heading);
  font-size: 1.85rem;
  font-weight: 800;
  color: var(--color-heading);
  line-height: 1.2;
  margin: 0;
  letter-spacing: -0.02em;
}

.company-sub-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-text);
  opacity: 0.85;
  margin-top: 0.2rem;
}

.company-type {
  font-weight: 600;
  color: var(--color-heading);
}

.meta-dot {
  opacity: 0.4;
}

/* Banner do Cargo Atual */
.current-role-banner {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1rem;
  border-radius: 10px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-left: 3.5px solid hsla(160, 100%, 37%, 1);
  width: fit-content;
}

.banner-label {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text);
  opacity: 0.75;
}

.banner-role {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-heading);
}

.company-description {
  font-family: var(--font-body);
  font-size: 0.96rem;
  line-height: 1.68;
  color: var(--color-text);
  opacity: 0.95;
  margin: 0;
}

/* Responsabilidades */
.responsibilities-group {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.group-prefix {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 700;
  color: hsla(160, 100%, 37%, 1);
}

.group-title {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text);
  opacity: 0.75;
  margin: 0;
}

.responsibilities-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.responsibility-item {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  font-family: var(--font-body);
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--color-text);
  opacity: 0.92;
}

.check-bullet {
  color: hsla(160, 100%, 37%, 1);
  font-size: 0.85rem;
  line-height: 1.4;
  flex-shrink: 0;
}

/* Tecnologias */
.technologies-group {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 0.25rem;
}

.tech-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.tech-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 500;
  padding: 0.3rem 0.65rem;
  border-radius: 8px;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  color: var(--color-heading);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.chip-accent-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: hsla(160, 100%, 37%, 1);
  flex-shrink: 0;
}

.tech-chip:hover {
  border-color: hsla(160, 100%, 37%, 1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* ============================================================================
   RESPONSIVIDADE (TABLET & MOBILE)
   ============================================================================ */
@media (max-width: 960px) {
  .window-body {
    padding: 2.25rem 2.25rem;
  }

  .career-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .career-milestones-col {
    padding-right: 0;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 2rem;
  }
}

@media (max-width: 640px) {
  .window-body {
    padding: 1.5rem 1.25rem;
  }

  .window-breadcrumbs {
    display: none;
  }

  .company-title {
    font-size: 1.45rem;
  }

  .company-sub-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .meta-dot {
    display: none;
  }
}
</style>
