<template>
<div class="container mt-4">
    <h2>Товары</h2>

    <div class="alert alert-danger" role="alert" v-if="data_error || names_error">
        {{error_msg}}
    </div>

    <div class="mb-1 lead text-secondary" v-show="!(goods && names)">
        Товары появятся позже...
    </div>

    <div v-if="goods && names">
        <div v-for="(goods, group) in groupedItems" :key="group">
            <h3>{{group}}</h3>
            <div class="card-columns">

                <div class="card mb-3" v-for="(item, id) in goods" :key="id">
                    <div class="card-body">
                        <h5 class="card-title">
                            {{item.name}}
                        </h5>
                        <div class="card-text">
                            <div class="lead font-weight-bolder">
                                <span :class="item.price > item.old_price ? 'text-danger' : (item.price < item.old_price ? 'text-success': '')">
                                    {{(item.price * usdPrice).toFixed(2)}}
                                </span>
                                &nbsp;<i class="fa fa-rub"></i>
                            </div>
                            <button class="btn btn-primary"
                                :disabled="!isGoodForCart(item.id, item.amount)"
                                v-on:click="addToCart(item)">В корзину</button>
                            <br>
                            <small class="text-muted">В наличии <mark>{{item.amount}}</mark> шт.</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import axios from 'axios';

const DATA_UPDATE_TIME = 15000;
const DEFAULT_ERROR_MSG = 'Ошибка загрузки данных';

export default {
  name: 'Catalog',
  data() {
    return {
      names: null,
      goods: null,
      old_prices: {},
      error_msg: '',
      names_error: false,
      data_error: false,
    };
  },
  methods: {
    loadNames() {
      // lal
      const names_js = document.createElement('script');
      names_js.setAttribute('src', '/names.js');
      names_js.onload = () => {
        if (typeof store !== 'undefined') {
          this.names = store;
        }
      };
      window.onerror = () => {
        this.names_error = true;
        this.error_msg = DEFAULT_ERROR_MSG;
      };
      document.head.appendChild(names_js);
    },
    async loadData() {
      try {
        const response = await axios.get('/data.json');
        if (!response.data.Success || response.data.Error) {
          throw new Error(response.data.Error || DEFAULT_ERROR_MSG);
        }
        if (this.goods !== null) {
          this.old_prices = {};
          for (const i in this.goods.Value.Goods) {
            const item = this.goods.Value.Goods[i];
            this.old_prices[item.T] = item.C;
          }
        }
        this.goods = response.data;
        this.data_error = false;
      } catch (e) {
        this.error_msg = e.message;
        this.data_error = true;
      } finally {
        setTimeout(this.loadData, DATA_UPDATE_TIME);
      }
    },
    addToCart(item) {
      this.$store.commit('addToCart', item);
    },
    isGoodForCart(id, amount) {
      const cart_amount = !this.cartItems[id] ? 0 : this.cartItems[id].quantity;
      return amount > 0 && amount - cart_amount > 0;
    },
  },
  computed: {
    groupedItems() {
      const items = {};
      for (const i in this.goods.Value.Goods) {
        try {
          const item = this.goods.Value.Goods[i];
          const group_name = this.names[item.G].G;
          if (!items.hasOwnProperty(group_name)) {
            items[group_name] = [];
          }

          items[group_name].push({
            id: item.T,
            name: this.names[item.G].B[item.T].N,
            amount: item.P,
            price: item.C,
            old_price: this.old_prices[item.T] || item.C,
          });
        } catch (e) {
          continue;
        }
      }
      return items;
    },
    cartItems() {
      return this.$store.state.cart.items;
    },
    usdPrice() {
      return this.$store.state.usd_price;
    },
  },
  created() {
    this.loadNames();
    this.loadData();
  },
};

</script>
