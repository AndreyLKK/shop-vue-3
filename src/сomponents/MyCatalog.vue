<template>
  <div class="catalog">
    <my-container>
      <div class="catalog__inner">
        <my-typography
          class="catalog__text"
          tag="h2"
          bold="bold"
          size="xl"
          height="xxl"
          color="black"
          >Все кроссовки</my-typography
        >
        <div class="catalog__actions">
          <div class="catalog__drop-list">
            <my-select
              class="catalog__select"
              v-model="sortingOption"
              tabindex="0"
            ></my-select>
          </div>
          <div class="catalog__inner-input">
            <my-input
              class="catalog__input"
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

<script setup lang="ts">
import { defineComponent, ref } from "vue";

import MyContainer from "@/UI/container/MyContainer.vue";
import MyInput from "@/UI/input/MyInput.vue";
import MyIcon from "@/UI/icon/MyIcon.vue";
import MyTypography from "@/UI/Typography/MyTypography.vue";
import MySelect from "@/UI/select/MySelect.vue";
import MyCards from "@/сomponents/MyCards.vue";

defineComponent({
  сomponents: { MyContainer, MyInput, MyIcon, MyTypography, MyCards, MySelect },
  name: "MyCatalog",
});

const filter = ref<string>('');

const sortingOption = ref<string>("standart");
</script>

<style lang="sass" scoped>
.catalog
  padding-top: 39px
  min-height: calc(100vh - 301px)

.catalog__inner
  display: flex
  align-items: center
  justify-content: space-between
  grid-gap: 15px

.catalog__actions
  display: flex
  grid-gap: 40px

.catalog__inner-input
  max-width: 250px
  min-height: 45px

@media (max-width: 920px)
  .catalog__text
    font-size: 30px

  .catalog__actions
    grid-gap: 20px

@media (max-width: 830px)
  .catalog
    padding-top: 20px

  .catalog__actions
    flex-direction: column-reverse

  .catalog__inner
    justify-content: space-around

  .catalog__text
    min-width: 220px


@media (max-width: 480px)
  .catalog__inner
    flex-direction: column
</style>
