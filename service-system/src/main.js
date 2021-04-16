import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from "./router/index";
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(VueRouter)
Vue.use(ViewUI);

window.Message = ViewUI.Message;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
