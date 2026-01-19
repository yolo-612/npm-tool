import { batchDictList, getDict } from '@/apis/methods/dict';
import type { DictValue } from '@/apis/methods/dict/types';

/** 缓存字典数据时长 */
const REFRESH_CACHE_EXPIRE = 1000 * 60 * 60 * 5;

/** 【直接发券】活动状态字典 type code */
export const DIRECT_SEND_ACTIVITY_STATUS_TYPE_CODE = 'coupon_activity_status';
/** 【直接发券】创建来源字典 type code */
export const DIRECT_SEND_ACTIVITY_SOURCE_TYPE_CODE = 'coupon_activity_source';
/** 【直接发券】发券状态字典 type code */
export const DIRECT_SEND_HISTORY_STATUS_TYPE_CODE = 'record_status';
/** 【申请发券】活动状态字典 type code */
export const APPLY_SEND_ACTIVITY_STATUS_TYPE_CODE = 'coupon_activity_template_status';
/** 【通用】权益券类型 type code */
export const RIGHTS_TYPE_TYPE_CODE = 'coupon_activity_equity_type';

/** 销售管理活动 type code */
export const SALE_ACTIVITY_STATUS_TYPE_CODE = 'sales_manage_status';

export const useDict = defineStore(
  'dict',
  () => {
    const dictList = ref<Record<string, { data: DictValue[]; timeStamp: number }>>({});
    const dictRecord = computed(() => {
      return Object.entries(dictList.value).reduce(
        (pre, cur) => {
          pre[cur[0]] = cur[1].data;
          return pre;
        },
        {} as Record<string, DictValue[]>,
      );
    });

    /** 批量获取字典数据 */
    const batchUpdateDict = async (typeCodeList: string[]) => {
      // 检查缓存
      const requestMap = typeCodeList.filter((typeCode) => !hasDict(typeCode));
      // 如果存在没有缓存的数据
      if (requestMap.length) {
        // 请求没有缓存的内容
        const { obj } = await batchDictList({ typeCodeList: requestMap });
        dictList.value = {
          ...dictList.value,
          ...Object.entries(obj).reduce(
            (pre, cur) => {
              pre[cur[0]] = { data: cur[1], timeStamp: Date.now() };
              return pre;
            },
            {} as Record<string, { data: DictValue[]; timeStamp: number }>,
          ),
        };
      }
      // 返回数据
      return typeCodeList.reduce(
        (pre, cur) => {
          pre[cur] = dictList.value[cur]?.data || [];
          return pre;
        },
        {} as Record<string, DictValue[]>,
      );
    };

    /** 获取字典数据 */
    const updateDict = async (typeCode: string) => {
      if (!hasDict(typeCode)) {
        const { obj } = await getDict({ typeCode });
        dictList.value[typeCode] = { data: obj, timeStamp: Date.now() };
      }
      return dictList.value[typeCode]?.data || [];
    };

    const hasDict = (typeCode: string) => {
      // 判断条件为 有字典 且 字典数据没有过期
      return dictList.value[typeCode]?.timeStamp >= Date.now() - REFRESH_CACHE_EXPIRE;
    };
    return {
      batchUpdateDict,
      updateDict,
      hasDict,
      dictRecord,
    };
  },

  { persist: true },
);

export default useDict;

/* 从字段中获取options */
export const getOptionsFromDict = (dictList: DictValue[], parseNumber = false) => {
  return dictList?.map(({ name: label, value }) => ({ label, value: parseNumber ? Number(value) : value }));
};
/* 获取value对应的label */
export const getDictLabelByValue = (dictList: DictValue[], value: string | number) => {
  const target = dictList?.find((item) => item.value === String(value));
  return target?.name || '';
};

/* 获取value对应的code */
export const getDictCodeByValue = (dictList: DictValue[], value: string | number | undefined) => {
  const target = dictList?.find((item) => item.value === String(value));
  return target?.code || '';
};
