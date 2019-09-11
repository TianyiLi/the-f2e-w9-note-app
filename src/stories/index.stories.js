/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import NewNote from '../components/NewNote.vue'
import NoteCard from '../components/NoteCard.vue'
import MyButton from '../components/MyButton.vue'

storiesOf('Note', module)
  .add('new note dialog', () => ({
    components: { NewNote },
    template: '<new-note @added="action"></new-note>',
    methods: { action: action('clicked') }
  }))
  .add('note card', () => ({
    components: { NoteCard },
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
    `,
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
    },
    data () {
      return {
        darkMode: false
      }
    },
    methods: {
      modeChange () {
        this.darkMode = !this.darkMode
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
