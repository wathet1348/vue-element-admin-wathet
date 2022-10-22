// 用户相关接口
import request from '@/utils/request'

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

