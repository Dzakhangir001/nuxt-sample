<template>
  <div class="fazeMobileMenu">
    <transition name="tr-backdrop">
      <div v-if="isNavOpen" class="sidebar-backdrop" />
    </transition>
    <transition name="tr-backdropTop">
      <div v-if="isNavOpen" class="sidebar-backdrop-top">
        <div class="sidebar-backdrop-overlay-top" />
      </div>
    </transition>
    <transition name="tr-backdropContent">
      <div v-if="isNavOpen" ref="sidebarPanel" class="sidebar-panel">
        <div class="navigationWheel-wrapper">
          <carousel-container
            :options="navigationOptions"
            class="navigationWheel"
          >
            <carousel-element
              v-for="menuItem in mobileMenuNavigation"
              :key="menuItem.name"
            >
              <div class="menu-item">
                <nuxt-link to="/">
                  {{ menuItem.name }}
                </nuxt-link>
              </div>
            </carousel-element>
          </carousel-container>
        </div>
        <div class="navigationWheel-brackets">
          <div class="bracket-top" />
          <div class="bracket-bottom" />
        </div>
      </div>
    </transition>
    <transition name="tr-backdropBottom">
      <div v-if="isNavOpen" class="sidebar-backdrop-bottom">
        <div class="sidebar-backdrop-overlay-bottom" />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FazeMenu',

  data () {
    return {
      navigationOptions: {
        breakpoints: {
          361: {
            slidesPerView: 7
          },
          413: {
            slidesPerView: 9
          }
        },
        centerInsufficientSlides: true,
        centeredSlides: true,
        direction: 'vertical',
        freeMode: true,
        freeModeMinimumVelocity: 0.001,
        freeModeMomentumBounceRatio: 0.001,
        freeModeMomentumRatio: 0.001,
        freeModeMomentumBounce: false,
        freeModeSticky: true,
        initialSlide: 4,
        slideToClickedSlide: true,
        slidesPerView: 5
      },
      mobileMenuNavigation: [
        {
          name: 'Legal',
          to: '/'
        },
        {
          name: 'T.O.S',
          to: '/'
        },
        {
          name: 'Contact',
          to: '/'
        },
        {
          name: 'About us',
          to: '/'
        },
        {
          name: 'Teams',
          to: '/'
        },
        {
          name: 'Roster',
          to: '/'
        },
        {
          name: 'Feed',
          to: '/'
        },
        {
          name: 'Shop',
          to: '/'
        },
        {
          name: 'Events',
          to: '/'
        }
      ]
    }
  },

  computed: {
    ...mapGetters(['isNavOpen'])
  }
}
</script>

<style lang="scss" scoped>
// Variables
$primaryColor: #E4002B;
$backDropColor: #111111;
$navigationFont: 'BatmanForeverAlternative', sans-serif;

// Mixins
@mixin navigationAnimation($duration, $animationName) {
  &-enter-active {
    animation: $duration forwards 1 $animationName;
  }
  &-leave-active {
    animation: $duration forwards 1 $animationName reverse;
  }
}

.fazeMobileMenu {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.sidebar {
  &-backdrop {
    background-color: $backDropColor;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100vw;
    height: 100%;
    overflow: hidden;
  }

  &-panel {
    overflow: hidden;
    background-color: transparent;
    position: fixed;
    left: 0;
    top: 0;
    // TODO: Check and fix iOS Safari bottom navigation issue with 100vh
    height: 100%;
    z-index: 999;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-backdrop-top {
    background-image: url(../../assets/navigation/backdrop-top-image.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 0 top;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    transform: translate3d(0,-100px,0);
    width: 100vw;
    height: calc(100vw * 0.875);
  }

  &-backdrop-overlay-top {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 6.15%, $primaryColor 89.7%);
    transform: rotate(-180deg);
    width: 100vw;
    height: 50vh;
    top: 100px;
    position: absolute;
    opacity: 1;
    z-index: 102;
  }

  &-backdrop-bottom {
    background-image: url(../../assets/navigation/backdrop-bottom-image.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 0 bottom;
    position: fixed;
    z-index: 100;
    left: 0;
    bottom: 0;
    transform: translate3d(0,0,0);
    width: 100vw;
    height: calc(100vw * 0.875);
    opacity: 1;
  }

  &-backdrop-overlay-bottom {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 10.15%, $primaryColor 90.7%);
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 25vh;
  }
}

.navigationWheel {
  &-wrapper {
    overflow: 'hidden';
    width: 100%;
    height: 100%;
    padding: 20px 0;
  }

  &.swiper-container {
    height: 100%;
  }

  .swiper-slide {
    perspective: 100px;
    transition: all .2s ease-in-out;

    .menu-item {
      transition: all .2s ease-in-out;
      transform-style: preserve-3d;
      transform: rotateX(45deg) scale(0.7);
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      & a {
        font-family: $navigationFont;
        color: #ffffff;
        font-size: 22px;
        transform: scale(1);
        transition: all .2s ease-in-out;
        opacity: 0.5;
        text-decoration: none;

        &:hover {
          color: #ffffff;
        }

        &:focus, &:active {
          color: #ffffff;
          text-decoration: none;
        }
      }
    }
  }

  .swiper-slide-prev {
    .menu-item {
      transform: rotateX(25deg) scale(1);
    }
  }

  .swiper-slide-active {
    perspective: 0;

    .menu-item {
      transform: rotateX(0);

      a {
        transform: scale(1.55);
        opacity: 1;
        color: #ffffff;
      }
    }
  }

  .swiper-slide-next {
    .menu-item {
      transform: rotateX(-25deg);
    }
  }

  .swiper-slide-next ~ .swiper-slide {
    .menu-item {
      transform: rotateX(-45deg) scale(0.7);
    }
  }

  &-brackets {
    height: 160px;
    position: fixed;
    width: 100%;
    top: 50%;
    transform: translate3d(0, -50%, 0);

    .bracket-top {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate3d(-50%, 20px, 0);
      width: 266px;
      height: 31px;
      background-image: url(../../assets/navigation/bracket-top.svg);
      background-size: contain;
      background-repeat: no-repeat;
    }

    .bracket-bottom {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate3d(-50%, -20px, 0);
      width: 266px;
      height: 31px;
      background-image: url(../../assets/navigation/bracket-bot.svg);
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
}

.tr-backdrop {
  @include navigationAnimation(0.925s, backdrop-animation)
}

.tr-backdropContent {
  @include navigationAnimation(0.975s, backdrop-content-animation)
}

.tr-backdropTop {
  @include navigationAnimation(0.975s, backdrop-top-animation)
}

.tr-backdropBottom {
  @include navigationAnimation(0.975s, backdrop-bottom-animation)
}

@keyframes backdrop-animation {
  0% {
    position: absolute;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    top: 20px;
    left: 20px;
    overflow: clip;
    background-color: $primaryColor;
  }
  25% {
    top: -20px;
    left: -20px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  40% {
    top: -120px;
    left: -120px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  60% {
    background-color: $primaryColor;
  }
  80% {
    background-color: $backDropColor;
  }
  100% {
    width: 280vw;
    height: 280vh;
    top: -50%;
    left: -50%;
  }
}

@keyframes backdrop-content-animation {
  0% {
    opacity: 0;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes backdrop-top-animation {
  0% {
    opacity: 0;
    transform: translate3d(0,-200vh,0);
  }
  50% {
    opacity: 0;
    transform: translate3d(0,-200px,0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0,-100px,0);
  }
}

@keyframes backdrop-bottom-animation {
  0% {
    opacity: 0;
    transform: translate3d(0,200vh,0);
  }
  50% {
    opacity: 0;
    transform: translate3d(0,200px,0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0,0,0);
  }
}

</style>
