<template>
  <my-table
    v-loading="loading"
    :data="tableData"
    :rowHeader="rowHeader"
    :pagination="pagination"
    showOriginalOperator
    @on-edit="handleEdit"
  >
   <template slot="operator" slot-scope="data">
     <el-button size="small" type="primary" @click="handleShow(data)">查看</el-button>
     <el-button size="small" type="danger" @click="handleShow(data)">删除</el-button>
   </template>
  </my-table>
</template>

<script>
import MyTable from './mytable'
export default {
  components: { MyTable },
  data () {
    return {
      pagination: {
        total: 10,
        prevText: '上一页',
        nextText: '下一页',
        layout: 'prev, pager, next, jumper, total',
        pageSizes: [3, 5, 8],
        pageSize: 3,
        currentPage: 1,
        currentChange: (current) => {
          this.handleCurrentChange(current)
        }
      },
      loading: false,
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
          type: 'selection',
          width: 55,
          align: 'center'
        },
        {
          type: 'index',
          width: 60,
          align: 'center',
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
        }
        // {
        //   label: '操作1',
        //   render: (h, params) => {
        //     return h('div', [
        //       h('el-button', {
        //         props: {
        //           type: 'primary'
        //         },
        //         on: {
        //           click: () => {
        //             console.log('编辑', params)
        //           }
        //         }
        //       }, '编辑'),
        //       h('el-button', {
        //         props: {
        //           type: 'danger'
        //         },
        //         on: {
        //           click: () => {
        //             console.log('新增', params)
        //           }
        //         }
        //       }, '新增')
        //     ])
        //   }
        // }
        // {
        //   label: '操作2',
        //   prop: 'operator',
        //   render: (h, params) => {
        //     return (
        //       <div>
        //         <el-button
        //           type="primary"
        //           size="small"
        //           onClick={() => {
        //             console.log(params)
        //           }}
        //         >
        //         编辑
        //         </el-button>
        //         <el-button
        //           type="danger"
        //           size="small"
        //           onClick={() => {
        //             console.log(params)
        //           }}
        //         >
        //         删除
        //         </el-button>
        //       </div>
        //     )
        //   }
        // }
      ]
    }
  },
  methods: {
    handleShow (params) {
      console.log(params)
    },
    handleEdit (params) {
      console.log(params)
    },
    handleCurrentChange (current) {
      this.loading = true
      setTimeout(() => {
        this.pagination.currentPage = current
        this.tableData = [
          {
            name: `张三${current}`,
            sex: 0,
            age: 18,
            score: 60
          },
          {
            name: `李四${current}`,
            sex: 0,
            age: 18,
            score: 80
          },
          {
            name: `李四${current}`,
            sex: 0,
            age: 18,
            score: 80
          }
        ]
        this.loading = false
      }, 1000)
    }
  }
}
</script>
