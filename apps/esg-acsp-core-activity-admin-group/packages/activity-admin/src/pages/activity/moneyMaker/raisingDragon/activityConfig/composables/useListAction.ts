import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import {
  deleteDragonActivity,
  offlineDragonActivity,
  onlineDragonActivity,
  queryDragonActivityList,
} from '@/apis/methods/activity/moneyMaker/activityConfig';

import type { IPageParams } from '@/types';

export default function (searchTableRef: any) {
  const router = useRouter();
  const formData = ref<{
    code?: string;
    name?: string;
    status?: string;
    creator?: string;
    startTime: Date[] | null;
    endTime: Date[] | null;
  }>({
    code: undefined,
    name: undefined,
    status: undefined,
    creator: undefined,
    startTime: null,
    endTime: null,
  });
  const formatRange = (timeRange: Date[] | null) => {
    if (!timeRange) {
      return [undefined, undefined];
    }
    return timeRange.map((date) => {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    });
  };
  /* 查询列表数据 */
  const searchAction = async (pageInfo: IPageParams, action: string): Promise<any> => {
    const { startTime, endTime, ...restParam } = formData.value;
    const { pageNum, pageSize } = pageInfo;
    const [startTimeBegin, startTimeEnd] = formatRange(startTime);
    const [endTimeBegin, endTimeEnd] = formatRange(endTime);
    /** 将结束时间的 时-分-秒 设置为 23:59:59 */
    const startTimeEndEndOf = startTimeEnd ? dayjs(startTimeEnd).endOf('day').format('YYYY-MM-DD HH:mm:ss') : undefined;
    const endTimeEndEndOf = endTimeEnd ? dayjs(endTimeEnd).endOf('day').format('YYYY-MM-DD HH:mm:ss') : undefined;
    const params = {
      pageNum,
      pageSize,
      ...restParam,
      startTimeBegin,
      startTimeEnd: startTimeEndEndOf,
      endTimeBegin,
      endTimeEnd: endTimeEndEndOf,
    };
    try {
      const res = await queryDragonActivityList(params);
      return { totalSize: res.obj.totalSize, list: res.obj.list };
    } catch (e: any) {
      ElMessage.error(e.message);
      return { totalSize: 0, list: [] };
    }
  };

  /** 新增 */
  const showAdd = () => {
    router.push({
      path: '/activity/moneyMaker/raisingDragon/activityConfig/add',
    });
  };

  /** 上线 */
  const actionOnline = async (code: string) => {
    try {
      await onlineDragonActivity({ code });
      searchTableRef.value?.fetchData('search');
    } catch (e: any) {
      ElMessage.error(e.message ?? '请重试');
    }
  };

  /** 下线 */
  const actionOffline = async (code: string) => {
    try {
      await offlineDragonActivity({ code });
      searchTableRef.value?.fetchData('search');
    } catch (e: any) {
      ElMessage.error(e.message ?? '请重试');
    }
  };

  /** 删除 */
  const actionDelete = async (code: string) => {
    try {
      await deleteDragonActivity({ code });
      searchTableRef.value?.fetchData('search');
    } catch (e: any) {
      ElMessage.error(e.message ?? '请重试');
    }
  };

  /** 查看 */
  const actionView = (code: string) => {
    router.push({
      path: '/activity/moneyMaker/raisingDragon/activityConfig/detail',
      query: { code },
    });
  };

  /** 编辑 */
  const actionEdit = (code: string) => {
    router.push({
      path: '/activity/moneyMaker/raisingDragon/activityConfig/edit',
      query: { code },
    });
  };

  onMounted(() => {
    nextTick(() => {
      searchTableRef.value?.fetchData('search');
    });
  });

  return {
    formData,
    searchAction,
    showAdd,
    actionEdit,
    actionDelete,
    actionOffline,
    actionOnline,
    actionView,
  };
}
