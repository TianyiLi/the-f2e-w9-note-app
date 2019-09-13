/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import NewNote from '../components/NewNote.vue'
import NoteCard from '../components/NoteCard.vue'
import NoteEditor from '../components/NoteEditor.vue'
import DarkModeBtn from '../components/DarkModeBtn.vue'
const mixin = {
  data () {
    return {
      darkMode: false
    }
  },
  methods: {
    modeChange () {
      this.darkMode = !this.darkMode
    }
  },
  provide () {
    const state = new Proxy({}, {
      get: (target, attr) => {
        if (this[attr]) {
          return this[attr]
        } else {
          return null
        }
      }
    })
    return {
      state
    }
  }
}
storiesOf('Note', module)
  .add('DarkMode button!', () => ({
    components: {
      DarkModeBtn
    },
    data () {
      return {
        isDarkMode: false
      }
    },
    template: '<div style="width: 100%; height: 50px;" :style="isDarkMode ? \'background: #22222D\' : \'\'"><DarkModeBtn :darkMode="isDarkMode" @click="isDarkMode = !isDarkMode"></DarkModeBtn></div>'
  }))
  .add('new note dialog', () => ({
    components: { NewNote },
    template: '<new-note @added="action"></new-note>',
    methods: { action: () => action('clicked') }
  }))
  .add('note card', () => ({
    components: { NoteCard },
    mixins: [mixin],
    template: /* html */`
      <div :style="darkMode ? 'background-color:#22222D' : ''" style="width: 100%; display: flex; justify-content: space-evenly; padding: 20px; box-sizing: border-box; flex-wrap: wrap">
        <note-card mode="grid"></note-card>
        <note-card :star="true" title="test" cover="first" mode="grid"></note-card>
        <note-card :star="false" title="test" cover="second" mode="grid"></note-card>
        <br/>
        <note-card mode="row"></note-card>
        <note-card :star="true" title="test" mode="row"></note-card>
        <note-card :star="false" title="test" mode="row"></note-card>
        <button @click="modeChange">mode toggle</button>
      </div>
    `
  }))
  .add('note editor with content', () => ({
    components: {
      NoteEditor
    },
    data () {
      return {
        isStar: false
      }
    },
    mixins: [mixin],
    template: /* html */`
      <div>
        <note-editor :content="'hello world'" title="test" @star="starToggle" :isStar="isStar" @change="editorOnChange"></note-editor>
        <button @click="modeChange">mode toggle</button>
      </div>
      `,
    methods: {
      editorOnChange (args) {
        action('editor change')
        console.log(args)
      },
      starToggle (value) {
        this.isStar = value
      }
    }
  }))
  .add('note editor with new content', () => ({
    components: {
      NoteEditor
    },
    data () {
      return {
        isStar: false
      }
    },
    mixins: [mixin],
    template: /* html */`
      <div>
        <note-editor title="test" :isStar="isStar" @change="editorOnChange" @star="starToggle"></note-editor>
        <button @click="modeChange">mode toggle</button>
      </div>
      `,
    methods: {
      editorOnChange (args) {
        action('editor change')
        console.log(args)
      },
      starToggle (value) {
        this.isStar = value
      }
    }
  }))
  // .add('with JSX', () => ({
  //   components: { MyButton },
  //   render () {
  //     return <my-button onClick={this.action}>With JSX</my-button>
  //   },
  //   methods: { action: linkTo('Button', 'with some emoji') }
  // }))
  // .add('with some emoji', () => ({
  //   components: { MyButton },
  //   template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
  //   methods: { action: action('clicked') }
  // }))
