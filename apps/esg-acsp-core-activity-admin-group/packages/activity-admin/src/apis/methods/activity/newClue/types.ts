import type { IResList, IPageParams } from '@/types';

/* queryRange接口 */
export interface IQueryRangeParams {
  /* 当前范围code */
  rangeCode?: string;
  /* 查找类型，0：区，1：分部，2：网点 */
  type?: number;
}

export interface IQueryRangeResItem {
  /* 范围code */
  code: string;
  /* 范围名称 */
  name: string;
  /* 范围层级 */
  type: number;
}

/* 查询小哥 */
export interface IQueryStaffResItem {
  /* 小哥工号 */
  empCode: string;
  /* 小哥名称 */
  empName: string;
  /* 小哥所在网点 */
  deptCode: number;
}

export interface ITransferParams {
  /* 客户id */
  idList: string[];
  /* 小哥工号 */
  empCode: string;
  /* 小哥姓名 */
  empName: string;
  /* 当前角色 */
  role: string;
}

/* 查询日志详情 */
export interface IQueryOperationDetailParam extends IPageParams {
  /* 场景类型，固定值："NEWSIGN" */
  // sceneType: string;
  /* 源类型，固定值："NEWSIGN_CHANGE" */
  // sourceType: string;
  /* 源Id，即线索id */
  sourceId: number;
}

export type TQueryOperationDetailRes = IResList<{
  /* 线索id */
  id: string;
  /* 原始小哥工号 */
  previousEmpCode: string;
  /* 接受小哥工号 */
  modifiedEmpCode: string;
  /* 维护人工号 */
  operatorEmpCode: string;
  /* 维护时间 */
  operateTime: string;
}>;

/* 查询线索列表 */
export interface IQueryClueParams extends IPageParams {
  /* 加密手机号列表字符串 */
  phone?: string;
  /* 小哥工号列表字符串 */
  empCode?: string;
  /* 地区编码列表 */
  areaCodeList?: string[];
  /* 分部编码列表 */
  divisionCodeList?: string[];
  /* 网点编码列表 */
  deptCodeList?: string[];
  /* 线索状态列表 */
  stateList?: string[];
  /* 线索月份列表 */
  monthList?: string[];
}

export type TQueryClueRes = IResList<{
  /* 线索id */
  id?: number;
  /* 线索月份 */
  month?: string;
  /* 加密手机号 */
  phone?: string;
  /* 客户名称 */
  customerName?: string;
  /* 小哥工号 */
  empCode?: string;
  /* 小哥名称 */
  empName?: string;
  /* 线索状态，‘0’表示初始化，‘11’表示已推广，‘99’表示已完成 */
  state?: string;
  /* 小哥区域编码 */
  areaCode?: string;
  /* 小哥分部编码 */
  divisionCode?: string;
  /* 小哥网点编码 */
  deptCode?: string;
}>;

/* 字典 */
export interface IQueryDictParams {
  /* 字典类型 promotion_state_list  */
  typeCodeList: string[];
}
export interface IQueryDictRes {
  [key: string]: {
    name: string;
    code: string;
  }[];
}
