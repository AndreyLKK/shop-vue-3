<template>
  <div class="drop-down-menu">
    <div class="drop-down-menu__title">
      <my-icon type="back-cart-arrow" @click="toggleDropMenu"></my-icon>
      <my-typography tag="p" size="l" height="l" bold="bold" color="black">
        Меню
      </my-typography>
    </div>
    <my-navigation-menu
      class="drop-down-menu__list"
      @click="toggleDropMenu"
  
    ></my-navigation-menu>
  </div>
</template>

<script setup>
import { defineComponent, defineEmits } from "vue";
import MyIcon from "@/UI/icon/MyIcon.vue";
import MyTypography from "@/UI/Typography/MyTypography.vue";
import MyNavigationMenu from "@/сomponents/MyNavigationMenu.vue";

defineComponent({
  components: { MyNavigationMenu, MyIcon, MyTypography },
  name: "MyDropDownMenu",
});

const emit = defineEmits(["eventToggleDropMenu"]);

const toggleDropMenu = () => {
  emit("eventToggleDropMenu");
};
</script>

<style lang="sass" scoped>
.drop-down-menu
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  width: 100%
  height: 100vh
  background-color: rgb(124, 225, 180)
  z-index: 3

.drop-down-menu__title
  display: flex
  align-items: flex-start
  margin: 40px 0 0 40px

.drop-down-menu__title .icon
  margin-right: 30px
  cursor: pointer
  transform: rotate(180deg)

.drop-down-menu__list
  display: flex
  flex-direction: column
  align-items: center
  grid-gap: 32px
  height: calc(100vh - 73px)
  justify-content: center

.drop-down-menu__button
  display: flex
  grid-gap: 10px
  margin: 30px 0 0 30px

.drop-down-menu__icon
  transform: rotate(180deg)
  display: flex
 
</style>
