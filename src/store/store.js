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

    changeLoginStatus(state, status) {
      state.userLogged = status;
    },
  },

  actions: {
    saveCurrentUser: ({ commit }, user) => new Promise((resolve) => {
      commit('saveUser', user);
      commit('changeLoginStatus', true);

      resolve();
    }),
  },
})

export default store;
