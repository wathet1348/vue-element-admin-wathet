// 组织架构相关接口
import request from '@/utils/request.js'
// import store from '@/store/index.js'

/**
 * 获取公司组织架构
 *
 * @param Authorization
 * @returns success code message	data
 */
export const getDepartments = () => request({
  method: 'GET',
  url: '/company/department'
})

/**
 * 添加部门
 *
 * @param code	string	非必须		部门编码，同级部门不可重复
 * @param introduce	string	非必须		介绍
 * @param manager	string	非必须		负责人名称
 * @param name	string	非必须		部门名称
 * @param pid	string	非必须		父级部门ID
 *
 * @returns success code message	data
 */
export const addDept = data => request({
  method: 'POST',
  url: '/company/department',
  data
})

/**
 * 删除部门
 *
 * @param  id		部门ID
 *
 * @returns success code message	data
 */
export const delDept = id => request({
  method: 'DELETE',
  url: '/company/department/' + id
})

/**
 * 获取部门
 *
 * @param  id		部门ID
 *
 * @returns success code message	data
 */
export const getDeptDetail = id => request({
  method: 'GET',
  url: '/company/department/' + id
})

/**
 * 更新部门
 *
 * @param  data
 *
 * @returns success code message	data
 */
export const updateDept = data => request({
  method: 'PUT',
  url: '/company/department/' + data.id,
  data
})
