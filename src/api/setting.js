// 公司设置setting相关接口

import request from '@/utils/request'

/**
 * 查询全部企业列表
 *
 * @param
 *
 * @returns     data
 */
export const getCompanyInfo = id => request({
  method: 'GET',
  url: '/company/' + id
})

/**
 * 获取所有角色列表
 *
 * @param   page	是	1	页码
 * @param   pagesize	是	10	每页条数
 *
 * @returns success code message	data
 */
export const getAllRoles = params => request({
  method: 'GET',
  url: '/sys/role',
  params
})

/**
 * 添加角色
 *
 * @param   name	string	必须		角色名称
 * @param   description	string	必须		角色描述
 *
 * @returns success code message	data
 */
export const addRole = data => request({
  method: 'POST',
  url: '/sys/role',
  data
})

/**
 * 根据ID删除角色
 *
 * @param   id
 *
 * @returns success code message	data
 */
export const delRole = id => request({
  method: 'DELETE',
  url: `/sys/role/${id}`
})

/**
 * 根据ID获取角色详情
 *
 * @param   id
 *
 * @returns success code message	data
 */
export const getRoleDetail = id => request({
  method: 'GET',
  url: 'sys/role/' + id
})

/**
 * 根据ID更新角色
 *
 * @param   id
 *
 * @returns success code message	data
 */
export const updateRole = data => request({
  method: 'PUT',
  url: 'sys/role/' + data.id,
  data
})

/**
 * 给角色分配权限
 *
 * @param   id	string	必须
 * @param   permIds	string []	必须	item 类型: string
 *
 * @returns success code message	data
 */
export const assignPermissions = data => request({
  method: 'PUT',
  url: '/sys/role/assignPrem',
  data
})
