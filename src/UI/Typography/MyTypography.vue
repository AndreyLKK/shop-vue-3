<template>
  <component
    :is="tag"
    :class="[
      'text',
      `tag_${tag}`,
      `bold_${bold}`,
      `size_${size}`,
      `color_${color}`,
      `height_${height}`,
    ]"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from "vue";

interface Props {
  tag?: string;
  bold?: string;
  size?: string;
  color?: string;
  height?: string;
}

withDefaults(defineProps<Props>(), {
  tag: "p",
  size: "s",
  color: "primary",
});
</script>

<style lang="sass">
.text
  font-family: 'Inter', sans-serif
  color: rgb(157, 157, 157)
  font-size: 14px
  font-weight: 400
  line-height: 17px

.bold_medium
  font-weight: 500


.bold_bold
  font-weight: 700

.size_xs
  font-size: 11px

.size_s
  font-size: 16px

.size_m
  font-size: 20px

.size_l
  font-size: 24px

.size_xl
  font-size: 39px

.color_black
  color: rgb(0, 0, 0)

.color_graphite
  color: rgb(92, 92, 92)

.color_platinum
  color: rgb(189, 189, 189)

.color_white
  color: rgb(255, 255, 255)

.height_xs
  line-height: 13px

.height_s
  line-height: 17px

.height_m
  line-height: 19px

.height_l
  line-height: 24px

.height_xl
  line-height: 29px

.height_xxl
  line-height: 39px
</style>
