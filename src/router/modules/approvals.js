import layout from '@/layout/index.vue'
export default {
  path: '/approvals',
  component: layout,
  children: [{
    // 默认路由,访问'/approvals'直接访问下面页面
    path: '',
    component: () => import('@/views/approvals/index.vue'),
    meta: { title: '审批', icon: 'tree-table' }
  }
  ]
}
