import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import post from "@/store/modules/post";

export default new Vuex.Store({
  state: {
    title: "Home"
  },
  mutations: {
    SET_TITLE(state, title) {
      state.title = title;
    }
  },
  actions: {},
  modules: {
    post
  },
  getters: {
    TITLE(state) {
      return state.title;
    }
  }
});
