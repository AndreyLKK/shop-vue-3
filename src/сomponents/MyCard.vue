<template>
  <li class="cards__item">
    <my-icon
      :type="product.iconFavorite"
      @click="changeFavorite(product)"
    ></my-icon>

    <div class="cards__img">
      <img :src="require(`@/assets/img${product.imageUrl}`)" alt="" />
    </div>
    <my-typography color="black">{{ product.title }}</my-typography>
    <div class="cards__price">
      <my-typography
        tag="p"
        size="xs"
        color="platinum"
        height="xs"
        bold="medium"
        >ЦЕНА:
      </my-typography>
      <div class="cards__icon">
        <my-icon
          v-if="changeCarts !== null"
          :type="product.iconOrder"
          @click="changeCarts(product)"
        ></my-icon>
      </div>
      <my-typography tag="p" color="black" bold="bold">
        {{ product.price }}
      </my-typography>
      {{ product.id }}
    </div>
  </li>
</template>

<script setup>
import { defineComponent, defineProps } from "vue";
import MyTypography from "@/UI/Typography/MyTypography.vue";
import MyIcon from "@/UI/icon/MyIcon.vue";

defineComponent({
  components: { MyTypography, MyIcon },
  name: "MyCard",
});

defineProps({
  product: Object,
  changeFavorite: Function,
  changeCarts: Function,
});
</script>

<style lang="sass" scoped>
.cards__item
  max-width: 210px
  padding: 30px
  border: 1px solid rgb(248, 248, 248)
  border-radius: 40px
  box-shadow: 0px 14px 30px 0px rgba(0, 0, 0, 0.05)
  background-color: rgb(255, 255, 255)
  transition: transform 0.2s
  cursor: pointer
  display: flex
  justify-content: space-between
  flex-direction: column
  &:hover
    transform: translate(-10px, -10px)

.cards__img
  max-width: 133px
  margin: 0 auto 14px

.cards__img + p
  margin-bottom: 14px

.cards__price
  display: grid
  grid-template-columns: auto auto
  grid-template-rows: auto auto
  justify-content: space-between
  align-items: start
  row-gap: 2px

.cards__icon
  grid-column: 2
  grid-row: 1 / 3
</style>
