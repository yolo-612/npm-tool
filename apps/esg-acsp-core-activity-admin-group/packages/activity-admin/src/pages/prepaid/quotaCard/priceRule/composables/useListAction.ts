import type { Ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import type { IQuotaConfigListParams } from '@/apis/methods/activity/quotaCard/types';
import { queryQuotaConfigList, queryQuotaConfigUp, queryQuotaConfigDown } from '@/apis/methods/activity/quotaCard';
import type { IPageParams } from '@/types';

type TSearchFormData = Omit<IQuotaConfigListParams, 'pageSize' | 'pageNum'> & {
  validTime: string[];
  createTime: string[];
};

export default function (tableRef: Ref<any>) {
  const router = useRouter();

  const formData: TSearchFormData = reactive({
    /* 计价规则状态 */
    status: '',
    /** 计价规则编码 */
    code: '',
    /** 计价规则名称 */
    name: '',
    /** 创建人工号 */
    creator: '',
    /** 子产品类型 */
    subProductType: '',
    /** 主产品类型 */
    mainProductType: '',
    /** 额度(元) */
    quota: null,
    /** 折扣 */
    discount: null,
    /* 有效期 */
    validTime: [],
    /* 创建时间 */
    createTime: [],
  });

  const searchAction = async ({ pageSize, pageNum }: IPageParams) => {
    const { validTime, createTime, ...rest } = formData;
    /* 处理时间 */
    const [validTimeStart, validTimeEnd] = validTime || [];
    const [createTimeStart, createTimeEnd] = createTime || [];

    try {
      const { obj } = await queryQuotaConfigList({
        pageNum,
        pageSize,
        createTimeStart,
        createTimeEnd,
        validTimeStart,
        validTimeEnd,
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

  const toggleConfigStatus = async (action: 'up' | 'down', code: string) => {
    if (!code) return ElMessage.error('没有配置编码');
    const api = action === 'up' ? queryQuotaConfigUp : queryQuotaConfigDown;
    try {
      const { success } = await api({ code });
      if (!success) return ElMessage.error('操作失败');
      ElMessage.success('操作成功');
      tableRef.value?.fetchData();
    } catch (error: any) {
      ElMessage.error(error?.message || '操作失败');
    }
  };

  /* 页面跳转 add不传参数 其他code必传 */
  function pageJump(pageAction: 'add'): void;
  function pageJump(pageAction: 'copy' | 'detail', code: string): void;
  function pageJump(pageAction: 'add' | 'copy' | 'detail', code?: string) {
    let ext;
    let page = pageAction;
    if (pageAction === 'copy') {
      ext = 'copy';
      page = 'add';
    }
    router.push({
      path: `/prepaid/quotaCard/priceRule/${page}`,
      query: pageAction === 'add' ? {} : { code, ext },
    });
  }

  onMounted(async () => {
    await nextTick();
    tableRef.value.fetchData();
  });

  return {
    formData,
    searchAction,
    toggleConfigStatus,
    pageJump,
  };
}
