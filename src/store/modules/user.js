import { loginAPI } from '@/api/index.js'
import { getToken, setToken, removeToken } from '@/utils/auth.js'
// import { Message } from 'element-ui'

// 数据持久化
export default {
  // 支持前缀调用方法
  namespaced: true,
  // 定义vuex的用户模块
  // 1. 存储数据的地方 - 类比于vue文件的data()
  state: {
    token: getToken()
  },
  // 2. 外界修改store中state的属性值，必须通过mutations中设置的修改方法 - 类比methods
  // 注意：这里方法里面的代码和.vue文件中的书写方式有差异，注意区分
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    removeToken(state) {
      state.token = undefined
      removeToken()
    }
  },
  // 3. 涉及到异步操作后修改state数据时，必须先过actions中的自定义方法，通过actions去调用mutations中的方法
  actions: {
    async login(context, data) {
    /*  // 把处理放到响应拦截器中
      // 失败的处理
      try {
        const { data: { data: token, success, message }} = await loginAPI(data)
        // 获取token数据
        if (success) {
          context.commit('setToken', token)
        } else {
          Message.error(message)
        }
      } catch (error) {
        // 状态码错误
        console.log(error)
        Message.error('服务器异常,请稍后重试')
      }
      */
      console.log(loginAPI)
      const token = await loginAPI(data)
      console.log('token', token)
      context.commit('setToken', token)
    }
  }

}
