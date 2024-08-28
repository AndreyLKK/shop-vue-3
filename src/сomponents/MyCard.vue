<template>
  <li class="cards__item">
    <span class="visually-hidden">Карточка товара с id {{ product.id }}</span>
    <div class="cards__icon">
      <button
        class="cards__btn"
        @click="changeFavorite(product)"
        @keydown.enter="changeFavorite(product)"
        @keydown.space.prevent="changeFavorite(product)"
        :aria-label="`Изменить статус избранного для ${product.title}`"
      >
        <my-icon
          class="cards__icon-favorite"
          :type="product.iconFavorite"
          :class="{
            'cards__btn-favorite': product.iconFavorite === 'favorite',
            'cards__btn-not-favorite': product.iconFavorite === 'not-favorite',
          }"
        >
        </my-icon>
      </button>
    </div>

    <div class="cards__img">
      <img
        :src="require(`@/assets/img${product.imageUrl}`)"
        :alt="`Изображение кроссовок с id${product.id}`"
      />
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

      <my-typography tag="p" color="black" bold="bold">
        {{ product.price }}
        <span class="visually-hidden">Рублей</span>
      </my-typography>
      <div class="cards__icon">
        <button
          class="cards__btn"
          @click="handleChangeCarts"
          @keydown.enter="handleChangeCarts"
          @keydown.space.prevent="handleChangeCarts"
          :aria-label="`Добавить в корзину ${product.title}`"
        >
          <my-icon
            class="cards__icon-cart"
            v-if="changeCarts"
            :type="product.iconOrder"
            :class="{
              'cards__btn-order': product.iconOrder === 'order',
              'cards__btn-not-order': product.iconOrder === 'not-order',
            }"
          ></my-icon>
        </button>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import MyTypography from "@/UI/Typography/MyTypography.vue";
import MyIcon from "@/UI/icon/MyIcon.vue";

interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  iconOrder: string;
  iconFavorite: string;
}

interface Props {
  product: Product;
  changeFavorite: Function;
  changeCarts?: Function;
}

const props = defineProps<Props>();

const handleChangeCarts = () => {
  if (props.changeCarts) {
    props.changeCarts(props.product);
  }
};
</script>

<style lang="sass" scoped>
.cards__item
  max-width: 210px
  width: 100%
  padding: 30px
  border: 1px solid rgb(248, 248, 248)
  border-radius: 40px
  box-shadow: 0px 14px 30px 0px rgba(0, 0, 0, 0.05)
  background-color: rgb(255, 255, 255)
  cursor: pointer
  display: flex
  justify-content: space-between
  flex-direction: column
  transition: all 1s



.cards__img
  max-width: 133px
  margin: 0 auto 14px

.cards__img + p
  margin-bottom: 14px

.cards__icon
  margin-bottom: 10px

.cards__icon-favorite,
.cards__icon-cart
  width: 32px
  height: 32px

.cards__btn:focus
  outline: 2px solid rgb(124, 225, 180)
  border-radius: 5px

.cards__btn-favorite:deep( svg:hover )
  fill: #fcf5f5
  & path
    fill: #facaca

.cards__btn-favorite:deep( svg:active )
  fill: #fad7d7
  & path
    fill: #f77272
    stroke: #f77272

.cards__btn-not-favorite:deep( svg:hover )
  & rect
    fill: #ffc7c7
    stroke: #facaca

.cards__btn-not-favorite:deep( svg:active )
  fill: #fa9d9d
  & rect
     fill: #fad7d7


.cards__btn-order:deep( svg:hover )
  fill: #e6f7e9
  & path
     fill: #7e807e
  & rect
     fill: #e6f7e9

.cards__btn-order:deep( svg:active )
  fill: #a1f7b0
  & path
     fill: #fff
  & rect
     fill: #a1f7b0

.cards__btn-not-order:deep( svg:hover )
  fill: #a1f7b0
  & path
     fill: #fff
  & rect
     fill: #a1f7b0

.cards__btn-not-order:deep( svg:active )
  fill: #69f081
  & path
     fill: #fff
  & rect
     fill: #69f081



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

@media (max-width: 1150px)
  .cards__item
    max-width: 200px
    padding: 20px
</style>
