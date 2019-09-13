<script>
export default {
  props: ['title', 'star', 'cover', 'mode'],
  inject: ['state'],
  data () {
    return {
      isInitial: !!this.title,
      isStar: this.star,
      isEmpty: !this.title
    }
  },
  computed: {
    darkMode () {
      return this.state.darkMode
    }
  }
}
</script>
<template>
  <div class="note-card"
    :class="`cover-img-${cover ? cover : 'none'} ${mode} ${isEmpty ? 'new' : 'exist'} ${darkMode ? 'dark-mode' : 'light-mode'}`">
    <div class="title"
      v-text="title" v-if="!isEmpty"></div>
    <i class="material-icons add" v-if="isEmpty">
      add
    </i>
    <div class="new-title" v-if="isEmpty">新增筆記</div>
    <i class="material-icons-round star"
      v-if="!isEmpty && isStar">star</i>
    <i class="material-icons-round star-border"
      v-if="!isEmpty && !isStar">star_border</i>
  </div>
</template>
<style lang="stylus" scoped>
.note-card
  border-radius 9px
  overflow hidden
  font-family 'Noto Sans TC'
  z-index 0
  cursor pointer
  &.dark-mode
    &.grid
      &.exist
        &:before
          opacity 1
      &.new
        border-color white
        color white
        background rgba(#131313, .5)
    &.row
      color white
      &.new
        border-color white
      &.exist
        background-color #454558
  &.grid
    width 155px
    height 206px
    display flex
    font-size 16px
    position relative
    &.exist
      box-sizing border-box
      padding 12px 16px 14px
      flex-direction column
      align-content flex-start
      justify-content space-between
      box-shadow 0 2px 4px 0 rgba(#000, 0.5)
      .star, .star-border
        font-size 24px
    &.new
      align-items center
      flex-direction column
      justify-content center
      border solid 1px #000
    &:before
      background-size cover
      background-position center
      position absolute
      top 0
      left 0
      content ''
      width 100%
      height 100%
      opacity 0.4
      z-index -1
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
    .add
      font-weight bold
      margin-bottom 2px
  &.row
    width 350px
    height 58px
    display flex
    justify-content space-between
    align-items center
    border-radius 5px
    box-sizing border-box
    padding 20px 23px 18px
    &.new
      flex-direction row-reverse
      border 1px solid #000
      i
        font-weight bold
    &.exist
      box-shadow 0 2px 4px 0 rgba(#000, .16)
      background-color #f4f4f4
  .material-icons
    font-size 35px
</style>
