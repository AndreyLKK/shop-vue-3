import { createStore } from "vuex";
import toggleCart from "./modules/toggleCart.js";
import cartProducts from "./modules/cartProducts.js";

export default createStore({
  modules: {
    toggleCart,
    cartProducts,
  },
});
