<template>
    <div class='history'>
        <p class="history__title">Timeline</p>
        <span class="history__image" v-for="image in images" :style="'background-image: url(' + image + ')'"></span>
    </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'History',
  props: ['images'],
  mounted () {
    console.log('mounted')
  }
}
</script>

<style lang='sass'>
  @import './src/style/_history.scss';
</style>