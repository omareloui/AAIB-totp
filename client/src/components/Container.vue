<template>
  <div class="container">
    <slot />
  </div>
</template>

<style scoped>
.container {
  --container-width: var(--screen-desktop, 1024px);
  --container-padding: 20px;
  max-width: var(--container-width);
  padding-inline: var(--container-padding);
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: calc(var(--container-padding) * 2 + var(--container-width))) {
    max-width: 100%;
  }
}
</style>
