<template>
  <component
    :is="tag"
    :class="[
      'text',
      `tag_${tag}`,
      `bold_${bold}`,
      `size_${size}`,
      `color_${color}`,
    ]"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: "p",
    },

    bold: {
      type: String,
    },

    size: {
      type: String,
      default: "s",
    },

    color: {
      type: String,
      default: "primary",
    },

    height: {
      type: String,
    },
  },
};
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


.size_m
  font-size: 20px


.color_black
  color: rgb(0, 0, 0)


.color_graphite
  color: rgb(92, 92, 92)


.color_platinum
  color: rgb(189, 189, 189)

.height_xs
  line-height: 13px

.height_s
  line-height: 17px

.height_m
  line-height: 24px

.height_l
  line-height: 39px
</style>
