<template>
  <ul class="navigation-menu__list">
    <li class="navigation-menu__item">
      <button
        class="navigation-menu__btn"
        @click="toggleCart"
        @mouseover="hoveredIndex = 0"
        @mouseleave="hoveredIndex = null"
      >
        <my-icon
          class="navigation-menu__icon"
          type="cart"
          :color="hoveredIndex === 0 ? '#454545' : '#9B9B9B'"
        ></my-icon>

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
      >
        <my-icon
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
      >
        <my-icon
          type="profile"
          :color="hoveredIndex === 2 ? '#454545' : '#9B9B9B'"
        ></my-icon>

        <my-typography class="navigation-menu__text">Профиль</my-typography>
      </button>
    </li>
  </ul>
</template>

<script setup>
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import MyIcon from "@/UI/icon/MyIcon.vue";
import MyTypography from "@/UI/Typography/MyTypography.vue";

defineComponent({
  components: { MyTypography, MyIcon },
  name: "MyNavigationMenu",
});

const store = useStore();

const hoveredIndex = ref(null);

const toggleCart = () => {
  store.dispatch("toggleCart/toggleCart");
};

const totalPrice = computed(() => store.getters["cartProducts/totalPrice"]);
</script>

<style lang="sass" scoped>

.navigation-menu__list
  display: flex
  align-items: flex-end
  grid-gap: 32px

.navigation-menu__item
  text-align: center

.navigation-menu__btn,
.navigation-menu__link
  transition: text-shadow 0.1s, color 0.1s
  display: inline-block

  &:hover
    text-shadow: .4px 0px 0px #818181, -.4px 0px 0px #818181
    color: rgb(92, 92, 92)


.navigation-menu__btn,
.navigation-menu__link
  display: flex
  grid-gap: 8px
</style>
