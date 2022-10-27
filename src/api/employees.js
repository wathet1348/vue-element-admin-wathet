// 员工管理相关接口

import request from '@/utils/request.js'
// import store from '@/store/index.js'

/**
 * 获取员工简单列表
 *
 * @param Authorization
 * @returns success code message	data.id data.username
 */
export const getEmployeesSimple = () => request({
  method: 'GET',
  url: '/sys/user/simple'
})
