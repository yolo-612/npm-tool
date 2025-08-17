import type { MenuItem } from '@/stores/modules/menu/types';

const menus: MenuItem[] = [
  {
    path: '/dashboard/workplace',
    title: '工作台-frontend',
    icon: 'HomeFilled',
    order: 100,
    children: [],
  },
  {
    path: '/multiDialogMan',
    title: '多弹窗管理',
    icon: 'Opportunity',
    children: [
      {
        path: '/multiDialogMan/background',
        title: '背景',
        children: [],
      },
      {
        path: '/multiDialogMan/solution',
        title: '解决方案',
        children: [],
      },
      {
        path: '/multiDialogMan/config',
        title: '弹窗项配置',
        children: [],
      },
    ],
  },
  {
    path: '/configComp',
    title: '配置化组件',
    icon: 'Opportunity',
    children: [
      {
        path: '/configComp/formExample',
        title: '表单案例',
        children: [],
      },
      {
        path: '/configComp/formExampleNpm',
        title: '表单案例-NPM',
        children: [],
      },
      {
        path: '/configComp/tableExample',
        title: '表格案例',
        children: [],
      },
      {
        path: '/configComp/searchTableExample',
        title: '组合搜索表格案例',
        children: [],
      },
    ],
  },
]
export default menus;
