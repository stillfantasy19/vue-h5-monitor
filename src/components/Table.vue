  <template>
    <div>
     <h1>和家亲H5敏感词检测系统</h1>
     <div class='search'>
    <el-date-picker
      v-model="date"
      type="date"
      placeholder="选择执行日期">
    </el-date-picker>
    <el-button type="primary" @click="handleFilter">查询</el-button>
    </div>
    <el-table
      :data="tableData"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="执行日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="url"
        label="URL"
        width="380">
      </el-table-column>
      <el-table-column
        prop="hasSensitive"
        label="敏感词检测结果"
        :formatter = "hasSensitiveFormatter">
        <template scope="scope">
          <span v-if="scope.row.hasSensitive == 1" style="color:red">{{ hasSensitiveFormatter(scope.row) }}</span>
          <span v-else>{{ hasSensitiveFormatter(scope.row) }}</span>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </template>

<script>
import { getContent } from '@/api/contents'
import { Message } from 'element-ui'
import { parseTime } from '@/util'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      date: ''
    }
  },
  created () {
  },
  methods: {
    handleFilter () {
      if (this.date == null || this.date == '') {
        Message({
          message: '请选择执行日期！',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      let self = this
      this.loading = true
      getContent(parseTime(this.date, '{y}{m}{d}')).then(response => {
        self.loading = false
        let result = response.data
        if (!result) {
          return
        }
        if (result.code !== 200) {
          self.tableData = []
          Message({
            message: result.msg,
            type: 'error',
            duration: 5 * 1000
          })
          return
        }
        self.tableData = result.result
      })
    },
    hasSensitiveFormatter(row, column) {
      if (row.hasSensitive === 0) {
        return '无敏感词'
      } else if (row.hasSensitive === 1) {
        return '有敏感词'
      }
    }
  }
}
</script>

<style scoped>
h1 {
  font-weight: bold;
  align: left;
}
.search{
  text-align: left;
}
</style>
