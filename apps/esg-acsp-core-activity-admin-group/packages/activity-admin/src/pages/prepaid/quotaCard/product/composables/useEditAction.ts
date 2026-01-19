import type { Ref } from 'vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useTabBarStore } from '@/stores';
import { queryQuotaGoodsDetail, queryQuotaGoodsSaveOrUpdate } from '@/apis/methods/activity/quotaCard';
import type {
  I_INTELLIGENCE_CUSTOMER_GROUP,
  IQuotaDetailConfigRespRes,
  IQuotaGoodsSaveOrUpdateParams,
} from '@/apis/methods/activity/quotaCard/types';
import { E_PAGE_ACTION } from './types';

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
  const formData: IQuotaGoodsSaveOrUpdateParams = reactive({
    id: undefined, // id
    name: '', // 额度卡名称
    goodsCode: '', // 额度卡编码
    quotaAmount: undefined, // 额度 单位/元
    stock: undefined, // 库存
    restrictedQuantity: undefined, // 限购数量
    remark: '', // 备注
    imageUrl: '', // 商品预览图
    goodsDesc: '', // 商品描述
    merGroupCodeList: [], // 限购客群编码
    intelligenceRespList: [], // 客群集合
    configCode: '', // 计价规则编码
    configRespList: [], // 计价规则集合
  });

  /* 提交表单 */
  const submitForm = async () => {
    const res = await formRef.value?.validate();
    if (!res) return;
    try {
      loading.submit = true;
      // 客群校验
      if (formData.intelligenceRespList) {
        if (formData.intelligenceRespList.length === 0) {
          return ElMessage.warning('请选择限购客群！');
        } else if (formData.intelligenceRespList.length > 1) {
          return ElMessage.warning('限购客群只能选择一个！');
        } else {
          formData.merGroupCodeList = formData.intelligenceRespList.map((item) => item.code);
        }
      } else {
        return ElMessage.warning('请选择限购客群！');
      }

      // 计价规则校验
      if (formData.configRespList?.length) {
        formData.configCode = formData.configRespList[0]?.code as string;
      } else {
        return ElMessage.warning('请选择计价规则！');
      }
      // 参数提交
      const {
        cycle,
        configRespList,
        intelligenceRespList,
        ...params
      } = formData;
      const quota = configRespList[0].quota;
      if (params.quotaAmount !== quota) {
        ElMessage.warning('商品金额与计价规则中卡额度不相等！');
        return;
      }
      await handleSubmit(params);
    } catch (error) {
      ElMessage.error('操作失败');
    } finally {
      loading.submit = false;
    }
  };

  /* 请求保存接口 */
  const handleSubmit = async (params: IQuotaGoodsSaveOrUpdateParams) => {
    try {
      await queryQuotaGoodsSaveOrUpdate(params);
      ElMessage.success('操作成功');
      tabBarStore.closeCurrentTab(route);
      router.push('/activity/quotaCard/product');
    } catch (error: any) {
      ElMessage.error(error.message || '操作失败');
    }
  };

  /* 拉取商品详情 */
  const getPortraitDetail = async () => {
    const goodsCode = route.query?.goodsCode as string;
    if (!goodsCode) return ElMessage.error('没有商品编码!');
    try {
      const { obj } = await queryQuotaGoodsDetail({ code: goodsCode });
      if (!obj) return ElMessage.error('拉取失败');
      const {
        id,
        name,
        goodsCode: code,
        configResp,
        intelligenceRespList,
        ...rest
      } = obj || {};
      if (intelligenceRespList && intelligenceRespList.length > 0) {
        intelligenceRespList.forEach((item: any) => {
          item.code = item?.intelligenceCode || '';
          item.name = item?.intelligenceName || '';
          item.cardQuantity = item?.intelligenceNumber || '';
        });
      }
      // 处理计价规则
      if (configResp) {
        configResp.code = configResp?.configCode || '';
        configResp.name = configResp?.configName || '';
      }

      if (action === E_PAGE_ACTION.EDIT || action === E_PAGE_ACTION.DETAIL) {
        Object.assign(formData, {
          ...rest,
          id,
          name,
          goodsCode: code,
          intelligenceRespList,
          configRespList: [configResp],
        });
      } else if (action === E_PAGE_ACTION.COPY) {
        // 过滤 “商品名称”、“商品编码”、“限购客群”、“计价规则”
        Object.assign(formData, { ...rest });
      }
    } catch (error: any) {
      ElMessage.error(error.message || '拉取失败');
    }
  };

  /* 更改商品限购客群 */
  const onChangeIntelligenceList = (list: I_INTELLIGENCE_CUSTOMER_GROUP[]) => {
    formData.intelligenceRespList = [...list];
  };

  /* 更改商品限购规则 */
  const onChangeConfigRespList = (list: IQuotaDetailConfigRespRes[]) => {
    formData.configRespList = [...list];
  };

  /* 初始化 */
  onMounted(async () => {
    const isNeedDetail = [E_PAGE_ACTION.EDIT, E_PAGE_ACTION.DETAIL, E_PAGE_ACTION.COPY].includes(action);
    if (isNeedDetail) {
      loading.page = true;
      await getPortraitDetail();
      loading.page = false;
    }
  });

  return {
    formData,
    loading,
    formRef,
    submitForm,
    onChangeIntelligenceList,
    onChangeConfigRespList,
  };
}
