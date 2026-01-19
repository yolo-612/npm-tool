import { ElMessage } from 'element-plus';
import type { Ref } from 'vue';
import type { IResQueryCoupon } from '@/apis/methods/common/types';
import {
  queryDirectSendActivityDetail,
  saveOrUpdateDirectSendActivityDetail,
} from '@/apis/methods/activity/directSendActivity';
import { queryPortraitList } from '@/apis/methods/activity/courierPersona';
import { queryCoupon } from '@/apis/methods/common';
import { queryQuotaGoodsIntelligence } from '@/apis/methods/activity/quotaCard';
import { useTabBarStore } from '@/stores';
import {
  ALL_GROUPS,
  CUSTOMER_SCOPE,
  PAGE_ACTION,
  REWARD_FLAG,
  REWARD_TYPE,
  SINGLE_TICKET,
} from '../types';
import type { IDirectSendFormData } from '../types';

const STAFF_GROUP_CODE_ALL = '____STAFF_CODE_ALL_BY_DEFAULT_____';

export default function (formRef: Ref<any>, code?: string, type = PAGE_ACTION.EDIT) {
  const route = useRoute();
  const tabBarStore = useTabBarStore();
  const router = useRouter();
  const rights = ref<{ isShowRight: boolean; data: IResQueryCoupon[] }>({ isShowRight: false, data: [] });
  const portrait = ref<{
    isLoading: boolean;
    options: { label: string; value: string; invalidTime: string; validType: number }[];
  }>({
    isLoading: false,
    options: [],
  });
  const formData = ref<IDirectSendFormData>({
    name: '',
    code: '',
    startTime: '',
    endTime: '',
    customerLayer: '',
    customerGroupType: '',
    equityName: '',
    equityCode: '',
    equityType: '',
    discountType: '',
    discountValue: '',
    equityCount: '',
    equityStartTime: '',
    equityEndTime: '',
    staffGroupCode: STAFF_GROUP_CODE_ALL,
    equityStartType: '',
    equityEndType: '',
    couponValidDuration: 0,
    rightsStartTime: '',
    rightsEndTime: '',
    couponTypeCount: 0,
    titleTag: '',
    source: '',
    equityPkgCount: 1,
    cardBackground: '',
    /** 是否奖励标识，0：无奖励，1：有奖励 */
    rewardFlag: '',
    /** 奖励预算编码 */
    rewardProjectCode: '',
    /** 奖励统计类型，TICKET:单票 */
    rewardStatisticalType: '',
    /** 统计逻辑：TICKET_USED_EQUITY：单票权益使用 */
    taskAction: '',
    /** 奖励信息 */
    rewardList: [],
    /** 客群列表 - 适用于奖励类型为否的时候 */
    codeList: [],
  });
  /** 当前详情状态，用于编辑 */
  const detailStatus = ref();
  const loadingDetail = ref(false);
  const rightsData = computed(() => {
    return formData.value.equityCode ? [formData.value] : undefined;
  });

  /** 解析物料 */
  const parseMaterial = (materialJson:string) => {
    try {
      return JSON.parse(materialJson);
    } catch (error) {
      return {};
    }
  };

  const updateDetail = async (code: string) => {
    loadingDetail.value = true;
    try {
      const { obj } = await queryDirectSendActivityDetail({ code });

      let equity: any = {};
      let couponObj: any = {};
      try {
        const { obj: obj1 } = await queryCoupon({
          code: obj.equityCode,
          type: parseInt(obj.equityType, 10) as 1 | 2,
        });
        couponObj = obj1;
        equity = couponObj.equities?.length ? couponObj.equities[0] : undefined;
      } catch (error) {
        console.log('权益接口请求失败', error);
        equity = {};
        couponObj = {};
      }

      // 奖励信息
      let list = [];
      try {
        /** 读取客群列表 */
        const rewardList = obj.rewardDetailList ?? [];
        const options = rewardList.reduce((pre: any, curr: any) => {
          const list = curr?.groupCodeList?.map((item: any) => ({
            label: item.customerGroupName,
            value: item.customerGroupCode,
            disabled: false,
          }));
          return [...pre, ...list];
        }, []);
        /** 是否为否奖励标识，0：无奖励，1：有奖励 */
        if (obj.rewardFlag === REWARD_FLAG.NO) {
          list = options.map((item) => item.value);
          groupInfo.value.groupOptions = options;
        } else {
          list = rewardList.map((item) => ({
            ...item,
            pointTicket: Number(item.pointTicket),
            groupCodeList: item?.groupCodeList?.map((group: any) => group.customerGroupCode) ?? [],
          }));
          // 为奖励标识，初始化客群列表
          for (let i = 0; i < list.length; i++) {
            groupInfo.value.rewardGroupOptions[i] = options;
          }
        }
      } catch (error) {
        list = [];
        ElMessage.error('奖励信息解析失败');
      }

      /** 解析物料 */
      const { titleTag = '', cardBackground = '' } = parseMaterial(obj.materialJson || '{}');
      /** 客户编码 */
      const staffGroupCode = obj.staffGroupCode || STAFF_GROUP_CODE_ALL;
      formData.value = {
        name: obj.name,
        code: obj.code,
        startTime: obj.startTime,
        endTime: obj.endTime,
        customerLayer: obj.customerLayer,
        customerGroupType: obj.customerGroupType,
        equityName: obj.equityName,
        equityCode: obj.equityCode,
        equityType: obj.equityType,
        discountType: obj.discountType,
        discountValue: obj.discountValue,
        source: obj.source,
        // equityCount: equity?.equityValue ? equity.equityValue : '',
        equityCount: obj.equityCount,
        equityStartTime: obj.equityStartTime,
        equityEndTime: obj.equityEndTime,
        equityStartType: obj.equityStartType,
        equityEndType: obj.equityEndType,
        staffGroupCode: obj.customerGroupType === CUSTOMER_SCOPE.CUSTOMER ? '-' : staffGroupCode,
        couponValidDuration: equity ? parseFloat(equity.inforceDuration) : 0,
        rightsStartTime: couponObj.startTm,
        rightsEndTime: couponObj.endTm,
        couponTypeCount: couponObj.equities?.length ?? 0,
        titleTag,
        equityPkgCount: obj.equityPkgCount ?? 1,
        cardBackground,
        rewardFlag: obj.rewardFlag ?? REWARD_FLAG.NO,
        rewardProjectCode: obj.rewardProjectCode || '',
        rewardStatisticalType: obj.rewardStatisticalType || '',
        taskAction: obj.taskAction || '',
        rewardList: obj.rewardFlag === REWARD_FLAG.YES ? list : [],
        codeList: obj.rewardFlag === REWARD_FLAG.NO ? list : [],
      };

      detailStatus.value = obj.status;
      loadingDetail.value = false;
    } catch (e: any) {
      ElMessage.error(e.message);
      loadingDetail.value = false;
      return;
    }
    searchPortraitList();
  };

  const searchPortraitList = async (name = '') => {
    try {
      portrait.value.isLoading = true;
      const portraitListRes = await queryPortraitList({
        pageNum: 1,
        pageSize: 100,
        name,
        status: type === PAGE_ACTION.DETAIL ? undefined : 3,
      });
      portrait.value.options = [
        {
          label: '大网全量小哥',
          value: STAFF_GROUP_CODE_ALL,
          invalidTime: '',
          validType: 1,
        },
        ...portraitListRes.obj.list
          .filter(
            (item) => type === PAGE_ACTION.DETAIL
              || item.validType === 1
              || (
                formData.value.startTime
                && formData.value.endTime
                && new Date(item.invalidTime).getTime() >= new Date(formData.value.endTime).getTime()
              ),
          )
          .map((item) => ({
            value: item.code,
            label: item.name,
            invalidTime: item.invalidTime,
            validType: item.validType,
          })),
      ];
      portrait.value.isLoading = false;
    } catch (e: any) {
      ElMessage.error(e.message);
      portrait.value.isLoading = false;
      return;
    }
  };

  const showRightSearchDialog = () => {
    if (!formData.value.startTime || !formData.value.endTime) {
      ElMessage.error('请先选择活动时间');
      return;
    }
    if (formData.value.equityCode) {
      ElMessage.error('只能添加一个权益包');
      return;
    }
    rights.value.isShowRight = true;
  };

  const validateRightsTime = (
    data: Pick<
      IDirectSendFormData,
      | 'startTime'
      | 'endTime'
      | 'equityEndType'
      | 'equityEndTime'
      | 'rightsEndTime'
      | 'rightsStartTime'
      | 'couponTypeCount'
      | 'equityValue'
    >,
    from: 'rights' | 'startTime' | 'endTime' = 'rights',
  ) => {
    if (from === 'rights' && data.couponTypeCount <= 0) {
      return { isValid: false, message: '不支持添加无权益的权益包' };
    }
    if (from === 'rights' && data.couponTypeCount > 1) {
      return { isValid: false, message: '不支持添加多个权益的权益包' };
    }
    if (from === 'rights' && data.equityValue === '-1') {
      return { isValid: false, message: '添加失败，权益抵扣票数不能为不限' };
    }
    if (!data.startTime) {
      return { isValid: false, message: '请选择活动开始时间' };
    }
    if (!data.endTime) {
      return { isValid: false, message: '请选择活动结束时间' };
    }
    const startTimeTimeStamp = new Date(data.startTime).getTime();
    const endTimeTimeStamp = new Date(data.endTime).getTime();

    if (startTimeTimeStamp >= endTimeTimeStamp) {
      return { isValid: false, message: '结束时间需晚于开始时间' };
    }
    if (data.equityEndType === '1' && endTimeTimeStamp > new Date(data.equityEndTime).getTime()) {
      return { isValid: false, message: `${from === 'rights' ? '添加失败，' : ''}券结束时间与活动时间不匹配` };
    }
    if (
      endTimeTimeStamp > new Date(data.rightsEndTime).getTime()
      || startTimeTimeStamp < new Date(data.rightsStartTime).getTime()
    ) {
      return { isValid: false, message: `${from === 'rights' ? '添加失败，' : ''}权益时间与活动时间不匹配` };
    }

    const portraitItem = portrait.value.options.find((item) => item.value === formData.value.staffGroupCode);
    if (
      portraitItem
      && portraitItem.validType !== 1
      && new Date(portraitItem.invalidTime).getTime() < endTimeTimeStamp
    ) {
      return { isValid: false, message: '画像结束时间早于活动结束时间' };
    }
    return { isValid: true };
  };

  const validateRightsAdd = (rightsData: IResQueryCoupon) => {
    const equity = rightsData.equities?.length ? rightsData.equities[0] : undefined;
    if (!equity) {
      return { isValid: false, message: '权益包里没有券数据' };
    }
    const data = {
      startTime: formData.value.startTime,
      endTime: formData.value.endTime,
      equityEndType: equity.endTmType,
      equityEndTime: equity.endTm,
      rightsEndTime: rightsData.endTm,
      rightsStartTime: rightsData.startTm,
      couponTypeCount: rightsData.equities?.length ?? 0,
      equityValue: equity.equityValue,
    };
    const validResult = validateRightsTime(data);
    rights.value.isShowRight = !validResult.isValid;
    return validResult;
  };

  const handleRightDialogSubmit = (rightData: IResQueryCoupon) => {
    const equity = rightData.equities?.length ? rightData.equities[0] : undefined;
    if (!equity) {
      ElMessage.error('权益包里没有券数据');
      return;
    }

    formData.value.equityName = rightData.name;
    formData.value.equityCode = rightData.pkgDataId;
    formData.value.equityType = rightData.periodEquityType;
    formData.value.discountType = equity.deductionType;
    formData.value.discountValue = equity.deductionValue;
    formData.value.equityCount = equity.equityValue;
    formData.value.equityPkgCount = 1;
    formData.value.equityStartTime = equity.startTm;
    formData.value.equityEndTime = equity.endTm;
    formData.value.equityStartType = equity.startTmType;
    formData.value.equityEndType = equity.endTmType;
    formData.value.staffGroupCode = formData.value.customerGroupType === CUSTOMER_SCOPE.AREA ? STAFF_GROUP_CODE_ALL : '-';

    formData.value.couponValidDuration = parseFloat(equity.inforceDuration);
    formData.value.rightsStartTime = rightData.startTm;
    formData.value.rightsEndTime = rightData.endTm;
    formData.value.couponTypeCount = rightData.equities?.length ?? 0;
    formRef.value?.validate();
  };

  const handleChangeStaffGroupCode = (code: string) => {
    formData.value.staffGroupCode = code;
  };
  const handleRemoveRights = () => {
    formData.value.equityName = '';
    formData.value.equityCode = '';
    formData.value.equityType = '';
    formData.value.discountType = '';
    formData.value.discountValue = '';
    formData.value.equityCount = '';
    formData.value.equityStartTime = '';
    formData.value.equityEndTime = '';
    formData.value.staffGroupCode = '';
    formData.value.couponValidDuration = 0;
    formData.value.rightsStartTime = '';
    formData.value.rightsEndTime = '';
    formData.value.couponTypeCount = 0;
  };

  let isSubmitting = false;

  const submit = async () => {
    if (isSubmitting) return;
    const isValid = await formRef.value?.validate();
    if (!isValid) {
      return;
    }
    if (!formData.value.equityCode) {
      ElMessage.error('请添加权益');
      return;
    }
    if (!formData.value.equityPkgCount) {
      ElMessage.error('请填写发券次数');
      return;
    }
    if (formData.value.staffGroupCode === '' && formData.value.customerGroupType === CUSTOMER_SCOPE.AREA) {
      ElMessage.error('请选择小哥画像');
      return;
    }
    // 校验奖励规则
    const { status, message } = handleCheckRewardRule();
    if (!status) {
      ElMessage.error(message);
      return;
    }

    try {
      isSubmitting = true;
      const {
        startTime,
        endTime,
        titleTag,
        cardBackground,
        rewardFlag,
        codeList,
        rewardList,
        ...restData
      } = formData.value;
      const staffGroupCode = restData.customerGroupType === CUSTOMER_SCOPE.CUSTOMER
        || restData.staffGroupCode === STAFF_GROUP_CODE_ALL ? undefined : restData.staffGroupCode;
      if (!startTime || !endTime) {
        return;
      }
      const param = {
        ...restData,
        materialJson: JSON.stringify({ titleTag, cardBackground }),
        staffGroupCode,
        startTime,
        endTime,
        rewardFlag,
      };
      /** 判断是否奖励标识，0：无奖励，1：有奖励 */
      if (rewardFlag === REWARD_FLAG.YES) {
        Object.assign(param, { rewardList });
      } else {
        Object.assign(param, {
          rewardList: [{
            groupCodeList: codeList,
          }],
        });
      }

      await saveOrUpdateDirectSendActivityDetail(param);
      ElMessage.success('保存成功');
      router.push({
        path: '/activity/directSendActivity/list',
      });

      tabBarStore.closeCurrentTab(route);

      isSubmitting = false;
    } catch (e: any) {
      ElMessage.error(e.message);
      isSubmitting = false;
      return;
    }
  };

  onMounted(() => {
    if (code) {
      updateDetail(code);
    } else {
      handleAddGroupInfo();
    }
    searchPortraitList();
  });

  /** 小哥小任务版本相关代码 */
  /** 发券客户范围的切换 */
  const handleChangeCustomerGroupType = () => {
    /** 切换发券范围时客群选择“所有客户”，则清空客群选择 */
    if (Array.isArray(formData.value.codeList) && formData.value.codeList?.findIndex((item: string) => item === ALL_GROUPS.value) > -1) {
      formData.value.codeList = [];
    }
    /** 小哥画像设置为全部 */
    formData.value.staffGroupCode = STAFF_GROUP_CODE_ALL;
    if (formData.value.customerGroupType === CUSTOMER_SCOPE.CUSTOMER) {
      formData.value.staffGroupCode = '-';
    }
  };
  /** 是否奖励的切换 */
  const handleChangeRewardFlag = () => {
    formData.value.rewardProjectCode = '';
    formData.value.rewardStatisticalType = REWARD_TYPE.TICKET;
    formData.value.taskAction = SINGLE_TICKET.TICKET_USED_EQUITY;
    formData.value.rewardList = [];
    formData.value.codeList = [];
  };
  /** 客群列表 */
  const groupInfo = ref<{
    isLoading: boolean;
    rewardGroupOptions: { label?: string; value?: string, disabled?: boolean }[][];
    groupOptions: { label?: string; value?: string, disabled?: boolean }[];
  }>({
    isLoading: false,
    rewardGroupOptions: new Array(5),
    groupOptions: [],
  });
  /** 增加客群 */
  const handleAddGroupInfo = () => {
    if (groupInfo.value.rewardGroupOptions.length < formData.value.rewardList.length) {
      groupInfo.value.rewardGroupOptions.push([]);
    }
    formData.value.rewardList.push({
      groupCodeList: [],
      pointTicket: undefined,
      pointTotal: undefined,
    });
  };
  /** 移除客群 */
  const handleRemoveGroupInfo = (index: number) => {
    formData.value.rewardList.splice(index, 1);
    groupInfo.value.rewardGroupOptions.splice(index, 1);
  };
  /**
   * 搜索客群
   * @param name 客群名
   * @param index 客群索引 为 -1 则说明是 无奖励情况
   * @returns 客群列表
   */
  const handleSearchGroupList = async (name = '', index = -1) => {
    try {
      groupInfo.value.isLoading = true;
      const vParams = {
        pageNum: 1,
        pageSize: 20,
        name,
        status: 2,
      };
      try {
        /** 是否有奖励 */
        if (formData.value.rewardFlag === REWARD_FLAG.YES) {
          const rewardList = formData.value.rewardList;
          Object.assign(vParams, {
            excludeCodeList: rewardList.reduce((pre: any, cur: any) => {
              if (cur?.groupCodeList) {
                return [...pre, ...cur.groupCodeList];
              }
              return pre;
            }, []),
          });
        }
      } catch (event: any) {
        console.log('拼接已选客群列表错误', event.message);
      }
      // 获取客群列表
      const groupListRes = await queryQuotaGoodsIntelligence(vParams);
      const disabled = formData.value?.codeList?.includes(ALL_GROUPS.value) ?? false;
      const list = groupListRes.obj.list.map((item: any) => {
        return {
          label: item.name,
          value: item.code,
          disabled,
        };
      });
      if (index > -1) {
        /** 如果 发券客户范围 为 小哥负责区域客户，并且是 无奖励 状态，客群可以选择全部 */
        groupInfo.value.rewardGroupOptions[index] = list;
      } else {
        groupInfo.value.groupOptions = formData.value.customerGroupType === CUSTOMER_SCOPE.AREA
          ? [ALL_GROUPS, ...list] : list;
      }
      groupInfo.value.isLoading = false;
    } catch (e: any) {
      ElMessage.error(e.message);
      groupInfo.value.isLoading = false;
      return;
    }
  };
  /**
   * 更改奖励规则的客群
   * @param index 下标
   * @param groupCodeList 客群列表
   */
  const handleChangeGroup = (groupCodeList: string[], index = -1) => {
    // 有奖励状态下
    if (index > -1) {
      formData.value.rewardList[index].groupCodeList = groupCodeList;
    } else {
      // 无奖励状态下
      const isCheckAll = groupCodeList.includes(ALL_GROUPS.value);
      groupInfo.value.groupOptions.forEach((item) => {
        if (item.value !== ALL_GROUPS.value) item.disabled = isCheckAll;
      });
      formData.value.codeList = isCheckAll ? [ALL_GROUPS.value] : groupCodeList;
    }
  };

  /**
   * 校验奖励规则
   * @returns 返回 true 表示校验通过，false 表示校验不通过，message 为错误信息
   */
  const handleCheckRewardRule = (): { status: boolean; message: string } => {
    if (formData.value.rewardFlag === REWARD_FLAG.YES) {
      if (!formData.value.rewardList || formData.value.rewardList.length === 0) {
        return {
          status: false,
          message: '请添加奖励规则！',
        };
      } else {
        const isTrue = formData.value.rewardList.every((item) => item?.groupCodeList?.length && item.pointTicket);
        return {
          status: isTrue,
          message: '请完成奖励规则的必填项！',
        };
      }
    } else {
      return {
        status: Array.isArray(formData.value?.codeList) && formData.value.codeList.length > 0,
        message: '请添加奖励规则！',
      };
    }
  };

  return {
    showRightSearchDialog,
    handleRightDialogSubmit,
    handleChangeStaffGroupCode,
    handleRemoveRights,
    rights,
    formData,
    detailStatus,
    rightsData,
    loadingDetail,
    updateDetail,
    submit,
    searchPortraitList,
    portrait,
    validateRightsAdd,
    validateRightsTime,
    handleChangeCustomerGroupType,
    handleChangeRewardFlag,
    groupInfo,
    handleAddGroupInfo,
    handleRemoveGroupInfo,
    handleSearchGroupList,
    handleChangeGroup,
  };
}
