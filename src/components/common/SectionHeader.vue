<script setup lang="ts">
interface Props {
  badge?: string
  title: string
  subtitle?: string
  headingId?: string
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4'
  align?: 'center' | 'left' | 'right'
}

withDefaults(defineProps<Props>(), {
  badge: undefined,
  subtitle: undefined,
  headingId: undefined,
  headingTag: 'h2',
  align: 'center',
})
</script>

<template>
  <header class="section-header" :class="`section-header--${align}`">
    <div v-if="badge" class="section-badge">
      <span class="badge-dot" aria-hidden="true"></span>
      <span class="badge-text">{{ badge }}</span>
    </div>

    <component :is="headingTag" :id="headingId" class="section-title">
      {{ title }}
    </component>

    <p v-if="subtitle || $slots.subtitle" class="section-subtitle">
      <slot name="subtitle">
        {{ subtitle }}
      </slot>
    </p>

    <slot />
  </header>
</template>

<style scoped>
.section-header {
  width: 100%;
  max-width: 780px;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.section-header--center {
  text-align: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
}

.section-header--left {
  text-align: left;
  align-items: flex-start;
  margin-left: 0;
  margin-right: auto;
}

.section-header--right {
  text-align: right;
  align-items: flex-end;
  margin-left: auto;
  margin-right: 0;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: hsla(160, 100%, 37%, 1);
  letter-spacing: 0.08em;
  font-weight: 600;
}

.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: hsla(160, 100%, 37%, 1);
}

.section-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 2.85rem);
  font-weight: 800;
  color: var(--color-heading);
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin: 0;
}

.section-subtitle {
  font-family: var(--font-body);
  font-size: 1.05rem;
  color: var(--color-text);
  opacity: 0.85;
  line-height: 1.6;
  margin: 0;
}
</style>
