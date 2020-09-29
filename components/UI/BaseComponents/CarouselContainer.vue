
<template>
  <swiper
    ref="swiperEl"
    class="swiper"
    :options="options"
    :auto-update="true"
    @touchStart="$emit('slideChangeTransitionStart')"
    @touchEnd="$emit('slideChangeTransitionEnd')"
  >
    <slot />
  </swiper>
</template>

<script>
import { Swiper } from 'vue-awesome-swiper'

export default {
  name: 'CarouselContainer',
  components: {
    Swiper
  },
  props: {
    options: {
      type: Object,
      default () {
        return {
          slidesPerView: 3,
          spaceBetween: 5,
          navigation: {
            nextEl: '.featured-arrow-next',
            prevEl: '.featured-arrow-prev'
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
