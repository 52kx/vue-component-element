import Table from './src/main.vue'

const install = function (Vue, opts = {}) {
  Vue.component(Table.name, Table)
  opts.axios = require('axios')
  opts.axios.interceptors.response.use(
    response => {
      return JSON.parse(JSON.stringify(response.data))
    },
    error => {
      return Promise.reject(error.response)
    }
  )
  Vue.prototype.$axios = opts.axios
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
};

export default {
  install,
  Table
}
