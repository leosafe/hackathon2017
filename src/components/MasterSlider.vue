<template>
<div class="master_slider">
  <div v-if="!activeImage.length" class="master_slider__intro">
    <Logo></Logo>
    <div class="master_slider__pulse">
      <span class="master_slider__mic"></span>
      <h3 class="master_slider__intro-title">AQUI COMEÇA A SUA HISTORIA</h3>
      <button @click="$parent.startButton()" class="master_slider__intro-play" v-bind:class="{ 'master_slider__intro-play--playing' : $parent.recognizing}">Play</button>
    </div>
  </div>

  <div v-else class="master_slider__main" :style="'background-image: url(' + activeImage + ')'">
    <button class="master_slider__start_button" v-bind:class="{ 'master_slider__start_button--recording' : $parent.recognizing}" @click="$parent.startButton"></button>
    <span v-if="phrase" class="master-slider__phrase">{{phrase}}</span>
    <span class="master-slider__phraseAux">{{phraseAux}}</span>
  </div>
</div>
</template>

<script>
// import { mapGetters } from 'vuex'
import Logo from './Logo'

export default {
  name: 'CategorySelector',
  props: ['activeImage', 'phrase', 'phraseAux', 'activeCategory'],
  components: {
    Logo: Logo
  },
  data: function () {
    return {
      categories: [{'Id': 1, 'Name': 'Kids', 'Url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpvTlTiSevsIXfVD6D8qJWUR1HH1NV3AhOq4zJZFnzCJrZNbnY'}, {'Id': 2, 'Name': 'Professional', 'Url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6bQsrCFouXso0mWG2ZITjGtiDr89x2xsjNrXMzPZucMZW_jYt'}, {'Id': 3, 'Name': 'Terror', 'Url': 'https://i.ytimg.com/vi/g1xPV3N1_Bc/maxresdefault.jpg'}, {'Id': 4, 'Name': 'Love', 'Url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsFXRa2NDcHWyB1AORNbJjMeoMCJYq2C1zKiKFa4gkhPnvxsLh'}]
    }
  },
  created () {
    if (!this.activeCategory) {
      this.$router.push('/')
    }
  },
  mounted () {
    console.log('mounted')
    // this.$store.dispatch('getCategories')
  },
  methods: {
    selected: function (ID) {
      let self = this
      let callback = function () {
        self.$router.push('bardo')
      }

      this.$store.dispatch('activeCategory', {id: ID, cb: callback})
    }
  }
}
</script>

<style lang='sass'>
  @import './src/style/_master-slider.scss';
</style>