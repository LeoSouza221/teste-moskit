import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userLogged: false,
    user: {},
  },

  mutations: {
    saveUser(state, user) {
      state.user = user;
    },

    clearUser(state) {
      state.user = {};
    },

    changeLoginStatus(state, status) {
      state.userLogged = status;
    },
  },

  actions: {
    saveCurrentUser: ({ commit }, user) => new Promise((resolve) => {
      localStorage.setItem('user', JSON.stringify(user));
      commit('saveUser', user);
      commit('changeLoginStatus', true);

      resolve();
    }),

    clearCurrentUser: ({ commit }) => new Promise((resolve) => {
      localStorage.removeItem('user');
      commit('clearUser');
      commit('changeLoginStatus', false);

      resolve();
    }),
  },
})

export default store;
