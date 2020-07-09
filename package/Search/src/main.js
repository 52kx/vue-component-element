import SearchItem from './item'
import './style/index.css'

const Search = {
  name: 'Search',
  props: {
    // 生成搜索
    columns: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      searchData: {}
    }
  },
  watch: {
    columns: {
      handler: function (val) {
        val.forEach(item => {
          this.searchData = { ...this.searchData, [item.prop]: '' }
        })
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    /**
     * 调用search方法
     */
    onSearch () {
      this.$emit('search', this.searchData)
    },
    /**
     * 重置数据
     */
    onReset () {
      this.columns.forEach(item => {
        this.searchData = { ...this.searchData, [item.prop]: '' }
      })
      this.$emit('search', this.searchData)
    },
    /**
     * v-model 使用
     * @param {*} prop key
     * @param {*} value value
     */
    setValue (prop, value) {
      this.searchData[prop] = value
    }
  },
  render () {
    const {
      columns,
      onSearch,
      onReset,
      setValue,
      searchData
    } = this

    const searchItem = columns.map((item, index) => (
      <SearchItem
        item={item}
        key={index}
        setValue={setValue}
        value={searchData[item.prop]}
      />
    ))

    return (
      <div class="ft_search">
        <div class="search_list">
          {searchItem}
          <el-button icon="el-icon-search" type="primary" onClick={onSearch}>查询</el-button>
          <el-button icon="el-icon-delete" style={{ marginLeft: '15px' }} onClick={onReset}>重置</el-button>
        </div>
      </div>
    )
  }
}

export default Search
