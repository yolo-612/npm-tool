import type { Ref } from 'vue';
import { ElMessage, ElMessageBox, type Action } from 'element-plus';
import type { IPageParams } from '@/types';
import type { IPostPortraitListParams } from '@/apis/methods/activity/courierPersona/types';
import { queryPortraitList, queryPortraitStart, queryPortraitEnd } from '@/apis/methods/activity/courierPersona';
import type { TPageAction } from './types';
import { globalDownloadAsync } from '@/utils/downloadTool';

export default function (searchTableRef: Ref<any>) {
  const router = useRouter();

  /* 搜索数据 */
  const formData: Omit<IPostPortraitListParams, 'pageSize' | 'pageNum'> = reactive({
    /** 画像编码 */
    code: undefined,
    /** 画像名称 */
    name: '',
    /** 画像状态 */
    status: undefined,
    /** 创建类型 */
    createType: undefined,
    /** 创建人工号 */
    creator: '',
  });

  /* 查询列表数据 */
  const searchAction = async (pageInfo: IPageParams) => {
    const { pageSize, pageNum } = pageInfo;
    try {
      const { obj } = await queryPortraitList({
        pageNum,
        pageSize,
        ...formData,
      });
      if (!obj || !obj.list) {
        return { totalSize: 0, list: [] };
      }
      return obj;
    } catch (error) {
      ElMessage.error('查询失败');
      return { totalSize: 0, list: [] };
    }
  };

  /* 开始/结束 */
  const portraitStatusToggle = async (code: string, action: 'start' | 'end') => {
    if (!code) return ElMessage.error('没有画像编码!');
    try {
      const actionApi = action === 'start' ? queryPortraitStart : queryPortraitEnd;
      await actionApi({ code });
      /* 刷新数据 */
      searchTableRef.value?.fetchData('search');
    } catch (error: any) {
      ElMessage.error(error?.message || '操作失败');
    }
  };
  /* 页面跳转 */
  const pageJump = (action: TPageAction, code?: string) => {
    router.push({
      path: `/activity/courierPersona/${action}`,
      query: {
        code,
      },
    });
  };

  /* 异步下载文件 */
  const downloadPortrait = (code: string) => {
    if (!code) return ElMessage.error('没有画像编码!');
    const businessMark = 'COUPON_PORTRAIT_EXPORT';
    const queryReq = { code };
    globalDownloadAsync({ businessMark, queryReq });
  };

  onMounted(async () => {
    await nextTick();
    searchTableRef.value?.onSearch();
  });
  return {
    formData,
    searchAction,
    pageJump,
    portraitStatusToggle,
    downloadPortrait,
  };
}
