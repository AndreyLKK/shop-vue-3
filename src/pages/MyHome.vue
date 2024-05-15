<template>
  <main class="main">
    <my-catalog></my-catalog>
  </main>
</template>

<script setup>
import { defineComponent } from "vue";
import MyCatalog from "@/сomponents/MyCatalog.vue";

defineComponent({
  сomponents: { MyCatalog },
  name: "MyHome",
});
</script>

<style></style>
