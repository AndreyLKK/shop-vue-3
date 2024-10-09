<template>
  <div class="input-container">
    <div v-if="iconPosition === 'left'" class="icon-left">
      <slot name="iconLeft"></slot>
    </div>
    <input
      class="input"
      :class="['input', `iconPosition_${iconPosition}`]"
      :placeholder="placeholder"
      type="text"
      :value="modelValue"
      @input="handlerInput"
    />
    <div v-if="iconPosition === 'right'" class="icon-right">
      <slot name="iconRight"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, defineProps, defineEmits } from "vue";

defineComponent({
  name: "MyInput",
});

interface Props {
  placeholder: string;
  iconPosition: string;
  modelValue: string;
}

defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);

const handlerInput = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<style lang="sass" scoped>
.input-container
  position: relative
  display: flex
  align-items: center

.input-container .icon-left,
.input-container .icon-right
  position: absolute
  top: 50%
  transform: translateY(-50%)

.input
  border: 1px solid rgb(243, 243, 243)
  border-radius: 10px
  background-color: #f6f6f6
  padding: 15px 15px 15px 18px
  width: 100%
  transition: background-color 0.3s
  &::placeholder
    color: rgb(196, 196, 196)
  &:hover
    background-color: #f6f6f629
  &:focus
    outline: 2px solid rgb(124, 225, 180)
  &:active
    background-color: #f5fffa

.iconPosition_left
   padding: 15px 15px 15px 46px

.iconPosition_right
   padding: 15px 46px 15px 18px

.input-container .icon-left
  left: 18px
  pointer-events: none

.input-container .icon-right
  right: 18px
  pointer-events: none
</style>
