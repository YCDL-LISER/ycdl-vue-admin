<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input v-model="query.keyword" class="filter-item" style="width: 200px;" placeholder="请输入关键词" clearable @keyup.enter.native="handleSearch" />
      <el-select v-model="query.enabled" placeholder="是否启用" class="filter-item" clearable>
        <el-option v-for="item in enabledOptions" :key="item.codeKey" :label="item.codeValue" :value="item.codeKey" />
      </el-select>
      <el-select v-model="query.enabled" placeholder="服务名称" class="filter-item" clearable>
        <el-option v-for="item in enabledOptions" :key="item.codeKey" :label="item.codeValue" :value="item.codeKey" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </div>

    <el-tabs v-model="activeName" :tab-position="tabPosition">
      <el-tab-pane label="数据库资源" name="database">
        <div class="filter-container">
          <el-button-group>
            <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleCreate">添加</el-button>
            <el-button class="filter-item" type="primary" icon="el-icon-delete" @click="handleBatchDelete">批量删除</el-button>
          </el-button-group>
        </div>
        <el-table
          :key="databaseTable"
          v-loading.body="listLoading"
          :data="databaseList"
          row-key="resourceId"
          highlight-current-row
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" />
          <el-table-column type="index" align="center" label="序号" />
          <el-table-column align="center" label="资源名称">
            <template slot-scope="scope">
              <span>{{ scope.row.resourceName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="后台控制器">
            <template slot-scope="scope">
              <span>{{ scope.row.controller }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="请求方式" width="100">
            <template slot-scope="scope">
              <el-tag :type="resourceMethod(scope.row.method)">
                {{ scope.row.method }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="资源URL">
            <template slot-scope="scope">
              <span>{{ scope.row.url }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="是否启用">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.enabled"
                active-text="启用"
                inactive-text="禁用"
                @change="switchChange(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column align="center" label="启用权限认证">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.authorized"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="启用"
                inactive-text="禁用"
                @change="switchChange(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-dropdown>
                <el-button type="primary">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-tag type="success" @click="handleUpdate(scope.row)">编辑</el-tag>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-tag type="danger" @click="handleDelete(scope.row)">删除</el-tag>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="接口资源" name="swagger">
        <div class="filter-container">
          <el-button-group>
            <el-button class="filter-item" type="primary" icon="el-icon-refresh" @click="handleSyncBatch">同步资源到数据库</el-button>
          </el-button-group>
        </div>
        <el-table
          :key="swaggerTable"
          v-loading.body="listLoading"
          :data="swaggerList"
          row-key="resourceId"
          highlight-current-row
          border
        >
          <el-table-column type="index" align="center" label="序号" />
          <el-table-column align="center" label="资源名称">
            <template slot-scope="scope">
              <span>{{ scope.row.resourceName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="后台控制器">
            <template slot-scope="scope">
              <span>{{ scope.row.controller }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="资源URL">
            <template slot-scope="scope">
              <span>{{ scope.row.url }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="请求方式" width="100">
            <template slot-scope="scope">
              <el-tag :type="resourceMethod(scope.row.method)">
                {{ scope.row.method }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogVisible" width="30%">
      <el-form :ref="formKey" :model="form" label-width="100px">
        <el-form-item label="资源名称" prop="roleCode">
          <el-input v-model="form.resourceName" placeholder="请输入资源名称" />
        </el-form-item>
        <el-form-item label="请求方式" prop="remark">
          <el-radio-group v-model="form.method" size="small">
            <el-radio-button value="GET" label="GET" />
            <el-radio-button value="POST" label="POST" />
            <el-radio-button value="PUT" label="PUT" />
            <el-radio-button value="DELETE" label="DELETE" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="资源URL" prop="roleName">
          <el-input v-model="form.url" placeholder="请输入资源URL" />
        </el-form-item>
        <el-form-item label="是否启用" prop="enabled">
          <el-switch v-model="form.enabled" />
        </el-form-item>
        <el-form-item label="启用权限认证" prop="authorized">
          <el-switch v-model="form.authorized" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { databaseTree, swaggerTree, addObj, putObj, putObjBatch, delObj, delBatchObj } from '@/api/admin/resource'
export default {
  name: 'Resource',
  data() {
    return {
      activeName: 'database',
      tabPosition: 'left',
      databaseTable: 'databaseTable',
      swaggerTable: 'swaggerTable',
      formKey: 'resourceForm',
      databaseList: [],
      swaggerList: [],
      enabledOptions: [],
      query: {
        keyword: undefined,
        enabled: undefined
      },
      listLoading: true,
      dialogVisible: false,
      dialogStatus: undefined,
      textMap: {
        true: '创建',
        false: '编辑'
      },
      form: {
        resourceId: undefined,
        resourceName: undefined,
        parentId: undefined,
        controller: undefined,
        url: undefined,
        method: undefined,
        enabled: undefined,
        authorized: undefined
      },
      multipleSelection: [],
      deleteResourceIds: []
    }
  },
  computed: {
    ...mapGetters([
      'dictionaryList'
    ])
  },
  created() {
    if (this.dictionaryList) {
      this.enabledOptions = this.dictionaryList['enabled']
    }
    this.queryList()
    this.querySwaggerList()
  },
  methods: {
    queryList() {
      this.listLoading = true
      databaseTree(this.query)
        .then(response => {
          this.databaseList = response.data
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
    },
    querySwaggerList() {
      this.listLoading = true
      swaggerTree().then(response => {
        this.swaggerList = response.data
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    resourceMethod(method) {
      if (method === 'GET') {
        return null
      } else if (method === 'POST') {
        return 'success'
      } else if (method === 'PUT') {
        return 'warning'
      } else if (method === 'DELETE') {
        return 'danger'
      } else {
        return 'info'
      }
    },
    handleSearch() {
      this.activeName = 'database'
      this.queryList()
    },
    switchChange(row) {
      putObj(row.resourceId, row).then((response) => {
        this.$notifyMsg.operationMsg(response.data)
      })
    },
    handleCreate() {
      this.dialogVisible = true
      this.dialogStatus = true
      this.form = {}
    },
    handleUpdate(row) {
      this.dialogVisible = true
      this.dialogStatus = false
      this.form = JSON.parse(JSON.stringify(row))
    },
    handleDelete(row) {
      this.$confirm('确定删除选中的记录？', '提示',
        { confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        delObj(row.resourceId).then((response) => {
          this.$notifyMsg.operationMsg(response.data)
          this.queryList()
        })
      })
    },
    handleBatchDelete() {
      if (this.multipleSelection === undefined || this.multipleSelection.length <= 0) {
        this.$message.error('请先勾选要删除的记录！')
      } else {
        this.$confirm('确定删除选中的记录？', '提示',
          { confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async() => {
          this.multipleSelection.forEach((value) => {
            this.deleteResourceIds.push(value.resourceId)
          })
          delBatchObj(this.deleteResourceIds).then(async(response) => {
            this.$notifyMsg.operationMsg(response.data)
            this.queryList()
          })
        })
      }
    },
    cancel() {
      this.$refs[this.formKey].resetFields()
      this.dialogVisible = false
    },
    submit() {
      if (this.dialogStatus) {
        this.create()
      } else {
        this.update()
      }
      this.queryList()
    },
    create() {
      addObj(this.form).then((response) => {
        this.dialogVisible = false
        this.$notifyMsg.operationMsg(response.data)
      })
    },
    update() {
      putObj(this.form.resourceId, this.form).then((response) => {
        this.dialogVisible = false
        this.$notifyMsg.operationMsg(response.data)
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSyncBatch() {
      putObjBatch(this.swaggerList).then(response => {
        this.$notifyMsg.operationMsg(response.data)
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  $color-blue: #2196F3;
  $space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
      content: ""
    }
  }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }

  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
  }
</style>
