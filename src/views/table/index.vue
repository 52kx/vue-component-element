<template>
  <div>
    <Table
      ref="fttable"
      url="/api/table"
      :searchColumns="columns"
      :rowHeader="headers"
    />
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
          prop: 'name'
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
          label: '操作',
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
  }
}
</script>
