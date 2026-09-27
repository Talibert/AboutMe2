<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <p>Taliberti &copy; {{ currentYear }}</p>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  padding: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-text);
  opacity: 0.8;
}
</style>
