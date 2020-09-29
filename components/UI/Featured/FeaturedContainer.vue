<template>
  <div class="featured-container">
    <div class="glitch-container">
      <h3 class="featured-slider-title glitch-text" :class="{ 'text-glitch-applied': textGlitchApplied }" data-text="Featured">
        Featured
      </h3>
    </div>
    <div class="featured-slider-wrapper">
      <div class="featured-arrow-prev-wrapper">
        <div class="featured-arrow-prev" @click="slidePrev()" />
      </div>
      <div class="featured-arrow-next-wrapper">
        <div class="featured-arrow-next" @click="slideNext()" />
      </div>

      <carousel-container
        ref="featuredSwiper"
        :options="options"
        @slideChangeTransitionStart="textGlitchApplied = true"
        @slideChangeTransitionEnd="textGlitchApplied = false"
      >
        <carousel-element
          v-for="video in featuredVideos"
          :id="`video-${video.id}`"
          :key="video.id"
          @click.native="playVideo({elId: `fid-${video.id}`, video})"
        >
          <div class="featured-slide-wrapper">
            <featured-element
              :class="{ 'youtube-src': video.source === 'youtube_video', 'twitch-src': video.source === 'twitch_clip' }"
              :source="video"
            />
          </div>
        </carousel-element>
      </carousel-container>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FeaturedContainer',

  props: {
    featuredVideos: {
      type: Array,
      required: true
    },
    isMobile: {
      type: Boolean
    }
  },

  data () {
    return {
      videos: [],
      options: {
        slidesPerView: this.isMobile ? 1.2 : 3.05,
        spaceBetween: 7,
        autoHeight: true,
        navigation: {
          nextEl: '.featured-arrow-next',
          prevEl: '.featured-arrow-prev'
        },
        breakpoints: {
          480: {
            slidesPerView: 1.4
          },
          768: {
            slidesPerView: 2
          },
          992: {
            slidesPerView: 3
          },
          1200: {
            slidesPerView: 4
          }
        }
      },
      textGlitchApplied: false
    }
  },

  computed: {
    thumbnailStyle () {
      return {
        width: '100%',
        height: `${this.curModalSize.height + 35}px`,
        marginTop: '-35px',
        background: `url(${this.currentVideo.thumbnail}) no-repeat`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundOrigin: 'border-box'
      }
    }
  },

  methods: {
    ...mapActions({
      playVideo: 'videoPlayer/playVideo'
    }),
    slideNext () {
      this.$refs.featuredSwiper.$refs.swiperEl.$swiper.slideNext()
    },
    slidePrev () {
      this.$refs.featuredSwiper.$refs.swiperEl.$swiper.slidePrev()
    }
  }
}
</script>

<style lang="scss" scoped>
  @media (min-width:768px) {
    .featured-container {
      position: relative;
      background: url('~assets/featured_bg.png');
      background-position: 0 0;
      background-size: 100% 101.6%;
      background-repeat: no-repeat;
      padding-top: 6.85vw;
    }
  }

  .featured-slider-wrapper {
    position: relative;
    padding: 0 7px;
    overflow: auto;
    white-space: nowrap;
  }
.video-player-content {
  color: white;
  animation: fadeIn 3.5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  95% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

  .featured-slider-title {
    text-transform: uppercase;
    color: #fff;
    font-family: BatmanForever;
    font-size: 25px;
    font-weight: normal;
    margin: 0;
    line-height: 1;
    left: -15px;
  }

  @media (min-width:768px) {
    .featured-slider-title {
      display: none;
    }
  }

  .featured-arrow-prev-wrapper {
    width: 120px;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 99;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.77) 0%, rgba(0, 0, 0, 0) 90%);
    display: none;
  }

  @media (min-width:768px) {
    .featured-arrow-prev-wrapper {
      display: block;
    }
  }

  .featured-arrow-prev {
    background: url('~assets/arrow-prev.png');
    background-size: 35px 50px;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    top: 50%;
    left: -5%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    transform: translateY(-40%);
  }

  .featured-arrow-next-wrapper {
    width: 120px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
    background: linear-gradient(270deg, rgba(0, 0, 0, 0.77) 0%, rgba(0, 0, 0, 0) 90%);
    display: none;
  }

  @media (min-width:768px) {
    .featured-arrow-next-wrapper {
      display: block;
    }
  }

  .featured-arrow-next {
    background: url('~assets/arrow-next.png');
    background-size: 35px 50px;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    top: 50%;
    right: 9px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    transform: translateY(-40%);
  }
.featured-slider-wrapper {
  padding: 0 7px;
  overflow: auto;
  white-space: nowrap;
}

.featured-slide-wrapper {
  display: inline-block;
  margin-left: 22px;
  width: 100%;
}

.featured-slide-wrapper:first-child {
  margin-left: 0!important;
}

.featured-slider-title {
  text-transform: uppercase;
  color: #fff;
  font-family: BatmanForever;
  font-size: 25px;
  font-weight: normal;
  margin: 0;
  line-height: 1;
  left: -15px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
