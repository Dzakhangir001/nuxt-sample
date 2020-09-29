<template>
  <div
    class="youtube-container"
    :class="isPlayingMini ? 'miniPlayer' : ''"
  >
    <youtube
      ref="youtube"
      style="width: 100%"
      :video-id="video.id"
      :width="width"
      :height="height"
      :player-vars="{
        mute: 1,
        autoplay: 1,
        playsinline: 1,
        enablejsapi: 1,
        modestbranding: 1,
        rel: 1,
        color: 'red',
        origin: 'this.$config.domain'
      }"
    />
    <div
      v-if="!isPlayingMini"
      class="youtube-header d-flex p-1 justify-content-between align-items-center bg-white"
    >
      <div class="d-inline-flex p-2 justify-content-between align-items-center">
        <button type="button" class="close" @click="$emit('close')">
          <span class="" aria-hidden="true">
            <img src="~assets/svgs/x-black.svg">
          </span>
        </button>
        <span class="pl-2">Now playing</span>
        <span v-if="video.stream_data" class="pl-2">LIVE</span>
      </div>
      <div class="d-inline-flex p-2 justify-content-between">
        <div>
          <span class="by">by </span>
          <span class="name">{{ video.name }}</span>
          <img v-if="video.avatar" height="35" :src="video.avatar">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'YoutubePlayer',

  props: {
    video: {
      type: Object,
      default: () => {
        return {}
      }
    },
    height: {
      type: Number,
      default: 300
    },
    width: {
      type: Number,
      default: 500
    }
  },

  computed: {
    ...mapGetters({
      isPlayingMini: 'videoPlayer/isPlayingMini',
      startAutoplay: 'videoPlayer/startAutoplay',
      isScrolling: 'isScrolling'
    }),

    player () {
      return this.$refs.youtube.player
    }
  },

  watch: {
    isScrolling (value) {
      if (value) {
        this.handleScroll()
      }
    },

    startAutoplay (value) {
      if (this.player && value) {
        this.player.playVideo()
        this.player.unMute()
      }
    }
  },

  mounted () {
    if (this.player) {
      this.player.playVideo()
      this.player.unMute()
    }
  },

  methods: {
    ...mapActions({
      startMiniPlayer: 'videoPlayer/startMiniPlayer'
    }),

    async handleScroll () {
      if (this.$refs.youtube) {
        const screenWidth = window.screen.width
        const curTime = await this.$refs.youtube.player.getCurrentTime()
        if (screenWidth < 767) {
          this.$emit('close')
        }
        this.startMiniPlayer({ src: this.video, elapsedTime: Math.floor(curTime) })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
iframe {
  width: 100%;
}

.youtube-container {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: black;
  z-index: 100;
  font-family: 'NationalSemiBold';
  line-height: 0;

  &.miniPlayer {
    position: static;
  }

  .youtube-header {
    height: 50px;
    overflow: hidden;
    position: relative;
    top: 0;
    box-shadow: 0 10px 19px 0 rgba(0, 0, 0, 0.25);
    font-family: 'National';

    .name {
      font-family: 'BatmanForever';
      color: #e4002B;
    }
  }
}
.youtube-thumbnail {
  width: 100%;
  height: 100%;
}
</style>
