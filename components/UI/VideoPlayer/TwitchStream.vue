<template>
  <div class="twitch-container" :class="isPlayingMini ? 'miniPlayer' : ''">
    <div id="twitchPlayer" />

    <div
      v-if="!isPlayingMini"
      class="twitch-header d-flex p-1 justify-content-between align-items-center bg-white"
    >
      <div class="d-inline-flex p-2 justify-content-between align-items-center">
        <button type="button" class="close" @click="$emit('close')">
          <span class="" aria-hidden="true">
            <img src="~assets/svgs/x-black.svg">
          </span>
        </button>
        <span class="pl-2">Now playing</span>&nbsp;&nbsp;
        <span v-if="stream.stream_data" class="px-2 live">LIVE</span>
      </div>
      <div class="d-inline-flex p-2 justify-content-between">
        <div>
          <span class="by">by </span>
          <span class="name">{{ stream.stream_data.user_name }}</span>
          <img
            v-if="stream.stream_data.user_data && stream.stream_data.user_data.profile_image_url"
            height="35"
            :src="stream.stream_data.user_data.profile_image_url"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script src= "https://player.twitch.tv/js/embed/v1.js"></script>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TwitchStream',

  props: {
    stream: {
      type: Object,
      required: true
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

  data () {
    return {
      player: null
    }
  },

  mounted () {
    this.initTwitch()
  },

  computed: {
    ...mapGetters({
      isPlayingMini: 'videoPlayer/isPlayingMini',
      isScrolling: 'isScrolling'
    }),

    source () {
      return `https://player.twitch.tv/?channel=${this.stream.stream_data.user_name}&parent=${this.$config.domain}`
    }
  },

  watch: {
    isScrolling (value) {
      if (value) {
        this.handleScroll()
      }
    },

    stream (value) {
      this.player.setChannel(value.stream_data.user_name)
    }
  },

  methods: {
    ...mapActions({
      startMiniPlayer: 'videoPlayer/startMiniPlayer'
    }),

    initTwitch () {
      this.player = new Twitch.Player('twitchPlayer', {
        width: this.width,
        height: this.height,
        channel: this.stream.stream_data.user_name,
        parent: [this.$config.domain]
      })
    },

    handleScroll () {
      if (this.player) {
        this.$emit('close')
        const curTime = this.player.getCurrentTime()
        this.startMiniPlayer({ src: this.stream, elapsedTime: Math.floor(curTime) })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  iframe {
    width: 100%;
  }
  .twitch-container {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    background-color: black;
    z-index: 100;
    line-height: 0;

    &.miniPlayer {
      position: static;
    }

    .twitch-header {
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

      .live {
        background: #e4002B;
        display: block;
        color: white;
        border-radius: 2px;
        font-size: 0.8rem;
      }
    }
  }
  .youtube-thumbnail {
    width: 100%;
    height: 100%;
  }
</style>
