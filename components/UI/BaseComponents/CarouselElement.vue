<template>
  <swiper-slide>
    <slot />
  </swiper-slide>
</template>

<script>
import { SwiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'CarouselElement',
  components: {
    SwiperSlide
  }
}
</script>
