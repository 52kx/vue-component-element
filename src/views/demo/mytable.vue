<template>
   <el-table :data="data">
      <el-table-column v-for="(col, index) in rowHeader" :key="index" :prop="col.prop" :label="col.label">
          <template slot-scope="scope">
              <ex-slot v-if="col.render" :render="col.render" :row="scope.row" :index="scope.$index" :column="col"></ex-slot>
              <span v-else>
                  {{scope.row[col.prop]}}
              </span>
          </template>
        </el-table-column>
    </el-table>
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
    // 表格数据
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 表头数据
    rowHeader: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
