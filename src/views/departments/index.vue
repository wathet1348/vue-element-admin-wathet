<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <TreeTools :data="company">
          <el-dropdown-item @click.native="onAdd(company)">添加子部门</el-dropdown-item>
        </TreeTools>
        <el-tree
          :data="list"
          :props="{ label:'name' }"
          default-expand-all
          :expand-on-click-node="false"
        >
          <template v-slot="{ data }">
            <TreeTools :data="data">
              <el-dropdown-item @click.native="onAdd(data)">添加子部门</el-dropdown-item>
              <el-dropdown-item @click.native="onUpdate(data)">编辑部门</el-dropdown-item>
              <el-dropdown-item @click.native="onDel(data.id)">删除部门</el-dropdown-item>
            </TreeTools>

            <!-- <el-row type="flex" style="width: 100%;">
              <el-col>{{ data.name }}</el-col>
              <el-col>
                <el-row type="flex" justify="end">
                  {{ data.manager }}
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      操作<i class="el-icon-arrow-down el-icon--right" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑部门</el-dropdown-item>
                      <el-dropdown-item>删除部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-row>
              </el-col>
            </el-row> -->
          </template>
        </el-tree>
      </el-card>
    </div>
    <add-dept
      ref="addDept"
      :show-dialog.sync="showDialog"
      :node="currentNode"
      @success="getList"
    ></add-dept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
import { delDeptAPI, getDepartmentsAPI, getDeptDetailAPI } from '@/api/index.js'
import { translateListToTree } from '@/utils/index.js'
export default {
  name: 'DepartmentsPage',
  components: { TreeTools, AddDept },
  data() {
    return {
      showDialog: false, // 控制对话框的显示
      currentNode: {}, // 当前操作的部门
      company: { name: '', manager: '负责人', id: '' },
      list: []
    }
  },
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    // 获取列表数据
    async getList() {
      // 加载提示
      const loading = this.$loading()
      const res = await getDepartmentsAPI()
      this.list = translateListToTree(res.depts.filter(t => t.pid !== '-1'), '')
      // console.log(res)
      this.company.name = res.companyName
      loading.close()
    },
    // 添加部门
    onAdd(node) {
      // console.log('点击添加部门')
      this.currentNode = node
      this.showDialog = true
    },
    // 更新部门
    async onUpdate(node) {
      // console.log(node)
      // 通过ref直接通信不需要传值
      // 保存当前部门
      this.currentNode = node
      this.$refs.addDept.form = await getDeptDetailAPI(node.id)
      this.showDialog = true
    },
    // 删除部门
    onDel(id) {
      console.log(id)
      // 通过elmecon
      // 确认删除
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async action => {
        // 发送请求
        await delDeptAPI(id)
        // 操作提示
        this.$message.success('删除成功')
        // 刷新
        this.getList()
      }).catch(() => {
        this.$message.error('删除失败,请稍后重试')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}

.el-dropdown {
  margin-left: 10px;
}
</style>
