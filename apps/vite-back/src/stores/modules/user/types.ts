export interface UserInfo {
  isLogin?: boolean; // 是否登录
  empCode: string; // 用户id，工号
  permissions: string[]; // 权限列表
  roles: string[]; // 当前角色code集合，多角色时有多个code
  roleCode: string; // 当前角色code
  roleName: string; // 当前角色名称
  RoleData: RoleItem[]; // 角色数据
}

export interface RoleItem {
  roleCode: string; // 角色code
  roleName: string; // 角色名称
  roleId: string; // 角色id
  permissions: string[]; // 角色权限列表
}
