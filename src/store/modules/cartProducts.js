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
    localStorage.setItem("purchase", JSON.stringify(state.cartProducts));
  },

  removeItemFromCartProducts: (state, product) => {
    const index = state.cartProducts.findIndex(
      (item) => item.id === product.id
    );

    if (index !== -1) {
      state.cartProducts.splice(index, 1);
    }
    localStorage.setItem("purchase", JSON.stringify(state.cartProducts));
  },

  toggleIconOrder: (state, product) => {
    product.iconOrder = product.iconOrder === "order" ? "not-order" : "order";
  },

  emptyingTheTrash: (state) => {
    state.cartProducts.length = 0;
    localStorage.setItem("purchase", JSON.stringify(state.cartProducts));
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
