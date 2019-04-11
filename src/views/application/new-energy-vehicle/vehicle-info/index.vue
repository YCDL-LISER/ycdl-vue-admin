<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input v-model="query.keyword" class="filter-item" style="width: 200px;" placeholder="关键词" clearable @keyup.enter.native="handleSearch" />
      <el-input v-model="query.deviceId" class="filter-item" style="width: 200px;" placeholder="设备编号" clearable @keyup.enter.native="handleSearch" />
      <el-select v-model="query.functionId" placeholder="功能编号" class="filter-item" clearable>
        <el-option v-for="item in functionIdOptions" :key="item.codeKey" :label="item.codeValue" :value="item.codeKey" />
      </el-select>
      <el-date-picker v-model="query.createTimeStart" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="数据录入开始时间" class="filter-item" />
      <el-date-picker v-model="query.createTimeEnd" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="数据录入截至时间" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-delete" @click="handleClear">清除</el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading.body="listLoading"
      :data="list"
      border
      highlight-current-row
      @sort-change="tableSortChange"
    >
      <el-table-column type="index" align="center" label="序号" />
      <el-table-column v-if="false" align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="设备编号" width="125">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="功能编号">
        <template slot-scope="scope">
          <span>{{ scope.row.functionId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="消息流水号">
        <template slot-scope="scope">
          <span>{{ scope.row.messageId }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="gatherTime" align="center" width="160" show-overflow-tooltip label="终端上报时间">
        <template slot-scope="scope">
          <span>
            {{ scope.row.gatherTime | dateFilter }}
          </span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="createTime" align="center" width="160" show-overflow-tooltip label="数据录入时间">
        <template slot-scope="scope">
          <span>
            {{ scope.row.createTime | dateFilter }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="驾驶循环标签">
        <template slot-scope="scope">
          <span>
            {{ scope.row.tripMark }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip label="ACC状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.accStatus === 0 ? 'info':'primary'">
            {{ scope.row.accStatus | dictionaryFilter('accStatus') }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip label="报警类别">
        <template slot-scope="scope">
          <span>
            {{ scope.row.almId }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip label="定位是否有效">
        <template slot-scope="scope">
          <el-tag :type="scope.row.hasGps === 0 ? 'success':'danger'">
            {{ scope.row.hasGps | dictionaryFilter('hasGps') }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip width="100" label="经度">
        <template slot-scope="scope">
          <span>
            {{ scope.row.longitude }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" show-overflow-tooltip width="90" label="纬度">
        <template slot-scope="scope">
          <span>
            {{ scope.row.latitude }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" type="success" icon="el-icon-edit" @click="handleDetails(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination
        :current-page.sync="query.page"
        :page-sizes="[10,20,30,40,50]"
        :page-size="query.limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { page, clearObj } from '@/api/application/vehicle'
export default {
  name: 'VehicleInfo',
  data() {
    return {
      functionIdOptions: [],
      query: {
        page: 1,
        limit: 10,
        keyword: undefined,
        sortBy: 'createTime',
        order: 'desc',
        deviceId: undefined,
        functionId: undefined,
        createTimeStart: undefined,
        createTimeEnd: undefined
      },
      tableKey: 'vehicleInfoTable',
      list: null,
      total: null,
      listLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'dictionaryList'
    ])
  },
  created() {
    this.functionIdOptions = this.dictionaryList['functionId']
    this.queryList()
  },
  methods: {
    queryList() {
      this.listLoading = true
      page(this.query)
        .then(response => {
          this.list = response.data.records
          this.total = response.data.total
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
    },
    tableSortChange(column) {
      this.query.page = 1
      if (column.order === 'descending') {
        this.query.sortBy = column.prop
        this.query.order = 'desc'
      } else {
        this.query.sortBy = column.prop
        this.query.order = 'asc'
      }
      this.queryList()
    },
    handleSearch() {
      this.queryList()
    },
    sizeChange(val) {
      this.query.limit = val
      this.queryList()
    },
    currentChange(val) {
      this.query.page = val
      this.queryList()
    },
    handleClear() {
      this.$confirm('确定清除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        clearObj(this.query).then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.queryList()
        })
      })
    },
    handleDetails(id) {

    }
  }
}
</script>
