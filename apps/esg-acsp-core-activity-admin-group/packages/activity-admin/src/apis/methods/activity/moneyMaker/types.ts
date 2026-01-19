/**
 * @description 接口参数类型
 */

import type { E_RAISING_DRAGON } from '@/pages/activity/moneyMaker/raisingDragon/modules/enums';

/** 育龙UI配置详情页参数 */
export interface IQueryDragonDetailParams {
  /** 模式 0-普通 1-大件 2-育龙挑战 */
  activityModel: E_RAISING_DRAGON;
}

/** 页面的配置信息 */
export interface IRaisingDragonConfigType {
  /** 活动模板code */
  templateCode: string,
  /** json 配置 */
  uiJson: string;
}

export interface ISaveDragonDetailParams {
  /** 模式 0-普通 1-大件 2-育龙挑战 */
  activityModel: E_RAISING_DRAGON;
  /** 配置项 */
  configList: IRaisingDragonConfigType[];
}
