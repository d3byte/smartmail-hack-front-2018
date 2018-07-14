import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SideMenu from './views/SideMenu.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/side-menu',
      name: 'side-menu',
      component: SideMenu
    }
  ]
})
