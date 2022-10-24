// 统一接口出口文件
import { login, getUserBaseInfo, getEmployeeBaseInfo } from './user.js'

// 统一导出
export const loginAPI = login
export const getUserBaseInfoAPI = getUserBaseInfo
export const getEmployeeBaseInfoAPI = getEmployeeBaseInfo
