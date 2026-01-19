import { dayjs, ElMessage } from 'element-plus';
import { getThreeLevelSendProductType } from '@/apis/methods/common';
import type { IResQueryCoupon } from '@/apis/methods/common/types';
import { queryPortraitList } from '@/apis/methods/activity/courierPersona';
import { queryCouponTemplateDetail, saveOrUpdateCouponTemplate } from '@/apis/methods/activity/applySendActivity';
import type { IConfigEquityData, IResApplySendActivityQuery } from '@/apis/methods/activity/applySendActivity/types';
import { useTabBarStore } from '@/stores';
import type { ICouponTemplateFormData, ITreeOption, TPageAction } from './types';
import {
  CUSTOMER_GROUP_TYPE, CUSTOMER_LAYER, EQUITY_END_TIME_TYPE, EQUITY_START_TIME_TYPE, EQUITY_TYPE,
} from './map';
import {
  convertLimitTimeToStringRange, convertLimitTimeToNumberRange, convertArrayToNumber,
} from './utils';
import * as rightsValidate from './templateAction/rightsValidate';
import * as formValidate from './templateAction/formValidate';

const STAFF_GROUP_CODE_ALL = '____STAFF_CODE_ALL_BY_DEFAULT_____';

export const useTemplateAction = (formRef: Ref<any>, action: TPageAction = 'add') => {
  const route = useRoute();
  const router = useRouter();
  const tabBarStore = useTabBarStore();
  const formData = reactive<ICouponTemplateFormData>({
    /* 发券活动编码 */
    code: undefined,
    /* 发券活动名称 */
    name: '',
    /* 活动时间 */
    // activityRange: [],
    /* 活动开始时间 */
    startTime: '',
    /* 活动结束时间 */
    endTime: '',
    /* 发券客户层级 */
    customerLayer: CUSTOMER_LAYER.PB2_1_2,
    /* 发券范围  */
    customerGroupType: CUSTOMER_GROUP_TYPE.EMPLOYEE,
    /* 活动优先级 */
    weight: null,
    /* 权益开始时间类型 */
    equityStartType: EQUITY_START_TIME_TYPE.ORDER_TIME,
    /* 权益生效日期 */
    equityStartTime: '',
    /* 权益结束时间类型 */
    equityEndType: EQUITY_END_TIME_TYPE.FIXED,
    /* 权益失效日期 */
    equityEndTime: '',
    /* 权益自生效后的生效天数 */
    equityEndDay: null,
    /* 周期规则 */
    rangeRule: [1, 2, 3, 4, 5, 6, 7],
    /* 寄件产品类型列表 */
    sendProductType: [],
    /* 重量范围 */
    weightRange: [],
    /* 券类型 */
    equityType: '',
    /* 时段限制 */
    limitTime: [],
    /* 寄件城市流向 */
    cityFlowDirectionListFullMinus: [],
    /* 折扣类型 */
    discountType: '',
    /* 权益列表 */
    equityList: [],
  });

  /** 当前详情状态，用于编辑 */
  const detailStatus = ref();

  /* 权益 */
  const rights = reactive<{ isShowRight: boolean; data: IResQueryCoupon[] }>({ isShowRight: false, data: [] });

  /* 展示权益选择弹窗 */
  const showRightSearchDialog = () => {
    rights.isShowRight = true;
  };

  /* 添加权益 */
  const handleRightsSubmit = (equityData: IResQueryCoupon) => {
    formData.equityList.push({
      equityName: equityData.name,
      equityCode: equityData.pkgDataId,
      discountValue: equityData.equities[0].deductionValue,
      equityCount: equityData.equities[0].equityValue,
      equityStartTime: equityData.startTm,
      equityEndTime: equityData.endTm,
      staffGroupCode: '',
      equityPkgCount: undefined,
    });
    ElMessage.success('添加成功');
  };

  /* 添加权益前置校验 */
  const submitValidateRights = (equityData: IResQueryCoupon) => {
    const validateRes = rightsValidate.validateBeforeSubmitRights(formData, equityData);
    if (validateRes.isValid) {
      // 成功添加
      handleRightsSubmit(equityData);
      rights.isShowRight = formData.equityList.length < 10;
    }
    return validateRes;
  };

  /* 小哥画像选择 */
  const handleChangeStaffGroupCode = (rowData: any, code: string) => {
    const equityIndex = formData.equityList.findIndex((item: any) => item.equityCode === rowData.equityCode);
    formData.equityList[equityIndex].staffGroupCode = code;
  };

  /* 移除所有权益 */
  const handleRemoveRights = () => {
    formData.equityList = [];
  };

  /* 移除指定所有权益 */
  const handleRemoveRightsItem = (rowData: IConfigEquityData) => {
    formData.equityList = formData.equityList.filter((item: any) => item.equityCode !== rowData.equityCode);
  };

  /* 活动时间变化处理 */
  const handleActivityRangeChange = () => {
    if (!formData.startTime || !formData.endTime) {
      formData.equityEndTime = '';
      return;
    }
    if (formData.equityEndType === EQUITY_END_TIME_TYPE.FIXED && formData.equityEndTime) {
      formRef.value?.validateField('equityEndTime');
    }
  };

  /* 权益开始时间类型变化处理 */
  const handleEquityStartTypeChange = () => {
    formData.equityStartTime = '';
    if (formData.equityStartType === EQUITY_START_TIME_TYPE.INSTEAD) {
      formData.equityStartTime = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss');
    }
  };

  /* 权益开始时间类型变化处理 */
  const handleEquityEndTypeChange = (val: EQUITY_END_TIME_TYPE) => {
    formData.equityEndTime = '';
    if (val === EQUITY_END_TIME_TYPE.DYNAMIC) {
      formData.equityEndDay = 1;
    }
  };

  /* 券类型变化处理 */
  const handleEquityTypeChange = () => {
    formData.limitTime = [];
    formData.cityFlowDirectionListFullMinus = [];
  };

  /** 寄件重量变化处理 */
  const handleWeightRangeChange = () => {
    if (formData.weightRange.length && !formData.weightRange[0] && !formData.weightRange[1]) {
      formData.weightRange = [];
    }
  };

  /** 权益列表提交校验 */
  const validateEquityList = () => {
    if (!formData.equityList.length) {
      ElMessage.error('请添加权益');
      return false;
    }
    const equityItem = formData.equityList.find((item) => !item.staffGroupCode || !item.equityPkgCount);
    if (equityItem) {
      const msg = !equityItem.staffGroupCode ? '小哥画像' : '发放次数';
      ElMessage.error(`请选择${equityItem.equityName}的${msg}`);
      return false;
    }
    return true;
  };

  /** 格式化表单信息 */
  const formatFormData = () => {
    const dateFormater = 'YYYY-MM-DD HH:mm:ss';
    const { startTime, endTime, ...restData } = formData;
    // 格式化权益开始时间，设置为当天开始时间
    const equityStartTime = dayjs(formData.equityStartTime).startOf('day').format(dateFormater);

    // 格式化权益结束时间，设置为当天结束时间
    const equityEndTime = formData.equityEndType === EQUITY_END_TIME_TYPE.FIXED
      ? dayjs(formData.equityEndTime).endOf('day').format(dateFormater)
      : '';
    const equityEndDay = formData.equityEndType === EQUITY_END_TIME_TYPE.DYNAMIC ? String(formData.equityEndDay) : null;

    // 格式化时段限制
    const limitTime = formData.equityType === EQUITY_TYPE.TIME_DISCOUNT ? convertLimitTimeToStringRange(formData.limitTime) : [];

    // 格式化权益列表画像
    const equityList = formData.equityList.map((item) => ({
      ...item,
      staffGroupCode: item.staffGroupCode === STAFF_GROUP_CODE_ALL ? undefined : item.staffGroupCode,
    }));

    return {
      ...restData,
      startTime,
      endTime,
      equityStartTime,
      equityEndTime,
      equityEndDay,
      limitTime,
      equityList,
    };
  };

  /* 提交表单 */
  const isSubmitting = ref(false);
  const submit = async () => {
    if (isSubmitting.value) return;

    // 验证表单基本信息
    const isValid = await formRef.value?.validate();
    if (!isValid) return;

    // 验证权益列表信息
    if (!validateEquityList()) return;

    try {
      isSubmitting.value = true;
      const params = formatFormData();
      await saveOrUpdateCouponTemplate(params);
      ElMessage.success('保存成功');
      router.push({
        path: '/activity/applySendActivity/list',
      });
      tabBarStore.closeCurrentTab(route);
      isSubmitting.value = false;
    } catch (e: any) {
      ElMessage.error(e.message);
      isSubmitting.value = false;
      return;
    }
  };

  /** 是否监听权益配置数据 */
  const isWatchRightsData = ref(true);

  /** 编辑 or 查看 */
  const handleDetailFromEdit = (data: IResApplySendActivityQuery) => {
    const {
      equityStartTime = '',
      equityEndTime = '',
      equityEndDay = null,
      weightRange = [],
      limitTime = [],
      equityList = [],
      status,
      ...rest
    } = data;
    Object.assign(formData, {
      ...rest,
      equityStartTime: new Date(equityStartTime.split(' ')[0]),
      equityEndTime: new Date(equityEndTime.split(' ')[0]),
      equityEndDay: equityEndDay ? Number(equityEndDay) : null,
      weightRange: convertArrayToNumber(weightRange),
      limitTime: convertLimitTimeToNumberRange(limitTime),
      equityList: equityList.map((item) => ({
        ...item,
        staffGroupCode: item.staffGroupCode ? item.staffGroupCode : STAFF_GROUP_CODE_ALL,
      })),
    });
    console.log('status: ', status);
    detailStatus.value = status;
  };

  /** 复制 - 仅复制部分权益配置字段 */
  const handleDetailFromCopy = (data: IResApplySendActivityQuery) => {
    const {
      rangeRule = [],
      sendProductType = [],
      cityFlowDirectionListFullMinus = [],
      weightRange = [],
      equityType = EQUITY_TYPE.TIME_DISCOUNT,
      discountType = '',
    } = data;
    formData.rangeRule = rangeRule;
    formData.sendProductType = sendProductType;
    formData.cityFlowDirectionListFullMinus = cityFlowDirectionListFullMinus;
    formData.weightRange = convertArrayToNumber(weightRange);
    formData.equityType = equityType;
    formData.discountType = discountType;
  };

  /** 获取发券模板详情 */
  const updateDetail = async (code: string) => {
    try {
      const { obj } = await queryCouponTemplateDetail({ code });
      isWatchRightsData.value = false;
      if (route.query.type === 'copy') {
        handleDetailFromCopy(obj);
      } else {
        handleDetailFromEdit(obj);
      }
    } catch (e: any) {
      ElMessage.error(e.message);
      return;
    }
  };

  /** 画像列表 */
  const portrait = reactive<{
    isLoading: boolean;
    options: { label: string; value: string; invalidTime: string; validType: number }[];
  }>({
    isLoading: false,
    options: [],
  });

  /** 画像查询 */
  const searchPortraitList = async (name = '') => {
    try {
      portrait.isLoading = true;
      const portraitListRes = await queryPortraitList({
        pageNum: 1,
        pageSize: 100,
        name,
        status: action === 'detail' ? undefined : 3,
      });
      portrait.options = [
        {
          label: '大网全量小哥',
          value: STAFF_GROUP_CODE_ALL,
          invalidTime: '',
          validType: 1,
        },
        // 筛选出永久有效 or 有效期大于等于活动结束时间的画像
        ...portraitListRes.obj.list
          .filter(
            (item) => action === 'detail'
              || item.validType === 1
              || (
                formData.startTime
                && formData.endTime
                && new Date(item.invalidTime).getTime() >= new Date(formData.endTime).getTime()),
          )
          .map((item) => ({
            value: item.code,
            label: item.name,
            invalidTime: item.invalidTime,
            validType: item.validType,
          })),
      ];
      portrait.isLoading = false;
    } catch (e: any) {
      ElMessage.error(e.message);
      portrait.isLoading = false;
      return;
    }
  };

  /* 寄件产品类型选项 */
  const sendProductTypeList = reactive<{
    options: ITreeOption[];
  }>({
    options: [],
  });

  /** L3寄件产品类型查询 */
  const searchSendProductType = async () => {
    try {
      const result = await getThreeLevelSendProductType();
      const allOption: ITreeOption = {
        label: '全部',
        value: 'ALL',
        children: result.obj.map((item) => ({
          label: item.productName,
          value: item.productCode,
          children: [],
        })),
      };
      if (allOption.children?.length) {
        sendProductTypeList.options = [allOption];
      }
    } catch (e: any) {
      ElMessage.error(e.message);
    }
  };

  onMounted(async () => {
    if (route.query.code) {
      await updateDetail(route.query.code as string);
      isWatchRightsData.value = true;
    }
    searchPortraitList();
    searchSendProductType();
  });

  /* 权益配置信息监听 */
  watch(
    () => [
      formData.equityStartType,
      formData.equityStartTime,
      formData.equityEndType,
      formData.equityEndTime,
      formData.equityEndDay,
      formData.rangeRule,
      formData.sendProductType,
      formData.weightRange,
      formData.equityType,
      formData.limitTime,
      formData.cityFlowDirectionListFullMinus,
      formData.discountType,
    ],
    () => {
      if (formData.equityList.length && isWatchRightsData.value) handleRemoveRights();
    },
    {
      immediate: true,
      deep: true,
    },
  );

  return {
    formData,
    detailStatus,
    rights,
    portrait,
    sendProductTypeList,
    showRightSearchDialog,
    handleRightsSubmit,
    handleRemoveRightsItem,
    searchPortraitList,
    handleChangeStaffGroupCode,
    handleRemoveRights,
    handleActivityRangeChange,
    handleEquityStartTypeChange,
    handleEquityEndTypeChange,
    handleEquityTypeChange,
    handleWeightRangeChange,
    validateActivityRange: (validateType: string) => formValidate.validateActivityTime(formData, portrait, detailStatus.value, validateType),
    validateEquityEndTime: () => formValidate.validateEquityEndTime(formData),
    validateWeightRange: formValidate.validateWeightRange,
    validateLimitTime: formValidate.validateLimitTime,
    validateSendProductType: () => formValidate.validateSendProductType(formRef),
    addRightsDisabled: () => rightsValidate.addRightsDisabled(formData, action),
    submitValidateRights,
    submit,
  };
};
