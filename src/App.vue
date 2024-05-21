<template>
  <my-cart></my-cart>
  <div class="app">
    <div class="app__inner">
      <my-header></my-header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import MyHeader from "@/сomponents/MyHeader.vue";
import MyCart from "@/сomponents/MyCart.vue";

defineComponent({
  сomponents: { MyHeader, MyCart },
  name: "MyApp",
});
</script>

<style lang="sass" scoped>
.app
  background-color: rgb(231, 246, 255)
  height: 100%
  padding: 85px 15px

.app__inner
  margin: 0 auto
  max-width: 1080px
  background-color: rgb(255, 255, 255)
  border-radius: 20px
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.04)
</style>
