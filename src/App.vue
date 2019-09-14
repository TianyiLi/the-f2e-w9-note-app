<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="stylus">
html, body
  margin 0
  padding 0
  width 100%
  height 100%
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  position absolute
  top 0
  left 0
  width 100%
  height 100%

[class^="cover-img"]
  background-size cover
  background-position center
// .cover-img-first
//   background-image url('./assets/cover/first.jpg')
// .cover-img-second
//   background-image url('./assets/cover/second.jpg')
// .cover-img-third
//   background-image url('./assets/cover/third.jpg')
// .cover-img-forth
//   background-image url('./assets/cover/forth.jpg')
// .cover-img-fifth
//   background-image url('./assets/cover/fifth.jpg')
</style>
