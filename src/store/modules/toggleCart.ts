import { Module } from "vuex";
import { RootState } from "../index";

interface State {
  isOpen: boolean;
}

const state: State = {
  isOpen: false,
};

const getters = {
  isCartOpen: (state: State) => state.isOpen,
};

const mutations = {
  toggleCart: (state: State) => {
    state.isOpen = !state.isOpen;
  },
};

const toggleCart: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
};

export default toggleCart;


