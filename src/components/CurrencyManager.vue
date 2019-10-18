<template>
<div class="container">
    <div class="row ml-1 mb-2">
        <form class="form-inline">
            <label for="usd_rate" class="my-1 mr-2">Курс USD/RUB</label>
            <input
                type="text"
                id="usd_rate"
                :class="['form-control my-1 mr-sm-2', usd_price_error ? 'is-invalid': '']"
                v-model="usd_price_raw">
            <button type="submit" class="btn btn-warning my-1" v-on:click.prevent="changeRate">
                Изменить курс доллара
                <i class="fa fa-magic"></i>
            </button>

            <div v-show="usd_price_error" class="invalid-feedback">
                Неверный формат валюты.<br>
                Помните, что курс доллара не может быть меньше 20 и больше 80 (ахаха) рублей за ед.
            </div>
        </form>
    </div>
</div>

</template>

<script>

export default {
  name: 'CurrencyManager',
  data() {
    return {
      usd_price_raw: null,
      usd_price_error: false,
    };
  },
  computed: {
    usdPrice() {
      return this.$store.state.usd_price;
    },
  },
  methods: {
    changeRate() {
      const value = parseFloat(this.usd_price_raw);
      this.usd_price_error = Number.isNaN(value)
        || value < 20
        || value > 80;
      if (this.usd_price_error) {
        return;
      }
      this.usd_price_raw = value.toFixed(2);
      this.$store.commit('changeUSDPrice', this.usd_price_raw);
    },
  },
  created() {
    this.usd_price_raw = this.usdPrice;
  },
};
</script>
