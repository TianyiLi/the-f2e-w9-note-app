<script>
export default {
  props: ['title', 'star', 'cover'],
  data () {
    return {
      isInitial: !!this.title,
      isStar: this.star
    }
  }
}
</script>
<template>
  <div class="note-card" :class="'cover-img-' + cover">
    <div class="title" v-text="title"></div>
  </div>
</template>
