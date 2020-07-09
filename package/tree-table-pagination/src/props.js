const props = {

  treeProps: {
    type: Object,
    required: true,
    validator: val => {
      const types = ['url']
      const vals = Object.keys(val)
      if (vals.includes(types[0])) {
        return true
      }
      throw new Error('property url is required !')
    }
  },
  tableProps: {
    type: Object,
    default: () => {},
    validator: val => {
      const types = ['url', 'rowHeader']
      const vals = Object.keys(val)
      if (vals.includes(types[0]) && vals.includes(types[1])) {
        return true
      }
      throw new Error('property url and rowHeader is required !')
    }
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
