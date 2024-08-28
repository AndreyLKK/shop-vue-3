import { Module } from "vuex";
import { RootState } from "../index";
import { saveToLocalStorage } from "@/helpers/localStorage";

interface State {
  cartProducts: Product[];
  orderIsProcessed: boolean;
}

interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  iconOrder: string;
  iconFavorite: string;
}

const state: State = {
  cartProducts: [],
  orderIsProcessed: false,
};

const getters = {
  cartProducts: (state: State) => state.cartProducts,
  totalPrice: (state: State) => {
    return state.cartProducts.reduce((acc, item) => acc + item.price, 0);
  },
  orderIsProcessed: (state: State) => state.orderIsProcessed,
};

const mutations = {
  addItemToCartProduts: (state: State, product: Product) => {
    state.cartProducts.push(product);
    saveToLocalStorage("purchase", state.cartProducts);
  },

  removeItemFromCartProducts: (state: State, product: Product) => {
    const index = state.cartProducts.findIndex(
      (item) => item.id === product.id
    );

    if (index !== -1) {
      state.cartProducts.splice(index, 1);
    }
    saveToLocalStorage("purchase", state.cartProducts);
  },

  toggleIconOrder: (state: State, product: Product) => {
    product.iconOrder = product.iconOrder === "order" ? "not-order" : "order";
  },

  emptyingTheTrash: (state: State) => {
    state.cartProducts.length = 0;
    saveToLocalStorage("purchase", state.cartProducts);
  },

  setOrderProcessed: (state: State, status: boolean) => {
    state.orderIsProcessed = status;
  },
};

const cartProducts: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
};

export default cartProducts;
