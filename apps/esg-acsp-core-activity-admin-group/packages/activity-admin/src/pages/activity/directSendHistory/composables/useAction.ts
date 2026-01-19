import { ElMessage } from 'element-plus';
import { queryDirectSendHistoryList } from '@/apis/methods/activity/directSendHistory';
import type { IPageParams } from '@/types';
import type { IReqQueryDirectSendHistoryList } from '@/apis/methods/activity/directSendHistory/types';
import { formatAreaData, type IRangeItem, type IRangeData } from '@/components/common/areaSearchSelect/config';
import { formatRangeTime } from '@/utils/tool';

type THistoryFormData = Omit<IReqQueryDirectSendHistoryList, 'pageNum' | 'pageSize'> & {
  timeRange: string[];
  ecpRange: string[];
  empRange: IRangeItem[];
};

export default function (searchTableRef: any) {
  const router = useRouter();

  const formData = reactive<THistoryFormData>({
    equityCode: undefined,
    empCode: undefined,
    name: undefined,
    couponActivityCode: undefined,
    source: undefined,
    monthCard: undefined,
    status: undefined,
    /** 发券时间范围 */
    timeRange: [],
    activityStatus: undefined,
    templateCode: undefined,
    templateName: undefined,
    ecpRange: [],
    empRange: [],
  });

  const empLargest = ref<IRangeItem[]>();

  /** 员工范围初始化数据准备好 */
  const onEmpRangeReady = ({ largest }: IRangeData) => {
    empLargest.value = largest;
    searchTableRef.value?.fetchData('search');
  };
  /* 查询列表数据 */
  const searchAction = async (pageInfo: IPageParams, action: string): Promise<any> => {
    if (action === 'reset') {
      formData.empRange = [];
    }
    const { pageNum, pageSize } = pageInfo;

    const {
      timeRange, ecpRange, empRange, ...restData
    } = formData;
    const [startTime, endTime] = formatRangeTime(timeRange || []);
    const [ecpStartTime, ecpEndTime] = formatRangeTime(ecpRange || []);
    const empObj = formatAreaData({
      largest: empLargest.value || [],
      current: empRange || [],
    });
    const param = {
      ...restData,
      ...empObj,
      ecpStartTime,
      ecpEndTime,
      startTime,
      endTime,
      pageNum,
      pageSize,
    };

    try {
      const result = await queryDirectSendHistoryList(param);
      return { totalSize: result.obj.totalSize, list: result.obj.list };
    } catch (error: any) {
      ElMessage.error(error.message || '查询失败');
      return { totalSize: 0, list: [] };
    }
  };

  const showAdd = () => {
    router.push({
      path: '/activity/directSendActivity/add',
    });
  };

  return {
    formData,
    searchAction,
    onEmpRangeReady,
    showAdd,
  };
}
