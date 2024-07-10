<template>
  <div class="cart__status">
    <img
      class="cart__status-img"
      :src="require(`@/assets/img/${status.imgUrl}.png`)"
      alt="Статус корзины"
    />
    <my-typography
      class="cart__status-title"
      tag="p"
      bold="bold"
      color="black"
      size="m"
      height="l"
    >
      {{ status.title }}
    </my-typography>
    <my-typography class="cart__status-text" tag="p" size="s" height="l">
      {{ status.description }}
    </my-typography>
    <button
      class="cart__status-btn"
      type="button"
      @click="$emit('returnToCart')"
    >
      <my-typography tag="span" color="white" bold="bold" height="m">
        Вернуться назад
      </my-typography>
      <div class="cart__status-icon">
        <my-icon type="design-arrow"></my-icon>
      </div>
    </button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import MyTypography from "@/UI/Typography/MyTypography.vue";
import MyIcon from "@/UI/icon/MyIcon.vue";

const props = defineProps({
  cartStatus: String,
});

const cartStatuses = [
  {
    imgUrl: "order-processed",
    title: "Заказ оформлен!",
    description: "Ваш заказ #18 скоро будет передан курьерской доставке",
    cartStatus: "issued",
  },
  {
    imgUrl: "cart-empty",
    title: "Корзина пуста",
    description: "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.",
    cartStatus: "empty",
  },
];

const status = cartStatuses.find((status) => {
  return status.cartStatus === props.cartStatus;
});
</script>

<style lang="sass" scoped>
.cart__status-img
  height: 100%
  max-height: 120px
  margin-bottom: 21px

.cart__status-title
  margin-bottom: 9px

.cart__status-text
  margin-bottom: 40px

.cart__status-btn
  border-radius: 18px
  background: rgb(157, 213, 88)
  padding: 18px 43px 18px 30px
  max-width: 245px
  width: 100%
  position: relative
  text-align: right

.cart__status-icon
  position: absolute
  left: 10%
  top: 50%
  transform: translateY(-65%) rotate(180deg)
</style>
