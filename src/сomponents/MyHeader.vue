<template>
  <header class="header">
    <my-container>
      <div class="header__wrapper">
        <div class="header__inner">
          <router-link class="header__logo-link" to="/" tabindex="0">
            <div class="header__logo">
              <img
                class="header__logo-img"
                src="@/assets/logo.png"
                alt="Логотип магазина кроссовок"
              />
            </div>
            <my-typography
              class="header__logo-text"
              tag="h1"
              bold="bold"
              size="l"
              color="black"
              >Sneaker Haven</my-typography
            >
            <my-typography class="header__logo-span" tag="span"
              >Магазин лучших кроссовок</my-typography
            >
          </router-link>
        </div>

        <nav class="header__navigation">
          <my-navigation-menu></my-navigation-menu>
        </nav>
        <my-burger-button @click="toggleDropMenu"></my-burger-button>
        <my-drop-down-menu
          v-if="dropMenu"
          @eventToggleDropMenu="toggleDropMenu"
        ></my-drop-down-menu>
      </div>
    </my-container>
  </header>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import MyTypography from "@/UI/Typography/MyTypography.vue";
import MyContainer from "@/UI/container/MyContainer.vue";
import MyBurgerButton from "@/UI/burgerButton/MyBurgerButton.vue";
import MyDropDownMenu from "@/UI/dropDownMenu/MyDropDownMenu.vue";
import MyNavigationMenu from "@/сomponents/MyNavigationMenu.vue";

defineComponent({
  components: {
    MyTypography,
    MyNavigationMenu,
    MyContainer,
    MyBurgerButton,
    MyDropDownMenu,
  },
  name: "MyHeader",
});

let dropMenu = ref<boolean>(false);

const toggleDropMenu = (): void => {
  dropMenu.value = !dropMenu.value;
};
</script>

<style lang="sass" scoped>
.header
  margin: 0 auto
  &::before
  border-bottom: 1px solid rgb(234, 234, 234)
  max-width: 1080px

.header__wrapper
  display: flex
  align-items: center
  justify-content: space-between
  padding: 43px 0

.header__logo-link
  display: grid
  grid-template-columns: auto auto
  grid-template-rows: auto auto
  align-items: center
  transition: outline 0.1s ease

.header__logo-link:focus
  outline: 2px solid rgb(124, 225, 180)
  border-radius: 4px

.header__logo
  margin-right: 16px
  grid-column: 1
  grid-row: span 2

.header__logo-img
  width: 100px
  height: 70px

@media (max-width: 768px)
  .header__wrapper
    justify-content: space-around

  .header__inner
    margin-right: 20px

  .header__logo-link
    column-gap: 10px

  .header__logo-span,
  .header__logo-text
    font-size: 15px
</style>
