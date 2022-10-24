/*
 * @Description:
 * @Author: ahr
 * @Date: 2022-10-24 11:21:33
 * @LastEditTime: 2022-10-24 12:48:35
 */
import layout from '@/layout/index.vue'
export default {
  path: '/employees',
  component: layout,
  children: [
    // 默认子路由
    {
      path: '',
      component: () => import ('@/views/employees/index.vue'),
      meta: { title: '员工', icon: 'people' }
    }
  ]
}
