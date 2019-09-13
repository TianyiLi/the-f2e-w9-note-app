<script>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Editor, EditorContent, EditorMenuBubble } from 'tiptap'
import {
  Blockquote,
  BulletList,
  CodeBlock,
  HardBreak,
  Heading,
  ListItem,
  OrderedList,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Image,
  Strike,
  Underline,
  History,
  Placeholder
} from 'tiptap-extensions'

export default {
  inject: ['state'],
  props: ['title', 'isStar', 'content'],
  components: {
    EditorContent,
    EditorMenuBubble
  },
  data () {
    return {
      keepInBounds: true,
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
          new Placeholder({
            emptyNodeClass: 'is-empty',
            emptyNodeText: 'Write something …',
            showOnlyWhenEditable: true
          })
        ],
        content: this.content
      }),
      linkUrl: null,
      linkMenuIsActive: false
    }
  },
  mounted () {
    this.editor.on('update', this.editorOnUpdate)
  },
  computed: {
    darkMode () {
      return this.state.darkMode
    }
  },
  methods: {
    editorOnUpdate (instance) {
      this.$emit('change', instance.getHTML())
    },
    showImagePrompt (command) {
      console.log(this.editor)
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
      }
    },
    showLinkMenu (attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
      this.$forceUpdate()
    },
    hideLinkMenu () {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl (command, url) {
      command({ href: url })
      this.hideLinkMenu()
    },
    starOnClick (value) {
      this.$emit('star', value)
    }
  },
  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>
<template>
  <div class="note-editor"
    :class="darkMode ? 'dark-mode' : 'light-mode'">
    <div class="title-wrap">
      <h2 class="title">{{title}}</h2>
      <i class="material-icons-round star"
        v-if="isStar" @click="starOnClick(false)">star</i>
      <i class="material-icons-round star-border"
        v-if="!isStar" @click="starOnClick(true)">star_border</i>
    </div>
    <div class="hr"></div>
    <editor-menu-bubble :editor="editor"
      :keep-in-bounds="keepInBounds"
      v-slot="{ commands, isActive, menu, getMarkAttrs }">
      <div class="menububble"
        :class="{ 'is-active': menu.isActive, 'dark-mode': darkMode }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`">
        <form class="menububble__form"
          v-if="linkMenuIsActive"
          @submit.prevent="setLinkUrl(commands.link, linkUrl)">
          <input class="menububble__input"
            type="text"
            v-model="linkUrl"
            placeholder="https://"
            ref="linkInput"
            @keydown.esc="hideLinkMenu" />
          <button class="menububble__button"
            @click="setLinkUrl(commands.link, null)"
            type="button">
            <i class="material-icons-outlined">
              cancel
            </i>
          </button>
        </form>
        <template v-else>
          <button class="menububble__button"
            @click="showLinkMenu(getMarkAttrs('link'))"
            :title="isActive.link() ? 'Update Link' : 'Add Link'"
            :class="{ 'is-active': isActive.link() }">
            <i class="material-icons">
              link
            </i>
          </button>
          <span>
            |
          </span>
          <button class="menububble__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold">
            <i class="material-icons">
              format_bold
            </i>
          </button>
          <button class="menububble__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic">
            <i class="material-icons">
              format_italic
            </i>
          </button>
          <button class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline">
            <i class="material-icons">
              format_underlined
            </i>
          </button>
          <span>
            |
          </span>
          <button class="menububble__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code">
            <i class="material-icons">
              code
            </i>
          </button>
          <button class="menububble__button"
            @click="showImagePrompt(commands.image)">
            <i class="material-icons">
              insert_photo
            </i>
          </button>
          <button class="menubar__button"
            @click="commands.undo">
            <i class="material-icons">
              undo
            </i>
          </button>

          <button class="menubar__button"
            @click="commands.redo">
            <i class="material-icons">
              redo
            </i>
          </button>
        </template>
      </div>
    </editor-menu-bubble>

    <editor-content class="editor__content"
      :editor="editor" />
  </div>
</template>
<style lang="stylus" scoped>
.note-editor
  width 736px
  margin 0 auto
  position relative
  font-family '微軟正黑體'
  background-color #f8f8f8
  box-shadow 0 2px 4px 0 rgba(#000, 0.16)
  border-radius 5px
  padding 29px 54px 29px
  .title-wrap
    display flex
    justify-content space-between
    align-items center
    margin 0.83em 0
    h2
      margin 0
    i
      cursor pointer
      user-select none
  &.dark-mode
    background-color #1A1A25
    color #fff
    .hr
      border-top 1px solid #28283F
    .menububble
      background-color #454558
  >>> img
    width 100%
  >>> .is-empty:first-child::before
    position absolute
    content attr(data-empty-text)
    float left
    color #aaa
    pointer-events none
    height 0
    font-style italic
  .hr
    border-top 1px solid #e4e4e4
    padding 10px
  .menububble
    position absolute
    transform translateX(-50%) translateY(-10px)
    z-index 20
    padding 0 18px 0 14px
    visibility hidden
    color #3c3c3c
    transition opacity visibility 0.2s
    background-color #000
    border-radius 5px
    box-shadow 0 2px 4px 0 rgba(#000, 0.5)
    display flex
    justify-content flex-start
    align-items center
    height 35px
    >*
      margin-right 17px
      user-select none
      cursor pointer
      &:last-child
        margin-right 0
    .menububble__form
      input
        background-color unset
        border unset
        color #fff
      i
        background-color unset
        color white
    button
      color white
      border none
      background-color unset
      padding 0
      i
        vertical-align middle
    &.is-active
      visibility visible
</style>
