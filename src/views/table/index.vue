<template>
  <my-table
    :data="tableData"
    :rowHeader="rowHeader"
    :pagination="pagination"
  />
</template>

<script>
import MyTable from './mytable'
export default {
  components: { MyTable },
  data () {
    return {
      pagination: {
        total: 50,
        prevText: '上一页',
        nextText: '下一页',
        currentChange: (current) => {
          this.handleCurrentChange(current)
        }
      },
      tableData: [
        {
          name: '张三',
          sex: 0,
          age: 18,
          score: 60
        },
        {
          name: '李四',
          sex: 0,
          age: 18,
          score: 80
        }
      ],
      rowHeader: [
        {
          type: 'selection'
        },
        {
          type: 'index',
          width: 60,
          label: '#'
        },
        {
          prop: 'name',
          label: '姓名'
        },
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
              <div>
                <el-button
                  type="primary"
                  size="small"
                  onClick={() => {
                    console.log(params)
                  }}
                >
                编辑
                </el-button>
                <el-button
                  type="danger"
                  size="small"
                  onClick={() => {
                    console.log(params)
                  }}
                >
                删除
                </el-button>
              </div>
            )
          }
        }
      ]
    }
  },
  methods: {
    handleCurrentChange (pageSize) {
      console.log(pageSize)
    }
  }
}
</script>
