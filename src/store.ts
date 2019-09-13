import Vue from 'vue'
import Vuex from 'vuex'
import { INote } from './interface/INote'

Vue.use(Vuex)

const note: INote[] = []

export default new Vuex.Store({
  state: {
    darkMode: false,
    note
  },
  getters: {
    noteList: state => state.note.map(({ coverClass, title, id, star }) => ({ id, name: title, star, cover: coverClass }))
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
    setNote ({ state }, value: INote) {
      state.note.push(value)
    }
  }
})
