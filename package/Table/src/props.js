const props = {
  // 获取列表的url
  url: {
    type: String,
    required: true,
    default: ''
  },
  // 边框
  border: {
    type: Boolean,
    default: false
  },
  // 表头数据
  rowHeader: {
    type: Array,
    required: true,
    default: () => ([])
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
  }
}

export default props
