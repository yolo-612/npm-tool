
const routesList = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: ()=>import(/* webpackChunkName:'home' */'@/pages/home.vue'),
    meta: {
      title: '首页',// 页面tab显示的名称
      // 有menu对象就会在菜单显示
      menu:{
        title:'首页',// 菜单显示的名称
        icon: 'Menu',// 菜单icon
      },
    },
  },
  {
    path: '/operation',
    name: 'operation',
    component: ()=>import(/* webpackChunkName:'operation' */'@/pages/operation.vue'),
    meta: {
      title: '操作',// 页面tab显示的名称
      // 有menu对象就会在菜单显示
      menu:{
        title:'操作页',// 菜单显示的名称
        icon: 'operation',// 菜单icon
      },
    },
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import(/* webpackChunkName:'404' */ '@/pages/404.vue'),
    meta: {
      title: '404',
    },
  },
]

export const routes = routesList
