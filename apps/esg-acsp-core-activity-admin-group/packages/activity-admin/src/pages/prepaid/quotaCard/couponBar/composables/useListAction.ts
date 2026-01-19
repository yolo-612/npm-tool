import type { Ref } from 'vue';
import { dayjs, ElMessage } from 'element-plus';
import type { IQuotaCouponBarListParams } from '@/apis/methods/activity/quotaCard/types';
import {
  queryQuotaCouponBarStart,
  queryQuotaCouponBarStop,
  queryQuotaCouponBarList,
} from '@/apis/methods/activity/quotaCard';
import type { IPageParams } from '@/types';

type TSearchFormData = Omit<IQuotaCouponBarListParams, 'pageSize' | 'pageNum'> & {
  validTime: string[];
  createTime: string[];
};

/* 格式化时间范围 */
export const formatTimeRange = (time: string[]) => {
  if (!time || !time.length) return [];
  const [start, end] = time;
  const st = start ? `${dayjs(start).format('YYYY-MM-DD')} 00:00:00` : undefined;
  const ed = end ? `${dayjs(end).format('YYYY-MM-DD')} 23:59:59` : undefined;
  return [st, ed];
};

export default function (tableRef: Ref<any>) {
  const formData: TSearchFormData = reactive({
    /** 状态 */
    status: '',
    /** 券包编码 */
    equityCode: '',
    /** 券包名称 */
    equityName: '',
    /** 创建人 */
    creator: '',
    /** 创建时间 */
    createTime: [],
    /* 生效时间 */
    validTime: [],
  });

  const addCouponData = reactive<{ type: 'add' | 'detail'; equityCode: string; showModel: boolean }>({
    type: 'add',
    equityCode: '',
    showModel: false,
  });

  /* 打开新增弹窗 */
  function openCouponModel(type:'add'):void
  function openCouponModel(type:'detail', equityCode:string):void
  function openCouponModel(type: 'add' | 'detail', equityCode?: string) {
    addCouponData.type = type;
    addCouponData.equityCode = equityCode || '';
    addCouponData.showModel = true;
  }

  const searchAction = async ({ pageSize, pageNum }: IPageParams) => {
    const { validTime, createTime, ...rest } = formData;
    const [validDate, invalidDate] = formatTimeRange(validTime);
    const [createStartTime, createEndTime] = formatTimeRange(createTime);
    try {
      const { obj } = await queryQuotaCouponBarList({
        pageNum,
        pageSize,
        createStartTime,
        createEndTime,
        validDate,
        invalidDate,
        ...rest,
      });
      if (!obj || !obj.list) {
        return { totalSize: 0, list: [] };
      }
      return obj;
    } catch (error:any) {
      ElMessage.error(error?.message || '查询失败');
      return { totalSize: 0, list: [] };
    }
  };

  const toggleCouponStatus = async (action: 'start' | 'stop', code: string) => {
    if (!code) return ElMessage.error('没有配置code');
    const api = action === 'start' ? queryQuotaCouponBarStart : queryQuotaCouponBarStop;
    try {
      const { success } = await api({ code });
      if (!success) return ElMessage.error('操作失败');
      ElMessage.success('操作成功');
      tableRef.value?.fetchData();
    } catch (error:any) {
      ElMessage.error(error?.message || '操作失败');
    }
  };

  onMounted(async () => {
    await nextTick();
    tableRef.value.fetchData();
  });

  return {
    formData,
    addCouponData,
    searchAction,
    toggleCouponStatus,
    openCouponModel,
  };
}
