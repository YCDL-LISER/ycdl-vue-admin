<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" :before-leave="disableSwitch" style="margin-top:15px;">
      <el-tab-pane label="用户管理" name="one">
        <user @fatherMethod="fatherMethod" />
      </el-tab-pane>
      <el-tab-pane label="角色分配" name="two">
        <role
          :id-list="idList"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import User from './components/user'
import Role from './components/role'
export default {
  name: 'Resource',
  components: { User, Role },
  data() {
    return {
      activeName: 'one',
      disableValue: false,
      idList: 1
    }
  },
  methods: {
    disableSwitch() {
      return this.disableValue
    },
    fatherMethod(data) {
      this.disableValue = true
      this.activeName = 'two'
      // this.idList = JSON.stringify(data) // 选中数据
    }
  }
}
</script>
