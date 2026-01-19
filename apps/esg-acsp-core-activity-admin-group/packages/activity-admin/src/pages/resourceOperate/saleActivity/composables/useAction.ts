import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import {
  deleteSaleActivity,
  offlineSaleActivity,
  onlineSaleActivity,
  querySaleActivityList,
} from '@/apis/methods/activity/saleActivity';
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
    const [startTimeBegin, startTimeFinish] = formatRange(startTime);
    const [endTimeBegin, endTimeFinish] = formatRange(endTime);
    const params = {
      pageNum,
      pageSize,
      ...restParam,
      startTimeBegin,
      startTimeFinish,
      endTimeBegin,
      endTimeFinish,
    };
    try {
      const res = await querySaleActivityList(params);
      return { totalSize: res.obj.totalSize, list: res.obj.list };
    } catch (e: any) {
      ElMessage.error(e.message);
      return { totalSize: 0, list: [] };
    }
  };

  /** 新增 */
  const showAdd = () => {
    router.push({
      path: '/resourceOperate/saleActivity/add',
    });
  };

  /** 上线 */
  const actionOnline = async (code: string) => {
    try {
      await onlineSaleActivity({ code });
      searchTableRef.value?.fetchData('search');
    } catch (e: any) {
      ElMessage.error(e.message ?? '请重试');
    }
  };

  /** 下线 */
  const actionOffline = async (code: string) => {
    try {
      await offlineSaleActivity({ code });
      searchTableRef.value?.fetchData('search');
    } catch (e: any) {
      ElMessage.error(e.message ?? '请重试');
    }
  };

  /** 删除 */
  const actionDelete = async (code: string) => {
    try {
      await deleteSaleActivity({ code });
      searchTableRef.value?.fetchData('search');
    } catch (e: any) {
      ElMessage.error(e.message ?? '请重试');
    }
  };

  /** 查看 */
  const actionView = (code: string) => {
    router.push({
      path: '/resourceOperate/saleActivity/detail',
      query: { code },
    });
  };

  /** 编辑 */
  const actionEdit = (code: string) => {
    router.push({
      path: '/resourceOperate/saleActivity/edit',
      query: { code },
    });
  };

  /** 复制 */
  const actionCopy = (code: string) => {
    router.push({
      path: '/resourceOperate/saleActivity/add',
      query: {
        code,
        type: 'copy',
      },
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
    actionCopy,
  };
}
