import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/*bootstarp*/
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/*vue-toasted*/
import Toasted from 'vue-toasted';

Vue.use(BootstrapVue);
Vue.use(Toasted);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
