<template>
  <div class="cart" v-show="isCartOpen">
    <div class="cart__backdrop" ref="backdrop"></div>
    <transition name="cart__windows">
      <div class="cart__window" ref="cartWindowRef" @click.stop>
        <div class="cart__title">
          <my-icon type="back-cart-arrow" @click="toggleCart"></my-icon>
          <my-typography tag="p" size="l" height="l" bold="bold" color="black">
            Корзина
          </my-typography>
        </div>

        <my-cart-list :cartProducts="cartProducts"></my-cart-list>

        <div class="cart__footer" v-if="cartProducts.length">
          <div class="cart__footer-info">
            <my-typography tag="p" color="black" size="s" height="m"
              >Итого:
            </my-typography>
            <span class="cart__footer-dot"></span>
            <my-typography tag="p" color="black" size="s" height="m"
              >{{ totalPrice }} руб.
            </my-typography>
          </div>
          <div class="cart__footer-info">
            <my-typography tag="p" color="black" size="s" height="m"
              >Налог 5%:
            </my-typography>
            <span class="cart__footer-dot"></span>
            <my-typography tag="p" color="black" size="s" height="m"
              >{{ taxAmount }} руб.
            </my-typography>
          </div>
          <button class="cart-footer-btn" @click="placingOrder">
            <my-typography
              tag="span"
              color="white"
              bold="bold"
              size="s"
              height="m"
              >Оформить заказ</my-typography
            >
            <div class="cart__footer-icon">
              <my-icon type="design-arrow"></my-icon>
            </div>
          </button>
        </div>

        <div class="cart__status" v-else-if="orderIsProcessed">
          <img
            class="cart__status-img"
            src="@/assets/img/order-processed.png"
            alt=""
          />
          <my-typography
            class="cart__status-title"
            tag="p"
            bold="bold"
            color="black"
            size="m"
            height="l"
            >Заказ оформлен!</my-typography
          >
          <my-typography class="cart__status-text" tag="p" size="s" height="l"
            >Ваш заказ #18 скоро будет передан курьерской
            доставке</my-typography
          >
          <button class="cart__status-btn" type="button" @click="toggleCart">
            <my-typography tag="span" color="white" bold="bold" height="m"
              >Вернуться назад</my-typography
            >
            <div class="cart__status-icon">
              <my-icon type="design-arrow"></my-icon>
            </div>
          </button>
        </div>

        <div class="cart__status" v-else>
          <img
            class="cart__status-img"
            src="@/assets/img/cart-empty.png"
            alt=""
          />
          <my-typography
            class="cart__status-title"
            tag="p"
            bold="bold"
            color="black"
            size="m"
            height="l"
            >Корзина пуста</my-typography
          >
          <my-typography class="cart__status-text" tag="p" size="s" height="l"
            >Добавьте хотя бы одну пару кроссовок, чтобы сделать
            заказ.</my-typography
          >
          <button class="cart__status-btn" type="button" @click="toggleCart">
            <my-typography tag="span" color="white" bold="bold" height="m"
              >Вернуться назад</my-typography
            >
            <div class="cart__status-icon">
              <my-icon type="design-arrow"></my-icon>
            </div>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { defineComponent, computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import MyTypography from "@/UI/Typography/MyTypography.vue";
import MyIcon from "@/UI/icon/MyIcon.vue";
import MyCartList from "@/сomponents/MyCartList.vue";

defineComponent({
  components: { MyTypography, MyIcon, MyCartList },
  name: "MyCarts",
});

const store = useStore();

const isCartOpen = computed(() => store.getters["toggleCart/isCartOpen"]);

const toggleCart = () => {
  store.dispatch("toggleCart/toggleCart");
};

let cartProducts = computed(() => store.getters["cartProducts/cartProducts"]);

const totalPrice = computed(() => store.getters["cartProducts/totalPrice"]);

const taxAmount = computed(() => {
  let taxRate = 0.05;
  taxRate *= totalPrice.value;
  return Math.ceil(taxRate);
});

const backdrop = ref(null);
const cartWindowRef = ref(null);

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
  store.commit("cartProducts/emptyingTheTrash");
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
  transform:  translateY(-65%) rotate(180deg)
  

.cart__footer
  margin-top: auto

.cart__footer-info
  display: flex
  justify-content: space-between
  align-items: flex-end
  margin-bottom: 20px

.cart__footer-dot
  border-top: 1px dotted #ccc
  height: 1px
  flex: 1 1 auto
  margin: 0 10px

.cart-footer-btn
  border-radius: 18px
  background: rgb(157, 213, 88)
  padding: 18px 18px
  width: 100%
  position: relative

.cart__footer-icon
  position: absolute
  right: 10%
  top: 50%
  transform: translateY(-45%)
</style>
