const props = {
  // 获取列表的url
  url: {
    type: String,
    default: ''
  },
  // 表头数据
  rowHeader: {
    type: Array,
    required: true,
    default: () => ([])
  },
  // 表格的类型，local 本地数据 remote 远程数据
  type: {
    type: String,
    required: true,
    validator: value => {
      const types = ['local', 'remote']
      if (types.includes(value)) {
        return true
      } else {
        throw new Error(`${value} is not match local or remote`)
      }
    }
  },
  // local 传递给表格数据
  data: {
    type: Array,
    default: () => ([])
  },
  paginationConfig: {
    type: Object,
    default: () => ({})
  },
  // 分页 🍁
  showPagination: {
    type: Boolean,
    default: true
  },
  // 分页样式
  paginationLayout: {
    type: String,
    default: 'total, prev, pager, next, jumper, sizes'
  },
  // 每页显示个数的控件选项
  pageSizes: {
    type: Array,
    default: () => {
      return [10, 20, 50, 100]
    }
  },
  // 显示默认操作按钮
  showOriginalOperator: {
    type: Boolean,
    default: false
  },
  // 请求方法
  method: {
    type: String,
    default: 'get',
    validator: value => {
      const methodTypes = ['get', 'post', 'put', 'delete']
      return methodTypes.indexOf(value.toLowerCase()) !== -1
    }
  },
  showAdd: {
    type: Boolean,
    default: true
  },
  // 接口分页参数
  pageIndexKey: {
    type: String,
    default: 'currentPage'
  },
  // 接口分页参数
  pageSizeKey: {
    type: String,
    default: 'pageSize'
  },
  /**
   * 搜索字段
   */
  searchColumns: {
    type: Array,
    default: undefined
  },
  /**
   * 传入第三方参数，参与请求
   */
  thirdParams: {
    type: Object,
    default: () => {}
  },
  /**
   * 定义数据返回字段
   * resultTemplate: {
   *    status: 'success', //请求状态
   *    msg: 'message', // 信息
   *    data: {
   *      name: 'result', // 返回最外层数据的name
   *      children: {
   *        total: 'total',  // 总页数
   *        list: 'list'  // 数据
   *      }
   *    }
   * }
   */
  resultTemplate: {
    type: Object,
    default: () => ({
      status: 'status',
      msg: 'msg',
      data: {
        name: 'result',
        children: {
          data: 'list',
          total: 'total'
        }
      }
    })
  }
}

export default props
