import type { Ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { IQuotaOrderListParams } from '@/apis/methods/activity/quotaCard/types';
import { queryQuotaOrderList } from '@/apis/methods/activity/quotaCard';
import type { IPageParams } from '@/types';
import { formatTimeRange } from '../../couponBar/composables/useListAction';

export default function (tableRef: Ref<any>) {
  const formData: Omit<IQuotaOrderListParams, 'pageSize' | 'pageNum'> & { timeRange: string[] } = reactive({
    /** 状态，1:待付款、2:已发货、3:已取消 */
    status: '',
    /** 订单编码 */
    orderNo: '',
    /** 额度卡编码 */
    goodsCode: '',
    /** 月结卡号 */
    monthCard: '',
    /* 时间段 */
    timeRange: [],
  });

  const searchAction = async ({ pageSize, pageNum }: IPageParams) => {
    const { timeRange, ...rest } = formData;
    const [createTimeStart, createTimeEnd] = formatTimeRange(timeRange);
    try {
      const { obj } = await queryQuotaOrderList({
        pageNum,
        pageSize,
        createTimeStart,
        createTimeEnd,
        ...rest,
      });
      if (!obj || !obj.list) {
        return { totalSize: 0, list: [] };
      }
      return obj;
    } catch (error: any) {
      ElMessage.error(error?.message || '查询失败');
      return { totalSize: 0, list: [] };
    }
  };

  onMounted(async () => {
    await nextTick();
    tableRef.value.fetchData();
  });

  return {
    formData,
    searchAction,
  };
}
