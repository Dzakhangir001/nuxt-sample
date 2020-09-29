export const state = () => ({
  miniPlayer: {
    status: null,
    content: null
  },
  currentVideo: null,
  currentStream: null,
  videoAnimation: null,
  startAutoplay: false
})

export const getters = {
  miniPlayer (state) {
    return state.miniPlayer
  },

  isPlayingMini (state) {
    return state.miniPlayer.status !== null
  },

  currentVideo (state) {
    return state.currentVideo
  },

  currentStream (state) {
    return state.currentStream
  },

  videoAnimation (state) {
    return state.videoAnimation
  },

  startAutoplay (state) {
    return state.startAutoplay
  }
}

export const mutations = {
  SET_MINI_PLAYER (state, video) {
    state.miniPlayer.content = video
  },

  SET_MINI_PLAYER_STATUS (state, elapsedTime) {
    state.miniPlayer.status = elapsedTime
  },

  INIT_MINI_PLAYER (state) {
    state.miniPlayer.status = null
    state.miniPlayer.content = null
  },

  SET_CUR_VIDEO (state, video) {
    state.currentVideo = video
  },

  SET_CUR_STREAM (state, stream) {
    state.currentStream = stream
  },

  SET_VIDEO_ANIMATION (state, eventData) {
    state.videoAnimation = eventData
  },

  SET_START_AUTOPLAY (state, boolean) {
    state.startAutoplay = boolean
  }
}

export const actions = {
  setCurStream ({ commit }, stream) {
    commit('SET_CUR_STREAM', stream)
  },

  setCurVideo ({ commit }, video) {
    commit('SET_CUR_VIDEO', video)
  },

  startMiniPlayer ({ commit }, { src, elapsedTime }) {
    commit('SET_MINI_PLAYER', src)
    commit('SET_MINI_PLAYER_STATUS', elapsedTime)
  },

  stopMiniPlayer ({ commit }) {
    commit('INIT_MINI_PLAYER')
  },

  async playVideo ({ state, dispatch, commit }, { elId, video }) {
    commit('SET_START_AUTOPLAY', false)
    commit('SET_IS_SCROLLING', false, { root: true })
    if (elId) {
      const videoAnimation = await dispatch('extractEventData', elId)
      videoAnimation.thumbnail = video.thumbnail || video.stream_data.thumbnail_url.replace('{width}', '888').replace('{height}', '500') + '?date=' + Date.now()
      if (!state.isPlaying && !state.isPlayingMini) { commit('SET_VIDEO_ANIMATION', videoAnimation) }
    }
    commit('INIT_MINI_PLAYER')

    let stream = null
    if (video.stream_data) { // todo remove after updated backend and use only currentVideo
      stream = video
      video = null
    }
    commit('SET_CUR_STREAM', stream)
    commit('SET_CUR_VIDEO', video)
  },

  closePlayer ({ commit }) {
    commit('SET_CUR_STREAM', null)
    commit('SET_CUR_VIDEO', null)
    commit('SET_VIDEO_ANIMATION', null)
  },

  extractEventData ({ commit }, elId) { // todo playeranimation getting of coordinates
    return new Promise((resolve, reject) => {
      const element = document.getElementById(elId).getBoundingClientRect()
      resolve({
        x: element.x,
        y: element.y,
        height: element.height,
        width: element.width
      })
    })
  },

  setVideoAnimation ({ commit }, animation) {
    commit('SET_VIDEO_ANIMATION', animation || {})
  },

  setStartAutoplay ({ commit }, boolean) {
    commit('SET_START_AUTOPLAY', boolean)
  }
}
