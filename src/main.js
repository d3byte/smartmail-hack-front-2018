import Vue from "vue";
import VueResource from "vue-resource";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "moment";

Vue.use(VueResource);
Vue.use(require("vue-moment"), { moment });

Vue.http.options.root = "http://localhost:3000/";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
