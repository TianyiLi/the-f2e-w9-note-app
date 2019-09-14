<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { INote } from '../interface/INote'
import { State, Action, Mutation } from 'vuex-class'
import NoteEditor from '@/components/NoteEditor.vue'
import DarkModeBtn from '@/components/DarkModeBtn.vue'

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
    NoteEditor,
    DarkModeBtn
  },
  provide () {
    const state = createStateProxy(this)
    return {
      state
    }
  }
})
export default class Note extends Vue {
  @Prop() id!: string
  @State('note') notes!: Map<string, INote>
  @State('darkMode') darkMode!: Boolean
  @Action('setNote') setNote!: (note: INote) => void
  @Mutation('noteStarToggle') noteStarToggle!: (id: String) => void
  @Mutation('modeToggle') modeToggle!: (value: boolean) => void

  tmpContent = ''
  contentTracking = 0
  get note () {
    let id = this.contentTracking
    return this.notes.get(this.id)
  }

  editorOnChange (content: string) {
    this.tmpContent = content
  }

  editorOnSave () {
    let note = this.note
    if (note) {
      note.content = this.tmpContent
      this.contentTracking += 1
      this.tmpContent = ''
    }
  }

  starToggle () {
    this.noteStarToggle(this.id)
    this.contentTracking += 1
  }

  backToList () {
    if (this.tmpContent === '') {
      this.$router.push('/')
    } else {
      let _confirm = confirm('目前內容尚未儲存，確定離開？')
      if (_confirm) {
        this.$router.push('/')
      }
    }
  }
}
</script>
<template>
  <div class="note"
    :class="`cover-img-${note.coverClass} ${darkMode ? 'dark-mode' : 'light-mode'}`">
    <div class="note-ctn">
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
        <button class="back-to-list"
          @click="backToList">
          返回列表
        </button>
        <button class="save"
          @click="editorOnSave"
          :disabled="tmpContent === ''">
          儲存進度
        </button>
      </div>
      <note-editor :content="note.content"
        :title="note.title"
        @star="starToggle"
        :isStar="note.star"
        @change="editorOnChange"></note-editor>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.note
  width 100%
  height 100%
  &.dark-mode
    background-color #22222d
    &:before
      background-image unset !important
      background #34343e
    .note-ctn
      .head-nav
        .user-wrap
          color #fff
        .search-wrap
          border-color #fff
          input, i
            color #fff
      .function-wrap
        button
          color #fff
          background-color #454558
          &.save
            color #000
            background-color #fff
  &:before
    background-size cover
    background-position center
    position absolute
    top 0
    left 0
    content ''
    width 100%
    height 640px
    opacity 0.5
    overflow hidden
  &.cover-img-first:before
    background-image url('../assets/cover/first.jpg')
  &.cover-img-second:before
    background-image url('../assets/cover/second.jpg')
  &.cover-img-third:before
    background-image url('../assets/cover/third.jpg')
  &.cover-img-forth:before
    background-image url('../assets/cover/forth.jpg')
  &.cover-img-fifth:before
    background-image url('../assets/cover/fifth.jpg')
  .note-ctn
    padding-top 23px
    width 868px
    margin 0 auto
    position relative
    .head-nav
      display flex
      justify-content space-between
      align-items center
      box-sizing border-box
      padding 0 12px
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
      justify-content space-between
      align-items center
      margin-top 30px
      padding 0 12px
      box-sizing border-box
      margin-bottom 32px
      button
        width 79px
        height 38px
        border unset
        font-size 12px
        border-radius 5px
        background-color #eee
        cursor pointer
        &.save
          background-color #000
          color #fff
</style>
