export default {
  // 支持前缀调用方法
  namespaced: true,
  // 定义vuex的用户模块
  state: {
    count: 100,
    token: 'afjafanifap'
  },
  mutations: {
    add(state, num) {
      console.log('子模块的方法')
      state.count += num
    }
  },
  actions: {
  }

}
