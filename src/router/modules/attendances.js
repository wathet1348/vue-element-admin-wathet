import layout from '@/layout/index.vue'
export default {
  path: '/attendances',
  component: layout,
  children: [{
    // 默认路由,访问'/attendances'直接访问下面页面
    path: '',
    component: () => import('@/views/attendances/index.vue'),
    meta: { title: '考勤', icon: 'skill' }
  }
  ]
}
