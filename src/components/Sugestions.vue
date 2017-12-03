<template>
    <div class='sugestions'>
        <img class="sugestions-image" v-for="image in images" :src="image">
    </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'Sugestions',
  props: ['images'],
  mounted () {
    console.log('mounted')
  }
}
</script>

<style lang='sass'>
  @import './src/style/_sugestions.scss';
</style>