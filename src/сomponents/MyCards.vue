<template>
  <ul class="cards">
    <li class="cards__item" v-for="product in products" :key="product.id">
      <my-icon type="favorite"></my-icon>
      <div class="cards__img">
        <img :src="require(`@/assets/img${product.imageUrl}`)" alt="" />
      </div>
      <my-typography color="black">{{ product.title }}</my-typography>
      <div class="cards__price">
        <my-typography
          >ЦЕНА:
          <my-typography> {{ product.price }} </my-typography>
        </my-typography>
        <my-icon type="order"></my-icon>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { defineComponent, onMounted, ref } from "vue";
import MyTypography from "@/UI/Typography/MyTypography.vue";
import MyIcon from "@/UI/icon/MyIcon.vue";

defineComponent({
  components: { MyTypography, MyIcon },
  name: "MyCards",
});

const products = ref([]);

async function fetchData() {
  const res = await fetch("https://73aeca9ea1583338.mokky.dev/items");
  const data = await res.json();
  console.log(data);
  products.value = data;
}

onMounted(() => {
  fetchData();
});
</script>

<style lang="sass" scoped>
.cards
  padding: 36px 0
  display: flex
  flex-wrap: wrap
  grid-gap: 40px

.cards__item
  max-width: 210px
  padding: 30px
  border: 1px solid rgb(248, 248, 248)
  border-radius: 40px
  box-shadow: 0px 14px 30px 0px rgba(0, 0, 0, 0.05)
  background-color: rgb(255, 255, 255)
  transition: transform 0.2s
  cursor: pointer
  &:hover
    transform: translate(-10px, -10px)

.cards__img
  max-width: 133px
  margin-bottom: 14px

.cards__img + p
  margin-bottom: 14px

.cards__price
  display: grid
  grid-template-columns: auto auto
  grid-template-rows: auto auto
  justify-content: space-between
  align-items: start

</style>
