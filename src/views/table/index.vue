<template>
  <div>
    <Table
      ref="fttable"
      url="/api/table"
      :searchColumns="columns"
      :rowHeader="headers"
      @on-add="handleAdd"
    >
      <!-- <template slot-scope="scoped">
        <el-button type="primary" @click="handleClick(scoped)">编辑</el-button>
        <el-button type="danger" @click="handleClick(scoped)">删除</el-button>
      </template> -->
    </Table>
  </div>
</template>

<script>

export default {
  name: 'index',
  data () {
    return {
      columns: [
        {
          type: 'input',
          text: '姓名',
          prop: 'name'
        },
        {
          type: 'input',
          text: '地址',
          prop: 'address'
        }
      ],
      headers: [
        {
          label: '#',
          type: 'index'
        },
        {
          label: '姓名',
          prop: 'name',
          sortable: true
        },
        {
          label: '姓名1姓名1姓名1姓名1姓名1',
          prop: 'name',
          sortable: true
        },
        {
          label: '姓名2',
          prop: 'name',
          sortable: true
        },
        {
          label: '姓名3',
          prop: 'name',
          sortable: true
        },
        {
          label: '姓名4',
          prop: 'name',
          sortable: true
        },
        {
          label: '姓名5',
          prop: 'name',
          sortable: true
        },
        {
          label: '姓名6',
          prop: 'name',
          sortable: true
        },
        {
          label: '姓名7',
          prop: 'name',
          sortable: true
        },
        {
          label: '姓名8',
          prop: 'name',
          sortable: true
        },
        {
          label: '姓名9',
          prop: 'name',
          sortable: true
        },
        {
          label: '姓名10',
          prop: 'name',
          sortable: true
        },
        {
          label: '性别',
          prop: 'sex',
          render: (h, params) => {
            return h('div', params.row.sex === 0 ? '男' : '女')
          }
        },
        {
          label: '地址',
          prop: 'address'
        },
        {
          label: '操作1',
          width: 200,
          fixed: 'right',
          render: (h, params) => {
            return (
              <div>
                <el-button type='primary' onClick={() => {
                  console.log(params)
                }}>编辑</el-button>
                <el-button type='danger' onClick={() => {
                  console.log(params)
                  this.$refs.fttable.reload()
                }}>删除</el-button>
              </div>
            )
          }
        }
      ]
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    handleAdd () {
      console.log('add')
    }
  }
}
</script>
