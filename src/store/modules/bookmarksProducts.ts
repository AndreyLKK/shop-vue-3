import { Module } from "vuex";
import { RootState } from "../index";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "@/helpers/localStorage";

interface State {
  bookmarksProducts: Product[];
}

interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  iconOrder: string;
  iconFavorite: string;
}

const state = {
  bookmarksProducts: [],
};

const getters = {
  bookmarksProducts: (state: State) => state.bookmarksProducts,
};

const mutations = {
  setBookmarksProducts: (state: State, products: []) => {
    state.bookmarksProducts = products;
  },

  addItemToBookmarksProduts: (state: State, product: Product) => {
    state.bookmarksProducts.push(product);
    saveToLocalStorage("bookmarks", state.bookmarksProducts);
  },

  removeItemFromBookmarksProduts: (state: State, product: Product) => {
    const index = state.bookmarksProducts.findIndex((item) => {
      return item.id == product.id;
    });

    if (index !== -1) {
      state.bookmarksProducts.splice(index, 1);
    }
    saveToLocalStorage("bookmarks", state.bookmarksProducts);
  },

  toggleIconFavorite: (state: State, product: Product) => {
    if (product.iconFavorite === "favorite") {
      product.iconFavorite = "not-favorite";
    } else {
      product.iconFavorite = "favorite";
    }
  },
};

const actions = {
  initializeBookmarksProducts({
    commit,
  }: {
    commit: (mutation: string, localStorageBookmarksData: any) => void;
  }) {
    const localStorageBookmarksData = getFromLocalStorage("bookmarks");
    commit("setBookmarksProducts", localStorageBookmarksData);
  },
};

const bookmarksProducts: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default bookmarksProducts;
