import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 在根模块定义数据和方法
  state: { // 数据
    count: 0,
    username: '张老五'
  },
  mutations: {
    // 同步代码
    add(state, num) {
      console.log('根模块的add方法')
      state.count += num
    }
  },
  actions: {
    addSync(context, num) { context.commit('add', num) }
  },
  // vuex的子模块
  // 分类管理代码, 有效防止index.js代码越来越多
  // 注册模块
  // 5. 模块化vuex，可以让每一个模块拥有自己的 state、mutation、action、 getters，使得结构非常清晰，方便管理。

  modules: {
    app,
    settings,
    user
  },
  // 4. 是state中数据的计算属性 - 类比computed
  getters
})

export default store
