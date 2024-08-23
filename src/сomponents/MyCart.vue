<template>
  <div class="cart" v-show="isCartOpen">
    <div class="cart__backdrop" ref="backdrop"></div>
    <transition name="cart__windows" ref="modalContent">
      <div class="cart__window" @click.stop>
        <div class="cart__title">
          <button
            class="cart__btn"
            ref="arrow"
            tabindex="0"
            @click="toggleCart"
            @keydown.enter="toggleCart"
            @keydown.space.prevent="toggleCart"
          >
            <my-icon class="cart__icon" type="back-cart-arrow"></my-icon>
            <span class="visually-hidden">Закрыть окно корзины, вернуться назад</span>
          </button>

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

        <div
          v-if="!cartProducts.length && !orderIsProcessed"
          class="cart__status"
        >
          <my-cart-status
            cartStatus="empty"
            @returnToCart="toggleCart"
          ></my-cart-status>
        </div>

        <div
          v-if="!cartProducts.length && orderIsProcessed"
          class="cart__status"
        >
          <my-cart-status
            cartStatus="issued"
            @returnToCart="toggleCart"
          ></my-cart-status>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch, nextTick } from "vue";
import { useStore } from "vuex";
import MyTypography from "@/UI/Typography/MyTypography.vue";
import MyIcon from "@/UI/icon/MyIcon.vue";
import MyCartList from "@/сomponents/MyCartList.vue";
import MyCartPrice from "@/сomponents/MyCartPrice.vue";
import MyOrderConfirmation from "@/сomponents/MyOrderConfirmation.vue";
import MyCartStatus from "@/сomponents/MyCartStatus.vue";

interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  iconFavorite: string;
  iconOrder: string;
}

const store = useStore();

const isCartOpen = computed(() => store.getters["toggleCart/isCartOpen"]);

const toggleCart = () => store.commit("toggleCart/toggleCart");

const cartProducts = computed(() => store.getters["cartProducts/cartProducts"]);

const emptyingTheTrash = () => store.commit("cartProducts/emptyingTheTrash");

const backdrop = ref<HTMLElement | null>(null);

const arrow = ref<HTMLElement | null>(null);

watch(isCartOpen, async (open) => {
  if (open) {
    await nextTick();
    arrow.value?.focus();
    trapFocus();
  }
});

onMounted(() => {
  document.addEventListener("click", handleClickOutside);

  const purchaseDataString = localStorage.getItem("purchase");
  const localStoragePurchaseData = purchaseDataString
    ? JSON.parse(purchaseDataString)
    : [];

  localStoragePurchaseData.forEach((element: Product) =>
    cartProducts.value.push(element)
  );
});

function handleClickOutside(event: any) {
  if (backdrop.value && backdrop.value.contains(event.target)) {
    toggleCart();
  }
}

const orderIsProcessed = ref<boolean | null>(false);

watch(orderIsProcessed, async (statusCart) => {
  if (statusCart) {
    await nextTick();
    arrow.value?.focus();
    trapFocus();
  }
});

const modalContent = ref<HTMLElement | null>(null);

const trapFocus = () => {
  if (modalContent.value) {
    const focusableElements = modalContent.value.querySelectorAll(
      'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTab = (event: KeyboardEvent) => {
        console.log(event);

        if (event.key === "Tab") {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      };
      document.addEventListener("keydown", handleTab);
    }
  }
};

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
  align-items: center

.cart__title .icon
  cursor: pointer
  transform: rotate(180deg)
  display: flex

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

.cart__btn
  margin-right: 20px
  &:focus
    outline: 2px solid rgb(124, 225, 180)
    border-radius: 4px

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

@media (max-width: 640px)
  .cart__backdrop
    display: none

  .cart__window
    max-width: 100%
    padding: 30px 80px

@media (max-width: 490px)
  .cart__window
    padding: 30px 50px
</style>
