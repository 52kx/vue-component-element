<template>
  <div>
    <Table
      v-loading="loading"
      type="local"
      :data="tableData"
      :searchColumns="columns"
      :rowHeader="headers"
      @on-add="handleAdd"
      @search="handleSearch"
      :pagination-config="paginationConfig"
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
      loading: false,
      paginationConfig: {
        total: 100,
        currentPage: 1,
        pageSize: 10,
        currentChange: (val) => {
          console.log(val)
          this.getData()
        },
        sizeChange: page => {
          console.log(page)
          this.getData()
        }
      },
      tableData: [
        {
          name: 'zhangsan',
          sex: 1,
          address: 'beijing'
        }
      ],
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
      ]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    handleSearch (val) {
      console.log(val)
      this.getData()
    },
    handleClick (row) {
      console.log(row)
    },
    handleAdd () {
      console.log('add')
    },
    getData () {
      this.loading = true
      this.$axios.get('/api/table').then(({ status, result: { list, total } }) => {
        if (status) {
          this.tableData = list
          this.paginationConfig.total = total
          this.loading = false
        }
      })
    }
  }
}
</script>
