import { ElMessage } from 'element-plus';
import { postResultSaveOrUpdate, postResultSearch } from '@/apis/methods/activity/business';
import type { IActivityEffectResponse } from '@/apis/methods/activity/business/types';
import { useTabBarStore } from '@/stores';
import { ACTIVITY_LIST_URL } from '../../types';

export default function (formRef: any, activityCode: any) {
  const route = useRoute();
  const router = useRouter();
  const tabBarStore = useTabBarStore();
  /* 表单数据 */
  const formData = reactive<IActivityEffectResponse>({
    newMemberCount: undefined, // 现场新增会员数
    newClueCount: undefined, // 现场新增线索数
    storedValueRevenue: undefined, // 现场储值卡创收金额
    parcelRevenue: undefined, // 现场寄件创收金额
    actualCost: undefined, // 活动实际费用
    summaryFile: '', // 活动总结文件
    summaryFileDownloadUrl: undefined, // 活动方案文件
  });/* 查询列表数据 */

  /* loading状态 */
  const loading = reactive({
    submit: false,
  });

  /* 拉取活动详情 */
  const getDragonActivityDetail = async () => {
    try {
      formRef.value.resetFields();
      const vParams = {
        code: activityCode.value,
      };
      const { obj } = await postResultSearch(vParams);
      if (!obj) return ElMessage.error('拉取活动详情失败');
      Object.assign(formData, {
        ...obj,
        actualCost: obj.actualCost ? Number(obj.actualCost) : null,
        parcelRevenue: obj.actualCost ? Number(obj.parcelRevenue) : null,
        storedValueRevenue: obj.actualCost ? Number(obj.storedValueRevenue) : null,
      });
      if (obj.summaryFileDownloadUrl) {
        formData.summaryFileDownloadUrl = {
          ...obj.summaryFileDownloadUrl,
          pmpOssPath: obj.summaryFile!,
          fileName: obj.summaryFileName!,
        };
        formData.summaryFile = obj.summaryFileName;
      }
    } catch (error: any) {
      ElMessage.error(error.message || '拉取活动详情失败');
    }
  };

  const handleCloseTab = () => {
    tabBarStore.closeCurrentTab(route);
    router.push(ACTIVITY_LIST_URL);
  };

  /* 提交表单 */
  const submitForm = async () => {
    const res = await formRef.value?.validate();
    if (!res) return;
    try {
      const { summaryFile, summaryFileDownloadUrl, ...rest } = formData;
      const vParams = {
        ...rest,
        summaryFile: summaryFileDownloadUrl?.pmpOssPath,
        summaryFileName: summaryFileDownloadUrl?.fileName,
        code: activityCode.value,
      };
      loading.submit = true;
      await postResultSaveOrUpdate(vParams);
      ElMessage.success('保存成功');
      handleCloseTab();
    } catch (error) {
      ElMessage.error('操作失败');
    } finally {
      loading.submit = false;
    }
  };

  onMounted(() => {
    nextTick(() => {
      getDragonActivityDetail();
    });
  });

  return {
    formData,
    formRef,
    loading,
    submitForm,
    handleCloseTab,
  };
}
