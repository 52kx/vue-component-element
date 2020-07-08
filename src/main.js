import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './api/request'
import Table from '../package/Table'
import TreeTablePagination from '../package/tree-table-pagination'
Vue.use(TreeTablePagination, { axios: request })
Vue.use(Table, { axios: request })
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
