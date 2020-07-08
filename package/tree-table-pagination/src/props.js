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
  }
}

export default props
