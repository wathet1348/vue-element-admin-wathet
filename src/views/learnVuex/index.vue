<template>
  <div class="index_container">
    学习vuex 的高级语法
    <div>
      <p>获取数据</p>
      <p>根模块count = {{ $store.state.count }} username={{ username }}</p>
      <p>页面数据 count = {{ count }}</p>
      <!-- 不可以 -->
      <!-- <p>子模块count = {{ $store.user.state.count }}</p> -->
      <p>子模块count = {{ $store.state.user.count }} token= {{ token }}</p>
      <p>调用方法</p>
      <!-- 默认:调用2个模块的同名方法 -->
      <el-button type="primary" size="default" @click="$store.commit('add',1)">默认:调用2个模块的同名方法</el-button>
      <!-- 加上前缀调用模块里面方法 -->
      <el-button type="primary" size="default" @click="$store.commit('add',1)">加上前缀调用模块里面方法</el-button>

      <p>学习icon图标的使用</p>
      <div>
        <svg-icon icon-class="eye" class-name="color-red"></svg-icon>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'IndexIndex',
  data() {
    return {
      // 因为count 在这里是基本数据类型,所以不能简单赋值,因此要用到计算属性
    }
  },
  computed: {
    // 当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：
    // 返回了一个对象,{{ count(){},username(){} }}

    // 获取根模块
    ...mapState(['count', 'username']),

    // 获取子模块
    ...mapState('user', ['token'])

    // count() {
    //   return this.$store.state.count
    // },
    // username() {
    //   return this.$store.state.username
    // }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
    .color-red {
        color: red;
    }
</style>
