import api from '../api/categories'
import * as types from '../types'

const state = {
  categories: [],
  activeCategory: false
}

// getters
const getters = {
  categories: state => state.categories,
  activeCategory: state => state.activeCategory
}

const actions = {
  getCategories ({ commit, state }) {
    if (localStorage.getItem('categories')) {
      let categories = localStorage.getItem('categories')
      commit(types.UPDATE_CATEGORIES, { categories })
    } else {
      api.getCategories(function (categories) {
        commit(types.UPDATE_CATEGORIES, { categories })
      })
    }
  },

  activeCategory ({ commit, state }, options) {
    let cb = options.cb
    let category = options.id
    commit(types.ACTIVE_CATEGORY, { category })
    if (cb && typeof cb === 'function') {
      cb()
    }
  }
}

const mutations = {
  [types.UPDATE_CATEGORIES] (state, { categories }) {
    state.categories = JSON.parse(categories)
    if (localStorage) {
      localStorage.setItem('categories', JSON.stringify(state.categories))
    }
  },

  [types.ACTIVE_CATEGORY] (state, { category }) {
    state.activeCategory = category
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
