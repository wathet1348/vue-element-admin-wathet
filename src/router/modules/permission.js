import layout from '@/layout/index.vue'
export default {
  path: '/permission',
  component: layout,
  children: [{
    // 默认路由,访问'/permission'直接访问下面页面
    path: '',
    component: () => import('@/views/permission/index.vue'),
    meta: { title: '权限管理', icon: 'lock' }
  }
  ]
}
