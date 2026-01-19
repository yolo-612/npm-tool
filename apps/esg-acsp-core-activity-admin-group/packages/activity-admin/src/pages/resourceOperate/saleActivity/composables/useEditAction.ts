import type { Ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, dayjs } from 'element-plus';
import { useTabBarStore } from '@/stores';
import { PAGE_ACTION, type ISaleActivityFormData } from './types';
import { querySaleActivityDetail, postSaveOrUpdateSaleActivity } from '@/apis/methods/activity/saleActivity';
import { ACTIVITY_STATUS } from './map';

export default function (formRef: Ref<any>, action: PAGE_ACTION) {
  const route = useRoute();
  const router = useRouter();
  const tabBarStore = useTabBarStore();
  /* loading状态 */
  const loading = reactive({
    submit: false,
    page: false,
  });
  /* 表单数据 */
  const formData: ISaleActivityFormData = reactive({
    id: undefined,
    code: undefined,
    name: '',
    startTime: '',
    endTime: '',
    activityPosterUrl: '',
    DBQBPosterUrl: '',
  });
  const isProcessing = ref(false);

  console.log('action: ', action);

  /* 提交表单 */
  const submitForm = async () => {
    const res = await formRef.value?.validate();
    if (!res) return;
    try {
      loading.submit = true;
      const { success, errorMessage } = await postSaveOrUpdateSaleActivity({
        name: formData.name,
        code: action === PAGE_ACTION.EDIT ? formData.code : undefined,
        startTime: dayjs(formData.startTime).format('YYYY-MM-DD HH:mm:ss'),
        endTime: dayjs(formData.endTime).format('YYYY-MM-DD HH:mm:ss'),
        materialJson: JSON.stringify({
          activityPosterUrl: formData.activityPosterUrl || '',
          DBQBPosterUrl: formData.DBQBPosterUrl || '',
        }),
      });
      if (!success) return ElMessage.error(errorMessage ?? '操作失败');
      ElMessage.success('操作成功');
      tabBarStore.closeCurrentTab(route);
      router.push('/resourceOperate/saleActivity');
    } catch (error: any) {
      ElMessage.error(error.message ?? '操作失败');
    } finally {
      loading.submit = false;
    }
  };

  /* 拉取活动详情 */
  const getActivityDetail = async () => {
    const queryCode = route.query?.code as string;
    if (!queryCode) return ElMessage.error('没有活动编码!');
    try {
      const { obj } = await querySaleActivityDetail({ code: queryCode });
      if (!obj) return ElMessage.error('拉取失败');
      const {
        id,
        name,
        code,
        startTime,
        endTime,
        materialJson,
      } = obj;
      const startTimeDateStr = startTime ?? '';
      const endTimeDateStr = endTime ?? '';
      let activityPosterUrl;
      let DBQBPosterUrl;
      try {
        const parseData = JSON.parse(materialJson || '');
        activityPosterUrl = parseData?.activityPosterUrl || '';
        DBQBPosterUrl = parseData?.DBQBPosterUrl || '';
      } catch (error) {
        activityPosterUrl = '';
        DBQBPosterUrl = '';
      }
      Object.assign(formData, {
        name,
        id: action === PAGE_ACTION.COPY ? undefined : id,
        code: action === PAGE_ACTION.COPY ? undefined : code,
        startTime: startTimeDateStr,
        endTime: endTimeDateStr,
        activityPosterUrl,
        DBQBPosterUrl,
      });
      // 进行中判断
      isProcessing.value = obj?.status === ACTIVITY_STATUS.PROCESSING && action === PAGE_ACTION.EDIT;
    } catch (error: any) {
      ElMessage.error(error.message ?? '拉取失败');
    }
  };

  /* 精准营销url变动 */
  const onChangeActivityPosterUrl = (url: string) => {
    formData.activityPosterUrl = url;
    formRef.value?.validateField('activityPosterUrl');
  };

  /* 夺宝奇兵url变动 */
  const onChangeDBQBPosterUrl = (url: string) => {
    formData.DBQBPosterUrl = url;
    formRef.value?.validateField('DBQBPosterUrl');
  };

  /** 处理复制清空数据 */
  const handleCopy = () => {
    formData.name = '';
    formData.startTime = '';
    formData.endTime = '';
  };

  /* 初始化 */
  onMounted(async () => {
    const isNeedDetail = [PAGE_ACTION.EDIT, PAGE_ACTION.DETAIL, PAGE_ACTION.COPY].includes(action);
    console.log('isNeedDetail', isNeedDetail);
    if (isNeedDetail) {
      loading.page = true;
      await getActivityDetail();
      loading.page = false;
      if (action === PAGE_ACTION.COPY) {
        handleCopy();
      }
    }
  });

  return {
    formData,
    loading,
    isProcessing,
    submitForm,
    onChangeActivityPosterUrl,
    onChangeDBQBPosterUrl,
  };
}
