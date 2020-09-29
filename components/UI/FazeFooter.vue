<template>
  <div id="faze-footer-placeholder">
    <div id="faze-footer" :class="{ 'footer-animation': footerAnimationFlag }">
      <div class="footer-menu-animation">
        <footer-menu-animation :animation-stage="animationStage" />
      </div>
      <nuxt-link to="/teams" class="footer-item" :class="{'active-footer-item' : $nuxt.$route.path.toLowerCase() === '/teams'}">
        <div class="footer-item-container">
          <IconTeams />
        </div>
        <p class="footer-item-label">
          TEAMS
        </p>
      </nuxt-link>

      <nuxt-link to="/roster" class="footer-item" :class="{'active-footer-item' : $nuxt.$route.path.toLowerCase() === '/roster'}">
        <div class="footer-item-container">
          <IconRoster />
        </div>
        <p class="footer-item-label">
          ROSTER
        </p>
      </nuxt-link>

      <nuxt-link to="/" class="footer-item" :class="{'active-footer-item' : ($nuxt.$route.path === '/' || footerAnimationFlag)}">
        <div class="footer-item-container">
          <IconFazeLogo id="footer-home-btn" />
        </div>
        <p class="footer-item-label">
          FEED
        </p>
      </nuxt-link>

      <a :href="this.$config.shop_url" class="footer-item" target="_blank">
        <div class="footer-item-container">
          <IconShop />
        </div>
        <p class="footer-item-label">
          SHOP
        </p>
      </a>

      <nuxt-link to="/events" class="footer-item" :class="{'active-footer-item' : $nuxt.$route.path.toLowerCase() === '/events'}">
        <div class="footer-item-container">
          <IconEvents />
        </div>
        <p class="footer-item-label">
          EVENTS
        </p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FazeFooter',
  data () {
    return {
      footerAnimationFlag: false,
      animationStage: 0,
      timeout: 700
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll, false)
  },
  mounted () {
    this.playFooterToTopAnimation()
    this.$router.beforeEach((to, from, next) => {
      this.footerAnimationFlag = false
      next()
    })
    this.$router.afterEach(() => {
      this.playFooterToTopAnimation()
    })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    playFooterToTopAnimation () {
      setTimeout(() => {
        this.footerAnimationFlag = true
        this.animationStage = -1
        setTimeout(() => {
          this.animationStage = 1
        }, this.timeout)
      }, this.timeout)
    },
    playFooterToBottomAnimation () {
      setTimeout(() => {
        this.footerAnimationFlag = false
        this.animationStage = -1
        setTimeout(() => {
          this.animationStage = 0
        }, this.timeout)
      }, this.timeout * 2)
    },
    handleScroll () {
      const st = window.pageYOffset || document.documentElement.scrollTop
      const distance = Math.abs(st - this.lastScrollTop)
      if (distance > 20) {
        if (st > this.lastScrollTop && this.animationStage === 1) {
          this.playFooterToBottomAnimation()
        } else if (st < this.lastScrollTop && this.animationStage === 0) {
          this.playFooterToTopAnimation()
        }
      }
      this.lastScrollTop = st <= 0 ? 0 : st
    }
  }
}
</script>

<style lang="scss" scoped>

  #faze-footer-placeholder {
    position: relative;
    height: 60px;
    width: 100%;
  }

  #faze-footer {
    height: 60px;
    display: flex;
    font-family: National,serif;
    position: fixed;
    z-index: 4;
    bottom: 0;
    width: 100%;
    background-image: linear-gradient(to top, #fff 50%, #000 50%);
    -webkit-transition: background-position 0.7s;
    -moz-transition: background-position 0.7s;
    transition: background-position 0.7s;
    background-size: 100% 200%;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .footer-animation {
    background-position: 0 +100%;
  }

  #faze-footer.white-footer {
    background-color: #fff;
  }

  .footer-item {
    display: inline-block;
    flex: 1;
    text-align: center;
    height: 30px;
    line-height: 20px;
  }

  .footer-item:hover {
    text-decoration: none;
  }

  .footer-item-container {
    height: 25px;
  }

  .footer-item-container svg {
    fill: #8a8a8a;
  }

  .footer-item-label {
    color: #8a8a8a;
    font-size: 12px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  #footer-home-btn {
    width: 31px;
    height: 22px;
  }

  #footer-home-btn {
    fill: #fff;
  }

  .white-footer #footer-home-btn {
    fill: #8a8a8a;
  }

  .active-footer-item .footer-item-label {
    color: #e4002b;
  }

  .active-footer-item svg {
    fill: #e4002b!important;
  }

  .footer-menu-animation {
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    margin: auto;
  }

  @media (min-width: 768px) {
    #faze-footer-placeholder {
      display: none!important;
    }
  }
</style>
