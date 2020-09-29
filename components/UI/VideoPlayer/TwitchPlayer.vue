<template>
  <div class="twitch-container" :class="isPlayingMini ? 'miniPlayer' : ''">
    <div v-if="video.source !== 'twitch_clip'" id="twitchPlayer" />
    <iframe
      v-else
      :src="source"
      :height="height"
      :width="width"
      frameborder="0"
      scrolling="no"
      allowfullscreen
    />
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

<script src= "https://player.twitch.tv/js/embed/v1.js"></script>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TwitchPlayer',

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

  data () {
    return {
      player: null
    }
  },

  computed: {
    ...mapGetters({
      isPlayingMini: 'videoPlayer/isPlayingMini',
      isScrolling: 'isScrolling'
    }),

    source () {
      return `${this.video.link}&parent=${this.$config.domain}`
    }
  },

  watch: {
    isScrolling (value) {
      if (value) {
        this.handleScroll()
      }
    },
  },

  beforeMount () {
    window.addEventListener('scroll', this.handleScroll, false)
  },

  mounted () {
    if (this.video.source !== 'twitch_clip') {
      this.initTwitch()
      this.$nextTick(() => {
        window.setInterval(async () => {
          if (this.player) {
            const curTime = this.player.getCurrentTime()
            const duration = this.player.getDuration()
            this.$emit('updateTimer', { curTime, duration })
          }
        }, 1000)
      })
    }
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    ...mapActions({
      startMiniPlayer: 'videoPlayer/startMiniPlayer'
    }),

    initTwitch () {
      this.player = new Twitch.Player('twitchPlayer', {
        width: this.width,
        height: this.height,
        video: this.video.id,
        parent: [this.$config.domain]
      })
    },

    handleScroll () {
      if (this.player) {
        const curTime = this.player.getCurrentTime()
        this.startMiniPlayer({ src: this.video, elapsedTime: Math.floor(curTime) })
      } else {
        this.startMiniPlayer({ src: this.video, elapsedTime: 0 })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#twitchPlayer {
  width: 100%;

  iframe {
    width: 100%;
  }
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
  }
}
</style>
