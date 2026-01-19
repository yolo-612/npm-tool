import dayjs from 'dayjs';
import { debounce } from 'lodash-es';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { IPageParams } from '@/types';
import type { IActivityQuery } from '@/apis/methods/activity/business/types';
import {
  postActivityDelete,
  postActivityDisable,
  postActivityEnable,
  postActivitySearch,
  postAreaInfoList,
} from '@/apis/methods/activity/business';
import { ACTIVITY_COPY_URL, ACTIVITY_DETAIL_URL, ACTIVITY_EDIT_URL } from '../../types';
import { queryStaff } from '@/apis/methods/activity/newClue';

export default function (searchTableRef: any) {
  /** 创建人地区列表 */
  const areaInfoList = ref<{ value: string; label: string }[]>([]);

  const router = useRouter();

  /** 员工列表 */
  const empOptions = ref<{ label: string; value: string }[]>([]);

  /** form 的搜索框 */
  const formData = ref<IActivityQuery>({
    /** 活动名称 */
    name: undefined,
    /** 活动编码 */
    code: undefined,
    /** 活动状态 */
    activityStatus: undefined,
    /** 审核状态 */
    approvalStatus: undefined,
    /** 活动类型 */
    type: undefined,
    /** 创建人工号 */
    creator: undefined,
    /** 创建人地区代码 */
    creatorAreaCode: undefined,
    /** 活动开始时间 */
    startTime: undefined,
    /** 活动结束时间 */
    endTime: undefined,
    /** 活动时间 - 搜索栏 */
    timeRange: [],
  });

  /** 处理区间时间 */
  const formatRange = (timeRange?: Date[]) => {
    if (!timeRange) {
      return [undefined, undefined];
    }
    return timeRange.map((date) => {
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    });
  };
  /* 查询列表数据 */
  const searchAction = async (pageInfo: IPageParams): Promise<any> => {
    const {
      code,
      name,
      timeRange,
      ...restParam
    } = formData.value;
    const { pageNum, pageSize } = pageInfo;
    const [startTime, endTime] = formatRange(timeRange);
    const params = {
      pageNum,
      pageSize,
      ...restParam,
      code: code?.trim(),
      name: name?.trim(),
      startTime,
      endTime,
    };
    try {
      const res = await postActivitySearch(params);
      return { totalSize: res.obj.totalSize, list: res.obj.list };
    } catch (e: any) {
      ElMessage.error(e.message);
      return { totalSize: 0, list: [] };
    }
  };

  /** 提交审核 */
  const actionCommitAudio = async (code: string) => {
    ElMessage.info('暂无提交审核权限');
    // try {
    //   await postActivityCommitAudio({ code });
    //   searchTableRef.value?.fetchData('search');
    // } catch (e: any) {
    //   ElMessage.error(e.message ?? '请重试');
    // }
  };

  /** 启用 */
  const actionEnable = async (code: string) => {
    try {
      await postActivityEnable({ code });
      searchTableRef.value?.fetchData('search');
    } catch (e: any) {
      ElMessage.error(e.message ?? '请重试');
    }
  };

  /** 停用 */
  const actionDisable = async (code: string) => {
    try {
      await postActivityDisable({ code });
      searchTableRef.value?.fetchData('search');
    } catch (e: any) {
      ElMessage.error(e.message ?? '请重试');
    }
  };

  /** 删除 */
  const actionDelete = async (code: string) => {
    try {
      await postActivityDelete({ code });
      searchTableRef.value?.fetchData('search');
    } catch (e: any) {
      ElMessage.error(e.message ?? '请重试');
    }
  };

  /** 新增 */
  const showAdd = () => {
    router.push({
      path: '/activity/marketActivity/activity/select',
    });
  };

  /** 查看 */
  const actionView = (code: string, type: string) => {
    router.push({
      path: ACTIVITY_DETAIL_URL[type as keyof typeof ACTIVITY_DETAIL_URL],
      query: { code },
    });
  };

  /** 编辑 */
  const actionEdit = (code: string, type: string) => {
    router.push({
      path: ACTIVITY_EDIT_URL[type as keyof typeof ACTIVITY_EDIT_URL],
      query: { code },
    });
  };

  /** 复制 */
  const actionCopy = (code: string, type: string) => {
    router.push({
      path: ACTIVITY_COPY_URL[type as keyof typeof ACTIVITY_COPY_URL],
      query: { code },
    });
  };

  // 活动效果
  const actionActivityPopup = (code: string) => {
    router.push({
      path: '/activity/marketActivity/activityEffect',
      query: { code },
    });
  };

  /** 查看审批不通过信息 */
  const actionAuditMessage = (message: string) => {
    ElMessageBox.alert(message, '查看原因', {
      confirmButtonText: '关闭',
    });
  };

  /** 获取地区列表 */
  const getAreaInfoList = async () => {
    try {
      const { obj } = await postAreaInfoList();
      if (obj?.list) {
        areaInfoList.value = obj.list.map((item) => {
          return {
            value: item.areaCode,
            label: item.areaName,
          };
        });
      }
    } catch (e: any) {
      ElMessage.error(e.message ?? '请重试');
    }
  };

  /* 查询小哥 */
  const getStaff = debounce(async (query: string) => {
    formData.value.creator = query.trim();
    const data = query.trim();
    if (!data) {
      empOptions.value = [];
      return;
    }
    try {
      const { obj = [] } = await queryStaff(query.trim());
      // 确保搜索值与接口返回的数据一致
      if (formData.value.creator === query.trim()) {
        const list = (obj || []).slice(0, 5).map((item) => ({
          label: item.empName,
          value: item.empCode,
        }));
        empOptions.value = list.map((item) => {
          return {
            label: `${item.value}/${item.label}`,
            value: item.value,
          };
        });
      }
    } catch (error) {
      ElMessage.error('查询小哥失败');
    }
  }, 30);

  onMounted(() => {
    nextTick(() => {
      getAreaInfoList();
      searchTableRef.value?.fetchData('search');
    });
  });

  return {
    formData,
    areaInfoList,
    empOptions,
    getStaff,
    searchAction,
    actionCommitAudio,
    actionEnable,
    actionDisable,
    actionDelete,
    showAdd,
    actionView,
    actionEdit,
    actionCopy,
    actionActivityPopup,
    actionAuditMessage,
  };
}
