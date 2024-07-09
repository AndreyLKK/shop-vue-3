<template>
  <div class="bookmarks">
    <my-container>
      <my-typography tag="p" bold="bold" size="xl" height="xxl" color="black"
        >Мои закладки</my-typography
      >
      <ul class="bookmarks__list">
        <my-card
          class="bookmarks__item"
          v-for="product in bookmarksProducts"
          :key="product.id"
          :product="product"
          :changeFavorite="changeFavorite"
          :changeCarts="null"
        ></my-card>
      </ul>
    </my-container>
  </div>
</template>

<script setup>
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";
import MyCard from "@/сomponents/MyCard.vue";
import MyContainer from "@/UI/container/MyContainer.vue";
import MyTypography from "@/UI/Typography/MyTypography.vue";

const store = useStore();

const bookmarksProducts = computed(
  () => store.getters["bookmarksProducts/bookmarksProducts"]
);

defineComponent({
  сomponents: { MyCard, MyContainer, MyTypography },
  name: "MyBookmarks",
});

const changeFavorite = (productId) => {
  store.commit("bookmarksProducts/removeItemFromBookmarksProduts", productId);
};

onMounted(() => {
  store.dispatch("bookmarksProducts/initializeBookmarksProducts");
});
</script>

<style lang="sass" scoped>

.bookmarks
  min-height: calc(100vh - 301px)

.bookmarks__list
  padding: 36px 0
  display: flex
  flex-wrap: wrap
  grid-gap: 40px

</style>
