<template>
  <div>
    <virtual-list
      class="list-infinite"
      data-key="id"
      :data-sources="trendingVideos"
      :data-component="TrendingElement"
      :extra-props="{ products }"
      :estimate-size="50"
      :bottom-threshold="500"
      :keeps="step"
      @tobottom="onScrollToBottom"
      @scroll="getOffset"
    >
      <template slot="header">
        <featured-container
          :key="getFeaturedSwiperKey"
          :featured-videos="featuredVideos"
          :is-mobile="mobileView"
        />

        <lazy-broadcasts-container
          :key="getStreamersSwiperKey"
          :streams="streams"
          :is-mobile="mobileView"
        />

        <div class="tr-videos-container">
          <div class="tr-title-container">
            <h3 class="tr-slider-title">
              Trending
            </h3>
          </div>
        </div>
      </template>
    </virtual-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import VirtualList from 'vue-virtual-scroll-list'
import TrendingElement from '@/components/UI/Trending/TrendingElement'

export default {
  name: 'Index',
  components: {
    VirtualList
  },
  data () {
    return {
      featuredVideos: [],
      trendingVideos: [],
      swiperKey: 0,
      mobileView: null,
      products: [],
      bannersList: [],
      TrendingElement,
      skip: 20,
      step: 20,
      streams: []
    }
  },
  computed: {
    getFeaturedSwiperKey () {
      return 'f' + this.swiperKey
    },
    getStreamersSwiperKey () {
      return 's' + this.swiperKey
    }
  },

  watch: {
    mobileView () {
      this.swiperKey++
    }
  },

  beforeCreate () {
    fetch(this.$config.api_url + '/api/faze/homepage')
      .then((res) => {
        return res.json()
      })
      .then((homepage) => {
        this.featuredVideos = homepage.featured_videos
        this.trendingVideos = homepage.faze_feed
        this.products = homepage.products_list
        this.bannersList = homepage.banners_list
      })
    fetch(this.$config.api_url + '/api/faze/faze_twitch_streams')
      .then((res) => {
        return res.json()
      })
      .then((streams) => {
        this.streams = streams
      })
  },
  mounted () {
    this.$nextTick(function () {
      this.onResize()
    })
    window.addEventListener('resize', this.onResize)
  },

  methods: {
    ...mapActions({
      setIsScrolling: 'setIsScrolling'
    }),

    getOffset () {
      this.setIsScrolling(true)
    },

    async getTrendingVideos () {
      return await fetch(this.$config.api_url + '/api/faze/faze_feed?limit=' + this.step + '&skip=' + this.skip)
        .then(res => res.json())
    },

    async onScrollToBottom () {
      this.skip += this.step
      const videos = await this.getTrendingVideos()
      if (videos.length) {
        this.trendingVideos = this.trendingVideos.concat(videos)
      }
    },

    onResize () {
      this.mobileView = window.innerWidth < 768
    }
  }
}
</script>

<style scoped>
  .list-infinite {
    height: 85vh;
    overflow-y: auto;
  }

  .tr-videos-container {
    width: 100%;
    margin: auto;
  }

  .tr-title-container {
    position: relative;
    color: #fff;
    font-weight: 700;
    padding: 42px 0px 12px 20px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .tr-slider-title {
    text-transform: uppercase;
    color: #fff;
    font-family: BatmanForever;
    font-size: 25px;
    font-weight: normal;
    margin: 0;
    line-height: 1;
    left: -15px;
  }

  @font-face {
    font-family: NationalSemiBold;
    src: url(~assets/fonts/National-Semibold.woff2) format("woff2"),
    url(~assets/fonts/National-Semibold.woff) format("woff"),
    url(~assets/fonts/National-Semibold.ttf) format("truetype");
    font-stretch: normal;
  }

  @font-face {
    font-family: NationalLight;
    src: url(~assets/fonts/National-Light.woff2) format("woff2"),
    url(~assets/fonts/National-Light.woff) format("woff"),
    url(~assets/fonts/National-Light.ttf) format("truetype");
    font-stretch: normal;
  }

  @font-face {
    font-family: NationalBook;
    src: url(~assets/fonts/National-Book.woff2) format("woff2"),
    url(~assets/fonts/National-Book.woff) format("woff"),
    url(~assets/fonts/National-Book.ttf) format("truetype");
    font-stretch: normal;
  }

  @font-face {
    font-family: NationalMedium;
    src: url(~assets/fonts/National-Medium.woff2) format("woff2"),
    url(~assets/fonts/National-Medium.woff) format("woff"),
    url(~assets/fonts/National-Medium.ttf) format("truetype");
    font-stretch: normal;
  }

  @font-face {
    font-family: BatmanForever;
    src: url(~assets/fonts/BatmanForeverAlternate.woff2) format("woff2"),
    url(~assets/fonts/BatmanForeverAlternate.woff) format("woff"),
    url(~assets/fonts/BatmanForeverAlternate.ttf) format("truetype");
    font-stretch: normal;
  }
</style>
