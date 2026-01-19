import { ElMessage } from 'element-plus';
import { queryRange } from '@/apis/methods/activity/newClue';
import { queryDeptListByName } from '@/apis/methods/activity/directSendHistory';
import type { IQueryDeptItem } from '@/apis/methods/activity/directSendHistory/types';

/* 范围数据 */
export interface IRangeItem {
  label: string;
  value: string;
  type: number;
  pValue?: string;
}
export interface IRangeData {
  largest: IRangeItem[];
  current: IRangeItem[];
}

export interface ICheckParam {
  checkedKeys?: string[];
  checkedNodes: IRangeItem[];
}
/** 范围标识Map */
export enum RANGE_MAP {
  /** 地区 */
  area = 0,
  /** 分部 */
  division = 1,
  /** 网点 */
  dept = 2,
  /** 营业站 后端的3不一定是叶子节点 但业务需求最多到3不调用了 大于等于3就是叶子节点 */
  station = 3,
}

/** 格式化区域数据 */
export const formatAreaData = (rangeData: IRangeData) => {
  const { current, largest } = rangeData;
  const obj: any = {
    areaCodeList: [],
    divisionCodeList: [],
    deptCodeList: [],
    stationCodeList: [],
  };
  const applyList = current?.length ? current : largest;
  applyList.forEach(({ value, type }) => obj[`${RANGE_MAP[type]}CodeList`].push(value));
  return obj;
};

/** 树形数据缓存 */
export const treeDataCache = new Map();

/** 懒加载树的数据 */
export const fetchTreeData = async (parentData?: IRangeItem) => {
  const { value: parentCode, type: parentType } = parentData || {};
  /** 读缓存 */
  if (parentCode && treeDataCache.has(parentCode)) return treeDataCache.get(parentCode);
  /** 拉数据 */
  const targetType = parentCode ? (parentType || 0) + 1 : undefined;
  const data = {
    rangeCode: parentCode,
    type: targetType,
  };
  try {
    const { obj = [] } = await queryRange(data);
    const list = (obj || []).reduce((pre: IRangeItem[], item) => {
      const { name, code, type } = item;
      pre.push({
        label: name,
        value: code,
        type,
        pValue: parentCode || '',
      });
      return pre;
    }, []);
    /** 存缓存 */
    if (parentCode) treeDataCache.set(parentCode, list);
    return list;
  } catch (error: any) {
    ElMessage.error(error.message);
    return [];
  }
};

/** 格式化搜索数据 */
const formatSearchData = (data: IQueryDeptItem) => {
  const { type } = data;
  const key = RANGE_MAP[type];
  return {
    value: data[`${key}Code` as keyof IQueryDeptItem] as string,
    label: data[`${key}Name` as keyof IQueryDeptItem] as string,
    type,
  };
};

/** 拉取搜索数据 */
export const fetchSearchData = async (searchStr: string) => {
  try {
    const data = {
      rangeName: searchStr,
    };
    const { obj } = await queryDeptListByName(data);
    const list: IRangeItem[] = (obj?.list || []).map((item) => formatSearchData(item));
    return list;
  } catch (error) {
    return [];
  }
};
