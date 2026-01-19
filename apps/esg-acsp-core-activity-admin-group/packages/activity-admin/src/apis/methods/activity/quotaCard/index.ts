import { request, INTERFACE_PMP_STORE, INTERFACE_ACTIVITY } from '@/apis/request';
import type {
  IQuotaGoodsDetailParams,
  IQuotaGoodsListParams,
  TQuotaGoodsListRes,
  IQuotaGoodsUpdateStockParams,
  IQuotaGoodsSaveOrUpdateParams,
  IQuotaOrderListParams,
  TQuotaOrderListRes,
  IQuotaOrderDetailParams,
  IQuotaOrderDetailRes,
  IQuotaConfigListParams,
  IQuotaConfigDetailRes,
  TQuotaConfigCreateParams,
  IQuotaConfigDetailParams,
  IIntelligenceListParams,
  IIntelligenceListRes,
  IQuotaCouponBarListParams,
  TQuotaCouponBarListRes,
  IQuotaCouponBarCreateParams,
  IQuotaCouponBarDetailParams,
  IQuotaConfigProductItem,
  IQuotaGoodsOptionsParams,
  IQuotaCouponBarDetailRes,
} from './types';
/* ----------商品相关---------- */

/* 商品列表 */
export const queryQuotaGoodsList = (data: IQuotaGoodsListParams) => request<TQuotaGoodsListRes>({
  url: `${INTERFACE_PMP_STORE}/quota/list`,
  method: 'post',
  data,
});
/* 商品上架 */
export const queryQuotaGoodsUp = (data: IQuotaGoodsOptionsParams) => request<boolean>({
  url: `${INTERFACE_PMP_STORE}/quota/up`,
  method: 'post',
  data,
});
/* 商品下架 */
export const queryQuotaGoodsDown = (data: IQuotaGoodsOptionsParams) => request<boolean>({
  url: `${INTERFACE_PMP_STORE}/quota/down`,
  method: 'post',
  data,
});
/* 商品调整库存 */
export const queryQuotaGoodsUpdateStock = (data: IQuotaGoodsUpdateStockParams) => request<boolean>({
  url: `${INTERFACE_PMP_STORE}/quota/updateStock`,
  method: 'post',
  data,
});
/* 商品详情 */
export const queryQuotaGoodsDetail = (data: IQuotaGoodsDetailParams) => request<IQuotaGoodsSaveOrUpdateParams>({
  url: `${INTERFACE_PMP_STORE}/quota/detail`,
  method: 'post',
  data,
});
/* 商品新增修改 */
export const queryQuotaGoodsSaveOrUpdate = (data: IQuotaGoodsSaveOrUpdateParams) => request<boolean>({
  url: `${INTERFACE_PMP_STORE}/quota/saveOrUpdate`,
  method: 'post',
  data,
});
/* 商品客群管理列表 */
export const queryQuotaGoodsIntelligence = (data: IIntelligenceListParams) => request<IIntelligenceListRes>({
  url: `${INTERFACE_ACTIVITY}/intelligence/customer/list`,
  method: 'post',
  data,
});

/* ----------订单相关---------- */
/* 订单列表 */
export const queryQuotaOrderList = (data: IQuotaOrderListParams) => request<TQuotaOrderListRes>({
  url: `${INTERFACE_PMP_STORE}/quota/quotaOrderList`,
  method: 'post',
  data,
});
/* 订单详情 */
export const queryQuotaOrderDetail = (data: IQuotaOrderDetailParams) => request<IQuotaOrderDetailRes>({
  url: `${INTERFACE_PMP_STORE}/quota/orderDetail`,
  method: 'post',
  data,
});

/* ----------计价规则---------- */
/* 计价规则列表 */
export const queryQuotaConfigList = (data: IQuotaConfigListParams) => request<TQuotaOrderListRes>({
  url: `${INTERFACE_PMP_STORE}/quota/config/list`,
  method: 'post',
  data,
});
/* 计价规则详情 */
export const queryQuotaConfigDetail = (data: IQuotaConfigDetailParams) => request<IQuotaConfigDetailRes>({
  url: `${INTERFACE_PMP_STORE}/quota/config/detail`,
  method: 'post',
  data,
});
/* 计价规则新增 */
export const queryQuotaConfigCreate = (data: TQuotaConfigCreateParams) => request<boolean>({
  url: `${INTERFACE_PMP_STORE}/quota/config/save`,
  method: 'post',
  data,
});
/* 计价规则启用 */
export const queryQuotaConfigUp = (data: IQuotaConfigDetailParams) => request<boolean>({
  url: `${INTERFACE_PMP_STORE}/quota/config/up`,
  method: 'post',
  data,
});
/* 计价规则停用 */
export const queryQuotaConfigDown = (data: IQuotaConfigDetailParams) => request<boolean>({
  url: `${INTERFACE_PMP_STORE}/quota/config/down`,
  method: 'post',
  data,
});
/* 子产品列表 */
export const queryQuotaConfigProductList = (data: {}) => request<IQuotaConfigProductItem[]>({
  url: `${INTERFACE_PMP_STORE}/quota/config/productTypeList`,
  method: 'post',
  data,
});

/* 查询券列表 */
export const queryQuotaCouponBarList = (data: IQuotaCouponBarListParams) => request<TQuotaCouponBarListRes>({
  url: `${INTERFACE_PMP_STORE}/quota/coupon/getList`,
  method: 'post',
  data,
});

/* 新增券 */
export const queryQuotaCouponBarCreate = (data: IQuotaCouponBarCreateParams) => request<boolean>({
  url: `${INTERFACE_PMP_STORE}/quota/coupon/save`,
  method: 'post',
  data,
});

/* 查询券信息 */
export const queryQuotaCouponBarDetail = (data: IQuotaCouponBarDetailParams) => request<IQuotaCouponBarDetailRes>({
  url: `${INTERFACE_PMP_STORE}/quota/coupon/detail`,
  method: 'post',
  data,
});

/* 启用券 */
export const queryQuotaCouponBarStart = (data: IQuotaCouponBarDetailParams) => request<boolean>({
  url: `${INTERFACE_PMP_STORE}/quota/coupon/start`,
  method: 'post',
  data,
});

/* 停用券 */
export const queryQuotaCouponBarStop = (data: IQuotaCouponBarDetailParams) => request<boolean>({
  url: `${INTERFACE_PMP_STORE}/quota/coupon/stop`,
  method: 'post',
  data,
});
