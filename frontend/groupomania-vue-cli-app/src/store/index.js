import { createStore } from 'vuex';
import router from '../router';

export default createStore({
  state: {
    userId: localStorage.getItem('user'),
    connectedUser: null,
  },
  getters: {
  },
  mutations: {
    SET_USER_ID(state, userId) {
      state.userId = userId;
    },
    SET_CONNECTED_USER(state, user) {
      state.connectedUser = user;
    },
  },
  actions: {
    logout({ commit }) {
      commit('SET_USER_ID', null);
      commit('SET_CONNECTED_USER', null);
      localStorage.clear();      
      router.push("/")
    },
  },
  modules: {
  }
})
