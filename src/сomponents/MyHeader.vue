<template>
  <header class="header">
    <my-container>
      <div class="header__wrapper">
        <div class="header__inner">
          <router-link class="header__logo-link" to="/">
            <div class="header__logo">
              <my-icon type="logo"></my-icon>
            </div>
            <my-typography tag="h1" bold="bold" size="s" color="black"
              >VUE SNEAKERS</my-typography
            >
            <my-typography tag="span">Магазин лучших кроссовок</my-typography>
          </router-link>
        </div>

        <nav class="header__navigation">
          <my-navigation-menu></my-navigation-menu>
        </nav>
      </div>
    </my-container>
  </header>
</template>

<script setup>
import { defineComponent } from "vue";
import MyTypography from "@/UI/Typography/MyTypography.vue";
import MyIcon from "@/UI/icon/MyIcon.vue";
import MyContainer from "@/UI/container/MyContainer.vue";
import MyNavigationMenu from "@/сomponents/MyNavigationMenu.vue";

defineComponent({
  components: { MyTypography, MyNavigationMenu, MyIcon, MyContainer },
  name: "MyHeader",
});
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

.header__logo
  margin-right: 16px
  grid-column: 1
  grid-row: span 2
</style>
