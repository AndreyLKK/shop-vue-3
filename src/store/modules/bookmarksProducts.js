const state = {
  bookmarksProducts: [],
};

const getters = {
  bookmarksProducts: (state) => state.bookmarksProducts,
};

const mutations = {
  setBookmarksProducts: (state, products) => {
    state.bookmarksProducts = products;
  },

  addItemToBookmarksProduts: (state, product) => {
    state.bookmarksProducts.push(product);
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarksProducts));
  },

  removeItemFromBookmarksProduts: (state, product) => {
 
    const index = state.bookmarksProducts.findIndex((item) => {
      console.log(product.id);
      return item.id == product.id;
    });

    if (index !== -1) {
      state.bookmarksProducts.splice(index, 1);
    }
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarksProducts));
  },

  toggleIconFavorite: (state, product) => {
    if (product.iconFavorite === "favorite") {
      product.iconFavorite = "not-favorite";
    } else {
      product.iconFavorite = "favorite";
    }
  },
};

const actions = {
  initializeBookmarksProducts({ commit }) {
    const localStorageBookmarksData =
      JSON.parse(localStorage.getItem("bookmarks")) || [];

    commit("setBookmarksProducts", localStorageBookmarksData);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
