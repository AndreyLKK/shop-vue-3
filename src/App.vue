<template>
  <div>
    <my-cart></my-cart>
    <div class="app" :class="{ hidden: isCartOpen }">
      <div class="app__inner">
        <my-header></my-header>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import MyHeader from "@/сomponents/MyHeader.vue";
import MyCart from "@/сomponents/MyCart.vue";

defineComponent({
  сomponents: { MyHeader, MyCart },
  name: "MyApp",
});

const store = useStore();

const isCartOpen = computed(() => store.getters["toggleCart/isCartOpen"]);
</script>

<style lang="sass" scoped>

.app
  background-color: rgb(124, 225 ,180)
  height: 100vh
  padding: 85px 15px

.hidden
  overflow: hidden
  height: 100vh

.app__inner
  margin: 0 auto
  max-width: 1080px
  background-color: rgb(255, 255, 255)
  border-radius: 20px
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.04)
</style>
