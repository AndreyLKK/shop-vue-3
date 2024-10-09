<template>
  <select
    class="select"
    name="select-product"
    @change="selectionHandler"
    :value="modelValue"
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

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

interface Props {
  modelValue: String;
}

defineProps<Props>();

const sortingOptions = [
  {
    title: "Сортировка",
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

const selectionHandler = (evt: Event) => {
  emit("update:modelValue", (evt.target as HTMLInputElement).value);
};
</script>

<style lang="sass" scoped>
.select
  padding: 15px 40px 15px 5px
  border: 1px solid rgb(243, 243, 243)
  background-color: #f6f6f6
  border-radius: 5px
  color: rgb(196, 196, 196)
  font-size: 16px
  width: 100%
  cursor: pointer
  transition: outline 0.3s, background-color 0.3s
  &:focus
    outline: 2px solid rgb(124, 225, 180)
  &:hover
    background-color: #f6f6f629
  &:active
    background-color: #f5fffa
</style>
