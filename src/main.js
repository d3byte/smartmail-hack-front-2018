import Vue from 'vue'
import VueResource from 'vue-resource'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VueResource)
Vue.use(VueMaterial)

Vue.http.options.root = ''

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
