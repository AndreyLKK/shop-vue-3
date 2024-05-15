<template>
  <div class="catalog">
    <my-container>
      <div class="catalog__inner">
        <my-typography tag="h2" bold="bold" size="l" height="l"
          >Все кроссовки</my-typography
        >
        <div class="catalog__input">
          <my-input placeholder="Поиск..." iconPosition="left">
            <template #iconLeft>
              <my-icon type="search"></my-icon>
            </template>
          </my-input>
        </div>
      </div>
      <div class="catalog__menu">
        <my-cards></my-cards>
      </div>
    </my-container>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

import MyContainer from "@/UI/container/MyContainer.vue";
import MyInput from "@/UI/input/MyInput.vue";
import MyIcon from "@/UI/icon/MyIcon.vue";
import MyTypography from "@/UI/Typography/MyTypography.vue";
import MyCards from "@/сomponents/MyCards.vue";

defineComponent({
  сomponents: { MyContainer, MyInput, MyIcon, MyTypography, MyCards },
  name: "MyCatalog",
});
</script>

<style lang="sass" scoped>
.catalog  
  padding-top: 39px

.catalog__inner
  display: flex
  align-items: center
  justify-content: space-between


.catalog__input
  max-width: 250px
  min-height: 45px
</style>
