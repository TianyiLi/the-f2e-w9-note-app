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
    template: '<note-card :star="true" title="test" cover="first"></note-card>'
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
