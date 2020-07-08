import Table from '../../Table/src/main.vue'
import props from './props'
import './style/index.css'
const TreeTablePagination = {
  name: 'TreeTablePagination',
  props,
  data () {
    return {
      thirdParams: {},
      treeData: [],
      defaultExpandedKey: null
    }
  },
  computed: {
    getTreeProps () {
      const { treeProps } = this
      const third = {
        method: 'get'
      }
      const resultProps = { ...third, ...treeProps }
      const methodTypes = ['get', 'post']
      if (methodTypes.indexOf(resultProps.method.toLowerCase()) === -1) {
        throw new Error(`Invalid type of ${resultProps.method}, please set one of get or post`)
      }
      return resultProps
    }
  },
  created () {
    // 获取树数据
    this.getTreeData()
  },
  methods: {
    /**
     * 重新加载表格数据
     */
    reload () {
      this.$refs.fttable.reload()
    },
    /**
     * 加载tree
     */
    getTreeData () {
      const { method, url } = this.getTreeProps
      const { nodeKey } = this.treeProps
      this.$axios[method](url).then(res => {
        if (res.success) {
          // TODO: need optimization
          this.treeData = res.result.list
          this.defaultExpandedKey = res.result.list[0][nodeKey]
          this.$nextTick(() => {
            this.$refs.eltree.setCurrentKey(this.defaultExpandedKey)
            this.thirdParams = {
              [nodeKey]: this.defaultExpandedKey
            }
          })
        }
      })
    },
    /**
     * 点击树节点触发
     * @param {*} data
     */
    handleNodeClick (data) {
      const { nodeKey } = this.treeProps
      this.thirdParams = {
        [nodeKey]: data[nodeKey]
      }
    },
    /**
     * 转换驼峰命名 nodeName => node-name
     * @param {*} arg
     */
    switchCamelCase (arg) {
      const reg = /(?=(?!^)[A-Z])/g
      return arg.replace(reg, '-').toLowerCase()
    },
    /**
     * 获取对象中的函数
     * @param {*} obj
     */
    recombinationObj (obj) {
      const res = {
        props: {},
        on: {}
      }
      for (const key in obj) {
        if (typeof obj[key] === 'function') {
          if (key.indexOf('-') !== -1) {
            res.on[key] = obj[key]
          } else {
            res.on[this.switchCamelCase(key)] = obj[key]
          }
        } else {
          res.props[key] = obj[key]
        }
      }
      return res
    }
  },
  render () {
    const { thirdParams, treeProps, treeData, tableProps } = this
    return (
      <div class="ft_tree_table_pagination">
        <div class="ft_tree">
          <el-tree
            data={treeData}
            highlightCurrent={true}
            ref="eltree"
            defaultExpandedKeys={ treeProps.expandRootParent ? [this.defaultExpandedKey] : undefined}
            on={{ 'node-click': v => this.handleNodeClick(v) }}
            {...this.recombinationObj(treeProps)}
            scopedSlots={{
              default: ({ data }) => {
                return (
                  <div
                    style={{
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowarp',
                      textAlign: 'left'
                    }}
                    title={data.label}
                  >{data.label}</div>
                )
              }
            }}
          />
        </div>
        <Table
          class="table_pagination"
          ref="fttable"
          thirdParams={thirdParams}
          props={{ ...tableProps }}
        />
      </div>
    )
  }
}

export default TreeTablePagination
