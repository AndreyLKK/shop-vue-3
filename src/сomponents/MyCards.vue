<template>
  <ul class="cards">
    <my-card
      v-for="product in products"
      :key="product.id"
      :product="product"
      :changeFavorite="changeFavorite"
      :changeCarts="changeCarts"
    ></my-card>
  </ul>
</template>

<script setup>
import {
  defineComponent,
  ref,
  onMounted,
  computed,
  watch,
  defineProps,
} from "vue";
import { useStore } from "vuex";
import MyCard from "@/сomponents/MyCard.vue";
import { fetchData } from "@/api/productCards.js";

defineComponent({
  сomponents: { MyCard },
  name: "MyCards",
});

const props = defineProps({
  products: Array,
  sortingOption: String,
  filter: String,
});

const store = useStore();

let products = ref([]);
const originalProducts = ref([]);

onMounted(() => {
  waitingData();
});

async function waitingData() {
  products.value = await fethcProducts();
  const orderStatus = getLocalStorageData("purchase");
  const favoriteStatus = getLocalStorageData("bookmarks");

  store.dispatch("bookmarksProducts/initializeBookmarksProducts");

  initializeProductStatuses(orderStatus, favoriteStatus);
}

async function fethcProducts() {
  return await fetchData();
}

const getLocalStorageData = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

const initializeProductStatuses = (orderStatus, favoriteStatus) => {
  return products.value.map((product) => {
    product.iconOrder = orderStatus.find((item) => item.id === product.id)
      ? "not-order"
      : "order";
    product.iconFavorite = favoriteStatus.find((item) => item.id === product.id)
      ? "not-favorite"
      : "favorite";
  });
};

const changeFavorite = (product) => {
  if (product.iconFavorite === "favorite") {
    store.commit("bookmarksProducts/toggleIconFavorite", product);
    store.commit("bookmarksProducts/addItemToBookmarksProduts", product);
  } else {
    store.commit("bookmarksProducts/toggleIconFavorite", product);
    store.commit("bookmarksProducts/removeItemFromBookmarksProduts", product);
  }
};

const changeCarts = (product) => {
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
    products.value.forEach((product) => {
      product.iconOrder = newCartProducts.some((item) => item.id === product.id)
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

const sortProducts = (newSortingOption) => {
  if (newSortingOption === "title") return products.value.sort(sortTitle);
  if (newSortingOption === "price") return products.value.sort(sortPrice);
  return products.value.sort(sortId);
};

const sortTitle = (a, b) => a.title.localeCompare(b.title);
const sortPrice = (a, b) => a.price - b.price;
const sortId = (a, b) => a.id - b.id;

watch(
  () => props.filter,
  (newFilter) => {
    filterProducts(newFilter);
  }
);

const filterProducts = (newFilter) => {
  if (!originalProducts.value.length) originalProducts.value = products.value;

  if (!newFilter) products.value = originalProducts.value;

  if (newFilter) {
    products.value = originalProducts.value.filter((product) =>
      filterByTitle(product, newFilter)
    );
  }
};

const filterByTitle = (product, newFilter) =>
  product.title.toLowerCase().includes(newFilter.toLowerCase());
</script>

<style lang="sass" scoped>
.cards
  padding: 36px 0
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))
  justify-items: center
  grid-gap: 40px

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
