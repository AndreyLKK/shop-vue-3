import { createStore } from "vuex";
import toggleCart from "./modules/toggleCart.js";
import cartProducts from "./modules/cartProducts.js";
import bookmarksProducts from "./modules/bookmarksProducts.js";

export default createStore({
  modules: {
    toggleCart,
    cartProducts,
    bookmarksProducts,
  },
});
