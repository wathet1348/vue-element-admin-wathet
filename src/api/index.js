// 统一接口出口文件
import { login, getUserBaseInfo, getEmployeeBaseInfo } from './user.js'
import { getDepartments, addDept, delDept, getDeptDetail, updateDept } from './department.js'
import { getEmployeesSimple } from './employees.js'
import { addRole, assignPermissions, delRole, getAllRoles, getCompanyInfo, getRoleDetail, updateRole } from './setting.js'

// 统一导出
export const loginAPI = login
export const getUserBaseInfoAPI = getUserBaseInfo
export const getEmployeeBaseInfoAPI = getEmployeeBaseInfo
export const getDepartmentsAPI = getDepartments
export const getEmployeesSimpleAPI = getEmployeesSimple
export const addDeptAPI = addDept
export const delDeptAPI = delDept
export const getDeptDetailAPI = getDeptDetail
export const updateDeptAPI = updateDept
export const getCompanyInfoAPI = getCompanyInfo
export const getAllRolesAPI = getAllRoles
export const addRoleAPI = addRole
export const delRoleAPI = delRole
export const getRoleDetailAPI = getRoleDetail
export const updateRoleAPI = updateRole
export const assignPermissionsAPI = assignPermissions

