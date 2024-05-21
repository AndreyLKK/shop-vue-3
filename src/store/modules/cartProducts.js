const state = {
  cartProducts: [],
};

const getters = {
  cartProducts: (state) => state.cartProducts,
};

const mutations = {
  addItemToCartProduts: (state, product) => {
    state.cartProducts.push(product);
  },

  removeItemFromCartProducts: (state, product) => {
    const index = state.cartProducts.findIndex((item) => item.id === product);
    if (index !== -1) {
      state.cartProducts.splice(index, 1);
    }
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
