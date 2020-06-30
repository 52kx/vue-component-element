<template>
  <div>
    <el-table
      :data="data"
      :border="border"
      v-loading="vLoading"
    >
      <template v-for="(item, index) in rowHeader">
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
      @current-change="cur => pagination.currentChange && pagination.currentChange(cur)"
      @size-change="cur => pagination.sizeChange && pagination.sizeChange(cur)"
      @prev-click="cur => pagination.prevClick && pagination.prevClick(cur)"
      @next-click="cur => pagination.nextClick && pagination.nextClick(cur)"
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
    pagination: Object
  }
}
</script>
