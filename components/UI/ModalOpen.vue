<template>
  <div id="modal-wrapper">
    <div
      id="modal-container"
      :class="{ 'modal-opened': videoAnimation, 'modal-out': !videoAnimation }"
    >
      <div class="modal-background">
        <transition
          :css="false"
          @before-enter="beforeEnterModal"
          @after-enter="enterOpenModal"
          @before-leave="leaveModal"
        >
          <div v-if="videoAnimation" class="modal">
            <img :src="videoAnimation.thumbnail" style="height: 100%; width: 100%">
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { BREAKPOINT_MOBILE } from '@/utils/constants'

export default {
  name: 'ModalOpen',

  computed: {
    ...mapGetters({
      videoAnimation: 'videoPlayer/videoAnimation'
    })
  },

  methods: {
    ...mapActions({
      setVideoAnimation: 'videoPlayer/setVideoAnimation',
      setStartAutoplay: 'videoPlayer/setStartAutoplay'
    }),

    beforeEnterModal (el) {
      // todo playeranimation check this function, animation part1
      if (window.screen.width < BREAKPOINT_MOBILE) {
        this.beforeEnterMobile(el)
      } else {
        this.beforeEnterDesktop(el)
      }
    },

    beforeEnterMobile (el) {
      el.style.position = 'absolute'
      el.style.display = 'block'
      el.style.width = `${this.videoAnimation.width}px`
      el.style.height = `${this.videoAnimation.height}px`
      el.style.left = `${this.videoAnimation.x}px`
      el.style.top = `${this.videoAnimation.y}px`
      document.getElementById('modal-wrapper').style.display = 'block'
    },

    beforeEnterDesktop (el) {
    },

    enterOpenModal (el) {
      // todo playeranimation check this function, animation part2
      if (window.screen.width < BREAKPOINT_MOBILE) {
        this.enterMobile(el)
      } else {
        this.enterDesktop(el)
      }
    },

    enterMobile (el) {
      const screenWidth = window.screen.width
      const leftAllign = Math.abs(screenWidth - this.videoAnimation.width) / 2
      el.style.width = `${this.videoAnimation.width}px`

      this.$velocity(el, {
        left: `${leftAllign}px`
      }, {
        duration: 400
      })

      this.$velocity(el, {
        width: `${screenWidth}px`,
        translateX: `${-leftAllign}px`
      }, { duration: 400 })

      this.$velocity(el, {
        translateY: `${-this.videoAnimation.y}px`,
        width: `${screenWidth}px`
      }, { duration: 300 })

      this.$velocity(el, {
        opacity: 0
      }, {
        duration: 700,
        complete: () => {
          document.getElementById('modal-wrapper').style.display = 'none'
          this.setVideoAnimation(null)
          this.setStartAutoplay(true)
        }
      })
    },

    enterDesktop (el) {
      this.setStartAutoplay(true)
      this.setVideoAnimation(null)
    },

    leaveModal (el, done) {
      this.$velocity(el, {
        translateY: '500px'
      }, { complete: done })
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

html,body {
  &.modal-active {
    overflow: hidden;
  }
}

#modal-container {
  position: fixed;
  display: table;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  transform: scale(0);
  z-index: 1000;

  &.modal-opened {
    transform:scale(1);

    .modal-background {
      background: rgba(0, 0, 0, 1);
      animation: fadeIn 0.5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;

      .modal {
        background: transparent;
        overflow: hidden;
        width: fit-content;
      }
    }
  }

  &.modal-out {
    transform:scale(0);
    .modal-background {
      animation: fadeOut 0.5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;

      .modal {
        background: transparent;
        height: 100vh;
        overflow: hidden;
        width: fit-content;
      }
    }
  }
  .modal-background {
    display:table-cell;
    background:rgba(0,0,0,.8);
    text-align:center;
    vertical-align:middle;

    .modal {
      display:inline-block;
      font-weight:300;
      position:relative;
      background: transparent;
      height: 100%;
      overflow: hidden;
      width: fit-content;

      h2 {
        font-size:25px;
        line-height:25px;
        margin-bottom:15px;
      }

      p {
        font-size:18px;
        line-height:22px;
      }

      .modal-svg {
        position:absolute;
        top:0;
        left:0;
        height:100%;
        width:100%;

        rect {
          stroke: #fff;
          stroke-width: 2px;
          stroke-dasharray: 778;
          stroke-dashoffset: 778;
        }
      }
    }
  }
}

.content {
  min-height:100%;
  height:100%;
  background:white;
  position:relative;
  z-index:0;

  .buttons {
    width: fit-content;
  }
}

@keyframes fadeOut {
  0% {
    background:rgba(0,0,0,1);
  }
  100% {
    background:rgba(0,0,0,0);
  }
}
</style>
