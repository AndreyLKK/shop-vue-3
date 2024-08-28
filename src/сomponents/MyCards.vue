<template>
  <ul class="cards">
    <my-card
      class="cards__item"
      v-for="product in products"
      :key="product.id"
      :product="product"
      :changeFavorite="changeFavorite"
      :changeCarts="changeCarts"
      tabindex="0"
    >
    </my-card>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, computed, watch, defineProps } from "vue";
import { useStore } from "vuex";
import MyCard from "@/сomponents/MyCard.vue";
import { getFromLocalStorage } from "@/helpers/localStorage";

interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  iconOrder: string;
  iconFavorite: string;
}

interface Props {
  sortingOption: string;
  filter: string;
}

const props = defineProps<Props>();

const store = useStore();

const products = computed(() => store.getters["products/products"]);

onMounted((): void => {
  waitingData();
});

async function waitingData() {
  await store.dispatch("products/fetchData");

  const orderStatus = getFromLocalStorage("purchase");
  const favoriteStatus = getFromLocalStorage("bookmarks");

  store.dispatch("bookmarksProducts/initializeBookmarksProducts");

  store.commit("products/initializeProductStatuses", {
    orderStatus,
    favoriteStatus,
  });
}

const changeFavorite = (product: Product) => {
  if (product.iconFavorite === "favorite") {
    store.commit("bookmarksProducts/toggleIconFavorite", product);
    store.commit("bookmarksProducts/addItemToBookmarksProduts", product);
  } else {
    store.commit("bookmarksProducts/toggleIconFavorite", product);
    store.commit("bookmarksProducts/removeItemFromBookmarksProduts", product);
  }
};

const changeCarts = (product: Product) => {
  if (product.iconOrder === "order") {
    store.commit("cartProducts/toggleIconOrder", product);
    store.commit("cartProducts/addItemToCartProduts", product);
  } else {
    store.commit("cartProducts/toggleIconOrder", product);
    store.commit("cartProducts/removeItemFromCartProducts", product);
  }
};

const cartProducts = computed(() => store.getters["cartProducts/cartProducts"]);

watch(
  cartProducts,
  (newCartProducts) => {
    products.value.forEach((product: Product) => {
      product.iconOrder = newCartProducts.some(
        (item: Product) => item.id === product.id
      )
        ? "not-order"
        : "order";
    });
  },
  { deep: true }
);

watch(
  () => props.sortingOption,
  (newSortingOption) => {
    sortProducts(newSortingOption);
  }
);

const sortProducts = (newSortingOption: string) => {
  store.dispatch("products/sortProducts", newSortingOption);
};

watch(
  () => props.filter,
  (newFilter) => {
    filterProducts(newFilter);
  }
);

const filterProducts = (newFilter: string) => {
  store.commit("products/filterProducts", newFilter);
};
</script>

<style lang="sass" scoped>
.cards
  padding: 36px 0
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))
  justify-items: center
  grid-gap: 40px

.cards__item
  transition: outline 0.1s, transform 0.4s
  &:focus
    outline: 2px solid rgb(124, 225, 180)
  &:hover
    transform: translate(-10px, -10px)

@media (max-width: 1115px)
  .cards
    gap: 40px 12px

@media (max-width: 982px)
  .cards
    gap: 40px 10px

@media (max-width: 890px)
  .cards
    justify-content: center

@media (max-width: 830px)
  .cards
    padding: 18px 0
    grid-gap: 30px 10px

@media (max-width: 710px)
  .cards
    grid-gap: 40px 10px

@media (max-width: 499px)
  .cards
    grid-gap: 20px 10px
</style>
