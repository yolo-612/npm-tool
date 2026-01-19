import { request } from '@/apis/request';
import type {
  IQueryDragonDetailParams,
  ISaveDragonDetailParams,
  IRaisingDragonConfigType,
} from './types';

const INTERFACE_ACTIVITY = '/activity-web-backend/im-activity/web';

/**
 * 育龙换肤ui配置详情
 */
export const queryDragonDetail = (data: IQueryDragonDetailParams) => request<{configList: IRaisingDragonConfigType }>({
  url: `${INTERFACE_ACTIVITY}/dragon/template/detail`,
  method: 'post',
  data,
});

/**
 * 育龙换肤ui配置保存/更新
 * @param data ISaveDragonDetailParams
 * @returns
 */
export const saveDragonInfo = (data: ISaveDragonDetailParams) => request({
  url: `${INTERFACE_ACTIVITY}/dragon/template/saveOrUpdate`,
  method: 'post',
  data,
});
