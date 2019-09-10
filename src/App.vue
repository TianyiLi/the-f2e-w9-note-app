<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
    </div>
    <router-view/>
  </div>
</template>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

[class^="cover-img"]
  background-size cover
  background-position center
.cover-img-first
  background-image url('./assets/cover/first.jpg')
.cover-img-second
  background-image url('./assets/cover/second.jpg')
.cover-img-third
  background-image url('./assets/cover/third.jpg')
.cover-img-forth
  background-image url('./assets/cover/forth.jpg')
.cover-img-fifth
  background-image url('./assets/cover/fifth.jpg')

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
