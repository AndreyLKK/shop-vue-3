<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="sass" scoped>

.container
  max-width: 1080px
  width: 100%
  margin: 0 auto
  padding: 0 60px

@media (max-width: 820px)
  .container
    padding: 0 30px
</style>
