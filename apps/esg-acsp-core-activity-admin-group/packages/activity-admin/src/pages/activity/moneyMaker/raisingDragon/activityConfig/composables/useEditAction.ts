import type { Ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { dayjs, ElMessage } from 'element-plus';
import { useTabBarStore } from '@/stores';
import { queryDragonActivityDetail, saveDragonActivityInfo } from '@/apis/methods/activity/moneyMaker/activityConfig';
import type {
  IQuotaRaisingDragonDetailParams,
} from '@/apis/methods/activity/moneyMaker/activityConfig/type';
import { E_PAGE_ACTION } from './types';

type TQuotaConfigForm = IQuotaRaisingDragonDetailParams & {
  /** 选龙时间 */
  selectRangeTime: string[];
  /** 挖宝周期 */
  treasureCycle: string;
  /** 提报周期 */
  expensesCycle: string;
};

export default function (formRef: Ref<any>, action: E_PAGE_ACTION = E_PAGE_ACTION.ADD) {
  const route = useRoute();
  const router = useRouter();
  const tabBarStore = useTabBarStore();
  /* loading状态 */
  const loading = reactive({
    submit: false,
    page: false,
  });
  /* 表单数据 */
  const formData: TQuotaConfigForm = reactive({
    /** 活动名称 */
    name: '',
    /** 活动开始时间 */
    startTime: '',
    /** 育龙开始时间（选龙结束时间） */
    cultivateStartTime: '',
    /** 活动结束时间 */
    endTime: '',
    /** 选龙时间 */
    selectRangeTime: [],
    /** 挖宝周期 */
    treasureCycle: '-',
    /** 提报周期 */
    expensesCycle: '-',
    /** 目标达成奖励提成比例 */
    targetRate: undefined,
    /** 超出目标部分提成比例 */
    excessRate: undefined,
    /** 补偿部分提成比例 */
    compensateRate: undefined,
    /** 获取补偿下限百分比 */
    compensateIncome: undefined,
    /** 活动类型，0：普通，1：大件 */
    model: 0,
    /** 是否开启激励规则配置 */
    rewardType: true,
    /** 来搞钱活动文案 */
    activityDesc: '',
  });

  /* 提交表单 */
  const submitForm = async () => {
    const res = await formRef.value?.validate();
    if (!res) return;
    try {
      loading.submit = true;
      // 参数提交
      const {
        selectRangeTime,
        ...params
      } = formData;
      params.startTime = selectRangeTime[0];
      params.cultivateStartTime = dayjs(selectRangeTime[1]).add(1, 'day').format('YYYY-MM-DD');
      await handleSubmit(params);
    } catch (error) {
      ElMessage.error('操作失败');
    } finally {
      loading.submit = false;
    }
  };

  /* 请求保存接口 */
  const handleSubmit = async (params: IQuotaRaisingDragonDetailParams) => {
    try {
      await saveDragonActivityInfo(params);
      ElMessage.success('操作成功');
      tabBarStore.closeCurrentTab(route);
      router.push('/activity/moneyMaker/raisingDragon/activityConfig');
    } catch (error: any) {
      return ElMessage.error(error.message || '操作失败');
    }
  };

  /* 拉取活动详情 */
  const getDragonActivityDetail = async () => {
    const code = route.query?.code as string;
    if (!code) return ElMessage.error('没有活动编码!');
    try {
      const { obj } = await queryDragonActivityDetail({ code });
      if (!obj) return ElMessage.error('拉取失败');
      Object.assign(formData, { ...obj, selectRangeTime: [obj.startTime, dayjs(obj.cultivateStartTime).subtract(1, 'day').format('YYYY-MM-DD')] });
    } catch (error: any) {
      ElMessage.error(error.message || '拉取失败');
    }
  };

  /* 初始化 */
  onMounted(async () => {
    const isNeedDetail = [E_PAGE_ACTION.EDIT, E_PAGE_ACTION.DETAIL].includes(action);
    if (isNeedDetail) {
      loading.page = true;
      await getDragonActivityDetail();
      loading.page = false;
    }
  });

  return {
    formData,
    loading,
    formRef,
    submitForm,
  };
}
