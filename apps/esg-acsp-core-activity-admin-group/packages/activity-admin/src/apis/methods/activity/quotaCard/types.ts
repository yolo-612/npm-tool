import type { IPageParams, IResList } from '@/types';

// 商品库存变更 - key
export enum E_GOODS_STACK_TYPES {
  /** 增加 */
  ADD = '1',
  /** 减少 */
  REDUCE = '2',
}
/* 商品列表 */
export interface IQuotaGoodsListParams extends IPageParams {
  /** 状态，1：售卖中，2：已售罄，3：仓库中 */
  status?: string;
  /** 额度卡编码 */
  goodsCode?: string;
  /** 额度卡名称 */
  name?: string;
  /** 创建人工号 */
  creator?: string;
  /** 创建时间 */
  createTimeRange?: Array<string>;
  /** 创建时间起 */
  createTimeStart?: string;
  /** 创建时间止 */
  createTimeEnd?: string;
  /** 金额范围 */
  amountRange?: Array<number>;
  /** 最小金额 */
  minAmount?: number;
  /** 最大金额 */
  maxAmount?: number;
}
export type TQuotaGoodsListRes = IResList<{
  /** 商品编码 */
  goodsCode: string;
  /** 商品名称 */
  name: string;
  /** 状态，1：售卖中，2：已售罄，3：仓库中 */
  status: string;
  /** 状态描述 */
  statusDesc: string;
  /** 额度 单位/元 */
  quotaAmount: number;
  /** 库存 */
  stock: number;
  /** 销量 */
  saleCounts: number;
  /** 创建时间 */
  createTime: string;
  /** 创建人工号 */
  creator: string;
}>;

// 客群类型
export interface I_INTELLIGENCE_CUSTOMER_GROUP {
  code: string;
  name: string;
  cardQuantity: number;
}

/* 商品详情 */
export interface IQuotaGoodsOptionsParams {
  /** 商品编码 */
  goodsCode: string;
}
/* 商品详情 */
export interface IQuotaGoodsDetailParams {
  /** 商品编码 */
  code: string;
}
/* 计价规则 */
export interface IQuotaDetailConfigRespRes extends Omit<IQuotaConfigListParams, 'pageNum' | 'pageSize'> {
  /** 计价规则名称 */
  configName: string;
  /** 计价规则编码 */
  configCode: string;
}
export interface IQuotaGoodsDetailRes {
  /** 额度卡名称 */
  name: string;
  /** 额度 单位/元 */
  quotaAmount: number | undefined;
  /** 限购周期 */
  cycle?: string;
  /** 库存 */
  stock: number | undefined;
  /** 限购数量 */
  restrictedQuantity: number | undefined;
  /** 备注 */
  remark: string;
  /** 商品预览图 */
  imageUrl: string;
  /** 商品描述 */
  goodsDesc: string;
  /** 客群编码 */
  merGroupCodeList: string[];
  /** 客群集合 */
  intelligenceRespList?: I_INTELLIGENCE_CUSTOMER_GROUP[];
  /** 计价规则编码 */
  configCode: string;
  /** 计价规则集合 */
  configResp?: IQuotaDetailConfigRespRes;
  /** 计价规则集合 */
  configRespList?: IQuotaDetailConfigRespRes[];
}
/* 商品新增编辑 */
export interface IQuotaGoodsSaveOrUpdateParams extends Omit<IQuotaGoodsDetailRes, 'goodsCode'> {
  /* 商品id */
  id?: string | undefined;
  /** 商品编码 */
  goodsCode?: string;
}
/* 更新库存 */
export interface IQuotaGoodsUpdateStockParams {
  /** 额度卡编码 */
  goodsCode: string;
  /** 操作类型 */
  operateType: E_GOODS_STACK_TYPES;
  /** 数量 */
  counts: number | undefined;
  /** 当前库存 */
  stock?: number;
}
/* 商品客群列表 */
export interface IIntelligenceList {
  code?: string; // 客群编码
  status: number; // 状态，这里默认是进行中，status 2
  name?: string; // 客群名称
  cardQuantity?: number; // 客群人数
  creator?: string; // 创建人
  excludeCodeList?: string[];// 过滤客群编码
}
/* 商品客群入参 */
export interface IIntelligenceListParams extends IPageParams, IIntelligenceList {}
// 商品客群返参
export type IIntelligenceListRes = IResList<IIntelligenceList>;

/* 订单列表 */
export interface IQuotaOrderListParams extends IPageParams {
  /** 状态，1:待付款、2:已发货、3:已取消 */
  status?: string;
  /** 订单编码 */
  orderNo?: string;
  /** 额度卡编码 */
  goodsCode?: string;
  /** 月结卡号 */
  monthCard?: string;
  /** 下单时间起 */
  createTimeStart?: string;
  /** 下单时间止 */
  createTimeEnd?: string;
}
export type TQuotaOrderListRes = IResList<{
  /** 订单编码 */
  orderNo: string;
  /** 下单时间 */
  createTime: string;
  /** 下单月结卡号 */
  monthCard: string;
  /** 状态描述 */
  statusDesc: string;
  /* 状态 */
  status: string;
  /** 商品编码 */
  goodsCode: string;
}>;

/* 订单详情 */
export interface IQuotaOrderDetailParams {
  /** 订单编码 */
  orderNo: string;
}
export interface IQuotaOrderDetailRes {
  /** 订单编码 */
  orderNo: string;
  /** 下单月结卡号 */
  monthCard: string;
  /** 下单客户名称 */
  customerName: string;
  /** 订单金额 单位/元 */
  amount: number;
  /** 状态描述 */
  statusDesc: string;
  /** 下单时间 */
  createTime: string;
  /** 支付时间 */
  payTime: string;
  /* 商品信息 */
  goodsInfo: {
    /** 额度卡名称 */
    name: string;
    /** 额度卡编码 */
    goodsCode: string;
    /** 商品价格 单位/元 */
    goodsPrice: string;
    /** 商品数量 */
    goodsNum: string;
  }[];
}

/* 计价规则列表 */
export interface IQuotaConfigListParams extends IPageParams {
  /* 计价规则状态 */
  status?: string;
  /** 计价规则编码 */
  code?: string;
  /** 计价规则名称 */
  name?: string;
  /** 创建人工号 */
  creator?: string;
  /** 子产品类型 */
  subProductType?: string;
  /** 主产品类型 */
  mainProductType?: string;
  /** 额度(元) */
  quota?: number | null;
  /** 折扣 */
  discount?: number | null;
  /** 配置有效期起 */
  validTimeStart?: string;
  /**  配置有效期止 */
  validTimeEnd?: string;
  /** 创建时间起 */
  createTimeStart?: string;
  /** 创建时间止 */
  createTimeEnd?: string;
}
type TQuotaConfigListItem = Required<Omit<IQuotaConfigListParams, 'pageNum' | 'pageSize'>> & {
  /** 主产品类型名称 */
  mainProductTypeName: string;
  /** 主产品类型编码 */
  mainProductTypeCode: string;
  /** 子产品类型名称 */
  subProductTypeName: string;
  /** 子产品类型编码 */
  subProductTypeCode: string;
};
export type TQuotaConfigListRes = IResList<TQuotaConfigListItem>;

/* 计价规则详情 */
export interface IQuotaConfigDetailParams {
  /** 计价规则编码 */
  code: string;
}
export interface IQuotaConfigDetailRes {
  /** 计价规则id */
  id: string;
  /** 计价规则编码 */
  code: string;
  /** 计价规则名称 */
  name: string;
  /** 额度 单位/元 */
  quota: number | null;
  /** 额度 单位/元 */
  discount: number | null;
  /** 生效日 */
  validTimeStart: string;
  /** 失效日 */
  validTimeEnd: string;
  /* 主产品类型名称 */
  mainProductTypeName: string;
  /* 主产品-时效类型 */
  mainLimitTypeCode: string;
  /* 主产品-快件内容 */
  mainCargoTypeCode: string;
  /* 主产品-业务类型 */
  mainExpressTypeCode: string;
  /* 主产品-产品名称 */
  mainProductNameCn: string;
  /* 子产品名称 */
  subProductTypeName: string;
  /* 子产品-时效类型 */
  subLimitTypeCode: string;
  /* 子产品-快件内容 */
  subCargoTypeCode: string;
  /* 子产品-业务类型 */
  subExpressTypeCode: string;
  /* 子产品-产品名称 */
  subProductNameCn: string;
}

/* 计价规则新增 */
export type TQuotaConfigCreateParams = Omit<IQuotaConfigDetailRes, 'id' | 'code'>;

/* 子产品列表 */
export interface IQuotaConfigProductItem {
  /* 产品类型名称 */
  productTypeName: string;
  /* 时效类型 */
  limitTypeCode: string;
  /* 快件内容 */
  cargoTypeCode: string;
  /* 业务类型 */
  expressTypeCode: string;
  /* 产品se代码 */
  productCode: string;
  /* 产品代码 */
  productCodeChild: string;
  /* 产品名称原始 */
  productNameCn: string;
}

/* 券包列表 */
export interface IQuotaCouponBarListParams extends IPageParams {
  /** 状态 */
  status?: string;
  /** 券包编码 */
  equityCode?: string;
  /** 券包名称 */
  equityName?: string;
  /** 创建人 */
  creator?: string;
  /** 创建时间开始 */
  createStartTime?: string;
  /** 创建时间结束 */
  createEndTime?: string;
  /** 生效日期 */
  validDate?: string;
  /** 失效日期 */
  invalidDate?: string;
}
export type TQuotaCouponBarListRes = IResList<
  Required<IQuotaConfigListParams> & {
    /** 主键 */
    id: string;
    /** 状态 */
    statusDesc: string;
    /** 张数 */
    pieceNum: string;
    /** 金额 单位/分 */
    amount: number;
    /** 发放次数 */
    issueTimes?: number;
  }
>;

/* 新增券包 */
export interface IQuotaCouponBarCreateParams {
  /** 金额 单位/元 */
  amount: number;
  /** 券包编码 */
  equityCode: string;
  /** 券包名称 */
  equityName: string;
  /** 张数 */
  pieceNum: string;
  /** 券名称 */
  name: string;
  /** 生效日期 */
  validDate: string;
  /** 失效日期 */
  invalidDate: string;
}

/* 券包详情  启用、停用  */
export interface IQuotaCouponBarDetailParams {
  /** 券包编码 */
  code: string;
}
export interface IQuotaCouponBarDetailRes extends IQuotaCouponBarCreateParams {
  /** 主键 */
  id: string;
  /** 状态 */
  status: number;
}
