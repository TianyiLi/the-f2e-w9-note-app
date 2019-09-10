import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    darkMode: false
  },
  mutations: {
    modeToggle (state, value: boolean) {
      if (typeof value === 'boolean') {
        state.darkMode = value
      } else {
        state.darkMode = !state.darkMode
      }
    }
  },
  actions: {

  }
})
