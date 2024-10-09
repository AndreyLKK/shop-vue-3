<template>
  <ul class="navigation-menu__list">
    <li class="navigation-menu__item">
      <button
        class="navigation-menu__btn"
        @click="toggleCart"
        @mouseover="hoveredIndex = 0"
        @mouseleave="hoveredIndex = null"
        tabindex="0"
        ref="previouslyFocusedElement"
      >
        <my-icon
          class="navigation-menu__icon"
          type="cart"
          :color="hoveredIndex === 0 ? '#454545' : '#9B9B9B'"
        ></my-icon>
        <span class="visually-hidden">Корзина добавленных товаров</span>
        <my-typography class="navigation-menu__text"
          >{{ totalPrice }} руб.</my-typography
        >
      </button>
    </li>

    <li class="navigation-menu__item">
      <router-link
        class="navigation-menu__link"
        to="/bookmarks"
        @mouseover="hoveredIndex = 1"
        @mouseleave="hoveredIndex = null"
        tabindex="0"
      >
        <my-icon
          class="navigation-menu__icon"
          type="bookmarks"
          :color="hoveredIndex === 1 ? '#454545' : '#9B9B9B'"
        ></my-icon>

        <my-typography class="navigation-menu__text">Закладки</my-typography>
      </router-link>
    </li>

    <li class="navigation-menu__item">
      <button
        class="navigation-menu__btn"
        @mouseover="hoveredIndex = 2"
        @mouseleave="hoveredIndex = null"
        tabindex="0"
      >
        <my-icon
          class="navigation-menu__icon"
          type="profile"
          :color="hoveredIndex === 2 ? '#454545' : '#9B9B9B'"
        ></my-icon>

        <my-typography class="navigation-menu__text">Профиль</my-typography>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "vuex";
import MyIcon from "@/UI/icon/MyIcon.vue";
import MyTypography from "@/UI/Typography/MyTypography.vue";

defineComponent({
  components: { MyTypography, MyIcon },
  name: "MyNavigationMenu",
});

const store = useStore();

const hoveredIndex = ref<number | null>(null);

const toggleCart = (): void => {
  store.commit("toggleCart/toggleCart");
};

const isCartOpen = computed(() => store.getters["toggleCart/isCartOpen"]);

const previouslyFocusedElement = ref<HTMLElement | null>(null);

watch(isCartOpen, (newValue) => {
  if (!newValue) {
    previouslyFocusedElement.value?.focus();
  }
});

const totalPrice = computed(
  (): number => store.getters["cartProducts/totalPrice"]
);
</script>

<style lang="sass" scoped>

.navigation-menu__list
  display: flex
  align-items: flex-start

.navigation-menu__item
  text-align: center
  &:not(:last-child)
    margin-right: 32px

.navigation-menu__btn,
.navigation-menu__link
  transition: outline 0.1s, text-shadow 0.1s, color 0.1s
  display: flex
  align-items: center
  &:hover
    text-shadow: .4px 0px 0px #818181, -.4px 0px 0px #818181
    color: rgb(92, 92, 92)
  &:focus
    outline: 2px solid rgb(124, 225, 180)
    border-radius: 4px
  &:focus
    outline: 2px solid rgb(124, 225, 180)
    border-radius: 4px

.navigation-menu__icon
  display: flex  
  align-items: center
  margin-right: 8px

@media (max-width: 768px)
 .navigation-menu__list
  grid-gap: 14px
  display: none
</style>
