const SearchItem = {
  name: 'SearchItem',
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {}
    },
    setValue: {
      type: Function,
      required: true
    },
    value: {
      required: true,
      type: String
    }
  },
  methods: {
    setItemsValue (prop, val) {
      this.setValue(prop, val)
    }
  },
  render () {
    const {
      item: {
        type,
        text,
        placeholder,
        prop,
        options
      },
      setItemsValue,
      value
    } = this

    return (
      <div class="item">
        <label class="label">{ text }</label>
        {
          type === 'input'
            ? <el-input
              clearable
              value={value}
              onInput={val => setItemsValue(prop, val)}
              placeholder={placeholder || text ? `请输入${text}` : '请输入'}
            />
            : ''
        }
        {
          type === 'select'
            ? <el-select
              value={value}
              clearable
              placeholder={placeholder || text ? `请输入${text}` : '请输入'}
              onChange={value => setItemsValue(prop, value)}
            >
              {
                options.map(({ label, value }) => (
                  <el-option
                    key={value}
                    value={value}
                    label={label}
                  />
                ))
              }
            </el-select>
            : ''
        }
        {
          type === 'date-picker'
            ? <el-date-picker
              value={value.split(',')}
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              onInput={val => setItemsValue(prop, val.join())}
            />
            : ''
        }
      </div>
    )
  }
}

export default SearchItem
