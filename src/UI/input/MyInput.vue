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
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div v-if="iconPosition === 'right'" class="icon-right">
      <slot name="iconRight"></slot>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, defineProps } from "vue";

defineComponent({
  name: "MyInput",
});

defineProps({
  placeholder: {
    type: String,
    require: false,
  },

  iconPosition: {
    type: String,
  },

  modelValue: {
    type: String,
  },
});
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
  padding: 15px 15px 15px 18px
  width: 100%

  &::placeholder
    color: rgb(196, 196, 196)

.iconPosition_left
   padding: 15px 15px 15px 46px

.iconPosition_right
   padding: 15px 46px 15px 18px

.input-container .icon-left
  left: 18px


.input-container .icon-right
  right: 18px
</style>
