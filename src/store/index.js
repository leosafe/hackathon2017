import Vue from 'vue'
import Vuex from 'vuex'

import categories from './modules/categories'
import images from './modules/images'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    categories,
    images
  }
})

export default store
