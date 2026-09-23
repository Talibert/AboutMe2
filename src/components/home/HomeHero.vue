<script setup lang="ts">
import { ref } from 'vue'

// URL estática em alta resolução (600x600) do avatar do GitHub
const AVATAR_URL = 'https://avatars.githubusercontent.com/u/112726589?v=4&s=600'
const imageLoaded = ref(false)

const techStack = [
  { name: 'Java', color: '#f89820' },
  { name: 'Spring Boot', color: '#6db33f' },
  { name: 'Clean Architecture', color: '#a855f7' },
  { name: 'Sistemas Distribuídos', color: '#f7559b' },
  { name: 'SGBDR', color: '#336791' },
  { name: 'Vue.js 3', color: '#42b883' },
  { name: 'TypeScript', color: '#3178c6' },
]
</script>

<template>
  <section class="hero-container" aria-label="Apresentação Profissional">
    <!-- Grid com duas colunas no desktop: Texto à esquerda e Foto à direita -->
    <div class="hero-grid">

      <div class="hero-text-col">
        <!-- Badge de status com fonte mono -->
        <div class="status-pill">
          <span class="status-indicator">
            <span class="status-dot"></span>
            <span class="status-pulse"></span>
          </span>
          <span class="status-text">Disponível para projetos & conexões</span>
        </div>

        <!-- Título principal com combinação de fontes modernas -->
        <div class="hero-title-group">
          <p class="greeting-lead">Olá, eu sou</p>
          <h1 class="hero-name">
            Guilherme <span class="name-accent">Taliberti</span>
          </h1>
          <h2 class="hero-role">
            <span class="role-bracket">&lt;</span>
            Analista de Sistemas
            <span class="role-bracket">/&gt;</span>
          </h2>
        </div>

        <!-- Descrição Bio -->
        <p class="hero-bio">
          Desenvolvedor FullStack focado em <strong class="text-highlight">Java</strong>,
          <strong class="text-highlight">Vue.js</strong> e
          <strong class="text-highlight">TypeScript</strong>. <br> Atuo na
          <span class="company-tag">Élin Duxus Consulting</span>, com formação em
          <strong>Automação Industrial</strong> pela Fatec e cursando
          <strong>Sistemas de Informação</strong>.
        </p>

        <!-- Pílulas de Tecnologias em Destaque (JetBrains Mono) -->
        <div class="stack-tags" aria-label="Principais Tecnologias">
          <span
            v-for="tech in techStack"
            :key="tech.name"
            class="tech-chip"
          >
            <span class="chip-dot" :style="{ backgroundColor: tech.color }"></span>
            {{ tech.name }}
          </span>
        </div>

        <!-- Ações e Redes Sociais -->
        <div class="hero-actions">
          <a
            href="https://github.com/Talibert"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-hero btn-hero--primary"
          >
            <svg class="btn-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub Profile</span>
          </a>

          <a
            href="https://www.linkedin.com/in/guilherme-taliberti/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-hero btn-hero--secondary"
          >
            <svg class="btn-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6 1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      <!-- ===================================================================
           COLUNA DA DIREITA: Retrato em Card Janela de Código / IDE
           =================================================================== -->
      <div class="hero-photo-col">
        <div class="photo-card-wrapper">
          <!-- Brilho ambiente atrás da janela -->
          <div class="photo-ambient-glow" aria-hidden="true"></div>

          <!-- Moldura Janela IDE / Editor de Código -->
          <div class="ide-window">
            <!-- Barra Superior / Abas do Editor -->
            <div class="ide-titlebar">
              <div class="window-controls" aria-hidden="true">
                <span class="control-dot control-dot--close"></span>
                <span class="control-dot control-dot--minimize"></span>
                <span class="control-dot control-dot--maximize"></span>
              </div>

              <div class="ide-meta" aria-hidden="true">
                <span class="branch-tag">main*</span>
              </div>
            </div>

            <!-- Corpo da Janela: Foto de alta definição com corte nítido -->
            <div class="ide-body">
              <!-- Shimmer enquanto a imagem carrega -->
              <div v-if="!imageLoaded" class="photo-skeleton" aria-hidden="true"></div>

              <img
                :src="AVATAR_URL"
                alt="Foto de perfil de Guilherme Taliberti"
                class="profile-img"
                :class="{ 'is-loaded': imageLoaded }"
                loading="eager"
                @load="imageLoaded = true"
              />
            </div>

            <!-- Barra de Status Inferior da IDE -->
            <div class="ide-statusbar" aria-hidden="true">
              <div class="status-col">
                <span class="status-branch-icon">⎇</span>
                <span>master</span>
              </div>
              <div class="status-col">
                <span>UTF-8</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ============================================================================
   CONTAINER DO HERO
   ============================================================================ */
.hero-container {
  position: relative;
  width: 100%;
  padding: 2.5rem 0 4rem;
  overflow: hidden;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.25fr 0.95fr;
  align-items: center;
  gap: 3.5rem;
}

/* ============================================================================
   COLUNA DE TEXTO
   ============================================================================ */
.hero-text-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 2;
}

/* Status Pill (Disponível para projetos) */
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  width: fit-content;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--color-text);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.status-indicator {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8px;
  height: 8px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #10b981;
}

.status-pulse {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: rgba(16, 185, 129, 0.35);
  animation: pulse 2s infinite ease-out;
}

@keyframes pulse {
  0% {
    transform: scale(0.6);
    opacity: 1;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}

/* Título e Tipografia */
.hero-title-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.greeting-lead {
  font-family: var(--font-mono);
  font-size: 1.05rem;
  font-weight: 500;
  color: hsla(160, 100%, 37%, 1);
  letter-spacing: 0.05em;
  margin: 0;
}

.hero-name {
  font-family: var(--font-heading);
  font-size: clamp(2.75rem, 5.5vw, 4.25rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.035em;
  color: var(--color-heading);
  margin: 0;
}

.name-accent {
  background: linear-gradient(
    135deg,
    hsla(160, 100%, 37%, 1) 0%,
    hsla(160, 100%, 48%, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-role {
  font-family: var(--font-heading);
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 600;
  color: var(--color-text);
  opacity: 0.9;
  letter-spacing: -0.015em;
  margin: 0.2rem 0 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.role-bracket {
  font-family: var(--font-mono);
  color: hsla(160, 100%, 37%, 1);
  font-weight: 700;
}

/* Bio Text */
.hero-bio {
  font-family: var(--font-body);
  font-size: 1.075rem;
  line-height: 1.75;
  color: var(--color-text);
  opacity: 0.9;
  max-width: 580px;
  margin: 0;
}

.text-highlight {
  color: var(--color-heading);
  font-weight: 600;
}

.company-tag {
  display: inline-block;
  padding: 0.05rem 0.45rem;
  border-radius: 4px;
  background-color: hsla(160, 100%, 37%, 0.1);
  color: hsla(160, 100%, 37%, 1);
  font-weight: 600;
}

/* Tags de Tecnologias */
.stack-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding: 0.25rem 0;
}

.tech-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  color: var(--color-heading);
  transition: all 0.2s ease;
}

.tech-chip:hover {
  border-color: hsla(160, 100%, 37%, 0.5);
  transform: translateY(-2px);
}

.chip-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

/* Ações (Botões) */
.hero-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
}

.btn-hero {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.4rem;
  border-radius: 10px;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-hero--primary {
  background-color: hsla(160, 100%, 37%, 1);
  color: #ffffff !important;
  box-shadow: 0 4px 16px hsla(160, 100%, 37%, 0.35);
}

.btn-hero--primary:hover {
  background-color: hsla(160, 100%, 42%, 1);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px hsla(160, 100%, 37%, 0.45);
}

.btn-hero--secondary {
  background-color: var(--color-background-soft);
  color: var(--color-heading) !important;
  border: 1px solid var(--color-border);
}

.btn-hero--secondary:hover {
  border-color: hsla(160, 100%, 37%, 0.5);
  background-color: var(--color-background-mute);
  transform: translateY(-2px);
}

/* ============================================================================
   COLUNA DA FOTO (RETRATO MODERNO)
   ============================================================================ */
.hero-photo-col {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.photo-card-wrapper {
  position: relative;
  width: 100%;
  max-width: 380px;
}

/* Ambient glow atrás da foto */
.photo-ambient-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 115%;
  height: 115%;
  border-radius: 36px;
  background: radial-gradient(
    circle,
    hsla(160, 100%, 37%, 0.28) 0%,
    hsla(160, 100%, 37%, 0.08) 50%,
    transparent 75%
  );
  filter: blur(40px);
  z-index: 0;
  pointer-events: none;
}

/* ============================================================================
   CARD JANELA DE CÓDIGO / IDE
   ============================================================================ */

/* Janela da IDE */
.ide-window {
  position: relative;
  z-index: 1;
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-soft);
  box-shadow:
    0 20px 40px -15px rgba(0, 0, 0, 0.25),
    0 0 0 1px hsla(160, 100%, 37%, 0.15);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.photo-card-wrapper:hover .ide-window {
  transform: translateY(-6px);
  box-shadow:
    0 28px 50px -15px rgba(0, 0, 0, 0.35),
    0 0 0 1px hsla(160, 100%, 37%, 0.4);
}

/* Barra de Título / Abas */
.ide-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 1rem;
  background-color: var(--color-background-mute);
  border-bottom: 1px solid var(--color-border);
  user-select: none;
}

/* Controles de Janela macOS */
.window-controls {
  display: flex;
  align-items: center;
  gap: 7px;
  width: 50px;
}

.control-dot {
  width: 11px;
  height: 11px;
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

/* Meta da Barra Superior */
.ide-meta {
  display: flex;
  justify-content: flex-end;
  width: 50px;
}

.branch-tag {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--color-text);
  opacity: 0.65;
}

/* Corpo da Janela com a Foto */
.ide-body {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1.05;
  overflow: hidden;
  background-color: var(--color-background);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  opacity: 0;
  transition: opacity 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.profile-img.is-loaded {
  opacity: 1;
}

.photo-card-wrapper:hover .profile-img {
  transform: scale(1.03);
}

/* Barra de Status Inferior da IDE */
.ide-statusbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.45rem 1rem;
  background-color: var(--color-background-mute);
  border-top: 1px solid var(--color-border);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--color-text);
  opacity: 0.85;
  user-select: none;
}

.status-col {
  display: flex;
  align-items: center;
}

/* Skeleton Loading da Foto */
.photo-skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    var(--color-border) 25%,
    var(--color-background-mute) 50%,
    var(--color-border) 75%
  );
  background-size: 200% 100%;
  animation: photoShimmer 1.5s infinite;
}

@keyframes photoShimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* ============================================================================
   RESPONSIVIDADE (TABLETS E CELULARES)
   ============================================================================ */
@media (max-width: 960px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .hero-photo-col {
    order: -1; /* No mobile a foto aparece no topo com estilo impactante */
  }

  .photo-card-wrapper {
    max-width: 300px;
  }

  .hero-text-col {
    text-align: center;
    align-items: center;
  }

  .hero-bio {
    max-width: 100%;
  }

  .stack-tags {
    justify-content: center;
  }

  .hero-actions {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-container {
    padding: 1.5rem 0 3rem;
  }

  .photo-card-wrapper {
    max-width: 260px;
  }

  .btn-hero {
    width: 100%;
    justify-content: center;
  }
}
</style>
