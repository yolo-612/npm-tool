import type { Ref } from 'vue';
import { ElMessage } from 'element-plus';
import type {
  IQuotaConfigDetailRes,
  IQuotaConfigProductItem,
  TQuotaConfigCreateParams,
} from '@/apis/methods/activity/quotaCard/types';
import { queryQuotaConfigDetail, queryQuotaConfigCreate } from '@/apis/methods/activity/quotaCard';
import { useTabBarStore } from '@/stores';
import useQuotaProductStore from './useProduct';

type TQuotaConfigForm = Omit<IQuotaConfigDetailRes, 'validTimeStart' | 'validTimeEnd'> & {
  validTime: string[];
  mainProduct: string;
  subProduct: string;
};
export default function (formRef: Ref<any>, pageAction: 'add' | 'detail') {
  const tabBarStore = useTabBarStore();
  const productStore = useQuotaProductStore();
  const route = useRoute();
  const router = useRouter();
  /* 表单信息 */
  const formData: Partial<TQuotaConfigForm> = reactive({
    /* id */
    id: '',
    /** 计价规则编码 */
    code: '',
    /** 计价规则名称 */
    name: '',
    /** 额度 单位/元 */
    quota: null,
    /** 额度 单位/元 */
    discount: null,
    /** 时间 */
    validTime: [],
    /* 主产品 */
    mainProduct: '',
    /* 子产品 */
    subProduct: '',
  });
  /* 页面loading */
  const loading = reactive({
    page: false,
    submit: false,
  });

  /* 选中产品的全部数据 */
  const mainProductItem = computed(() => productStore.getProductItem(formData.mainProduct as string));
  const subProductItem = computed(() => productStore.getProductItem(formData.subProduct as string));

  /* 格式化参数 */
  const formatProduct = (key: 'main' | 'sub') => {
    const item = key === 'main' ? mainProductItem.value : subProductItem.value;
    const {
      productTypeName, productNameCn, limitTypeCode, cargoTypeCode, expressTypeCode,
    } = item as IQuotaConfigProductItem;
    return {
      [`${key}ProductTypeName`]: productTypeName,
      [`${key}ProductNameCn`]: productNameCn,
      [`${key}LimitTypeCode`]: limitTypeCode,
      [`${key}CargoTypeCode`]: cargoTypeCode,
      [`${key}ExpressTypeCode`]: expressTypeCode,
    };
  };

  /* 拉取规则详情 */
  const getConfigDetail = async (code: string) => {
    if (!code) return ElMessage.error('没有规则编码');
    try {
      loading.page = true;
      const { obj } = await queryQuotaConfigDetail({ code });
      const {
        validTimeStart,
        validTimeEnd,
        mainProductTypeName: mainProduct,
        subProductTypeName: subProduct,
        ...rest
      } = obj || {};
      Object.assign(formData, {
        ...rest,
        validTime: [validTimeStart, validTimeEnd],
        mainProduct,
        subProduct,
      });
    } catch (error: any) {
      ElMessage.error(error.message || '规则信息拉取失败');
    } finally {
      loading.page = false;
    }
  };

  /* 提交规则 */
  const submitForm = async () => {
    console.log(formRef.value);
    const res = await formRef.value?.validate();
    if (!res) return;
    try {
      loading.submit = true;
      const {
        validTime, code, id, mainProduct, subProduct, ...rest
      } = formData;
      const [validTimeStart, validTimeEnd] = validTime || [];
      const params = {
        ...rest,
        validTimeStart,
        validTimeEnd,
        ...formatProduct('main'),
        ...formatProduct('sub'),
      };
      const { obj } = await queryQuotaConfigCreate(params as TQuotaConfigCreateParams);
      if (!obj) return ElMessage.error('规则创建失败');
      ElMessage.success('规则创建成功');
      tabBarStore.closeCurrentTab(route);
      router.push('/activity/quotaCard/priceRule');
    } catch (error: any) {
      ElMessage.error(error.message || '规则创建失败');
    } finally {
      loading.submit = false;
    }
  };
  /* 处理复制时清空字段 */
  const handleCopy = () => {
    formData.name = '';
    setTimeout(() => {
      formRef.value?.clearValidate();
    }, 10);
  };

  onMounted(async () => {
    const { ext, code } = route.query;
    /* 拉取规则详情 */
    if (pageAction === 'detail' || ext === 'copy') {
      await getConfigDetail(code as string);
    }
    /* 处理复制时清空字段 */
    ext === 'copy' && handleCopy();
  });

  return {
    formData,
    submitForm,
    loading,
    mainProductItem,
  };
}
