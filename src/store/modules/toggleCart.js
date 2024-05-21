const state = {
  isOpen: false,
};

const getters = {
  isCartOpen: (state) => state.isOpen,
};

const mutations = {
  toggleCart: (state) => {
    state.isOpen = !state.isOpen;
  },
};

const actions = {
  toggleCart({ commit }) {
    commit("toggleCart");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
