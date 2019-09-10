<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NewNote extends Vue {

}
</script>
<template>
  <div class="modal-bg">
    <div class="modal">
      <div class="title">新增筆記</div>
      <div class="modal-content">
        <div class="note-name-input">
          <label for="note-name"
            class="note-name">筆記名稱</label>
          <input type="text"
            id="note-name" />
        </div>
        <div class="cover-select-wrap">
          <div class="cover-title">選擇封面</div>
          <div class="cover-select-list">
            <div class="img-ctn" :tabindex="i" v-for="i in 5" :key="i"></div>
          </div>
          <div class="update-wrap">
            或 <button>匯入圖片</button>
            <input type="file"
              class="cover-upload"
              ref="cover-upload"
              name=""
              id="">
          </div>
        </div>
        <div class="modal-footer">
          <button class="confirm">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
input[type="file"]
  display none
.modal-bg
  position fixed
  top 0
  left 0
  width 100vw
  height 100vh
  display flex
  justify-content center
  align-items center
  background-color rgba(black, 0.3)
  .modal
    background-color #fff
    border-radius 5px
    box-sizing border-box
    padding 0 6px
    width 488px
    .title
      padding-left 19px
      margin-top 15px
      padding-bottom 14px
      border-bottom 1px solid #D8D8D8
    .modal-content
      margin-top 22px
      padding 0 19px
      font-size 16px
    .note-name
      margin-right 18px
    #note-name
      width 173px
      height 33px
      background-color #f4f4f4
      border-radius 5px
      border unset
      box-sizing border-box
      padding 0 10px
      &:focus
        box-shadow 0px 0px 5px rgba(#000, 0.4)
        border 1px solid black
        outline none
    .note-name-input
      margin-bottom 29px
    .cover-title
      margin-bottom 14px
    .cover-select-list
      width 100%
      display flex
      justify-content space-between
      margin-bottom 17px
      .img-ctn
        border-radius 5px
        height 72px
        width 72px
        background-color #dedede
        background-size cover
        cursor pointer
        transition .5s
        &:focus
          outline none
          box-shadow 0 0 5px rgba(#000, 0.8)
        &:nth-child(1)
          background-image url('../assets/cover/first.jpg')
        &:nth-child(2)
          background-image url('../assets/cover/second.jpg')
        &:nth-child(3)
          background-image url('../assets/cover/third.jpg')
        &:nth-child(4)
          background-image url('../assets/cover/forth.jpg')
        &:nth-child(5)
          background-image url('../assets/cover/fifth.jpg')
    .update-wrap
      button
        appearance none
        border unset
        font-size 16px
        background-color #dedede
        padding 5px 13px 8px
    .modal-footer
      margin-top 26.5px
      padding-top 13.5px
      text-align right
      border-top 1px solid #D8D8D8
      .confirm
        font-size 16px
        color white
        border unset
        appearance none
        background-color #000
        border-radius 5px
        padding 5px 28px 8px 30px
</style>
