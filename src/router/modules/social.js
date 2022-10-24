import layout from '@/layout/index.vue'
export default {
  path: '/social',
  component: layout,
  children: [{
    // 默认路由,访问'/social'直接访问下面页面
    path: '',
    component: () => import('@/views/social/index.vue'),
    meta: { title: '社保', icon: 'table' }
  }
  ]
}
