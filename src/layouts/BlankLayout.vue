<template>
  <div class="layout-blank">
    <slot />
  </div>
</template>

<style scoped>
.layout-blank {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
