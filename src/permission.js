import router from '@/router/index.js'
import store from '@/store/index.js'
// 前置守卫
router.beforeEach(async function(to, from, next) {
  // to, 对象,存储跳转之后页面信息
  // from,对象, 存储当前页面信息
  // next方法,决定是否允许跳转.next()允许继续访问,next('路径地址')
  // 白名单处理
  if (['/login', '/404', 'learn-vuex'].includes(to.path)) {
    return next()
  }
  // 判断当前用户是否登录
  if (store.state.user.token) {
    //   判断用户信息是否为空
    if (!store.state.user.userInfo.userId) {
      await store.dispatch('user/getInfo')
    }
    next()
  } else {
    next('/login')
  }
})
// 后置守卫
router.afterEach(function(to, from) {

})
