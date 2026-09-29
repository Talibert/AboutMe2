<script setup lang="ts">
/**
 * ProjectCardSkeleton.vue
 *
 * Placeholder moderno com moldura macOS e animação shimmer.
 * Mantém a mesma geometria do CompactProjectCard para evitar Layout Shift (CLS)
 * enquanto os repositórios estão sendo sincronizados com a API do GitHub.
 */
</script>

<template>
  <div class="mac-skeleton-card" aria-hidden="true">
    <!-- Barra Superior / Moldura macOS -->
    <div class="skeleton-titlebar">
      <div class="skeleton-controls">
        <span class="control-dot control-dot--close"></span>
        <span class="control-dot control-dot--minimize"></span>
        <span class="control-dot control-dot--maximize"></span>
      </div>

      <div class="shimmer-block shimmer-filename"></div>

      <div class="shimmer-block shimmer-badge"></div>
    </div>

    <!-- Corpo da Janela com Shimmers -->
    <div class="skeleton-body">
      <div class="skeleton-main-info">
        <!-- Título -->
        <div class="shimmer-block shimmer-title"></div>

        <!-- Linhas de Descrição -->
        <div class="skeleton-desc-lines">
          <div class="shimmer-block shimmer-line shimmer-line--full"></div>
          <div class="shimmer-block shimmer-line shimmer-line--medium"></div>
          <div class="shimmer-block shimmer-line shimmer-line--short"></div>
        </div>

        <!-- Pílulas de Tecnologias -->
        <div class="skeleton-chips">
          <div class="shimmer-block shimmer-chip shimmer-chip--sm"></div>
          <div class="shimmer-block shimmer-chip shimmer-chip--md"></div>
          <div class="shimmer-block shimmer-chip shimmer-chip--lg"></div>
          <div class="shimmer-block shimmer-chip shimmer-chip--sm"></div>
        </div>
      </div>

      <!-- Botão GitHub -->
      <div class="skeleton-actions">
        <div class="shimmer-block shimmer-btn"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ============================================================================
   CARD MOLDURA MAC SKELETON
   ============================================================================ */
.mac-skeleton-card {
  width: 100%;
  height: 100%;
  min-height: 290px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
  position: relative;
}

/* ============================================================================
   TOPBAR
   ============================================================================ */
.skeleton-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0.9rem;
  background-color: var(--color-background-mute);
  border-bottom: 1px solid var(--color-border);
}

.skeleton-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 50px;
}

.control-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  opacity: 0.65;
}

.control-dot--close { background-color: #ff5f56; }
.control-dot--minimize { background-color: #ffbd2e; }
.control-dot--maximize { background-color: #27c93f; }

.shimmer-filename {
  width: 90px;
  height: 12px;
  border-radius: 6px;
}

.shimmer-badge {
  width: 48px;
  height: 16px;
  border-radius: 6px;
}

/* ============================================================================
   BODY
   ============================================================================ */
.skeleton-body {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.25rem;
}

.skeleton-main-info {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.shimmer-title {
  width: 72%;
  height: 20px;
  border-radius: 8px;
}

.skeleton-desc-lines {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.25rem 0;
}

.shimmer-line {
  height: 13px;
  border-radius: 6px;
}
.shimmer-line--full { width: 100%; }
.shimmer-line--medium { width: 88%; }
.shimmer-line--short { width: 60%; }

.skeleton-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.25rem;
}

.shimmer-chip {
  height: 22px;
  border-radius: 6px;
}
.shimmer-chip--sm { width: 50px; }
.shimmer-chip--md { width: 72px; }
.shimmer-chip--lg { width: 90px; }

.skeleton-actions {
  padding-top: 0.75rem;
  border-top: 1px solid var(--color-border);
}

.shimmer-btn {
  width: 100%;
  height: 36px;
  border-radius: 10px;
}

/* ============================================================================
   ANIMAÇÃO SHIMMER SUAVE & MODERNA
   ============================================================================ */
.shimmer-block {
  background: linear-gradient(
    90deg,
    var(--color-border) 0%,
    var(--color-background-mute) 50%,
    var(--color-border) 100%
  );
  background-size: 200% 100%;
  animation: modernShimmer 1.8s infinite ease-in-out;
}

@keyframes modernShimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
