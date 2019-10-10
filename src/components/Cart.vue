<template>
<div class="container">
    <h2>Корзина</h2>

    <p class="lead text-secondary" v-if="isCartEmpty">Корзина пуста...</p>

    <table class="table table-sm" v-if="!isCartEmpty">
        <thead>
            <tr>
                <th scope="col">Наименование</th>
                <th scope="col">Количество (шт.)</th>
                <th scope="col">Цена (руб./шт.)</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in items" :key="item.id">
                <td>{{item.name}}</td>
                <td>{{item.quantity}}</td>
                <td>{{getRUBPrice(item.price)}}</td>
                <td>
                    <button type="button"
                     class="btn btn-link"
                     v-on:click="deleteItem(item.id)">
                     Удалить
                    </button>
                </td>
            </tr>
            <tr>
              <td colspan="4">
                  Итого <strong>{{getRUBPrice(totalSum)}}</strong>&nbsp;<i class="fa fa-rub"></i>
              </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>

export default {
  name: 'Cart',
  methods: {
    deleteItem(id) {
      this.$store.commit('deleteCartItem', id);
    },
    getRUBPrice(usd_price) {
      return (usd_price * this.usdPrice).toFixed(2);
    },
  },
  computed: {
    items() {
      return this.$store.state.cart.items;
    },
    totalSum() {
      return Object.values(this.items)
        .map(item => item.quantity * item.price)
        .reduce((accum, value) => accum + value, 0)
        .toFixed(2);
    },
    isCartEmpty() {
      return Object.keys(this.items).length === 0;
    },
    usdPrice() {
      return this.$store.state.usd_price;
    },
  },
};
</script>
