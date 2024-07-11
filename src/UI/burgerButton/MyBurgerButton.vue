<template>
  <button class="burger-button">
    <span class="burger-button__line"></span>
  </button>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  components: {},
  name: "MyBurgerButton",
});
</script>

<style lang="sass" scoped>
.burger-button
  display: flex
  flex-direction: column
  justify-content: space-around
  height: 24px
  width: 30px
  display: none

.burger-button__line
  position: relative
  width: 100%
  height: 5px
  left: 0
  border-radius: 20px
  background-color: rgb(157, 157, 157)

.burger-button__line::before,
.burger-button__line::after
  content: ''
  position: absolute
  background-color: rgb(157, 157, 157)
  border-radius: 20px
  left: 0
  height: 5px
  width: 100%

.burger-button__line::before
  top: -10px

.burger-button__line::after
  top: 10px


@media (max-width: 768px)
  .burger-button
    display: flex
</style>
