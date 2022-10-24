// 用户相关接口
import request from '@/utils/request.js'
// import store from '@/store/index.js'

/**
 * 用户登录
 *
 * @param mobile	string	必须
 * @param password	string	必须
 * @returns success code message	data
 */
export const login = data => request({
  method: 'POST',
  url: '/sys/login',
  data
})

/**
 * 获取用户基本信息
 *
 */
export const getUserBaseInfo = () => request({
  method: 'POST',
  url: '/sys/profile'
  // headers: {
  //   Authorization: 'Bearer ' + store.state.user.token
  // }
})

/**
 * 获取员工基本信息
 *
 * @param : id  用户id
 *
 */
export const getEmployeeBaseInfo = id => request({
  method: 'GET',
  url: '/sys/user/' + id
  // headers: {
  //   Authorization: 'Bearer ' + store.state.user.token
  // }
})
