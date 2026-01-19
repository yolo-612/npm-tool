import type { IPageParams, IResList } from '@/types';

/* 小哥画像列表 */
export interface IPostPortraitListParams extends IPageParams {
  /** 画像编码 */
  code?: number;
  /** 画像名称 */
  name?: string;
  /** 画像状态 */
  status?: number;
  /** 创建类型 */
  createType?: number;
  /** 创建人工号 */
  creator?: string;
}
export type TPostPortraitListRes = IResList<{
  /** 画像编码 */
  code: string;
  /** 画像名称 */
  name: string;
  /** 人数 */
  empCount: number;
  /** 画像状态 */
  status: number;
  /** 创建方式 */
  createType: number;
  /** 更新方式 */
  updateType: number;
  /** 创建人 */
  creator: string;
  /** 更新时间 */
  modifyTime: string;
  /** 结束时间 */
  invalidTime: string;
  /** 有效期类型 */
  validType: 0 | 1;
}>;

/* 小哥画像开始/结束/详情 */
export interface IPostPortraitStatusParams {
  /** 画像编码 */
  code: string;
}

/* 小哥画像详情 */
export interface IPostPortraitDetailRes {
  /** 画像名称 */
  name?: string;
  /** 编码 */
  code?: string;
  /** 状态 */
  status?: number;
  /** 创建类型 */
  createType?: string;
  /** 更新类型 */
  updateType?: string;
  /** 生效类型 */
  validType?: string;
  /** 失效时间 */
  invalidTime?: string;
  /** 画像文件地址 */
  url?: string;
  /** 备注 */
  remark?: string;
  /** 必须的ID */
  id: number;
}

/* 新增/修改小哥画像 */
export interface IPostPortraitUpdateParams {
  /** 画像ID */
  id?: number;
  /** 画像名称 */
  name?: string;
  /** 编码 */
  code?: string;
  /** 状态 */
  status?: number;
  /** 创建类型 */
  createType?: number;
  /** 更新类型 */
  updateType?: number;
  /** 生效类型 */
  validType?: number;
  /** 失效时间 */
  invalidTime?: string;
  /** 画像文件地址 */
  url?: string;
  /** 备注 */
  remark?: string;
}
