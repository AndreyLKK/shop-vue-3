<template>
  <div class="catalog">
    <my-container>
      <div class="catalog__inner">
        <my-typography tag="p" bold="bold" size="xl" height="xxl" color="black"
          >Все кроссовки</my-typography
        >
        <div class="catalog__actions">
          <div class="catalog__drop-list">
            <my-select v-model="sortingOption"></my-select>
          </div>
          <div class="catalog__input">
            <my-input
              placeholder="Поиск..."
              iconPosition="left"
              v-model="filter"
            >
              <template #iconLeft>
                <my-icon type="search"></my-icon>
              </template>
            </my-input>
          </div>
        </div>
      </div>
      <div class="catalog__menu">
        <my-cards :sortingOption="sortingOption" :filter="filter"></my-cards>
      </div>
    </my-container>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";

import MyContainer from "@/UI/container/MyContainer.vue";
import MyInput from "@/UI/input/MyInput.vue";
import MyIcon from "@/UI/icon/MyIcon.vue";
import MyTypography from "@/UI/Typography/MyTypography.vue";
import MyCards from "@/сomponents/MyCards.vue";
import MySelect from "@/UI/select/MySelect.vue";

defineComponent({
  сomponents: { MyContainer, MyInput, MyIcon, MyTypography, MyCards, MySelect },
  name: "MyCatalog",
});

const filter = ref("");

const sortingOption = ref("standart");
</script>

<style lang="sass" scoped>
.catalog
  padding-top: 39px

.catalog__inner
  display: flex
  align-items: center
  justify-content: space-between

.catalog__actions
  display: flex
  grid-gap: 40px

.catalog__input
  max-width: 250px
  min-height: 45px
</style>
