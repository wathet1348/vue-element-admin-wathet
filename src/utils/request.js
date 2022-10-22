// import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// // create an axios instance
// const service = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 5000 // request timeout
// })

// // request interceptor
// service.interceptors.request.use(
//   config => {
//     // do something before request is sent

//     if (store.getters.token) {
//       // let each request carry token
//       // ['X-Token'] is a custom headers key
//       // please modify it according to the actual situation
//       config.headers['X-Token'] = getToken()
//     }
//     return config
//   },
//   error => {
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )

// // response interceptor
// service.interceptors.response.use(
//   /**
//    * If you want to get http information such as headers or status
//    * Please return  response => response
//   */

//   /**
//    * Determine the request status by custom code
//    * Here is just an example
//    * You can also judge the status by HTTP Status Code
//    */
//   response => {
//     const res = response.data

//     // if the custom code is not 20000, it is judged as an error.
//     if (res.code !== 20000) {
//       Message({
//         message: res.message || 'Error',
//         type: 'error',
//         duration: 5 * 1000
//       })

//       // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         // to re-login
//         MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//           confirmButtonText: 'Re-Login',
//           cancelButtonText: 'Cancel',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('user/resetToken').then(() => {
//             location.reload()
//           })
//         })
//       }
//       return Promise.reject(new Error(res.message || 'Error'))
//     } else {
//       return res
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

// export default service

import axios from 'axios'
const request = axios.create({
  // baseURL: 'http://ihrm.itheima.net/prod-api'
  // baseURL: 'http://ihrm-java.itheima.net/api'
  baseURL: '/prod-api' // 完整地址:http:''localhost:8080/prod-api(DevServer地址)
})
// 通过拦截器,每次发送请求,都会调用方法
// 通过扩展axios 代码片段airu快捷生成
request.interceptors.request.use(config => {
// Do something before request is sent
  console.log(333)
  return config
}, error => {
// Do something with request error
  return Promise.reject(error)
})
// 响应拦截器,每次响应返回,都会调用方法
request.interceptors.response.use(response => {
// Do something before response is sent
  const { data: { data, success, message }} = response
  if (success) {
    // 返回最终数据
    console.log(11)
    console.log(data)
    return data
  } else {
    // 提示错误信息
    Message.error(message)
    // 登录出错时抛出一个错误,不让页面发生跳转
    throw new Error(message)
  }
}, error => {
// Do something with response error
  // 有报错,比如状态码错误
  Message.error('服务器异常,请稍后重试')
  return Promise.reject(error)
})
export default request
