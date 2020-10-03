import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import user from './modules/user';
import board from './modules/board';

Vue.use(Vuex);

const vuexPersist = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
    user: state.user,
  }),
});

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    user,
    board,
  },
  strict: debug,
  plugins: [vuexPersist.plugin],
});
