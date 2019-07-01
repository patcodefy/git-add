import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import Bulma from 'bulma'
import Swal from 'sweetalert'
Vue.prototype.axios = Axios
Vue.use(Bulma)

Vue.prototype.swal = Swal
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
