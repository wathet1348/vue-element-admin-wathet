<!--
 * @Description:
 * @Author: ahr
 * @Date: 2022-10-24 14:46:16
 * @LastEditTime: 2022-10-27 14:57:10
-->
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs>
        <el-tab-pane label="角色管理">
          <el-row>
            <el-button type="primary" size="small" @click="addRole">新增角色</el-button>
          </el-row>
          <el-table
            :data="list"
            border
            stripe
            style="width: 100%"
          >
            <el-table-column
              label="序号"
              type="index"
              align="center"
              width="120"
            >
            </el-table-column>
            <el-table-column
              label="角色"
              prop="name"
              align="center"
              width="240"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="description"
              label="描述"
            >
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  size="small"
                >分配角色</el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column></el-table>
          <el-row type="flex" justify="end">
            <el-pagination
              layout="prev, pager, next"
              :page-size="page.pagesize"
              :total="page.total"
              @current-change="currentChangeFn"
            >
            </el-pagination>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息">
          <!-- el-form>(el-form-item[label=""]>el-input[v-model=""])*4快速生成 -->
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
          >
          </el-alert>
          <el-form label-width="80px" style="width: 400px; margin-top: 20px">
            <el-form-item label="公司名称">
              <el-input v-model="form.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="form.companyAddress" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input v-model="form.mailbox" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.remarks" type="textarea" disabled style="height: 40px;"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 新增角色和编辑角色 -->
    <el-dialog :visible="showPopUp" v-bind="$attrs" title="编辑角色" v-on="$listeners" @open="onOpen" @close="onClose">
      <el-form ref="formRef" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入角色名称" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="formData.description" placeholder="请输入角色描述" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addRoleAPI, delRoleAPI, getAllRolesAPI, getCompanyInfoAPI, getRoleDetailAPI, updateRoleAPI } from '@/api/index.js'
export default {
  name: 'SettingPage',
  components: {},
  data() {
    return {
      form: {}, // 公司信息
      list: [], // 承接数组
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 10,
        total: 0 // 记录总数
      },
      showPopUp: false, // 弹窗显示与隐藏的状态值
      // 弹窗数据
      formData: {
        name: undefined,
        description: undefined
      },
      // 弹窗校验
      rules: {
        name: [{
          required: true,
          message: '请输入角色名称',
          trigger: 'blur'
        }],
        description: [{
          message: '请输入角色描述',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    // 获取角色信息
    this.loadGetAllInfo()
    // 获取企业信息
    this.loadGetCompanyInfo()
  },
  mounted() {},
  methods: {
    // 调用接口获取角色信息
    async loadGetAllInfo() {
      const { rows, total } = await getAllRolesAPI(this.page)
      // console.log(rows, total)
      this.list = rows
      this.page.total = total
    },
    // 页数改变调用的方法
    currentChangeFn(value) {
      // console.log('当前页数', value)
      this.page.page = value
      this.loadGetAllInfo()
    },
    // 新增角色
    addRole() {
      this.showPopUp = true
    },
    // 弹窗
    onOpen() {
    // 打开弹窗就立即触发的事件
    },
    // 取消
    onClose() {
      this.$refs['formRef'].resetFields()
      // this.formData = {
      //   name: undefined,
      //   description: undefined
      // }
      this.formData = this.$options.data().formData
      this.showPopUp = false
    },
    // 确定
    handelConfirm() {
      this.$refs['formRef'].validate(async valid => {
        if (!valid) return
        console.log(this.list)
        if (!this.formData.id) {
          // 添加
          this.loadAddRole()
        } else {
          // 编辑
          await updateRoleAPI(this.formData)
        }
        this.loadGetAllInfo()
        // 提示成功
        this.$message.success('操作成功')
        // 刷新列表
        this.loadGetAllInfo()
        // 关闭对话框
        this.onClose()
      })
    },
    // 编辑角色
    async handleEdit(index, row) {
      // console.log(index, row)
      const res = await getRoleDetailAPI(row.id)
      console.log(res)
      this.showPopUp = true
      this.formData = res
    },
    // 删除角色
    async handleDelete(index, row) {
      console.log(index, row)
      console.log(row.id)
      // 通过elmecon
      // 确认删除
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async action => {
        // 发送请求
        await delRoleAPI(row.id)
        // 操作提示
        this.$message.success('删除成功')
        // 刷新
        this.loadGetAllInfo()
      }).catch(() => {
        this.$message.error('删除失败,请稍后重试')
      })
    },
    // 调用增加角色接口
    async loadAddRole() {
      const res = await addRoleAPI(this.formData)
      // console.log(res)
      console.log(res)
    },
    // 调用查询全部企业列表接口
    async loadGetCompanyInfo() {
      const res = await getCompanyInfoAPI(this.$store.state.user.userInfo.companyId)
      // console.log(res)
      this.form = res
    }

  }
}
</script>

<style lang="scss" scoped>
  .el-table{
    margin-top: 15px;

  }
</style>
