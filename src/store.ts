import Vue from 'vue'
import Vuex from 'vuex'
import { INote, INewNote } from './interface/INote'
import { addRule, download } from './Util'

Vue.use(Vuex)

let note: Map<string, INote> = new Map(
  [
    ['0', { id: '0', star: false, title: '', coverClass: '', coverImage: '', content: '' }],
    ['1', { id: '1', star: true, title: '生活雜記', coverClass: 'first', coverImage: '', content: '' }],
    ['2', { id: '2', star: false, title: '美式動態設計', coverClass: 'second', coverImage: '', content: '' }],
    ['3', { id: '3', star: false, title: 'UI / 設計書單', coverClass: 'third', coverImage: '', content: '' }],
    ['4', { id: '4', star: false, title: '前端東西', coverClass: 'forth', coverImage: '', content: '' }],
    ['5', { id: '5', star: true, title: 'Hello world', coverClass: 'fifth', coverImage: '', content: '' }]
  ]
)

function addedCustomClass (imgBase64: string, id: string, coverName: string) {
  let cssRule = {
    'background-image': `url('${imgBase64}')!important`
  }
  let name = `.cover-img-${coverName}-${id}::before`
  console.log(name)
  addRule(name, cssRule)
}

export default new Vuex.Store({
  state: {
    darkMode: false,
    note
  },
  getters: {
    noteList: state => [...state.note].map(([key, { coverClass, title, id, star, coverImage }]) => ({ id, title, star, cover: coverClass, coverImage }))
  },
  mutations: {
    modeToggle (state, value: boolean) {
      if (typeof value === 'boolean') {
        state.darkMode = value
      } else {
        state.darkMode = !state.darkMode
      }
    },
    noteStarToggle (state, id: string) {
      let note = state.note.get(id)
      if (note) {
        note.star = !note.star
        state.note.set(id, note)
      }
    },
    addNewNote (state, payload: INewNote) {
      let id = '' + (state.note.size)
      if (payload.isCustom) {
        addedCustomClass(payload.coverImage, id, payload.cover)
      }
      state.note.set(id, {
        id,
        title: payload.title,
        coverClass: `${payload.cover}-${id}`,
        coverImage: payload.coverImage,
        content: '',
        star: false
      })
    }
  },
  actions: {
    setNote ({ state }, value: INote) {
      state.note.set(value.id, value)
    },
    exportNotes ({ state }) {
      download('note.json', JSON.stringify([...state.note]))
    },
    importNotes ({ state }, value: any) {
      state.note = new Map([...JSON.parse(value)])
        ;[...state.note].forEach(ele => {
          let isCustom = ele[1].coverImage !== ''
          if (isCustom) {
            addedCustomClass(ele[1].coverImage, ele[1].id, ele[1].coverClass)
          }
        })
    }
  }
})
