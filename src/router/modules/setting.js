import layout from '@/layout/index.vue'
export default {
  path: '/setting',
  component: layout,
  children: [{
    // 默认路由,访问'/setting'直接访问下面页面
    path: '',
    component: () => import('@/views/setting/index.vue'),
    meta: { title: '公司设置', icon: 'setting' }
  }
  ]
}
