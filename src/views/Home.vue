<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import { State, Mutation, Getter, Action } from 'vuex-class'
import chunk from 'lodash/chunk'

import DarkModeBtn from '@/components/DarkModeBtn.vue'
import NoteCard from '@/components/NoteCard.vue'
import AddNote from '@/components/NewNote.vue'

import { INoteList, INewNote, INote } from '../interface/INote'

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
  },
  provide () {
    const state = createStateProxy(this)
    return {
      state
    }
  }
})
export default class Home extends Vue {
  isListMode = false
  addNoteIsShow = false

  onlyStarNote = false

  @State('darkMode') darkMode!: Boolean
  @State('note') note!: Map<string, INote>
  @Getter('noteList') noteList!: INoteList[]
  listTracker = 1

  @Mutation('modeToggle') modeToggle!: (value: boolean) => void
  @Mutation('noteStarToggle') noteStarToggle!: (id: String) => void

  get list () {
    let x = this.listTracker
    let list = [...this.note].map(([key, { coverClass, title, id, star }]) => ({ cover: coverClass, title, id, star }))
    console.log(list)
    return chunk(list.filter(n => this.onlyStarNote ? n.star : true), this.isListMode ? 2 : 4)
  }

  openNote (id: string) {
    console.log(id)
    if (id !== '0') {
      this.$router.push('/note/' + id)
    } else {
      this.addNewNote()
    }
  }

  addNewNote () {
    this.addNoteIsShow = true
  }

  newNoteOnConfirm (arg: INewNote) {
    console.log(arg)
  }

  starOnClick (id: string) {
    console.log(id)
    this.noteStarToggle(id)
    this.listTracker += 1
  }
}
</script>
<template>
  <div class="home"
    :class="darkMode ? 'dark-mode' : 'light-mode'">
    <div class="home-ctn">
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
        <DarkModeBtn :darkMode="darkMode"
          @click="modeToggle"></DarkModeBtn>
      </div>
      <div class="function-wrap">
        <button class="star-note"
          @click="onlyStarNote = !onlyStarNote">
          <i class="material-icons-round star">star</i>
          顯示星號筆記</button>
        <i class="material-icons mode"
          @click="isListMode = true"
          :class="isListMode ? 'active' : ''">
          view_list
        </i>
        <i class="material-icons mode"
          @click="isListMode = false"
          :class="isListMode ? '' : 'active'">
          view_module
        </i>
      </div>
      <div class="note-row"
        :class="isListMode ? 'list' : ''"
        v-for="(row, i) in list"
        :key="i">
        <note-card v-for="note in row"
          :key="note.id"
          :title="note.title"
          :cover="note.cover"
          :star="note.star"
          @click.native="openNote(note.id)"
          @star="starOnClick(note.id)"
          :mode="isListMode ? 'row' : 'grid'"></note-card>
      </div>
      <AddNote v-if="addNoteIsShow"
        @close="addNoteIsShow = false"></AddNote>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.home
  width 100%
  height 100%
  &.dark-mode
    background-color #22222D
    .home-ctn
      .user-wrap
        color #fff
      .search-wrap
        border-color #fff
        input, i
          color #fff
      .function-wrap
        .star-note
          background-color #454558
          color white
          i
            color white
        .mode
          color #454558
          &.active
            color white
      .note-row:before
        background #454558
.home-ctn
  padding-top 23px
  width 868px
  margin 0 auto
  .head-nav
    display flex
    justify-content space-between
    align-items center
    box-sizing border-box
    padding 0 68px
    .user-wrap
      font-size 16px
      display flex
      justify-content center
      align-items center
      .user-img
        border-radius 50%
        width 40px
        height 40px
        margin-right 16px
        vertical-align middle
    .search-wrap
      width 223px
      height 40px
      border 1px solid #000
      border-radius 20px
      box-sizing border-box
      display flex
      align-items center
      input
        padding 0
        margin 0
        height 100%
        padding-left 1rem
        background-color transparent
        border unset
        &:focus
          outline unset
      i
        cursor pointer
  .function-wrap
    display flex
    width 100%
    justify-content flex-end
    align-items center
    margin-top 30px
    padding 0 68px
    box-sizing border-box
    margin-bottom 32px
    .star-note
      margin-right auto
      width 128px
      height 38px
      border unset
      font-size 12px
      border-radius 5px
      background-color #eee
      cursor pointer
    i
      vertical-align middle
      cursor pointer
      &.mode
        font-size 30px
        margin-left 17px
        color #eee
        user-select none
      &.active
        color #000
  .note-row
    padding 0 68px
    padding-bottom 32px
    width 868px
    box-sizing border-box
    position relative
    display grid
    grid-template-columns 192px 192px 192px 155px
    margin-bottom 30px
    &.list
      grid-template-columns 381px 350px
      padding-bottom 0
      &:before
        content unset
    &:before
      content ''
      background-image linear-gradient(180deg, #F1F0F0 0%, #F5F5F5 100%)
      transform skew(-30deg)
      position absolute
      bottom 0
      left 0
      width 100%
      height 84px
</style>
