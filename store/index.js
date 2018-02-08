import api from '../api/index'

export const state = () => ({
  menuItems: {},
  locales: ['en', 'it'],
  locale: 'en',
  pageLayouts: null
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  },
  setMenuItems (state, data) {
    state.menuItems = data
  },
  setPageLayout (state, data) {
    state.pageLayouts = data
  }
}

export const actions = {
  async nuxtServerInit ({ commit }) {
    const menuItems = await api.getMenu(2)
    commit('setMenuItems', menuItems)
  }
}

export const getters = {
  pageLayout: state => state.pageLayouts,
  locale: state => state.locale
}
