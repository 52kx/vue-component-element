<template>
  <div>
    <Table
      ref="fttable"
      url="/api/table"
      :searchColumns="columns"
      :rowHeader="headers"
    >
      <template slot-scope="scoped">
        <el-button type="primary" @click="handleClick(scoped)">编辑</el-button>
        <el-button type="danger" @click="handleClick(scoped)">删除</el-button>
      </template>
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
          label: '性别',
          prop: 'sex',
          render: (h, params) => {
            return h('div', params.row.sex === 0 ? '男' : '女')
          }
        },
        {
          label: '地址',
          prop: 'address'
        }
        // {
        //   label: '操作1',
        //   render: (h, params) => {
        //     return (
        //       <div>
        //         <el-button type='primary' onClick={() => {
        //           console.log(params)
        //         }}>编辑</el-button>
        //         <el-button type='danger' onClick={() => {
        //           console.log(params)
        //           this.$refs.fttable.reload()
        //         }}>删除</el-button>
        //       </div>
        //     )
        //   }
        // }
      ]
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    }
  }
}
</script>
