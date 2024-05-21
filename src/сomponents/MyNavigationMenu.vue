<template>
  <ul class="navigation-menu__list">
    <li class="navigation-menu__item">
      <button class="navigation-menu__btn" @click="toggleCart">
        <my-icon type="cart"></my-icon>

        <my-typography class="navigation-menu__text"
          >{{ totalPrice }} руб.</my-typography
        >
      </button>
    </li>

    <li class="navigation-menu__item">
      <router-link class="navigation-menu__link" to="/bookmarks">
        <my-icon type="bookmarks"></my-icon>

        <my-typography class="navigation-menu__text">Закладки</my-typography>
      </router-link>
    </li>

    <li class="navigation-menu__item">
      <button class="navigation-menu__btn">
        <my-icon type="profile"></my-icon>

        <my-typography class="navigation-menu__text">Профиль</my-typography>
      </button>
    </li>
  </ul>
</template>

<script setup>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import MyIcon from "@/UI/icon/MyIcon.vue";
import MyTypography from "@/UI/Typography/MyTypography.vue";

defineComponent({
  components: { MyTypography, MyIcon },
  name: "MyNavigationMenu",
});

const store = useStore();

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


.navigation-menu__text
  transition: font-weight color 0.3s

  &:hover
    font-weight: 700
    color: rgb(92, 92, 92)


.navigation-menu__btn,
.navigation-menu__link
  display: flex
  grid-gap: 8px
  align-items: center
</style>
