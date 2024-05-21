<template>
  <ul class="cards">
    <li class="cards__item" v-for="product in products" :key="product.id">
      <my-icon
        :type="product.iconFavorite"
        @click="changeFavorite(product.id)"
      ></my-icon>
      <div class="cards__img">
        <img :src="require(`@/assets/img${product.imageUrl}`)" alt="" />
      </div>
      <my-typography color="black">{{ product.title }}</my-typography>
      <div class="cards__price">
        <my-typography
          tag="p"
          size="xs"
          color="platinum"
          height="xs"
          bold="medium"
          >ЦЕНА:
        </my-typography>
        <div class="cards__icon">
          <my-icon
            :type="product.iconOrder"
            @click="changeCarts(product.id)"
          ></my-icon>
        </div>
        <my-typography tag="p" color="black" bold="bold">
          {{ product.price }}
        </my-typography>
        {{ product.id }}
      </div>
    </li>
  </ul>
</template>

<script setup>
import { defineComponent, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import MyTypography from "@/UI/Typography/MyTypography.vue";
import MyIcon from "@/UI/icon/MyIcon.vue";
import { fetchData } from "@/api/productCards.js";

defineComponent({
  components: { MyTypography, MyIcon },
  name: "MyCards",
});

const store = useStore();

const products = ref();

async function waitingData() {
  products.value = await fetchData();
}

onMounted(() => {
  waitingData();
});

const changeFavorite = (productId) => {
  const favoriteProduct = products.value.find((item) => {
    return item.id === productId;
  });

  if (favoriteProduct) {
    if (favoriteProduct.iconFavorite === "favorite") {
      favoriteProduct.iconFavorite = "not-favorite";
    } else {
      favoriteProduct.iconFavorite = "favorite";
    }
  }
};

const changeCarts = (productId) => {
  const toggleAddCart = products.value.find((item) => {
    return item.id === productId;
  });

  if (toggleAddCart) {
    if (toggleAddCart.iconOrder === "order") {
      toggleAddCart.iconOrder = "not-order";
      store.commit("cartProducts/addItemToCartProduts", toggleAddCart);
    } else {
      toggleAddCart.iconOrder = "order";
      store.commit("cartProducts/removeItemFromCartProducts", toggleAddCart.id);
    }
  }
};

const cartProducts = computed(() => store.getters["cartProducts/cartProducts"]);
console.log(cartProducts.value);
</script>

<style lang="sass" scoped>
.cards
  padding: 36px 0
  display: flex
  flex-wrap: wrap
  grid-gap: 40px

.cards__item
  max-width: 210px
  padding: 30px
  border: 1px solid rgb(248, 248, 248)
  border-radius: 40px
  box-shadow: 0px 14px 30px 0px rgba(0, 0, 0, 0.05)
  background-color: rgb(255, 255, 255)
  transition: transform 0.2s
  cursor: pointer
  &:hover
    transform: translate(-10px, -10px)

.cards__img
  max-width: 133px
  margin: 0 auto 14px

.cards__img + p
  margin-bottom: 14px

.cards__price
  display: grid
  grid-template-columns: auto auto
  grid-template-rows: auto auto
  justify-content: space-between
  align-items: start
  row-gap: 2px

.cards__icon
  grid-column: 2
  grid-row: 1 / 3
</style>
