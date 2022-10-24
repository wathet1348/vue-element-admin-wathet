import layout from '@/layout/index.vue'
export default {
  path: '/departments',
  component: layout,
  children: [{
    // 默认路由,访问'/departments'直接访问下面页面
    path: '',
    component: () => import('@/views/departments/index.vue'),
    meta: { title: '组织架构', icon: 'tree' }
  }
  ]
}
