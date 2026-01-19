import { request } from '@/apis/request';
import type {
  IActivityBusinessSearchRequest,
  IActivityBusinessSearchResponse,
  IActivityDetailParams,
  IActivityEffectRequest,
  IActivityEffectResponse,
  IActivityListResponse,
  IActivityQueryRequest,
  IActivityTemplateListRequest,
  IActivityTemplateListResponse,
  IAreaCodeListResponse,
  IAreaCodeResponse,
  ITemplateInfo,
  ITemplateInfoResponse,
} from './types';

const INTERFACE_ACTIVITY = '/activity-web-backend/im-activity/web';

/**
 * 营销活动分页查询接口
 * @param data IActivityQueryRequest
 * @returns
 */
export const postActivitySearch = (data: IActivityQueryRequest) => request<IActivityListResponse>({
  url: `${INTERFACE_ACTIVITY}/marketing/activity/search`,
  method: 'post',
  data,
});

/**
 * 删除营销活动接口
 * @param data { code: string }
 */
export const postActivityDelete = (data: { code: string }) => request({
  url: `${INTERFACE_ACTIVITY}/marketing/activity/delete`,
  method: 'post',
  data,
});

/**
 * 营销活动启用接口
 * @param data { code: string }
 */
export const postActivityEnable = (data: { code: string }) => request({
  url: `${INTERFACE_ACTIVITY}/marketing/activity/start`,
  method: 'post',
  data,
});

/**
 * 营销活动禁用接口
 * @param data { code: string }
 */
export const postActivityDisable = (data: { code: string }) => request({
  url: `${INTERFACE_ACTIVITY}/marketing/activity/stop`,
  method: 'post',
  data,
});

/**
 * 提交审核
 * @param data { code: string }
 */
export const postActivityCommitAudio = (data: { code: string }) => request({
  url: `${INTERFACE_ACTIVITY}/marketing/activity/commitAudio`,
  method: 'post',
  data,
});

/**
 * 营销活动保存更新接口
 * @param data IActivityDetailParams
 */
export const postSaveOrUpdate = (data: IActivityDetailParams) => request({
  url: `${INTERFACE_ACTIVITY}/marketing/activity/saveOrUpdate`,
  method: 'post',
  data,
});

/**
 * 营销活动查询接口
 * @param data IActivityDetailParams
 */
export const postActivityDetail = (data: { code: string }) => request<IActivityDetailParams>({
  url: `${INTERFACE_ACTIVITY}/marketing/activity/detail`,
  method: 'post',
  data,
});

/**
 * 创建人地区编码查询接口
 */
export const postCreatorAreaCodeSearch = () => request<IAreaCodeResponse>({
  url: `${INTERFACE_ACTIVITY}/marketing/activity/creatorAreaCodeSearch`,
  method: 'post',
});

/**
 * 下拉筛选创建人地区编码接口
 */
export const postAreaInfoList = () => request<IAreaCodeListResponse>({
  url: `${INTERFACE_ACTIVITY}/marketing/activity/areaInfoList`,
  method: 'post',
});

// **************** 模板信息 ***************
/**
 * 模板列表查询接口
 * @param data IActivityTemplateListRequest
 * @returns IActivityTemplateListResponse
 */
export const postTemplateList = (data: IActivityTemplateListRequest) => request<IActivityTemplateListResponse>({
  url: `${INTERFACE_ACTIVITY}/marketing/activity/template/list`,
  method: 'post',
  data,
});
/**
 * 模板详情接口
 * @param data 模板信息
 * @returns 模板信息-返回 JSON
 */
export const postTemplateDetail = (data: ITemplateInfo) => request<ITemplateInfoResponse>({
  url: `${INTERFACE_ACTIVITY}/marketing/activity/template/detail`,
  method: 'post',
  data,
});
/**
 * 模板新增/修改接口
 * @param data 模板信息
 * @returns 模板信息-返回 JSON
 */
export const postTemplateSaveOrUpdate = (data: ITemplateInfo & ITemplateInfoResponse) => request<ITemplateInfo>({
  url: `${INTERFACE_ACTIVITY}/marketing/activity/template/saveOrUpdate`,
  method: 'post',
  data,
});

export const postUploadFile = (data: any) => request({
  url: '/activity-web-backend/pmp-store/web/image/upload',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  method: 'post',
  data,
});

// ***************** 活动效果 ****************
/**
 * 商机信息分页查询接口
 * @param data
 */
export const postBusinessSearch = (data: IActivityBusinessSearchRequest) => request<IActivityBusinessSearchResponse>({
  url: `${INTERFACE_ACTIVITY}/marketing/activity/business/search`,
  method: 'post',
  data,
});

/**
 * 获取留资明细接口
 * @param data
 * @returns
 */
export const postResultCountParticipant = (data: { code: string; }) => request<{
  estimateParticipantCount: number;
  currentParticipantCount: number;
}>({
  url: `${INTERFACE_ACTIVITY}/marketing/activity/result/countParticipant`,
  method: 'post',
  data,
});

/**
 * 营销活动效果查询接口
 */
export const postResultSearch = (data: IActivityEffectRequest) => request<IActivityEffectResponse>({
  url: `${INTERFACE_ACTIVITY}/marketing/activity/result/detail`,
  method: 'post',
  data,
});

/**
 * 营销活动效果保存/修改接口
 */
export const postResultSaveOrUpdate = (data: IActivityEffectRequest & IActivityEffectResponse) => request<any>({
  url: `${INTERFACE_ACTIVITY}/marketing/activity/result/saveOrUpdate`,
  method: 'post',
  data,
});

/**
 * 活动留资详情（解密）
 * @param data id
 * @returns 明文信息
 */
export const postBusinessDetailWhite = (data: { id: number }) => request<any>({
  url: `${INTERFACE_ACTIVITY}/marketing/activity/business/detail`,
  method: 'post',
  data,
});
