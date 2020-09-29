<template>
  <div class="product-container">
    <h3 class="product-title">
      Warehouse
    </h3>
    <div class="featured-slider-wrapper">
      <carousel-container
        :options="options"
      >
        <carousel-element
          v-for="product in products"
          :key="product.id"
        >
          <div class="featured-slide-wrapper">
            <product-element :product="product" />
          </div>
        </carousel-element>
      </carousel-container>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsContainer',
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      options: {
        slidesPerView: 1.9,
        spaceBetween: 0,
        autoHeight: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product-container {
  margin: 30px 0 20px;
  padding: 10px 0;
  background: url("~assets/PatternGrey.png") no-repeat;
  background-size: 100% 100%;
}

.product-title {
  text-transform: uppercase;
  color: #fff;
  font-family: BatmanForever, serif;
  font-size: 27px;
  font-weight: normal;
  margin: 0;
  line-height: 1;
  left: -15px;
  padding: 28px 0 20px 20px;
}
</style>
