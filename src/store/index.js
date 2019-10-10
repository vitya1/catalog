import Vue from 'vue';
import Vuex from 'vuex';
import Cart from './modules/cart';

Vue.use(Vuex);

const DEFAULT_USD_PRICE = 64.00;

export default new Vuex.Store({
  modules: {
    cart: Cart,
  },
  state() {
    return {
      usd_price: DEFAULT_USD_PRICE,
    };
  },
  mutations: {
    changeUSDPrice(state, new_price) {
      state.usd_price = new_price;
    },
  },
});
