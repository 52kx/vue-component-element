<template>
  <div>
    <tree-table-pagination
      ref="tabletree"
      :tree-props="treeprops"
      :table-props="tableProps"
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
        stripe: true,
        showOriginalOperator: true,
        border: false,
        onEdit: (params, event) => {
          event.stopPropagation()
          console.log('点击了编辑按钮', params, event)
        },
        onDelete: (params, event) => {
          console.log('点击了删除按钮', params, event)
          event.stopPropagation()
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
          //         <el-button type='primary' onClick={e => {
          //           console.log(e)
          //           e.stopPropagation()
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
