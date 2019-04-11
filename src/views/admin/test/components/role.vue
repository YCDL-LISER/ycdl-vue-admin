<template>
  <div class="app-container calendar-list-container">
    <el-row style="height: 500px; border: 1px solid #eee">
      <el-col :span="8">
        <el-aside width="100%">
          <el-transfer
            v-model="value1"
            :data="data"
            :titles="['未拥有', '已有权限']"
            class="el-transfer-panel__body"
            @right-check-change="rightCheck"
            @left-check-change="leftCheck"
            @change="onch"
          />
        </el-aside>
      </el-col>
      <el-col :span="12">
        <el-tree :data="tree" @node-click="handleNodeClick" />
      </el-col>
    </el-row>
    <div>
      <el-table
        :data="tableData"
        max-height="400"
        width="400"
        border
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          prop="resourceId"
          label="资源ID"
          width="180"
        />
        <el-table-column
          prop="resourceName"
          label="资源名称"
          width="180"
        />
        <el-table-column
          prop="resourceUrl"
          label="资源URL"
        />
      </el-table>
    </div>
    <el-row>
      <el-button type="success" icon="el-icon-check" @click="complete">完成</el-button>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Role',
  props: {
    idList: {
      type: String,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      data: [
        {
          key: 1,
          label: '月蚀',
          disabled: false
        },
        {
          key: 2,
          label: '机械之灵',
          disabled: false
        },
        {
          key: 3,
          label: '神思者',
          disabled: false
        },
        {
          key: 4,
          label: '神思者',
          disabled: false
        }
      ],
      value8: undefined,
      have: JSON.stringify(userMap[this.idList]),
      value1: userMap[this.idList], // 调用接口查询ID共有的权限
      tableData: undefined, // 表格中的数据
      tree: undefined
    }
  },
  methods: {
    popup() {
      alert(this.change)
    },
    rightCheck(obj) {
      this.tableData = resourcesMap[obj[obj.length - 1]]
      this.tree = treeMap[1]
    },
    // 获取当前右侧被选中元素
    leftCheck(obj) {
      this.tableData = resourcesMap[obj[obj.length - 1]]
      this.tree = treeMap[1]
    },
    // 获取当前左侧被选中元素
    onch(obj) { // 右侧元素
      this.have = JSON.stringify(obj)
    },
    complete() {
      console.log(JSON.stringify(this.have) + '|' + JSON.stringify(this.idList))
    },
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
const userMap = {
  1: [1, 2, 3],
  2: [3, 4]
}
const resourcesMap = {
  1: [
    {
      resourceId: '1',
      resourceName: '资源管理',
      resourceUrl: 'admin/resource'
    }
  ],
  2: [
    {
      resourceId: '2',
      resourceName: '资源管理',
      resourceUrl: 'admin/resource'
    }
  ]
}
const treeMap = {
  1: [{
    label: '一级 1',
    children: [{
      label: '二级 1-1',
      children: [{
        label: '三级 1-1-1'
      }]
    }]
  }, {
    label: '一级 2',
    children: [{
      label: '二级 2-1',
      children: [{
        label: '三级 2-1-1'
      }]
    }, {
      label: '二级 2-2',
      children: [{
        label: '三级 2-2-1'
      }]
    }]
  }, {
    label: '一级 3',
    children: [{
      label: '二级 3-1',
      children: [{
        label: '三级 3-1-1'
      }]
    }, {
      label: '二级 3-2',
      children: [{
        label: '三级 3-2-1'
      }]
    }]
  }]
}
</script>
<style>
  .el-transfer-panel__body {
    height: 459px;
  }
</style>
