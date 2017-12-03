<template>
    <div class='category-selector'>
      <Logo></Logo>
      <h2 class="category-selector__title">Qual história contaremos hoje ?</h2>
      <ul class="category-selector__list">
        <li class="category-selector__item"  v-for="category in categories"  @click="selected(category.Id)" :style="'background-image: url(' + category.Url + ')'" :data-id="category.Id">
          <p>{{category.Name}}</p>
        </li>
      </ul>
      <ul class="category-selector__list category-selector__list--mirror">
        <li class="category-selector__item"  v-for="category in categories"  @click="selected(category.Id)" :style="'background-image: url(' + category.Url + ')'" :data-id="category.Id">
        </li>
      </ul>
      <span class="category-selector-firula category-selector-firula--1"></span>
      <span class="category-selector-firula category-selector-firula--2"></span>
      <span class="category-selector-firula category-selector-firula--3"></span>
      <span class="category-selector-firula category-selector-firula--4"></span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'

export default {
  name: 'CategorySelector',
  computed: mapGetters([
    'categories'
  ]),
  components: {
    Logo: Logo
  },
  mounted () {
    this.$store.dispatch('getCategories')
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
  @import './src/style/_category-selector.scss';
</style>