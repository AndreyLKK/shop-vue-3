<template>
  <button class="footer-confirmation__btn" @click="placingOrder">
    <my-typography tag="span" color="white" bold="bold" size="s" height="m"
      >Оформить заказ</my-typography
    >
    <div class="footer-confirmation__icon">
      <my-icon type="design-arrow"></my-icon>
    </div>
  </button>
</template>

<script setup lang="ts">
import { defineComponent, defineEmits } from "vue";
import MyIcon from "@/UI/icon/MyIcon.vue";
import MyTypography from "@/UI/Typography/MyTypography.vue";

defineComponent({
  components: { MyIcon, MyTypography },
  name: "MyOrderConfirmation",
});

const emits = defineEmits(["eventPlacingOrder"]);

const placingOrder = () => {
  emits("eventPlacingOrder");
};
</script>

<style lang="sass" scoped>
.footer-confirmation__btn
  border-radius: 18px
  background: rgb(157, 213, 88)
  padding: 18px 18px
  width: 100%
  position: relative
  &:focus
    outline: 2px solid rgb(124, 225, 180)

.footer-confirmation__icon
  position: absolute
  right: 10%
  top: 50%
  transform: translateY(-45%)
</style>
