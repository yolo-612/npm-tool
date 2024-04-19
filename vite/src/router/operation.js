export default [
  {
    path: '/operation',
    name: 'operation',
    component: ()=>import(/* webpackChunkName:'operation' */'@/pages/operation/operation.vue'),
    meta: {
      title: '操作页',// 页面tab显示的名称
      // 有menu对象就会在菜单显示
      menu:{
        title:'操作页',// 菜单显示的名称
        icon:'operation',// 菜单icon
      },
    },
  },
]
