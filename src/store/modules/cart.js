const STORAGE_CART_ITEMS = 'megastore-cart-items';
let storage_items = {};
try {
  storage_items = JSON.parse(localStorage.getItem(STORAGE_CART_ITEMS));
} catch (e) {
  storage_items = {};
}

export default {
  state() {
    return {
      items: storage_items && typeof storage_items === 'object' ? storage_items : {},
    };
  },
  mutations: {
    addToCart(state, item, amount = 1) {
      if (!state.items.hasOwnProperty(item.id)) {
        const new_item = {};
        new_item[item.id] = { ...item, quantity: 0 };
        state.items = Object.assign({}, state.items, new_item);
      }
      state.items[item.id].quantity += amount;
      localStorage.setItem(STORAGE_CART_ITEMS, JSON.stringify(state.items));
    },
    deleteCartItem(state, id, amount = 1) {
      if (!state.items.hasOwnProperty(id)) {
        return;
      }
      state.items[id].quantity -= amount;
      if (state.items[id].quantity <= 0) {
        delete state.items[id];
        state.items = Object.assign({}, state.items);
      }
      localStorage.setItem(STORAGE_CART_ITEMS, JSON.stringify(state.items));
    },
  },
  actions: {},
};
