import { DEFAULT_LAYOUT } from '@/router/base';


export default {
  path: '/operation',
  name: 'operation',
  component: DEFAULT_LAYOUT,
  redirect: '/operation/index',
  meta: {
    title: '运营位', // 页面tab显示的名称
    icon: 'operation', // 菜单icon
    permission: [/^operation_/], // 权限标识，用于菜单隐藏和页面权限判断,默认没有这个字段时都有权限，有这个字段再根据权限判断
  },
  children: [
    {
      path: '/operation/index',
      name: 'operationIndex',
      component: ()=>import(/* webpackChunkName:'operation' */'@/pages/operation/index.vue'),
      meta: {
        title: '运营位', // 页面tab显示的名称
        permission: [/^operation12_/], // 权限标识，用于菜单隐藏和页面权限判断,默认没有这个字段时都有权限，有这个字段再根据权限判断
        activeMenu: '/operation',
        hideInMenu: true,
      }
    },
  ], 
}
