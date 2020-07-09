<template>
  <div>
    <div v-if="searchColumns" style="margin-bottom: 15px">
      <Search @search="handleSearch" :columns="searchColumns" />
    </div>
    <el-table
      :data="tableData"
      :border="border"
      :url="url"
      v-loading="loading"
    >
      <template v-for="(item, index) in headers">
        <el-table-column
          :key="index"
          v-if="item.type === undefined"
          :align="item.align"
          :width="item.width"
          :prop="item.prop"
          :label="item.label"
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
          v-else-if="item.type === 'index'"
          :key="index"
          type="index"
          :index="calIndex"
          :align="item.align"
          :width="item.width"
          :label="item.label"
        />
        <el-table-column
          :key="index"
          v-else
          :type="item.type"
          :align="item.align"
          :width="item.width"
          :label="item.label"
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
import props from './props'
import ExSlot from './ExSlot'
import Search from '../../Search'

export default {
  name: 'Table',
  components: {
    ExSlot,
    Search
  },
  props,
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
      nativeThirdParams: {}
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
    const op = this.$scopedSlots.operator
    if (op || this.showOriginalOperator) {
      const operator = {
        label: '操作',
        render: (h, params) => {
          return (
            <div>
              {
                this.showOriginalOperator
                  ? <span>
                    <el-button
                      type="primary"
                      size="small"
                      onClick={() => {
                        this.emitOrigOperEventHandler('on-edit', params)
                      }}
                    >
                      编辑
                    </el-button>
                    <el-button
                      type="danger"
                      size="small"
                      style={{ marginRight: '10px' }}
                      onClick={() => {
                        this.emitOrigOperEventHandler('on-delete', params)
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
  },
  methods: {
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
    emitOrigOperEventHandler (event, params) {
      this.$emit(event, params)
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
          this.total = res[total]
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
