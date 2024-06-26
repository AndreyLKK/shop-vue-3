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

async function waitingData() {
  products.value = await fetchData();
  const orderStatus = JSON.parse(localStorage.getItem("purchase")) || [];
  const favoriteStatus = JSON.parse(localStorage.getItem("bookmarks")) || [];

  products.value.forEach((product) => {
    const isFavorite = favoriteStatus.find((item) => item.id === product.id);
    const isOrdered = orderStatus.find((item) => item.id === product.id);
    if (isOrdered) {
      product.iconOrder = "not-order";
    }
    if (isFavorite) {
      product.iconFavorite = "not-favorite";
    }
  });
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
      store.commit("bookmarksProducts/toggleIconFavorite", favoriteProduct);
      store.commit(
        "bookmarksProducts/addItemToBookmarksProduts",
        favoriteProduct
      );
    } else {
      // favoriteProduct.iconFavorite = "favorite";
    }
  }
};

const changeCarts = (productId) => {
  const toggleAddCart = products.value.find((item) => {
    return item.id === productId;
  });

  if (toggleAddCart) {
    if (toggleAddCart.iconOrder === "order") {
      store.commit("cartProducts/toggleIconOrder", toggleAddCart);
      store.commit("cartProducts/addItemToCartProduts", toggleAddCart);
    } else {
      store.commit("cartProducts/toggleIconOrder", toggleAddCart);
      store.commit("cartProducts/removeItemFromCartProducts", toggleAddCart);
    }
  }
};

const cartProducts = computed(() => store.getters["cartProducts/cartProducts"]);

watch(
  cartProducts,
  (newCartProducts) => {
    if (newCartProducts.length === 0) {
      products.value.forEach((product) => {
        product.iconOrder = "order";
      });
    } else {
      products.value.forEach((product) => {
        const cartProduct = newCartProducts.find(
          (item) => item.id === product.id
        );
        if (cartProduct) {
          product.iconOrder = "not-order";
        } else {
          product.iconOrder = "order";
        }
      });
    }
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
  if (newSortingOption === "title") {
    return products.value.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (newSortingOption === "price") {
    return products.value.sort((a, b) => a.price - b.price);
  }
  return products.value.sort((a, b) => a.id - b.id);
};

watch(
  () => props.filter,
  (newFilter) => {
    filterProducts(newFilter);
  }
);

const originalProducts = ref([]);

const filterProducts = (newFilter) => {
  if (!originalProducts.value.length) {
    originalProducts.value = [...products.value];
  }

  if (newFilter) {
    products.value = originalProducts.value.filter((product) =>
      product.title.toLowerCase().includes(newFilter.toLowerCase())
    );
  } else {
    products.value = [...originalProducts.value];
  }
};
</script>

<style lang="sass" scoped>
.cards
  padding: 36px 0
  display: flex
  flex-wrap: wrap
  grid-gap: 40px
</style>
