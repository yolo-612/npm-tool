import type { Ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElLoading, dayjs } from 'element-plus';
import type { IPostPortraitUpdateParams } from '@/apis/methods/activity/courierPersona/types';
import { queryPortraitDetail, postSaveOrUpdatePortrait } from '@/apis/methods/activity/courierPersona';
import { useTabBarStore } from '@/stores';
import type { TPageAction } from './types';

export default function (formRef: Ref<any>, action: TPageAction = 'add') {
  const route = useRoute();
  const router = useRouter();
  const tabBarStore = useTabBarStore();
  /* loading状态 */
  const loading = reactive({
    submit: false,
    page: false,
  });
  /* 表单数据 */
  const formData: IPostPortraitUpdateParams = reactive({
    name: '',
    code: undefined,
    status: undefined,
    createType: undefined,
    updateType: 0,
    validType: undefined,
    invalidTime: '',
    url: '',
    remark: '',
    id: undefined,
  });

  /* 提交表单 */
  const submitForm = async () => {
    const res = await formRef.value?.validate();
    if (!res) return;
    try {
      loading.submit = true;
      const { obj } = await postSaveOrUpdatePortrait(formData);
      if (!obj) return ElMessage.error('操作失败');
      ElMessage.success('操作成功');
      tabBarStore.closeCurrentTab(route);
      router.push('/activity/courierPersona/list');
    } catch (error) {
      ElMessage.error('操作失败');
    } finally {
      loading.submit = false;
    }
  };

  /* 拉取画像详情 */
  const getPortraitDetail = async () => {
    const code = route.query?.code as string;
    if (!code) return ElMessage.error('没有画像编码!');
    try {
      const { obj } = await queryPortraitDetail({ code });
      if (!obj) return ElMessage.error('拉取失败');
      const { invalidTime: time } = obj;
      const invalidTime = time ? dayjs(time).format('YYYY-MM-DD') : '';
      Object.assign(formData, { ...obj, invalidTime });
    } catch (error) {
      ElMessage.error('拉取失败');
    }
  };

  /* 画像url变动 */
  const onChangeUrl = (url: string) => {
    formData.url = url;
    formRef.value?.validateField('url');
  };

  /* 初始化 */
  onMounted(async () => {
    const isNeedDetail = ['edit', 'detail'].includes(action);
    if (isNeedDetail) {
      loading.page = true;
      await getPortraitDetail();
      loading.page = false;
    }
  });

  return {
    formData,
    loading,
    submitForm,
    onChangeUrl,
  };
}
