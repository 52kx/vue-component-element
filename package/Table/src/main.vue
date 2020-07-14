<template>
  <div>
    <div class="top-operator">
      <div style="margin: 0 10px 10px 0;">
        <el-popover
          placement="bottom-start"
          trigger="click"
          width="500"
          popper-class="header-selector"
        >
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <el-checkbox-group
            v-model="checkAllHeaders"
            @change="handleCheckedHeadersChange"
          >
            <el-checkbox
              v-for="item in headers"
              :key="item.label"
              :label="item.label"
              :title="item.label"
            >
              {{item.label}}
            </el-checkbox>
          </el-checkbox-group>
          <el-button icon="el-icon-setting" slot="reference" type="primary">设置字段列表</el-button>
        </el-popover>
        <el-button
          v-if="showAdd"
          style="margin-left:10px;"
          icon="el-icon-plus"
          @click="emitOrigOperEventHandler('on-add', null, null)"
        >新增数据</el-button>
      </div>
      <Search v-if="searchColumns" style="margin-bottom: 15px" @search="handleSearch" :columns="searchColumns" />
    </div>
    <el-table
      :data="tableData"
      v-loading="loading"
      v-bind="$props"
      v-on="$listeners"
    >
      <template v-for="(item, index) in headers.map(item => checkAllHeaders.includes(item.label) ? item : null).filter(item => item)">
        <el-table-column
          :key="index"
          v-if="item.type === undefined"
          v-bind="item"
        >
          <template slot-scope="scope">
            <ex-slot
              v-if="item.render"
              :render="item.render"
              :row="scope.row"
              :index="scope.$index"
              :column="item"
            />
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <!-- 针对 index selection expand 单独渲染 目前 expand 没有处理  // TODO: next version -->
        <el-table-column
          :key="index"
          v-else
          v-bind="item"
        />
      </template>
    </el-table>
    <el-pagination
      v-if="showPagination"
      :total="total"
      :layout="paginationLayout"
      :page-size="pagination.pageSize"
      :page-sizes="pageSizes"
      :current-page="pagination.pageIndex"
      :hide-on-single-page="false"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      style="margin-top: 4px;text-align: right;"
    ></el-pagination>
  </div>
</template>

<script>
// 自定义内容的组件
import { Table } from 'element-ui'
import props from './props'
import ExSlot from './ExSlot'
import Search from '../../Search'

export default {
  name: 'Table',
  components: {
    ExSlot,
    Search
  },
  props: {
    ...Table.props,
    ...props
  },
  data () {
    const _this = this
    return {
      headers: [],
      loading: false,
      tableData: [],
      pagination: {
        pageIndex: 1,
        pageSize: (() => {
          const { pageSizes } = _this
          if (pageSizes.length > 0) {
            return pageSizes[0]
          }
          return 10
        })()
      },
      total: 12,
      formParams: {},
      nativeThirdParams: {},
      checkAll: true,
      checkAllHeaders: [],
      isIndeterminate: false
    }
  },
  watch: {
    thirdParams: {
      handler: function (val) {
        // 第三方参数需要动态改变，使用watch监听，才能获取到最新的值
        this.nativeThirdParams = val
        // 重置当前页数为第一页
        this.pagination.pageIndex = 1
        this.dataChangeHandler()
      },
      deep: true
    }
  },
  created () {
    // 第三方参数参与第一次请求，不再 create 中发送请求 否则会产生两次请求
    if (this.thirdParams === undefined) {
      this.dataChangeHandler()
    }
  },
  mounted () {
    const op = this.$scopedSlots.default
    if (op || this.showOriginalOperator) {
      const operator = {
        label: '操作',
        prop: 'operator',
        fixed: 'right',
        minWidth: 200,
        render: (h, params) => {
          return (
            <div>
              {
                this.showOriginalOperator
                  ? <span>
                    <el-button
                      type="primary"
                      size="small"
                      onClick={event => {
                        this.emitOrigOperEventHandler('on-edit', params, event)
                      }}
                    >
                      编辑
                    </el-button>
                    <el-button
                      type="danger"
                      size="small"
                      style={{ marginRight: '10px' }}
                      onClick={event => {
                        this.emitOrigOperEventHandler('on-delete', params, event)
                      }}
                    >
                      删除
                    </el-button>
                  </span>
                  : ''
              }
              {
                op && op(params)
              }
            </div>
          )
        }
      }
      this.headers = [...this.rowHeader, operator]
    } else {
      this.headers = [...this.rowHeader]
    }
    this.checkAllHeaders = this.headers.map(item => item.label)
    console.log(this.headers)
  },
  methods: {
    handleCheckAllChange (val) {
      this.checkAllHeaders = val ? this.headers.map(item => item.label) : []
      this.isIndeterminate = false
    },
    handleCheckedHeadersChange (value) {
      const res = this.headers.map(item => value.includes(item.label) ? item : null).filter(item => item)
      this.isIndeterminate = value.length !== this.headers.length
      console.log(value.length === this.headers.length)
      this.checkAllHeaders = res.map(item => item.label)
    },
    /**
     * 计算序号
     */
    calIndex (index) {
      if (this.showPagination) {
        const { pageIndex, pageSize } = this.pagination
        return (index + 1) + (pageIndex - 1) * pageSize
      }
      return index + 1
    },
    emitOrigOperEventHandler (methodName, params, event) {
      this.$emit(methodName, params, event)
    },
    /**
     * 发起请求
     */
    fetchHandler () {
      this.loading = true
      let {
        method,
        url,
        $axios,
        showPagination,
        pageIndexKey,
        pageSizeKey,
        pagination,
        filterParams,
        formParams,
        nativeThirdParams,
        resultTemplate
      } = this
      let params = { ...formParams, ...nativeThirdParams }
      // 显示分页，请求参数加入分页信息
      if (showPagination) {
        params = { ...params, [pageIndexKey]: pagination.pageIndex, [pageSizeKey]: pagination.pageSize }
      }
      // 过滤空和 undefined
      params = filterParams(params)

      let requestObj = null
      method = method.toLowerCase()

      if (method === 'get') {
        requestObj = $axios[method](url, { params })
      } else {
        requestObj = $axios[method](url, params)
      }

      requestObj.then(res => {
        // 从返回数据的模版中获取 key 以匹配后端数据 key
        const { status, data: { children: { total, data }, name } } = resultTemplate
        if (res[status]) {
          this.tableData = res[name][data]
          this.total = res[name][total]
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
    },
    /**
     * 分页改变触发
     */
    handleCurrentChange (current) {
      this.pagination.pageIndex = current
      this.dataChangeHandler()
    },
    // 每页显示条数变更触发
    handleSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.dataChangeHandler()
    },
    dataChangeHandler () {
      this.fetchHandler(arguments[0])
    },
    /**
     * 过滤对象中的 '' && undefined
     */
    filterParams (obj) {
      const res = {}
      for (const key in obj) {
        if (obj[key] !== '' && obj[key] !== undefined) {
          res[key] = obj[key]
        }
      }
      return res
    },
    /**
     * 处理搜索
     */
    handleSearch (data) {
      this.formParams = data
      this.pagination.pageIndex = 1
      this.dataChangeHandler(data)
    },
    /**
     * 方便通过 this.$refs 重新加载数据
     */
    reload () {
      this.fetchHandler()
    }
  }
}
</script>

<style scoped>
.top-operator {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

</style>

<style>
.el-popover.header-selector .el-checkbox {
  width: 146px;
  margin-right: 20px;
}

.el-popover.header-selector .el-checkbox .el-checkbox__label {
  width: calc(100% - 24px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
}
</style>
