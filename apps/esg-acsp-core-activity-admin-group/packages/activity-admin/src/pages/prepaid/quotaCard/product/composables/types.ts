/* 字典 - 商品状态 */
export const QUOTA_GOODS_STATUS = 'quota_goods_status';

// 去到详情页的操作类型 - key
export enum E_PAGE_ACTION {
  ADD = 'add',
  DETAIL = 'detail',
  EDIT = 'edit',
  COPY = 'copy'
}

// 商品状态类型 - key
export enum E_STATUS_TYPES {
  /** 仓库中 */
  IN_STORE = 'IN_STORE',
  /** 售卖中 */
  SELLING = 'SELLING',
  /** 已售罄 */
  SELLOUT = 'SELL_OUT',
  /** 已失效 */
  INVALID = 'INVALID',
}

// 商品上下架
export enum E_GOODS_STATUS {
  /** 上架 */
  UP = 'UP',
  /** 下架 */
  DOWN = 'DOWN'
}

// 商品库存变更 - value
export enum E_GOODS_STACK_TEXT_TYPES {
  /** 增加 */
  ADD = '增加',
  /** 减少 */
  REDUCE = '减少'
}
