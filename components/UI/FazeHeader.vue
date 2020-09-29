<template>
  <div id="faze-header">
    <div class="burger" :class="{ 'active' : isNavOpen }" @click="navigationToggle">
      <transition
        :css="false"
        @before-enter="beforeEnterBurgerOpen"
        @enter="enterBurgerOpen"
        @leave="leaveBurgerOpen"
      >
        <img v-if="!isNavOpen" src="../../assets/navigation/mobileNavLogo.svg">
      </transition>
      <transition
        :css="false"
        @before-enter="beforeEnterBurgerHide"
        @enter="enterBurgerHide"
        @leave="leaveBurgerHide"
      >
        <img v-if="isNavOpen" src="../../assets/navigation/mobileNavClose.svg">
      </transition>
    </div>

    <div id="faze-header-logo" class="header-item">
      <nuxt-link to="/">
        <IconFazeLogo />
      </nuxt-link>
    </div>

    <div id="desktop-header-list" class="header-item">
      <nuxt-link to="/" class="header-list-item" :class="{'active-header-item' : $nuxt.$route.path.toLowerCase() === '/'}">
        <div class="header-item-container">
          <IconFazeLogo />
        </div>
        <p class="header-item-label">
          FAZE-FEED
        </p>
      </nuxt-link>

      <nuxt-link to="/roster" class="header-list-item" :class="{'active-header-item' : $nuxt.$route.path.toLowerCase() === '/roster'}">
        <div class="header-item-container">
          <IconTeams />
        </div>
        <p class="header-item-label">
          ROSTER
        </p>
      </nuxt-link>

      <nuxt-link to="/teams" class="header-list-item" :class="{'active-header-item' : $nuxt.$route.path.toLowerCase() === '/teams'}">
        <div class="header-item-container">
          <IconRoster />
        </div>
        <p class="header-item-label">
          TEAMS
        </p>
      </nuxt-link>

      <a :href="this.$config.shop_url" target="_blank" class="header-list-item">
        <div class="header-item-container">
          <IconShop />
        </div>
        <p class="header-item-label">
          SHOP
        </p>
      </a>

      <nuxt-link to="/events" class="header-list-item" :class="{'active-header-item' : $nuxt.$route.path.toLowerCase() === '/events'}">
        <div class="header-item-container">
          <IconEvents />
        </div>
        <p class="header-item-label">
          EVENTS
        </p>
      </nuxt-link>

      <nuxt-link to="/about" class="header-list-item" :class="{'active-header-item' : $nuxt.$route.path.toLowerCase() === '/about'}">
        <div class="header-item-container">
          <IconRoster />
        </div>
        <p class="header-item-label">
          ABOUT
        </p>
      </nuxt-link>
    </div>

    <div class="header-item item-placeholder" />

    <div id="header-faze-hash-container" class="header-item">
      <nuxt-link :to="{ path: '/',hash:'#streamers-wrapper'}">
        <p id="faze-hash">
          #fazeclan
        </p>
      </nuxt-link>
    </div>
    <div id="header-mobile-menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="23" fill="none" viewBox="0 0 50 23">
        <rect width="50" height="23" fill="#E4002B" rx="2" />
        <rect
          width="5"
          height="5"
          x="7"
          y="7"
          fill="#fff"
          rx="2.5"
        />
        <path fill="#fff" d="M17.791 7.932V15h4.392v-1.416h-2.76V7.932h-1.632zm5.649 0V15h1.632V7.932H23.44zm4.416 0h-1.74L28.444 15h1.968l2.328-7.068h-1.704l-1.152 3.816c-.3.972-.384 1.872-.384 1.872h-.048s-.096-.888-.408-1.884l-1.188-3.804zm10.671 5.652H35.42v-1.476h2.736v-1.356H35.42V9.348h3.108V7.932h-4.74V15h4.74v-1.416z" />
      </svg>
    </div>

    <FazeMenu class="sidebar-container" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FazeMenu from './FazeMenu'

export default {
  name: 'FazeHeader',

  components: {
    FazeMenu
  },

  computed: {
    ...mapGetters(['isNavOpen'])
  },

  methods: {
    ...mapActions(['toggleNav']),

    navigationToggle (e) {
      this.toggleNav()
      document.body.classList.toggle('menuOpen')
    },

    beforeEnterBurgerOpen (el) {
      el.style.opacity = 0
      el.style.transformOrigin = 'center'
    },

    enterBurgerOpen (el, done) {
      this.$velocity(el, { opacity: 0 }, { duration: 400 })
      this.$velocity(el, { opacity: 1 }, { complete: done })
    },

    leaveBurgerOpen (el, done) {
      this.$velocity(el, { rotateY: '270deg' }, { duration: 400 })
      this.$velocity(el, { rotateY: '180deg', opacity: 0 }, { complete: done })
    },

    beforeEnterBurgerHide (el) {
      el.style.opacity = 0
      el.style.transformOrigin = 'center'
    },

    enterBurgerHide (el, done) {
      this.$velocity(el, { opacity: 0 }, { duration: 400 })
      this.$velocity(el, { opacity: 1 }, { complete: done })
    },

    leaveBurgerHide (el, done) {
      this.$velocity(el, { rotateY: '270deg' }, { duration: 400 })
      this.$velocity(el, { rotateY: '180deg', opacity: 0 }, { complete: done })
    }
  }
}

</script>

<style lang="scss" scoped>
  #faze-header {
    width: 100%;
    height: 50px;
    background-color: transparent;
    display: flex;
    padding: 12px 20px;
    position: relative;
    z-index: 6;
  }

  @media (min-width: 768px) {
    #faze-header {
      padding-left: 7.35%;
      padding-right: 5.25%;
      height: 100px;
    }
  }

  @media (min-width: 768px) {
    #header-mobile-menu {
      display: none;
    }
  }

  .header-item {
    display: inline-block;
    flex: 1;
    line-height: 31px;
  }

  #desktop-header-list {
    flex: 1;
    text-align: center;
    display: none;
  }

  @media (min-width: 768px) {
    #desktop-header-list {
      display: inline-block;
    }
  }

  .header-list-item {
    display: inline-block;
    margin-left: 1.6%;
    margin-right: 1.6%;
    padding-left: 1.6%;
    padding-right: 1.6%;
    vertical-align: middle;
    padding-top: 5px;
    text-decoration: none;
    border-bottom: 3px solid transparent;
  }

  .header-list-item.active-header-item {
    border-bottom: 3px solid #E4002B;
  }

  .header-item-container svg {
    width: auto;
    height: 24px;
    fill: #fff;
  }

  .active-header-item .header-item-container svg {
    fill: #E4002B;
  }

  #header-mobile-menu {
    text-align: left;
  }

  .header-item-label {
    font-family: CompactaRegular;
    letter-spacing: 2.57143px;
    font-style: normal;
    color: #fff;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 0;
  }

  @media (min-width: 768px) {
    .header-item-label {
      font-size: 18px;
    }
  }

  @media (min-width: 900px) {
    .header-item-label {
      font-size: 24px;
    }
  }

  #header-faze-hash-container {
    text-align: right;
    display: none;
  }

  @media (min-width: 768px) {
    #header-faze-hash-container {
      display: inline-block;
      flex: 0;
    }
  }

  #faze-hash {
    font-family: National;
    font-size: 18px;
    line-height: 76px;
    color: #fff;
    margin: 0;
  }

  #faze-header-logo {
    text-align: center;
    display: none;
  }

  @media (min-width: 768px) {
    #faze-header-logo {
      display: block;
      flex: 0;
      line-height: 76px;
      text-align: left;
    }

    #faze-header-logo svg {
      width: auto;
      height: 46px;
      fill: #ff0000;
      stroke: #fff;
    }
  }

  .active-header-item .header-item-label {
    color: #E4002B;
  }

  @media (min-width: 768px) {
    .item-placeholder {
      display: none;
    }
  }

  .burger {
    color: white;
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1000;
    border-radius: 50%;
    height: 44px;
    width: 44px;
    cursor: pointer;

    @media (min-width: 768px) {
      display: none;
    }

    img {
      position: absolute;
      width: 38px;
      height: 38px;
      top: 3px;
      left: 3px;
    }
  }
</style>
