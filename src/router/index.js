import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CategorySelector from '@/components/CategorySelector'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CategorySelector',
      component: CategorySelector
    },
    {
      path: '/bardo',
      name: 'Home',
      component: Home
    }
  ]
})
