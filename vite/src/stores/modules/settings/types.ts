export interface Settings {
  theme?: 'red' | 'blue' | 'orange'; // 颜色主题
  tabBar?: boolean; // 是否显示标签页
  ignoreTabBarPersistent?: boolean; // 是否忽略标签页持久化
  breadcrumb?: boolean; // 是否显示面包屑
  enablePermission?: boolean; // 是否启用权限验证
  ignoreRouteCache?: boolean; // 是否忽略路由缓存
  hiddenNewCodeTool?: boolean; // 是否隐藏代码文件自动生成按钮
  hiddenTopHeader?: boolean;// 是否隐藏顶部header
  /**
   * 路由数据来源
   * @默认值 `'frontend'` 前端
   * @可选值 `'filesystem'` 文件系统
   */
  routeBaseOn?: 'frontend' | 'filesystem';
  // 菜单配置
  menu?:{
    /**
     * 导航栏数据来源，当 `app.routeBaseOn: 'filesystem'` 时生效
     * @默认值 `'routes'` 根据前端路由生成（仅支持路由模式为手动编写）
     * @可选值 `'frontend'` 后端
     * @可选值 `'backend'` 后端
     */
    baseOn?:'routes' | 'frontend' | 'backend';
  },
}
