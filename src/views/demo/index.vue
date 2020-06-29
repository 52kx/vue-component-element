<template>
  <my-table :data="tableData" :rowHeader="rowHeader"></my-table>
</template>

<script>
import MyTable from './mytable'
export default {
  components: { MyTable },
  data () {
    return {
      tableData: [
        {
          name: '老王',
          sex: 0,
          age: 18,
          score: 60
        },
        {
          name: '李梅',
          sex: 1,
          age: 18,
          score: 80
        }
      ],
      rowHeader: [
        // 未做任何格式化处理的数据
        {
          prop: 'name',
          label: '姓名'
        },
        // 格式化为字符串
        {
          prop: 'sex',
          label: '性别',
          render: (h, params) => {
            return h('div', params.row.sex === 0 ? '男' : '女')
          }
        },
        {
          prop: 'age',
          label: '年龄',
          render: (h, params) => {
            return h('div', params.row.age + '岁')
          }
        },
        // 插入组件或标签内容（例：进度条组件）
        {
          prop: 'score',
          label: '分数',
          render: (h, params) => {
            return h('el-progress', {
              props: {
                textInside: true,
                strokeWidth: 18,
                percentage: params.row.score
              }
            })
          }
        },
        {
          prop: '',
          label: '操作',
          render: (h, params) => {
            return (
              <el-button
                type='primary'
                size='small'
                onClick={() => {
                  console.log(params)
                }}>删除</el-button>
            )
          }
        }
      ]
    }
  }
}
</script>
