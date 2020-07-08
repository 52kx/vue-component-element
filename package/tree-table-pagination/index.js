import TreeTablePagination from './src/main'

// TreeTablePagination.install = function (Vue) {
//   Vue.component(TreeTablePagination.name, TreeTablePagination)
// }

// export default TreeTablePagination

const install = function (Vue, opts = {}) {
  Vue.component(TreeTablePagination.name, TreeTablePagination)
  if (!opts.axios) {
    opts.axios = require('axios')
    opts.axios.interceptors.response.use(
      response => {
        return JSON.parse(JSON.stringify(response.data))
      },
      error => {
        return Promise.reject(error.response)
      }
    )
  }
  Vue.prototype.$axios = opts.axios
}

export default {
  install,
  TreeTablePagination
}
