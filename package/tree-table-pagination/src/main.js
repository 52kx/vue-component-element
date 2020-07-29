import Table from '../../Table/src/main.vue'
import props from './props'
import './style/index.css'
const TreeTablePagination = {
  name: 'TreeTablePagination',
  props,
  data () {
    return {
      // tree 接入 table 传入的字段
      thirdParams: {},
      // tree 数据
      treeData: [],
      // 默认展开的的key值
      defaultExpandedKey: null
    }
  },
  computed: {
    // treeProps 添加默认的参数如 method 等
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
     * 加载数据
     */
    getTreeData () {
      const { method, url } = this.getTreeProps
      const { nodeKey } = this.treeProps
      this.$axios[method](url).then(res => {
        const { status, data: { children: { data }, name } } = this.resultTemplate
        if (res[status]) {
          this.treeData = res[name][data]
          this.defaultExpandedKey = res[name][data][0][nodeKey]
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
     * 重组对象
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
    const { thirdParams, treeProps, treeData, tableProps, resultTemplate } = this
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
          type="remote"
          thirdParams={thirdParams}
          resultTemplate={resultTemplate}
          // props={{ ...tableProps }}
          {...this.recombinationObj(tableProps)}
        />
      </div>
    )
  }
}

export default TreeTablePagination
