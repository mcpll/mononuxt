import Vuex from 'vuex'
import api from '../api/index'

const Store = () => new Vuex.Store({
  state: {
    menuItems: {}
  },
  mutations: {
    setMenuItems (state, data) {
      state.menuItems = data
    }
  },
  actions: {
    async nuxtServerInit ({ commit }) {
      const menuItems = await api.getMenu(2)
      commit('setMenuItems', menuItems)
    }
  }
})

export default Store
