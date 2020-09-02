import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuList: [],
    dynamicMenuList: [],
    barMenuList: [],
  },
  mutations: {
    SET_MENU(state, data) {
      state.menuList = data;
    },
    SET_DYNAMIC_MENU(state, data) {
      state.dynamicMenuList = data;
    },
    SET_BAR_MENU(state, data) {
      state.barMenuList = data;
    },
  },
  actions: {},
  modules: {},
});
