<template>
  <ul class="navigation-menu__list">
    <li
      class="navigation-menu__item"
      v-for="item in navigationMenu"
      :key="item.label"
    >
      <button class="navigation-menu__btn" v-if="item.label !== 'Закладки'">
        <my-icon :type="item.icon"></my-icon>
        <my-typography>{{ item.label }}</my-typography>
      </button>
      <router-link class="navigation-menu__link" to="/bookmarks" v-else>
        <my-icon :type="item.icon"></my-icon>
        <my-typography>{{ item.label }}</my-typography>
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { defineComponent } from "vue";
import MyIcon from "@/UI/icon/MyIcon.vue";
import MyTypography from "@/UI/Typography/MyTypography.vue";

defineComponent({
  components: { MyTypography, MyIcon },
  name: "MyNavigationMenu",
});

const navigationMenu = [
  { label: "0 руб.", icon: "cart" },
  { label: "Закладки", icon: "bookmarks" },
  { label: "Профиль", icon: "profile" },
];
</script>

<style lang="sass" scoped>
.navigation-menu__list
  display: flex
  align-items: flex-end
  grid-gap: 32px

.navigation-menu__item
  text-align: center
</style>
