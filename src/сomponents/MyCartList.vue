<template>
  <ul class="cart__list">
    <li
      class="cart__item"
      v-for="cartProduct in cartProducts"
      :key="cartProduct.id"
    >
      <img
        class="cart__img"
        :src="require(`@/assets/img${cartProduct.imageUrl}`)"
        alt="Кроссовки в корзине"
      />
      <div class="cart__item-info">
        <my-typography tag="p" color="black">{{
          cartProduct.title
        }}</my-typography>
        <my-typography tag="p" color="black" bold="bold"
          >{{ cartProduct.price }} руб.</my-typography
        >
      </div>
      <button class="cart__btn">
        <my-icon type="cross" @click="removeCartProduct(cartProduct)"></my-icon>
      </button>
    </li>
  </ul>
</template>

<script setup>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

import MyTypography from "@/UI/Typography/MyTypography.vue";
import MyIcon from "@/UI/icon/MyIcon.vue";

defineComponent({
  components: { MyTypography, MyIcon },
  name: "MyCartList",
});

let cartProducts = computed(() => store.getters["cartProducts/cartProducts"]);

const store = useStore();

function removeCartProduct(product) {
  store.commit("cartProducts/toggleIconOrder", product);
  store.commit("cartProducts/removeItemFromCartProducts", product);
}
</script>

<style lang="sass" scoped>
.cart__item
  border: 1px solid rgb(243, 243, 243)
  border-radius: 20px
  background: rgb(255, 255, 255)
  display: flex
  align-items: center
  padding: 20px
  margin-bottom: 20px

.cart__img
  width: 70px
  height: 70px
  margin-right: 21px

.cart__item-info
  display: block
  margin-right: 12px

.cart__btn
  cursor: pointer
</style>
