import request from '@/services/request';
import API from '@/services/api';

const state = () => ({
  user: {
    name: '',
    id: 0,
  },
  loginLoading: false,
  logoutLoading: false,
});

// getters
const getters = {};

// actions
const actions = {
  login({ commit }, userInfo) {
    const { name, password } = userInfo;
    const params = { params: { name, password } };
    commit('SET_LOGIN_LOADING', true);
    return new Promise((resolve, reject) => {
      request(API.userLogin, params).then((res) => {
        const { data } = res;
        commit('SET_USER', data);
        commit('SET_LOGIN_LOADING', false);
        resolve();
      }).catch((error) => {
        commit('SET_LOGIN_LOADING', false);
        reject(error);
      });
    });
  },
  logout({ commit }) {
    commit('SET_LOGOUT_LOADING', true);
    return new Promise((resolve, reject) => {
      request(API.userLogout).then(() => {
        const data = {
          name: '',
          id: 0,
        };
        commit('SET_USER', data);
        commit('SET_LOGOUT_LOADING', false);
        resolve();
      }).catch((error) => {
        commit('SET_LOGOUT_LOADING', false);
        reject(error);
      });
    });
  },
  reset({ commit }) {
    commit('SET_USER', {
      name: '',
      id: 0,
    });
  },
};

// mutations
const mutations = {
  SET_USER: (state, user) => {
    state.user = user;
  },
  SET_LOGIN_LOADING: (state, loading) => {
    state.loginLoading = loading;
  },
  SET_LOGOUT_LOADING: (state, loading) => {
    state.logoutLoading = loading;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
