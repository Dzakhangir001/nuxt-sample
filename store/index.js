export const state = () => ({
  isNavOpen: false,
  isScrolling: false
})

export const mutations = {
  SET_IS_NAV_OPEN (state, boolean) {
    state.isNavOpen = boolean
  },
  SET_IS_SCROLLING (state, boolean) {
    state.isScrolling = boolean
  },
  TOGGLE_NAV (state) {
    state.isNavOpen = !state.isNavOpen
  }
}

export const actions = {
  setIsNavOpen ({ commit }, boolean) {
    commit('SET_IS_NAV_OPEN', boolean)
  },
  setIsScrolling ({ commit }, boolean) {
    commit('SET_IS_SCROLLING', boolean)
  },
  toggleNav ({ commit }) {
    commit('TOGGLE_NAV')
  }
}

export const getters = {
  isNavOpen (state) {
    return state.isNavOpen
  },

  isScrolling (state) {
    return state.isScrolling
  }
}
