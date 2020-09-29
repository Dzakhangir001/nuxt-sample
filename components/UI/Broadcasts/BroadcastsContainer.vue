<template>
  <div id="streamers-wrapper" class="streamers-wrapper">
    <div class="streams-title-container">
      <h3 class="streams-slider-title">
        Live Streams
      </h3>
    </div>
    <div class="streamers-container">
      <div class="streamers-arrow-prev-wrapper">
        <div class="streamers-arrow-prev" @click="slideStreamsPrev()" />
      </div>
      <div class="streamers-arrow-next-wrapper">
        <div class="streamers-arrow-next" @click="slideStreamsNext()" />
      </div>

      <carousel-container ref="streamersSwiper" :options="options">
        <carousel-element
          v-for="stream in streams"
          :key="stream.stream_data.id"
          @click.native="playVideo({elId: `bid-${stream.stream_data.id}`, video: stream})"
        >
          <div class="tr-slide-wrapper">
            <broadcast-element class="streamer-element" :stream="stream" />
          </div>
        </carousel-element>
      </carousel-container>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'BroadcastsContainer',
  props: {
    streams: {
      type: Array,
      required: true
    },
    isMobile: {
      type: Boolean
    }
  },
  data () {
    return {
      options: {
        slidesPerView: this.isMobile ? 2.5 : 5.9,
        spaceBetween: 8,
        autoHeight: true,
        navigation: {
          nextEl: '.streamers-arrow-next',
          prevEl: '.streeamers-arrow-prev'
        }
      }
    }
  },
  methods: {
    ...mapActions({
      playVideo: 'videoPlayer/playVideo'
    }),

    slideStreamsNext () {
      this.$refs.streamersSwiper.$refs.swiperEl.$swiper.slideNext()
    },

    slideStreamsPrev () {
      this.$refs.streamersSwiper.$refs.swiperEl.$swiper.slidePrev()
    }
  }
}
</script>

<style scoped>
  .streamers-wrapper {
    overflow: auto;
    white-space: nowrap;
    background: url('~assets/pattern-re-dmain@2x.png');
    background-position: center -15px;
    background-size: cover;
    padding: 0 0 45px 0;
    margin-top: 49px;
    background-color: #000;
  }

  @media (min-width:768px) {
    .streamers-wrapper {
      padding: 0;
      background: unset;
      margin-top: 0;
      padding-top: 32px;
      background-color: #181818;
    }
  }

  @media (min-width:768px) {
    .streamers-container {
      position: relative;
      line-height: 0;
      background: url('~assets/streams_bg.png');
      background-size: 100% auto;
      background-color: #181818;
      padding-top: 8.15vw;
    }
  }

  .streams-title-container {
    position: relative;
    color: #fff;
    font-weight: 700;
    padding: 0px 35px 20px 15px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  @media (min-width:768px) {
    .streams-title-container {
      margin: 0;
      padding: 0;
    }
  }

  .streams-slider-title {
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
    .streams-slider-title {
      display: none;
    }
  }

  .streamer-element {
    display: inline-block;
  }

  .streamer-element {
    margin-left: 10px;
    margin-right: 10px;
  }

  .streamers-arrow-prev-wrapper {
    width: 120px;
    height: 130px;
    position: absolute;
    top: 51.8%;
    z-index: 99;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.77) 0%, rgba(0, 0, 0, 0) 90%);
    display: none;
  }

  @media (min-width:768px) {
    .streamers-arrow-prev-wrapper {
      display: block;
    }
  }

  .streamers-arrow-prev {
    background: url('~assets/arrow-prev.png');
    background-size: 35px 50px;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    top: 50%;
    left: 5px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    transform: translateY(-40%);
  }

  .streamers-arrow-next-wrapper {
    width: 120px;
    height: 130px;
    position: absolute;
    top: 51.8%;
    right: 0;
    z-index: 99;
    background: linear-gradient(270deg, rgba(0, 0, 0, 0.77) 0%, rgba(0, 0, 0, 0) 90%);
    display: none;
  }

  @media (min-width:768px) {
    .streamers-arrow-next-wrapper {
      display: block;
    }
  }

  .streamers-arrow-next {
    background: url('~assets/arrow-next.png');
    background-size: 35px 50px;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    top: 50%;
    right: 5px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    transform: translateY(-40%);
  }
</style>
