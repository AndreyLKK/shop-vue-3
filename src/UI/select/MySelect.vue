<template>
  <select name="" id="" class="select">
    <option
      :value="sortingOption.value"
      class="select__option"
      v-for="sortingOption in sortingOptions"
      :key="sortingOption.title"
    >
      {{ sortingOption.title }}
    </option>
  </select>
</template>

<script setup>
import { defineComponent, defineProps } from "vue";

defineComponent({
  name: "MySelect",
});

defineProps({});

const sortingOptions = [
  {
    title: "Не выбрано",
    value: "1",
  },
  {
    title: "По названию",
    value: "2",
  },
  {
    title: "По цене",
    value: "3",
  },
];
</script>

<style lang="sass" scoped>
.select
  padding: 15px 40px 15px 5px
  border: 1px solid rgb(243, 243, 243)
  border-radius: 5px
  color: rgb(157, 157, 157)
  font-size: 16px
</style>
