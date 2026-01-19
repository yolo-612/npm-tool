/**
 * 百源接口响应类型
 */
export interface BaspHttpResponse {
  succ: 'ok' | string;
  result: [];
  msg: string;
}

/**
 * 百源角色对象
 */
export interface BaspRole {
  roleId: string; // 角色id
  roleCode: string; // 角色编码
  roleName: string; // 角色名称
  isDefaultRole: '0' | '1'; // 是否默认角色(0：否，1：是)
  subsysCode: string; // 子系统编码
}

/**
 * 百源模块对象
 */
export interface BaspModule {
  moduleId: string; // 模块id
  moduleCode: string; // 模块编码
  moduleName: string; // 模块名称
  subsysCode: string; // 子系统编码
  hidden: 'N' | 'Y'; // 是否隐藏
  parentId: string; // 父模块id
  /** 父模块路径 */
  parentPath?: string;
  moduleIcon: string; // icon
  moduleType: '1' | '2' | '3' | '4'; // 类型 1子系统 2模块 3菜单目录 4功能等
  sort: ''; // 排序
  actionUrl?: ''; // 功能url，后端用来鉴权用的，接口不会返回
  helpUrl: ''; // 服务url
  childModules: BaspModule[];
}
