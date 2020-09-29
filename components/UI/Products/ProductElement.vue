<template>
  <div class="product-item mb-3">
    <img v-lazy="product.link" class="img-fluid product-image" alt="Product">
    <h6 class="nopadding text">
      {{ product.title }}
    </h6>
    <small class="text">$ {{ Math.floor(product.price) }}</small>
  </div>
</template>

<script>
export default {
  name: 'ProductElement',
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .product-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 0 0 20px;
    width: 184px;
    height: 252px;
    background-color: #ffffff;
    border-radius: 3px;
    text-align: center;
    font-family: National,serif;
    h6 {
      text-transform: uppercase;
      font-weight: 600;
      font-size: 14px;
      color: #333333;
    }
    h6, small {
      padding: 0 5px;
    }
    small {
      font-size: 18px;
    }
    .product-image {
      width: 166.8px;
      height: 169px;
    }
  }
</style>
