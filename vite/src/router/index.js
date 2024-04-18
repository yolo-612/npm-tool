import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: ()=>import(/* webpackChunkName:'home' */'../pages/home.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: '404',
      component: () => import(/* webpackChunkName:'404' */ '@/pages/404.vue'),
      meta: {
        title: 'Vite - 404',
      },
    },
  ]
})

export default router
