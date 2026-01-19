import { request } from '@/apis/request';
import type {
  IReqBatchDictList,
  IReqGetByPage,
  IReqGetDetailInfo,
  IReqGetList,
  IReqSaveOrUpdate,
  IResBatchDictList,
  IResGetByPage,
  IResGetDetailInfo,
  IResGetList,
  IResSaveOrUpdate,
} from './types';

const BASE_PREFIX = '/activity-web-backend/im-activity/web';

/** 获取单条字典 */
export const getDict = (data: IReqGetList) => request<IResGetList>({ url: `${BASE_PREFIX}/dict/getList`, data, method: 'post' });

/** 批量获取字典 */
export const batchDictList = (data: IReqBatchDictList) => request<IResBatchDictList>({ url: `${BASE_PREFIX}/dict/queryList`, method: 'post', data });

/** 获取字典表信息-分页 */
export const getDictByPage = (data: IReqGetByPage) => request<IResGetByPage>({ url: `${BASE_PREFIX}/dict/getByPage`, method: 'post', data });

/** 新增/编辑字典 */
export const dictSaveOrUpdate = (data: IReqSaveOrUpdate) => request<IResSaveOrUpdate>({
  url: `
  ${BASE_PREFIX}/dict/saveOrUpdate`,
  data,
  method: 'post',
});

/** 根据 ID 查详细信息(Desc) */
export const getDictByID = (data: IReqGetDetailInfo) => request<IResGetDetailInfo>({
  url: `
  ${BASE_PREFIX}/dict/getDetailInfo`,
  data,
  method: 'post',
});
