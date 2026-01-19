import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import {
  deleteApplySendActivity,
  offlineApplySendActivity,
  onlineApplySendActivity,
  queryApplySendActivityList,
} from '@/apis/methods/activity/applySendActivity';
import type { IPageParams } from '@/types';
import { globalDownloadAsync } from '@/utils/downloadTool';

/** 下载列表的画像 */
export const downloadPortraits = async (code:string, type:string) => {
  if (!code) return ElMessage.warning('没有活动编码');
  const businessMark = 'ACTIVITY_PORTRAIT_EXPORT';
  const queryReq = { code, type };
  globalDownloadAsync({ businessMark, queryReq });
};

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
      const res = await queryApplySendActivityList(params);
      return { totalSize: res.obj.totalSize, list: res.obj.list };
    } catch (e: any) {
      ElMessage.error(e.message);
      return { totalSize: 0, list: [] };
    }
  };

  /** 新增 */
  const showAdd = () => {
    router.push({
      path: '/activity/applySendActivity/templateAdd',
    });
  };

  /** 上线 */
  const actionOnline = async (code: string) => {
    try {
      await onlineApplySendActivity({ code });
      searchTableRef.value?.fetchData('search');
    } catch (e: any) {
      ElMessage.error(e.message);
    }
  };

  /** 下线 */
  const actionOffline = async (code: string) => {
    try {
      await offlineApplySendActivity({ code });
      searchTableRef.value?.fetchData('search');
    } catch (e: any) {
      ElMessage.error(e.message);
    }
  };

  /** 删除 */
  const actionDelete = async (code: string) => {
    try {
      await deleteApplySendActivity({ code });
      searchTableRef.value?.fetchData('search');
    } catch (e: any) {
      ElMessage.error(e.message);
    }
  };

  /** 查看 */
  const actionView = (code: string) => {
    router.push({
      path: '/activity/applySendActivity/templateDetail',
      query: { code },
    });
  };

  /** 编辑 */
  const actionEdit = (code: string) => {
    router.push({
      path: '/activity/applySendActivity/templateEdit',
      query: { code },
    });
  };

  /** 复制 */
  const actionCopy = (code: string) => {
    router.push({
      path: '/activity/applySendActivity/templateAdd',
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
    downloadPortraits,
  };
}
