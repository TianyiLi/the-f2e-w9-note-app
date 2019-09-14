import Vue from 'vue'
import Vuex from 'vuex'
import { INote } from './interface/INote'

Vue.use(Vuex)

let note: Map<string, INote> = new Map(
  [
    ['0', { id: '0', star: false, title: '', coverClass: '', coverImage: '', content: '' }],
    ['1', { id: '1', star: true, title: 'Hello world1', coverClass: 'first', coverImage: '', content: '' }],
    ['2', { id: '2', star: false, title: 'Hello world2', coverClass: 'second', coverImage: '', content: '' }],
    ['3', { id: '3', star: false, title: 'Hello world3', coverClass: 'third', coverImage: '', content: '' }],
    ['4', { id: '4', star: false, title: 'Hello world4', coverClass: 'forth', coverImage: '', content: '' }],
    ['5', { id: '5', star: true, title: 'Hello world5', coverClass: 'fifth', coverImage: '', content: '' }]
  ]
)

export default new Vuex.Store({
  state: {
    darkMode: false,
    note,
    x: 1
  },
  getters: {
    noteList: state => [...state.note].map(([key, { coverClass, title, id, star }]) => ({ id, title, star, cover: coverClass }))
  },
  mutations: {
    modeToggle (state, value: boolean) {
      if (typeof value === 'boolean') {
        state.darkMode = value
      } else {
        state.darkMode = !state.darkMode
        console.log(state.darkMode)
      }
    },
    noteStarToggle (state, id: string) {
      let note = state.note.get(id)
      if (note) {
        note.star = !note.star
        state.note.set(id, note)
        state.x += 1
      }
    }
  },
  actions: {
    setNote ({ state }, value: INote) {
      state.note.set(value.id, value)
    }
  }
})
