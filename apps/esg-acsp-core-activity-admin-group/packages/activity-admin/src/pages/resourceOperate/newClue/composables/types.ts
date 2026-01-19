import type { IRangeItem } from '@/components/common/areaSearchSelect/config';

export * from '@/types';
/* 编辑操作 */
export type TClueEditAction = 'single' | 'batch';
export interface IClueEditData {
  show: boolean;
  list: any[];
  action: TClueEditAction;
}

/* 详情 */
export interface IClueDetailData {
  show: boolean;
  id: number | null;
}

export interface IClueSearchForm {
  /* 范围 */
  range: IRangeItem[];
  /* 线索月份 */
  monthList: string[];
  /* 线索状态 */
  stateList: string[];
  /* 手机号 */
  phone: string;
  /* 小哥工号 */
  empCode: string;
}
