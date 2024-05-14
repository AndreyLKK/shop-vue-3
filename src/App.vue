<template>
  <div class="home">
    <my-home></my-home>
  </div>
</template>

<script>
import MyHome from "@/pages/MyHome.vue";
export default {
  components: {
    MyHome,
  },
};
</script>

<style lang="sass" scoped>
.home
  background-color: rgb(231, 246, 255)
</style>
