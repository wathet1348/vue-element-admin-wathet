<!-- 新增部门 和 更新部门 页面 -->
<template>
  <div>
    <el-dialog
      :visible="showDialog"
      v-bind="$attrs"
      :title="form.id?'编辑部门':'新增部门'"
      v-on="$listeners"
      @open="onOpen"
      @close="onClose"
    >
      <el-form ref="formRef" :model="form" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入部门名称" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="form.code" placeholder="请输入部门编码" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select v-model="form.manager" placeholder="请输入部门负责人" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in managerOptions"
              :key="index"
              :label="item.username"
              :value="item.username"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input
            v-model="form.introduce"
            type="textarea"
            placeholder="请输入部门介绍"
            :autosize="{minRows: 4, maxRows: 4}"
            :style="{width: '100%'}"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </el-row>
    </el-dialog></div>
</template>
<script>
import { getEmployeesSimpleAPI, getDepartmentsAPI, addDeptAPI, updateDeptAPI } from '@/api/index.js'
export default {
  components: {},
  inheritAttrs: false,
  props: {
    showDialog: {
      type: Boolean,
      required: true
    },
    node: {
      // 新增 - 父部门  / 编辑 - 当前部门
      type: Object,
      required: true
    }
  },
  data() {
    // 自定义校验
    const checkName = async(rules, value, callback) => {
      // 同级部门中禁止出现重复部门
      // 分析有哪些数据,和数据操作
      // 父部门,this.node
      // 所有部门,通过接口getDepartments方法
      // 同级部门,要添加部门的兄弟部门,filter,部门的pid等于父部门id
      // 不允许重复,find(符合条件第一个),filter(符合条件所有)
      const { depts } = await getDepartmentsAPI()
      // 区别新增和编辑
      let brothers
      if (this.form.id) {
        // 编辑
        brothers = depts.filter(el => el.pid === this.node.pid && el.id !== this.node.id)
      } else {
        // 新增
        brothers = depts.filter(el => el.pid === this.node.id)
      }
      if (brothers.find(el => el.code === value)) {
        callback('同级部门存在重复的名称')
      } else {
        callback()
      }
    }
    const checkCode = async(rules, value, callback) => {
      // 部门编码在整个模板中都不允许重复
      // 分析有哪些数据和数据操作
      // 部门编码,当前表单新增的部门编码this.form.code / value
      // 整个模块,所有的其他部门的编码,通过接口getDepartmentsAPI获取
      // 不允许重复,find(返回符合条件第一个),filter(符合条件所有)
      /*
      const { depts } = await getDepartmentsAPI()
      let result
      if (this.form.id) {
        // 编辑
        result = depts.filter(el => el.id !== this.node.id).find(el => el.code === value)
      } else {
        // 新增
        result = depts.find(el => el.code === value)
      }
      if (result) {
        callback('存在重复的编码')
      } else {
        callback()
      }
    */
      let { depts } = await getDepartmentsAPI()
      if (this.form.id) {
        // 编辑
        // result = depts.filter(el => el.id !== this.node.id).find(el => el.code === value)
        depts = depts.filter(el => el.id !== this.node.id)
      }
      depts.find(el => el.code === value) ? callback('存在重复的编码') : callback()
    }
    return {
      form: {
        name: undefined,
        code: undefined,
        manager: undefined,
        introduce: undefined
      },
      rules: {

        name: [
          // 部门名称（name）：必填 1-50个字符 / 同级部门中禁止出现重复部门
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 1, max: 50, message: '1-50个字符', trigger: 'blur' },
          { // 自定义校验
            validator: checkName, trigger: 'blur'
          }
        ],
        code: [
          // 部门编码（code）：必填 1-50个字符 / 部门编码在整个模块中都不允许重复
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { min: 1, max: 50, message: '1-50个字符', trigger: 'blur' },
          { // 自定义校验
            validator: checkCode, trigger: 'blur'
          }
        ],
        manager: [
        // 部门负责人（manager）：必填
          { required: true, message: '请输入部门负责人', trigger: 'change' }
        ],
        introduce: [
          // 部门介绍 ( introduce)：必填 1-300个字符
          { required: true, message: '请输入部门介绍', trigger: 'blur' }
        ]
      },
      managerOptions: []
    }
  },
  computed: {},
  watch: {},
  created() {
    // 获取员工简单列表
    this.loadEmployeesSimple()
  },
  mounted() {},
  methods: {
    onOpen() { },
    // 取消
    onClose() {
      // .resetFields()
      // 对整个表单进行充值,将所有字段值充值为初始值并移除校验结果
      this.$refs['formRef'].resetFields()
      this.form = {
        name: undefined,
        code: undefined,
        manager: undefined,
        introduce: undefined
      }
      this.$emit('update:showDialog', false)
    },
    // 确定
    handelConfirm() {
      this.$refs['formRef'].validate(async valid => {
        if (!valid) return
        if (this.form.id) {
          // 编辑
          await updateDeptAPI(this.form)
          this.$parent.getList()
        } else {
          // 新增
        // 发请求
          await addDeptAPI({ ...this.form, pid: this.node.id })
        }
        // 提示成功
        this.$message.success('操作成功')
        // 刷新列表
        this.$emit('success')
        // 关闭对话框
        this.onClose()
      })
    },
    // 调用接口获取员工简单列表
    async loadEmployeesSimple() {
      this.managerOptions = await getEmployeesSimpleAPI()
    }
  }
}

</script>
<style>
</style>
