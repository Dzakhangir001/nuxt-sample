<template>
  <div>
    <lottie
      v-show="isShowing"
      :options="defaultOptions"
      :height="120"
      :width="320"
      class="footer-menu-animation"
      @animCreated="handleAnimation"
    />
  </div>
</template>

<script>
import lottie from 'vue-lottie/src/lottie.vue'
import * as animationData from '@/assets/animations/footer-menu-animation/MenuWeapons.json'

export default {
  name: 'FooterMenuAnimation',
  components: {
    lottie
  },
  props: {
    animationStage: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      defaultOptions: { animationData: animationData.default },
      animation: null,
      isShowing: false,
      timeout: 700
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll, false)
  },
  mounted () {
    this.stop()
    this.playMenuToTopAnimation()
    this.$router.beforeEach((to, from, next) => {
      this.isShowing = false
      next()
    })
    this.$router.afterEach(() => {
      this.stop()
      this.playMenuToTopAnimation()
    })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleAnimation (anim) {
      this.animation = anim
    },
    stop () {
      this.animation.stop()
    },
    play () {
      this.animation.play()
    },
    pause () {
      this.animation.pause()
    },
    playMenuToTopAnimation () {
      setTimeout(() => {
        this.isShowing = true
        this.animation.setDirection(1)
        this.play()
        setTimeout(() => {
          this.pause()
        }, this.timeout)
      }, this.timeout)
    },
    playMenuToBottomAnimation () {
      setTimeout(() => {
        this.animation.setDirection(-1)
        this.play()
        setTimeout(() => {
          this.isShowing = false
          this.stop()
        }, this.timeout)
      }, this.timeout)
    },
    handleScroll () {
      const st = window.pageYOffset || document.documentElement.scrollTop
      const distance = Math.abs(st - this.lastScrollTop)
      if (distance > 20) {
        if (st > this.lastScrollTop && this.animationStage === 1) {
          this.playMenuToBottomAnimation()
        } else if (st < this.lastScrollTop && this.animationStage === 0) {
          this.playMenuToTopAnimation()
        }
      }
      this.lastScrollTop = st <= 0 ? 0 : st
    }
  }
}
</script>

<style lang="scss" scoped></style>
