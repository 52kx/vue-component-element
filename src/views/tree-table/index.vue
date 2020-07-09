<template>
  <div>
    <tree-table-pagination
      ref="tabletree"
      :tree-props="treeprops"
      :table-props="tableProps"
      :result-template="resultTemplate"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      treeprops: {
        url: '/api/tree',
        props: {
          children: 'children',
          label: 'label'
        },
        nodeKey: 'id',
        method: 'get',
        expandOnClickNode: false,
        expandRootParent: true,
        nodeExpand: (data, node, self) => {
          console.log(data, node, self)
        }
      },
      tableProps: {
        url: '/api/table',
        showOriginalOperator: true,
        onEdit: (params) => {
          console.log('点击了编辑按钮', params)
        },
        onDelete: params => {
          console.log('点击了删除按钮', params)
          this.$refs.tabletree.reload()
        },
        searchColumns: [
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
        rowHeader: [
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
            label: 'address',
            prop: 'address'
          }
          // {
          //   label: '操作',
          //   render: (h, params) => {
          //     return (
          //       <div>
          //         <el-button type='primary' onClick={() => {
          //           console.log(params)
          //         }}>编辑</el-button>
          //         <el-button type='danger' onClick={() => {
          //           console.log(params)
          //           this.$refs.tabletree.reload()
          //         }}>删除</el-button>
          //       </div>
          //     )
          //   }
          // }
        ]
      }
    }
  }
}
</script>
