<template>
  <div class="bookmarks">
    <my-container>
      <my-typography
        class="bookmarks__title"
        tag="p"
        bold="bold"
        size="xl"
        height="xxl"
        color="black"
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

<script setup lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";
import MyCard from "@/сomponents/MyCard.vue";
import MyContainer from "@/UI/container/MyContainer.vue";
import MyTypography from "@/UI/Typography/MyTypography.vue";

interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  iconFavorite: string;
  iconOrder: string;
}

const store = useStore();

const bookmarksProducts = computed(
  (): void => store.getters["bookmarksProducts/bookmarksProducts"]
);

defineComponent({
  сomponents: { MyCard, MyContainer, MyTypography },
  name: "MyBookmarks",
});

const changeFavorite = (product: Product): void => {
  store.commit("bookmarksProducts/removeItemFromBookmarksProduts", product);
};

onMounted((): void => {
  store.dispatch("bookmarksProducts/initializeBookmarksProducts");
});
</script>

<style lang="sass" scoped>

.bookmarks
  min-height: calc(100vh - 301px)

.bookmarks__title
  padding-top: 39px

.bookmarks__list
  padding: 36px 0
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))
  justify-items: center
  grid-gap: 40px

@media (max-width: 1115px)
  .bookmarks__list
    gap: 40px 12px

@media (max-width: 982px)
  .bookmarks__list
    gap: 40px 10px

@media (max-width: 890px)
  .bookmarks__list
    justify-content: center

@media (max-width: 830px)
  .bookmarks__list
    padding: 18px 0
    grid-gap: 30px 10px

@media (max-width: 709px)
  .bookmarks__list
    grid-gap: 40px 10px

  .bookmarks__title
    font-size: 30px
    text-align: center
    padding-top: 16px

@media (max-width: 499px)
  .bookmarks__list
    grid-gap: 20px 10px
</style>
