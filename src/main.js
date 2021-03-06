import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from './vant-ui.config'
import 'amfe-flexible'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
Vue.use(vant)
Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
