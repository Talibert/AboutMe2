<script setup lang="ts">
import type { TechItem } from '@/types/tech'

interface Props {
  item: TechItem
}

defineProps<Props>()
</script>

<template>
  <article class="tech-card" :aria-label="`Tecnologia: ${item.title}`">
    <div class="tech-card-top">
      <span class="tech-badge">{{ item.badge }}</span>
    </div>

    <div class="tech-header">
      <span class="tech-icon" aria-hidden="true">{{ item.icon }}</span>
      <h3 class="tech-title">{{ item.title }}</h3>
    </div>

    <p class="tech-description">{{ item.description }}</p>

    <div v-if="item.highlights && item.highlights.length > 0" class="tech-highlights">
      <span
        v-for="highlight in item.highlights"
        :key="highlight"
        class="tech-tag"
      >
        ✓ {{ highlight }}
      </span>
    </div>
  </article>
</template>

<style scoped>
.tech-card {
  padding: 2.25rem 3.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-height: 240px;
  width: 100%;
}

.tech-card-top {
  display: flex;
  align-items: center;
}

.tech-badge {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  background-color: hsla(160, 100%, 37%, 0.15);
  color: hsla(160, 100%, 37%, 1);
  border: 1px solid hsla(160, 100%, 37%, 0.25);
}

.tech-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.tech-icon {
  font-size: 2.25rem;
  line-height: 1;
}

.tech-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-heading);
  margin: 0;
}

.tech-description {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  opacity: 0.9;
  margin: 0;
}

.tech-highlights {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-top: 0.25rem;
}

.tech-tag {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-heading);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.tech-tag:hover {
  border-color: hsla(160, 100%, 37%, 0.5);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .tech-card {
    padding: 1.5rem 2rem;
    min-height: auto;
  }

  .tech-title {
    font-size: 1.25rem;
  }

  .tech-description {
    font-size: 0.925rem;
  }
}
</style>
