import { ElMessage } from 'element-plus';
import type { IPageParams } from '@/types';
import { postResultCountParticipant, postBusinessSearch } from '@/apis/methods/activity/business';

export default function (activityCode: any, searchTableRef: any) {
  // 总人数
  const participantCount = reactive<{
    estimateParticipantCount: number;
    currentParticipantCount: number;
  }>({
    estimateParticipantCount: 0,
    currentParticipantCount: 0,
  });

  const searchAction = async (pageInfo: IPageParams): Promise<any> => {
    const { pageNum, pageSize } = pageInfo;
    const params = {
      pageNum,
      pageSize,
      code: activityCode.value,
    };
    try {
      const { obj } = await postBusinessSearch(params);
      return { totalSize: obj.totalSize, list: obj.list };
    } catch (e: any) {
      ElMessage.error(e.message);
      return { totalSize: 0, list: [] };
    }
  };

  const postParticipantCount = async () => {
    try {
      const { obj } = await postResultCountParticipant({
        code: activityCode.value,
      });
      participantCount.estimateParticipantCount = obj.estimateParticipantCount;
      participantCount.currentParticipantCount = obj.currentParticipantCount;
    } catch (e: any) {
      ElMessage.error(e.message);
    }
  };

  onMounted(() => {
    nextTick(() => {
      postParticipantCount();
      searchTableRef.value?.fetchData('search');
    });
  });

  return {
    participantCount,
    searchAction,
  };
}
