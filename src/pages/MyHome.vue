<template>
  <div class="home">
    <my-header></my-header>
    <router-view></router-view>
  </div>
</template>

<script>
import MyHeader from "@/сomponents/MyHeader.vue";
export default {
  name: "MyHome",
  components: {
    MyHeader,
  },
};
</script>

<style></style>
