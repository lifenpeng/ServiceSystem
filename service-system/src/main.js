import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import VueRouter from 'vue-router';
import router from "./router/index";

Vue.use(VueRouter)

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
