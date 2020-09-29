<template>
  <div class="miniplayer-container">
    <lazy-twitch-stream
      v-if="miniPlayer.content.stream_data"
      :stream="miniPlayer.content"
      :height="height"
      :width="width"
      @updateTimer="updateProgressTimer(params)"
    />

    <youtube
      v-else-if="miniPlayer.content.source === 'youtube_video'"
      ref="youtube"
      :video-id="miniPlayer.content.id"
      :width="width"
      :height="height"
      :player-vars="playerVars"
    />

    <lazy-twitch-player
      v-else-if="miniPlayer.content.source === 'twitch_clip'"
      :video="miniPlayer.content"
      :width="width"
      :height="height"
      @updateTimer="(params) => updateProgressTimer(params)"
    />

    <div class="miniplayer-action d-flex justify-content-between align-items-center pr-3">
      <radial-progress-bar
        :diameter="38"
        :inner-stroke-width="2"
        :stroke-width="2"
        :completed-steps="completedSteps"
        :total-steps="totalSteps"
        inner-stroke-color="#e5e5e5"
        start-color="#f00"
        stop-color="#f00"
        class="miniplayer-progress-step"
        @click.native="expandPlayer()"
      >
        <img src="~assets/svgs/Union.svg">
      </radial-progress-bar>

      <div class="d-flex p-2 align-items-center justify-content-between">
        <img
          class="video-avatar mr-3"
          :src="miniPlayer.content.source ? miniPlayer.content.avatar : miniPlayer.content.stream_data.user_data.profile_image_url"
        >
        <div class="video-caption">
          <span class="by">by</span>&nbsp;
          <span class="name">{{ miniPlayer.content.stream_data ? miniPlayer.content.user_name : miniPlayer.content.name }}</span>
        </div>
      </div>

      <button type="button" class="close" @click="closeMiniPlayer">
        <span class="text-white" aria-hidden="true">
          <img src="~assets/svgs/x-black.svg">
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import RadialProgressBar from 'vue-radial-progress'
import { BREAKPOINT_MOBILE } from '@/utils/constants'

export default {
  name: 'MiniPlayer',

  components: {
    RadialProgressBar
  },

  data () {
    return {
      playerVarsInit: {
        playsinline: 1,
        enablejsapi: 1,
        autoplay: 1,
        mute: 1,
        color: 'red'
      },
      completedSteps: 0,
      totalSteps: 10
    }
  },

  computed: {
    ...mapGetters({
      miniPlayer: 'videoPlayer/miniPlayer'
    }),

    youtubePlayer () {
      if (
        this.miniPlayer.content &&
        this.miniPlayer.content.source === 'youtube_video' &&
        this.$refs.youtube
      ) {
        return this.$refs.youtube.player
      }
      return null
    },

    width () {
      const screenWidth = window.screen.width
      if (screenWidth > BREAKPOINT_MOBILE) {
        return 426
      }

      return screenWidth / 2
    },

    height () {
      return this.width * 9 / 16
    },

    playerVars () {
      return {
        ...this.playerVarsInit,
        start: this.miniPlayer.status
      }
    }
  },

  async mounted () {
    if (this.youtubePlayer) {
      this.youtubePlayer.playVideo()
      this.youtubePlayer.unMute()
    }
    await this.setTimer()
  },

  methods: {
    ...mapActions({
      stopMiniPlayer: 'videoPlayer/stopMiniPlayer',
      playVideo: 'videoPlayer/playVideo'
    }),

    expandPlayer () {
      this.playVideo({ elId: null, video: this.miniPlayer.content })
    },

    closeMiniPlayer () {
      this.stopMiniPlayer()
      this.$emit('close')
    },

    updateProgressTimer (params) {
      const { curTime, duration } = params
      this.totalSteps = duration
      this.completedSteps = curTime
    },

    async setTimer () {
      if (this.miniPlayer.content.stream_data) {
        this.totalSteps = 1
        this.completedSteps = 1
      } else if (!!this.youtubePlayer && this.miniPlayer.content.source === 'youtube_video') {
        this.totalSteps = await this.youtubePlayer.getDuration() || 0
        this.completedSteps = await this.youtubePlayer.getCurrentTime() || 0

        this.$nextTick(() => {
          window.setInterval(async () => {
            if (this.youtubePlayer) {
              this.completedSteps = await this.youtubePlayer.getCurrentTime() || 0
            }
          }, 1000)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.miniplayer-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 2;
  background: white;
  box-shadow: 0 12.1px 23px 0 rgba(0, 0, 0, 0.25);
  line-height: 0;

  @media screen and (max-width: 767px) {
    top: 0;
    bottom: unset;
    right: 0;
    width: 100%;
    display: flex;

    iframe {
      width: 50%;
    }

    .miniplayer-action {
      width: 50%;
      line-height: 1.5;

      .video-avatar {
        display: none;
      }
    }
  }
}

.miniplayer-progress-step {
  margin-left: -19px;
  background: white;
  border-radius: 50%;
  z-index: 100;
  display: none;

  img {
    width: 12px;
  }

  @media screen and (max-width: 767px) {
    display: block;
  }
}

.video-avatar {
  width: 45px;
  height: 45px;
}

.video-caption {
  span {
    font-family: NationalLight;
    color: black;
  }

  span.name {
    color: red;
    font-family: BatmanForever;
  }
}
</style>
