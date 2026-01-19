import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "testTool" */ '@/pages/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "testTool" */ '@/pages/rightsDemo2/index.vue'),
    meta: {
      title: '表单',
    },
  },
  {
    path: '/table',
    name: 'table',
    component: () => import(/* webpackChunkName: "testTool" */ '@/pages/tableTest/index.vue'),
    meta: {
      title: 'table',
    },
  },
  {
    path: '/formTable',
    name: 'formTable',
    component: () => import(/* webpackChunkName: "testTool" */ '@/pages/tableTest/formTable.vue'),
    meta: {
      title: 'formTable',
    },
  },
  {
    path: '/stepForm',
    name: 'stepForm',
    component: () => import(/* webpackChunkName: "testTool" */ '@/pages/stepForm/index.vue'),
    meta: {
      title: 'stepForm',
    },
  },
  {
    path: '/dialogForm',
    name: 'dialogForm',
    component: () => import(/* webpackChunkName: "testTool" */ '@/pages/dialogForm/index.vue'),
    meta: {
      title: 'dialogForm',
    },
  },
];
export default routes;
