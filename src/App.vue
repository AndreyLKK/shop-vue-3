<template>
  <div class="app">
    <my-header></my-header>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import MyHeader from "@/сomponents/MyHeader.vue";

defineComponent({
  сomponents: { MyHeader },
  name: "MyName",
});
</script>

<style lang="sass" scoped>
.app
  margin: 0 auto
  max-width: 1080px
  background-color: rgb(255, 255, 255)
  border-radius: 20px
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.04)
</style>
