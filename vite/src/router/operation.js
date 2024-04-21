export default [
  {
    path: '/operation',
    name: 'operation',
    component: ()=>import(/* webpackChunkName:'operation' */'@/pages/operation/operation.vue'),
    meta: {
      title: '操作页',// 页面tab显示的名称
      menu:{
        show:true,// 是否在菜单显示，true才会在菜单显示
        icon:'operation',// 菜单icon
      },
    },
  },
]
