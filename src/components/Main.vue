<template>
<div>
    <Cart/>
    <CurrencyManager/>

    <Catalog/>

</div>
</template>

<script>
import Cart from '@/components/Cart.vue';
import CurrencyManager from '@/components/CurrencyManager.vue';
import Catalog from '@/components/Catalog.vue';

export default {
  name: 'Main',
  components: {
    Cart,
    CurrencyManager,
    Catalog,
  },
};
</script>
