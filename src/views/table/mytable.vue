<template>
  <div>
    <el-table
      :data="data"
      :border="border"
      v-loading="vLoading"
    >
      <template v-for="(item, index) in headers">
        <el-table-column
          :key="index"
          v-if="item.type === undefined"
          :align="item.align"
          :width="item.width"
          :prop="item.prop"
          :label="item.label"
        >
          <template slot-scope="scope">
            <ex-slot
              v-if="item.render"
              :render="item.render"
              :row="scope.row"
              :index="scope.$index"
              :column="item"
            />
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <!-- 针对 index selection expand 单独渲染 -->
        <el-table-column
          v-else-if="item.type === 'index'"
          :key="index"
          type="index"
          :index="calIndex"
          :align="item.align"
          :width="item.width"
          :label="item.label"
        />
        <el-table-column
          :key="index"
          v-else
          :type="item.type"
          :align="item.align"
          :width="item.width"
          :label="item.label"
        />
      </template>
    </el-table>
    <el-pagination
      v-if="pagination"
      ref="pagination"
      :total="pagination.total"
      :layout="pagination.layout"
      :small="pagination.small"
      :background="pagination.background"
      :page-size="pagination.pageSize"
      :page-sizes="pagination.pageSizes"
      :current-page="pagination.currentPage"
      :prev-text="pagination.prevText"
      :next-text="pagination.nextText"
      :hide-on-single-page="pagination.hideOnSinglePage"
      :disabled="pagination.disabled"
      @current-change="cur => emitPaginationEventHandler(pagination.currentChange, cur)"
      @size-change="cur => emitPaginationEventHandler(pagination.sizeChange, cur)"
      @prev-click="cur => emitPaginationEventHandler(pagination.prevClick, cur)"
      @next-click="cur => emitPaginationEventHandler(pagination.nextClick, cur)"
      style="margin-top: 4px;text-align: right;"
    ></el-pagination>
  </div>
</template>

<script>
// 自定义内容的组件
var exSlot = {
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null
    }
  },

  render: (h, data) => {
    const params = {
      row: data.props.row,
      index: data.props.index
    }

    if (data.props.column) params.column = data.props.column
    return data.props.render(h, params)
  }
}

export default {
  name: 'mytable',
  components: {
    'ex-slot': exSlot
  },
  props: {
    vLoading: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    // 表格数据
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    // 表头数据
    rowHeader: {
      type: Array,
      required: true,
      default: () => []
    },
    // 分页 🍁
    pagination: {
      type: Object,
      default: () => ({
        total: 1,
        pageSzie: 10,
        currentPage: 1
      })
    },
    showOriginalOperator: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      headers: []
    }
  },
  mounted () {
    const op = this.$scopedSlots.operator
    if (op || this.showOriginalOperator) {
      const operator = {
        label: '操作',
        render: (h, params) => {
          return (
            <div>
              {
                this.showOriginalOperator
                  ? <span>
                    <el-button
                      type="primary"
                      size="small"
                      onClick={() => {
                        this.emitOrigOperEventHandler('on-edit', params)
                      }}
                    >
                      编辑
                    </el-button>
                    <el-button
                      type="danger"
                      size="small"
                      style={{ marginRight: '10px' }}
                      onClick={() => {
                        this.emitOrigOperEventHandler('on-delete', params)
                      }}
                    >
                      删除
                    </el-button>
                  </span>
                  : ''
              }
              {
                op && op(params)
              }
            </div>
          )
        }
      }
      this.headers = [...this.rowHeader, operator]
    } else {
      this.headers = [...this.rowHeader]
    }
  },
  methods: {
    /**
     * 计算序号
     */
    calIndex (index) {
      if (this.pagination) {
        const { currentPage, pageSize } = this.$refs.pagination
        return (index + 1) + (currentPage - 1) * pageSize
      }
      return index + 1
    },
    /**
     * 处理分页事件
     */
    emitPaginationEventHandler (event, params) {
      if (event) {
        event(params)
      }
    },
    emitOrigOperEventHandler (event, params) {
      this.$emit(event, params)
    }
  }
}
</script>
