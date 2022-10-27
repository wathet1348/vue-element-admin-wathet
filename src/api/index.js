// 统一接口出口文件
import { login, getUserBaseInfo, getEmployeeBaseInfo } from './user.js'
import { getDepartments, addDept, delDept, getDeptDetail, updateDept } from './department.js'
import { getEmployeesSimple } from './employees.js'

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
