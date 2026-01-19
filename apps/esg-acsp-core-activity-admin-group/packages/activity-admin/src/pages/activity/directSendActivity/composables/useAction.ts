import dayjs from 'dayjs';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  deleteDirectSendActivity,
  offlineDirectSendActivity,
  onlineDirectSendActivity,
  queryDirectSendActivityList,
} from '@/apis/methods/activity/directSendActivity';
import type { IPageParams } from '@/types';

export default function (searchTableRef: any) {
  const router = useRouter();
  const formData = ref<{
    code?: string;
    name?: string;
    status?: string;
    source?: string;
    creator?: string;
    startTime: Date[] | null;
    endTime: Date[] | null;
  }>({
    code: undefined,
    name: undefined,
    status: undefined,
    source: undefined,
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
      const res = await queryDirectSendActivityList(params);
      return { totalSize: res.obj.totalSize, list: res.obj.list };
    } catch (e: any) {
      ElMessage.error(e.message);
    }
  };

  const handleSelectionChange = (val: any[]) => {};
  /* 获取字段数据 */
  const updateDictData = async () => {};

  const showAdd = () => {
    router.push({
      path: '/activity/directSendActivity/add',
    });
  };

  const actionOnline = async (code: string) => {
    try {
      await onlineDirectSendActivity({ code });
      searchTableRef.value?.fetchData('search');
    } catch (e: any) {
      ElMessage.error(e.message);
    }
  };

  const actionOffline = async (code: string) => {
    try {
      await offlineDirectSendActivity({ code });
      searchTableRef.value?.fetchData('search');
    } catch (e: any) {
      ElMessage.error(e.message);
    }
  };

  const actionDelete = async (code: string) => {
    try {
      await deleteDirectSendActivity({ code });
      searchTableRef.value?.fetchData('search');
    } catch (e: any) {
      ElMessage.error(e.message);
    }
  };

  const actionView = (code: string) => {
    router.push({
      path: '/activity/directSendActivity/view',
      query: { code },
    });
  };

  const actionEdit = (code: string) => {
    router.push({
      path: '/activity/directSendActivity/edit',
      query: { code },
    });
  };

  onMounted(() => {
    nextTick(() => {
      searchTableRef.value?.fetchData('search');
    });
  });

  return {
    updateDictData,
    formData,
    searchAction,
    handleSelectionChange,
    showAdd,
    actionEdit,
    actionDelete,
    actionOffline,
    actionOnline,
    actionView,
  };
}
