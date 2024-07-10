<template>
  <div class="cart" v-show="isCartOpen">
    <div class="cart__backdrop" ref="backdrop"></div>
    <transition name="cart__windows">
      <div class="cart__window" @click.stop>
        <div class="cart__title">
          <my-icon type="back-cart-arrow" @click="toggleCart"></my-icon>
          <my-typography tag="p" size="l" height="l" bold="bold" color="black">
            Корзина
          </my-typography>
        </div>

        <my-cart-list :cartProducts="cartProducts"></my-cart-list>

        <div class="cart__footer" v-if="cartProducts.length">
          <my-cart-price> </my-cart-price>
          <my-order-confirmation @eventPlacingOrder="placingOrder">
          </my-order-confirmation>
        </div>

        <div v-if="!cartProducts.length && !orderIsProcessed">
          <my-cart-status
            cartStatus="empty"
            @returnToCart="toggleCart"
          ></my-cart-status>
        </div>

        <div v-if="!cartProducts.length && orderIsProcessed">
          <my-cart-status
            cartStatus="issued"
            @returnToCart="toggleCart"
          ></my-cart-status>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import MyTypography from "@/UI/Typography/MyTypography.vue";
import MyIcon from "@/UI/icon/MyIcon.vue";
import MyCartList from "@/сomponents/MyCartList.vue";
import MyCartPrice from "@/сomponents/MyCartPrice.vue";
import MyOrderConfirmation from "@/сomponents/MyOrderConfirmation.vue";
import MyCartStatus from "@/сomponents/MyCartStatus.vue";

const store = useStore();

const isCartOpen = computed(() => store.getters["toggleCart/isCartOpen"]);

const toggleCart = () => store.commit("toggleCart/toggleCart");

const cartProducts = computed(() => store.getters["cartProducts/cartProducts"]);

const emptyingTheTrash = () => store.commit("cartProducts/emptyingTheTrash");

const backdrop = ref(null);

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  const localStoragePurchaseData =
    JSON.parse(localStorage.getItem("purchase")) || [];

  localStoragePurchaseData.forEach((element) => {
    cartProducts.value.push(element);
  });
});

function handleClickOutside(event) {
  if (backdrop.value && backdrop.value.contains(event.target)) {
    toggleCart();
  }
}

const orderIsProcessed = ref(false);

function placingOrder() {
  emptyingTheTrash();
  orderIsProcessed.value = true;

  alert("Заказ офромлен");
}
</script>

<style lang="sass" scoped>
.cart__backdrop
  width: 100%
  height: 100vh
  background: rgb(0, 0, 0)
  opacity: 0.5
  position: fixed
  z-index: 10

.cart__title
  display: flex
  align-items: flex-start

.cart__title .icon
  margin-right: 30px
  cursor: pointer
  transform: rotate(180deg)

.cart__window
  padding: 30px
  position: fixed
  top: 0
  right: 0
  height: 100vh
  width: 100%
  max-width: 385px
  background-color: rgb(255, 255, 255)
  z-index: 10
  display: flex
  flex-direction: column
  grid-gap: 30px
  overflow-y: auto

.cart__windows-enter-active,
.cart__windows-leave-active
  transition: opacity 0.5s ease, transform 0.5s ease

.cart__windows-enter-from,
.cart__windows-leave-to
  opacity: 0
  transform: translateX(100%)

.cart__windows-enter-to,
.cart__windows-leave-from
  opacity: 1
  transform: translateX(0%)

.cart__status
  display: flex
  flex-direction: column
  align-items: center
  text-align: center
  margin-top: 50%

.cart__footer
  margin-top: auto
</style>
