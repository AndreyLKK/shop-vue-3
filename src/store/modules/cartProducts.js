const state = {
  cartProducts: [],
};

const getters = {
  cartProducts: (state) => state.cartProducts,
  totalPrice: (state) => {
    return state.cartProducts.reduce((acc, item) => acc + item.price, 0);
  },
};

const mutations = {
  addItemToCartProduts: (state, product) => {
    state.cartProducts.push(product);
  },

  removeItemFromCartProducts: (state, product) => {
    const index = state.cartProducts.findIndex(
      (item) => item.id === product.id
    );
    if (index !== -1) {
      state.cartProducts.splice(index, 1);
    }
  },

  toggleIconOrder: (state, product) => {
    if (product.iconOrder === "order") {
      product.iconOrder = "not-order";
    } else {
      product.iconOrder = "order";
    }
  },

  emptyingTheTrash: (state) => {
    state.cartProducts.length = 0;
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
