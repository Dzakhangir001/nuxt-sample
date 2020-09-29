<template>
  <div>
    <modal-open
      class="modal-video-player"
    />

    <transition name="fade" mode="out-in">
      <lazy-youtube-player
        v-if="!isPlayingMini && currentVideo && currentVideo.source === 'youtube_video'"
        :video="currentVideo"
        :height="height"
        :width="width"
        @close="closePlayer()"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <lazy-twitch-player
        v-if="!isPlayingMini && currentVideo && currentVideo.source === 'twitch_clip'"
        :video="currentVideo"
        :height="height"
        :width="width"
        @close="closePlayer()"
      />
    </transition>
    <lazy-twitch-stream
      v-if="currentStream"
      :stream="currentStream"
      :height="height"
      :width="width"
      @close="closePlayer()"
    />
    <transition name="fade" mode="out-in">
      <lazy-mini-player v-if="isPlayingMini" @close="closePlayer()" />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { BREAKPOINT_MOBILE } from '../../utils/constants'

export default {
  name: 'VideoPlayGlobal',

  computed: {
    ...mapGetters({
      isPlayingMini: 'videoPlayer/isPlayingMini',
      currentVideo: 'videoPlayer/currentVideo',
      currentStream: 'videoPlayer/currentStream'
    }),

    width () {
      return window.screen.width
    },

    height () {
      const screenWidth = window.screen.width

      if (screenWidth < BREAKPOINT_MOBILE) {
        return this.width * 9 / 16
      }
      return 400
    }
  },

  methods: {
    ...mapActions({
      closePlayer: 'videoPlayer/closePlayer'
    })
  }
}
</script>

<style lang="scss" scoped>
.modal-video-player {
  display: none;

  @media screen and (max-width: 767px){
    display: block;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .75s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
