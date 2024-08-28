import { Module } from "vuex";
import { RootState } from "../index";

interface State {
  products: Product[];
  originalProducts: OriginalProducts[];
}

interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  iconOrder: string;
  iconFavorite: string;
}

interface OriginalProducts {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  iconOrder: string;
  iconFavorite: string;
}

interface StatusItem {
  id: number;
}

interface StatusCard {
  orderStatus: StatusItem[];
  favoriteStatus: StatusItem[];
}

const state = {
  products: [],
  originalProducts: [],
};

const getters = {
  products: (state: State) => state.products,
  originalProducts: (state: State) => state.originalProducts,
};

const mutations = {
  setProducts(state: State, products: []) {
    state.products = products;
  },

  initializeProductStatuses(state: State, statusCard: StatusCard) {
    const { orderStatus, favoriteStatus } = statusCard;
    return state.products.map((product) => {
      product.iconOrder = orderStatus.find((item) => item.id === product.id)
        ? "not-order"
        : "order";
      product.iconFavorite = favoriteStatus.find(
        (item) => item.id === product.id
      )
        ? "not-favorite"
        : "favorite";
    });
  },

  sortTitle(state: State) {
    state.products.sort((a, b) => a.title.localeCompare(b.title));
  },

  sortPrice(state: State) {
    state.products.sort((a, b) => a.price - b.price);
  },

  sortId(state: State) {
    state.products.sort((a, b) => a.id - b.id);
  },

  filterProducts(state: State, newFilter: string) {
    if (!state.originalProducts.length) {
      state.originalProducts = [...state.products];
    }

    if (!newFilter) {
      state.products = [...state.originalProducts];
    } else {
      state.products = state.originalProducts.filter((product) =>
        product.title.toLowerCase().includes(newFilter.toLowerCase())
      );
    }
  },
};

const actions = {
  async fetchData({
    commit,
  }: {
    commit: (mutation: string, res: Product[]) => void;
  }) {
    try {
      const res = await fetch("https://73aeca9ea1583338.mokky.dev/items");
      if (!res.ok) {
        throw new Error("Ошибка HTTP: " + res.status);
      }
      commit("setProducts", await res.json());
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  sortProducts(
    { commit }: { commit: (mutation: string) => void },
    newSortingOption: string
  ) {
    if (newSortingOption === "title") return commit("sortTitle");
    if (newSortingOption === "price") return commit("sortPrice");
    return commit("sortId");
  },
};

const products: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default products;
