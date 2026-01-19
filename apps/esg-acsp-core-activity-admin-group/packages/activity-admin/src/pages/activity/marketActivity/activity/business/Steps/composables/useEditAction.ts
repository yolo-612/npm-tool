import type { Ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { dayjs, ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash-es';
import { useTabBarStore, useUserStore } from '@/stores';
import {
  ITemplateRecommendType,
  ITemplateType,
  type IActivityBasic,
  type IActivityCollectionType,
  type IActivityDetailParams,
  type IActivityExtend,
  type ITemplateInfo,
} from '@/apis/methods/activity/business/types';
import {
  postActivityDetail,
  postCreatorAreaCodeSearch,
  postSaveOrUpdate,
  postTemplateList,
} from '@/apis/methods/activity/business';
import { ACTIVITY_LIST_URL, ACTIVITY_TYPE, E_PAGE_ACTION } from '@/pages/activity/marketActivity/types';
import { queryStaff } from '@/apis/methods/activity/newClue';

/** 收集项 */
const collections = [
  {
    fillInKey: 'customerName',
    isOptional: 0,
    isSelected: 1,
    inputName: '姓名',
    inputDesc: '输入项，收集客户的姓名',
    inputType: 'FILL',
    rank: 1,
  },
  {
    fillInKey: 'customerPhone',
    isOptional: 0,
    isSelected: 1,
    inputName: '手机号',
    inputDesc: '输入项，收集客户的手机号，发送验证码校验，校验成功才能签到成功',
    inputType: 'FILL',
    rank: 1,
  },
  {
    fillInKey: 'companyName',
    isOptional: 0,
    isSelected: 1,
    inputName: '公司名称',
    inputDesc: '输入项，收集客户的公司名称',
    inputType: 'FILL',
    rank: 1,
  },
  {
    fillInKey: 'companyAddr',
    isOptional: 0,
    isSelected: 1,
    inputName: '公司地址',
    inputDesc: '输入项，收集客户的公司地址',
    inputType: 'FILL',
    rank: 1,
  },
  {
    fillInKey: 'companyLayer',
    isOptional: 0,
    isSelected: 1,
    inputName: '行业',
    inputDesc: '选择项，收集客户选择的行业',
    inputType: 'SELECT',
    rank: 1,
  },
  {
    fillInKey: 'companySize',
    isOptional: 1,
    isSelected: 0,
    inputName: '公司规模',
    inputDesc: '选择项，收集客户的公司规模',
    inputType: 'SELECT',
    rank: 1,
  },
  {
    fillInKey: 'monthCard',
    isOptional: 1,
    isSelected: 0,
    inputName: '月结卡号',
    inputDesc: '选择项，展示是否已有月结卡号选项，可选择是/否，选择是时，展示月结账号选项卡，根据公司名称、手机号查询出客户关联的月结账号，供客户选择',
    inputType: 'SELECT',
    rank: 1,
  },
  {
    fillInKey: 'estimatedMonthlyCourierCost',
    isOptional: 1,
    isSelected: 0,
    inputName: '每月预估快递费用',
    inputDesc: '输入项，收集客户的每月预估快递费用',
    inputType: 'FILL',
    rank: 1,
  },
  {
    fillInKey: 'potentialCooperationBusiness',
    isOptional: 1,
    isSelected: 0,
    inputName: '意向合作业务',
    inputDesc: '选择项，收集客户期望合作的顺丰业务板块',
    inputType: 'SELECT',
    rank: 1,
  },
];

export default function (
  formRef: Ref<any>,
  editTemplateInfoRef: Ref<any>,
  action: E_PAGE_ACTION = E_PAGE_ACTION.ADD,
  step: globalThis.Ref<number, number>,
) {
  const route = useRoute();
  const router = useRouter();
  const tabBarStore = useTabBarStore();
  /* 登录账号角色信息 */
  const userStore = useUserStore();

  /** 主题 */
  const theme = ref(ITemplateType.SYSTEM);
  /* loading状态 */
  const loading = reactive({
    page: false,
  });
  /** 系统主题列表信息 */
  const systemThemes = reactive<{
    pageNum: number;
    pageSizes: number;
    totalSize: number;
    list: ITemplateInfo[];
  }>({
    pageNum: 1,
    pageSizes: 20,
    totalSize: 0,
    list: [],
  });
  /** 个人主题列表信息 */
  const personalThemes = reactive<{
    pageNum: number;
    pageSizes: number;
    totalSize: number;
    list: ITemplateInfo[];
  }>({
    pageNum: 1,
    pageSizes: 20,
    totalSize: 0,
    list: [],
  });
  /** 切换选择模板 */
  const handleThemeChange = (code: string) => {
    activityTemplate.templateCode = code;
  };
  /** 修改时的模板信息 */
  const handleEditTemplateInfo = (code = '') => {
    editTemplateInfoRef.value.showTemplateInfo(code, action === E_PAGE_ACTION.DETAIL);
  };
  /** 模板信息保存成功 */
  const handleSaveTemplateInfo = (code: string) => {
    activityTemplate.templateCode = code;
    getPersonalTemplateList();
  };
  /**
   * 切换页码
   * @param val 页码
   */
  const handlePageChange = (type: ITemplateType, val: number) => {
    if (type === ITemplateType.SYSTEM) {
      systemThemes.pageNum = val;
      getSystemTemplateList();
    } else {
      personalThemes.pageNum = val;
      getPersonalTemplateList();
    }
  };

  /** 活动基础信息 */
  const activityBasic = reactive<IActivityBasic>({
    /** 活动名称 */
    name: '',
    /** 活动编码 */
    code: '',
    /** 活动类型 */
    type: ACTIVITY_TYPE.BUSINESS_COLLECTION,
    /** 活动状态 */
    activityStatus: undefined,
    /** 活动开始时间 */
    startTime: '',
    /** 活动结束时间 */
    endTime: '',
    /** 创建人 */
    creator: '',
    /** 创建人名称 */
    empName: '',
    /** 创建人地区代码 */
    creatorAreaCode: '',
    /** 创建人地区 */
    creatorAreaName: '',
    /** 活动简介 */
    activityDesc: '',
  });
  /** 活动拓展信息 */
  const activityExtend = reactive<IActivityExtend>({
    /** 预估参与人数 */
    estimateParticipantCount: undefined,
    /** 活动预算金额 */
    budgetAmount: undefined,
    /** 活动方案文件 */
    planDocument: '',
    /** 活动方案名 */
    fileName: '',
    /** 活动方案信息 */
    planDocumentFile: undefined,
  });
  /** 活动模板信息 */
  const activityTemplate = reactive({
    /** 模板编码 */
    templateCode: '',
  });
  const restField = reactive<{
    collectionList: IActivityCollectionType[],
  }>({
    /** 活动收集项列表 */
    collectionList: cloneDeep(collections),
  });
  /* 表单数据 */
  const formData = {
    ...toRefs(activityBasic),
    ...toRefs(activityExtend),
    ...toRefs(activityTemplate),
    ...toRefs(restField),
  };

  /* 取消保存 */
  const cancelSave = async () => {
    tabBarStore.closeCurrentTab(route);
    router.push(ACTIVITY_LIST_URL);
  };

  /** 获取系统模板列表 */
  const getSystemTemplateList = async () => {
    try {
      const { obj } = await postTemplateList({
        templateType: ITemplateType.SYSTEM,
        businessType: ACTIVITY_TYPE.BUSINESS_COLLECTION,
        pageNum: systemThemes.pageNum,
        pageSize: systemThemes.pageSizes,
      });
      if (!obj || !obj.list) return;
      /** 如果没有推荐模板，则默认选中第一个 */
      if (!activityTemplate.templateCode) {
        activityTemplate.templateCode = obj.list.find(
          (item: ITemplateInfo) => item.isRecommend === ITemplateRecommendType.RECOMMEND,
        )?.templateCode || '';
      }
      Object.assign(systemThemes, obj);
    } catch (error) {
      ElMessage.error('操作失败');
    }
  };
  /** 获取个人模板列表 */
  const getPersonalTemplateList = async () => {
    try {
      const { obj } = await postTemplateList({
        templateType: ITemplateType.PERSONAL,
        businessType: ACTIVITY_TYPE.BUSINESS_COLLECTION,
        pageNum: personalThemes.pageNum,
        pageSize: personalThemes.pageSizes,
      });
      if (!obj || !obj.list) return;
      Object.assign(personalThemes, obj);
      const index = obj.list.findIndex((item) => item.templateCode === activityTemplate.templateCode);
      if (index > -1) {
        theme.value = ITemplateType.PERSONAL;
      }
    } catch (error) {
      ElMessage.error('操作失败');
    }
  };

  /** 下一步 */
  const nextStep = async () => {
    const isValid = await formRef.value?.validate();
    if (!isValid) return;
    if (step.value === 1) {
      step.value = 2;
    }
  };

  /* 保存到草稿表单 */
  const draftSave = async () => {
    try {
      // 基本参数
      const {
        code,
        ...basic
      } = activityBasic;
      /** 活动名称必填 */
      if (!basic.name) {
        ElMessage.error('请输入活动名称！');
        return;
      }

      // 扩展参数
      const { estimateParticipantCount, budgetAmount, planDocumentFile } = activityExtend;

      // 提交参数
      const saveAsDraft = true;
      const vParams = {
        activityExtend: {
          estimateParticipantCount,
          budgetAmount,
          planDocument: planDocumentFile?.pmpOssPath,
          planDocumentFileName: planDocumentFile?.fileName,
        },
        activityTemplate,
        activityBasic: basic,
        collectionList: restField.collectionList.filter((item) => item.isSelected),
        saveAsDraft,
      };
      await handleSubmit(vParams);
    } catch (error) {
      ElMessage.error('操作失败');
    }
  };

  /* 提交表单 */
  const submitForm = async () => {
    try {
      if (!activityTemplate.templateCode) {
        ElMessage.error('请选择活动模板');
        return;
      }
      // 基本参数
      const { code, endTime, ...params } = activityBasic;

      // 扩展参数
      const { estimateParticipantCount, budgetAmount, planDocumentFile } = activityExtend;

      // 提交参数
      const saveAsDraft = false;
      const vParams = {
        activityExtend: {
          estimateParticipantCount,
          budgetAmount,
          planDocument: planDocumentFile?.pmpOssPath,
          planDocumentFileName: planDocumentFile?.fileName,
        },
        activityTemplate,
        activityBasic: action === E_PAGE_ACTION.EDIT ? {
          ...params,
          code,
          endTime,
        } : {
          ...params,
          endTime,
        },
        collectionList: restField.collectionList.filter((item) => item.isSelected),
        saveAsDraft,
      };
      await handleSubmit(vParams);
    } catch (error) {
      ElMessage.error('操作失败');
    }
  };

  /* 请求保存接口 */
  const handleSubmit = async (params: IActivityDetailParams) => {
    try {
      handleChangePageStatus(true);
      const {
        startTime,
        endTime,
        creatorAreaName,
        empName,
        ...rest
      } = params?.activityBasic || {};
      await postSaveOrUpdate({
        ...params,
        activityBasic: {
          ...rest,
          startTime: startTime ? dayjs(startTime).format('YYYY-MM-DD HH:mm:ss') : '',
          endTime: endTime ? dayjs(endTime).format('YYYY-MM-DD HH:mm:ss') : '',
        },
      });
      ElMessage.success('操作成功');
      tabBarStore.closeCurrentTab(route);
      router.push(ACTIVITY_LIST_URL);
    } catch (error: any) {
      return ElMessage.error(error.message || '操作失败');
    } finally {
      handleChangePageStatus(false);
    }
  };

  /* 拉取活动详情 */
  const getDragonActivityDetail = async () => {
    const code = route.query?.code as string;
    if (!code) return ElMessage.error('没有活动编码!');
    try {
      handleChangePageStatus(true);
      const { obj } = await postActivityDetail({ code });
      if (!obj) return ElMessage.error('拉取失败');
      /** 活动基本数据 */
      if (obj.activityBasic) {
        if (action !== E_PAGE_ACTION.COPY) {
          Object.assign(activityBasic, obj.activityBasic, {
            creatorAreaCode: `${obj.activityBasic.creatorAreaCode}/${obj.activityBasic.creatorAreaName || ''}`,
            creator: `${obj.activityBasic.creator}(${obj.activityBasic.empName || ''})`,
          });
        } else {
          const {
            code,
            startTime,
            endTime,
            creator,
            empName,
            creatorAreaCode,
            creatorAreaName,
            ...basic
          } = obj.activityBasic;
          Object.assign(activityBasic, basic);
          /** 初始化新建人信息 */
          initFormData();
        }
      }
      /** 活动拓展信息 */
      if (obj.activityExtend) {
        const {
          budgetAmount,
          estimateParticipantCount,
          ...extend
        } = { ...obj.activityExtend };
        if (extend && extend.planDocumentFile && extend.planDocument) {
          extend.planDocumentFile = {
            ...extend.planDocumentFile,
            pmpOssPath: extend.planDocument!,
            fileName: extend.planDocumentFileName!,
          };
          extend.planDocument = extend.planDocumentFileName;
        }
        Object.assign(activityExtend, extend, {
          budgetAmount: budgetAmount || undefined,
          estimateParticipantCount: estimateParticipantCount || undefined,
        });
      }

      /** 模板信息 - copy类型不能回显 */
      if (obj.activityTemplate && action !== E_PAGE_ACTION.COPY) Object.assign(activityTemplate, obj.activityTemplate);

      /** 获取可选项 */
      if (obj.collectionList && Array.isArray(obj.collectionList)) {
        // 创建一个 Map 对象
        const map = new Map();
        // 先将 arr 中的元素存入 Map
        restField.collectionList.forEach((item) => {
          map.set(item.fillInKey, item);
        });
        // 再将 arr1 中的元素存入 Map，如果 key 已存在则更新 val
        obj.collectionList.forEach((item) => {
          if (map.has(item.fillInKey)) {
            const existingItem = map.get(item.fillInKey);
            existingItem.isSelected = item.isSelected;
          } else {
            map.set(item.fillInKey, item);
          }
        });
        restField.collectionList = Array.from(map.values());
      }
    } catch (error: any) {
      ElMessage.error(error.message || '拉取失败');
    } finally {
      handleChangePageStatus(false);
    }
  };

  /** 新增时默认一些填写数据 */
  const initFormData = async () => {
    try {
      activityBasic.code = '系统自动生成唯一编码';
      // 获取创建人地区编码
      const { obj } = await postCreatorAreaCodeSearch();
      activityBasic.creatorAreaCode = `${obj.creatorAreaCode}/${obj.creatorAreaName}`;
      // 获取创建人信息
      const res = await queryStaff(userStore.empCode);
      if (res.obj && Array.isArray(res.obj) && res.obj.length > 0) {
        const { empCode, empName } = res.obj[0] || {};
        // 显示创建人
        activityBasic.creator = `${empCode}(${empName})`;
      }
    } catch (error: any) {
      ElMessage.error(error.message);
    }
  };

  /**
   * 切换页面loading状态
   * @param status boolean
   */
  const handleChangePageStatus = (status: boolean) => {
    loading.page = status;
  };

  /* 初始化 */
  onMounted(async () => {
    const isNeedDetail = [E_PAGE_ACTION.COPY, E_PAGE_ACTION.EDIT, E_PAGE_ACTION.DETAIL].includes(action);
    // 新增时需要填写活动编码、创建人地区代码、创建人
    if (action === E_PAGE_ACTION.ADD) {
      await initFormData();
    }
    if (isNeedDetail) {
      await getDragonActivityDetail();
    }
    getSystemTemplateList();
    getPersonalTemplateList();
  });

  return {
    action,
    activityBasic,
    activityExtend,
    activityTemplate,
    restField,
    formData,
    loading,
    formRef,
    theme,
    systemThemes,
    personalThemes,
    handleThemeChange,
    handlePageChange,
    handleEditTemplateInfo,
    handleSaveTemplateInfo,
    cancelSave,
    draftSave,
    nextStep,
    submitForm,
    handleChangePageStatus,
  };
}
