import operation from './operation'
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
      menu:{
        show:true,// 是否在菜单显示，true才会在菜单显示
        title:'',// 菜单显示的名称,如果为空会复用meta.title
        icon:'Menu',// 菜单icon
      },
    },
  },
  ...operation,
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
