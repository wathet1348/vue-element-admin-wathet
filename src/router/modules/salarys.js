import layout from '@/layout/index.vue'
export default {
  path: '/salarys',
  component: layout,
  children: [{
    // 默认路由,访问'/salarys'直接访问下面页面
    path: '',
    component: () => import('@/views/salarys/index.vue'),
    meta: { title: '工资', icon: 'table' }
  }
  ]
}
