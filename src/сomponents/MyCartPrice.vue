<template>
  <div class="footer-price__info">
    <my-typography tag="p" color="black" size="s" height="m"
      >Итого:
    </my-typography>
    <span class="footer-price__dot"></span>
    <my-typography tag="p" color="black" size="s" height="m"
      >{{ totalPrice }} руб.
    </my-typography>
  </div>
  <div class="footer-price__info">
    <my-typography tag="p" color="black" size="s" height="m"
      >Налог 5%:
    </my-typography>
    <span class="footer-price__dot"></span>
    <my-typography tag="p" color="black" size="s" height="m"
      >{{ taxAmount }} руб.
    </my-typography>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

import MyTypography from "@/UI/Typography/MyTypography.vue";

defineComponent({
  name: "MyCartPrice",
});

const store = useStore();

const totalPrice = computed<number>(
  () => store.getters["cartProducts/totalPrice"]
);

const taxAmount = computed<number>(() => {
  let taxRate = 0.05;
  taxRate *= totalPrice.value;
  return Math.ceil(taxRate);
});
</script>

<style lang="sass" scoped>
.footer-price__info
  display: flex
  justify-content: space-between
  align-items: flex-end
  margin-bottom: 20px

.footer-price__dot
  border-top: 1px dotted #ccc
  height: 1px
  flex: 1 1 auto
  margin: 0 10px
</style>
