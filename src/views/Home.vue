<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import { State, Mutation, Getter } from 'vuex-class'
import chunk from 'lodash/chunk'

import DarkModeBtn from '@/components/DarkModeBtn.vue'
import NoteCard from '@/components/NoteCard.vue'
import AddNote from '@/components/NewNote.vue'

import { INoteList } from '../interface/INote'

function createStateProxy (instance: any) {
  return new Proxy({}, {
    get (target, attr) {
      if (!instance[attr]) {
        return undefined
      } else {
        return instance[attr]
      }
    }
  })
}

@Component({
  components: {
    DarkModeBtn,
    NoteCard,
    AddNote
  }
})
export default class Home extends Vue {
  isListMode = false
  @State('darkMode') darkMode!: Boolean
  @Getter('noteList') noteList!: INoteList[]

  @Provide('state') state = createStateProxy(this)
  @Mutation('modeToggle') modeToggle!: (value: boolean) => void

  get list () {
    return chunk(this.noteList, 4)
  }

  openNote (id: string) {
    this.$router.push('/note/' + id)
  }
}
</script>
<template>
  <div class="home"
    :class="darkMode ? 'dark-mode' : 'light-mode'">
    <div class="head-nav">
      <div class="user-wrap">
        <img src="../assets/rat.jpg"
          alt=""
          class="user-img">
        <div class="user-name">Paul</div>
      </div>
      <div class="search-wrap">
        <input type="text">
        <i class="material-icons">
          search
        </i>
      </div>
      <DarkModeBtn @click="modeToggle"></DarkModeBtn>
    </div>
    <div class="function-wrap">
      <button class="star-note">顯示星號筆記</button>
      <i class="material-icons"
        @click="isListMode = true"
        :class="isListMode ? 'active' : ''">
        view_list
      </i>
      <i class="material-icons"
        @click="isListMode = false"
        :class="isListMode ? '' : 'active'">
        view_module
      </i>
    </div>
    <div class="note-row"
      v-for="(row, i) in list"
      :key="i">
      <note-card :mode="isListMode ? 'row' : 'grid'"></note-card>
      <note-card v-for="note in row"
        :key="note.id"
        :title="note.title"
        :cover="note.cover"
        :star="note.star"
        @click="openNote(note.id)"
        :mode="isListMode ? 'row' : 'grid'"></note-card>
    </div>
  </div>
</template>
