import api from '../api/images'
import * as types from '../types'

const state = {
  imgs: [],
  activeImage: [],
  sugestions: []
}

const getters = {
  imgs: state => state.imgs,
  activeImage: state => state.activeImage,
  sugestions: state => state.sugestions
}

const actions = {
  getImages ({ commit, state }, options) {
    let words = options.words
    let activeCategory = options.activeCategory || 1
    let callback = options.cb
    api.getImages(words, activeCategory, function (images) {
      commit(types.ADD_IMAGES, { images })

      if (callback && typeof callback === 'function') {
        callback(images)
      }
    })
  }
}

const mutations = {
  [types.ADD_IMAGES] (state, { images }) {
    console.log('mutation image')
    if (images.Artefact && images.Artefact.length > 0) {
      if (state.activeImage.length) {
        state.imgs.push(state.activeImage)
      }

      state.activeImage = images.Artefact[0]

      if (images.Artefact.length > 1) {
        images.Artefact.shift()
        state.sugestions = images.Artefact
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
