<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'

@Component
export default class DarkModeBtn extends Vue {
  @Prop() darkMode!: Boolean

  btnOnClick () {
    this.$emit('click')
  }
}
</script>
<template>
  <div class="dark-mode-btn" :class="darkMode ? 'active' : ''" @click="btnOnClick"></div>
</template>
<style lang="stylus" scoped>
.dark-mode-btn
  width 19px
  height 19px
  box-sizing border-box
  background linear-gradient(to right, #fff 50%, #000 50%)
  border-radius 50%
  border 1px solid black
  &.active
    background linear-gradient(to right, transparent 50%, #fff 50%)
    border 1px solid white
</style>
