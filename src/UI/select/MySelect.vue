<template>
  <select
    name="select-product"
    class="select"
    @change="selectionHandler($event.target.value)"
    :vlaue='modelValue'
  >
    <option
      class="select__option"
      :value="sortingOption.value"
      v-for="sortingOption in sortingOptions"
      :key="sortingOption.title"
    >
      {{ sortingOption.title }}
    </option>
  </select>
</template>

<script setup>
import { defineComponent, defineProps, defineEmits } from "vue";

defineComponent({
  name: "MySelect",
});

defineProps({
  modelValue: String,
});

const sortingOptions = [
  {
    title: "Не выбрано",
    value: "standart",
  },
  {
    title: "По названию",
    value: "title",
  },
  {
    title: "По цене",
    value: "price",
  },
];

const emit = defineEmits(["update:modelValue"]);

const selectionHandler = (value) => {
  emit("update:modelValue", value);

};
</script>

<style lang="sass" scoped>
.select
  padding: 15px 40px 15px 5px
  border: 1px solid rgb(243, 243, 243)
  border-radius: 5px
  color: rgb(157, 157, 157)
  font-size: 16px
  width: 100%
  cursor: pointer
</style>
