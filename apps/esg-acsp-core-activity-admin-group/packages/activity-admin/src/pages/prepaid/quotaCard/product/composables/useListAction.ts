import type { Ref } from 'vue';
import { ElMessage, type FormInstance } from 'element-plus';
import {
  queryQuotaGoodsList,
  queryQuotaGoodsUp,
  queryQuotaGoodsDown,
  queryQuotaGoodsUpdateStock,
} from '@/apis/methods/activity/quotaCard';
import {
  E_GOODS_STACK_TYPES,
  type IQuotaGoodsListParams,
  type IQuotaGoodsUpdateStockParams,
} from '@/apis/methods/activity/quotaCard/types';
import type { IPageParams } from '@/types';
import { E_GOODS_STACK_TEXT_TYPES, E_GOODS_STATUS, type E_PAGE_ACTION } from './types';

export default function (searchTableRef: Ref<any>, stockVisible: Ref<boolean>) {
  const router = useRouter();

  // ************** 库存弹窗相关 **************
  // 库存操作类型
  const stockOptions = [
    {
      label: E_GOODS_STACK_TEXT_TYPES.ADD,
      value: E_GOODS_STACK_TYPES.ADD,
    },
    {
      label: E_GOODS_STACK_TEXT_TYPES.REDUCE,
      value: E_GOODS_STACK_TYPES.REDUCE,
    },
  ];
  const stockFormRef = ref<FormInstance>();
  // from rule
  const stockRules = reactive({
    operateType: [
      {
        required: true,
        message: '请选择操作类型!',
        trigger: 'blur',
      },
    ],
    counts: [
      {
        required: true,
        message: '请输入正整数',
        trigger: 'blur',
        validator: (rule: any, value: any, callback: any) => {
          if (!value) {
            return callback(new Error('请输入正整数'));
          }
          if (!/^[1-9]\d*$/.test(value)) {
            return callback(new Error('请输入正整数'));
          }
          return true;
        },
      },
    ],
  });
  // 库存提交类型
  const stockFrom: IQuotaGoodsUpdateStockParams = reactive({
    goodsCode: '',
    operateType: E_GOODS_STACK_TYPES.ADD,
    counts: undefined,
    stock: 0,
  });
  /* 显示库存弹窗 */
  const showStockPop = async (row: any) => {
    stockFrom.goodsCode = row.goodsCode;
    stockFrom.stock = row.stock;
    stockFrom.counts = undefined;
    stockFrom.operateType = E_GOODS_STACK_TYPES.ADD;
    stockVisible.value = true;
  };
  // 提交调整库存
  const submitForm = async () => {
    if (!stockFormRef.value) return;
    stockFormRef.value.validate(async (valid) => {
      if (valid) {
        if (!stockFrom.goodsCode) ElMessage.error('没有商品编码!');
        try {
          await queryQuotaGoodsUpdateStock(stockFrom);
          ElMessage.success('操作成功!');
          stockVisible.value = false;
          /* 刷新数据 */
          searchTableRef.value?.fetchData('search');
        } catch (error: any) {
          ElMessage.error(error?.message || '调整库存失败!');
        }
      }
    });
  };

  /* 搜索数据 */
  const formData: Omit<IQuotaGoodsListParams, 'pageSize' | 'pageNum'> = reactive({
    /** 商品状态 */
    status: undefined,
    /** 商品编码 */
    goodsCode: '',
    /** 商品名称 */
    name: '',
    /** 创建人工号 */
    creator: '',
    /** 创建时间 */
    createTimeRange: [],
    /** 创建时间起始时间 */
    createTimeStart: '',
    /** 创建时间结束时间 */
    createTimeEnd: '',
    /** 金额 */
    amountRange: [],
    /** 最小金额 */
    minAmount: undefined,
    /** 最大金额 */
    maxAmount: undefined,
  });

  /* 查询列表数据 */
  const searchAction = async (pageInfo: IPageParams) => {
    const { pageSize, pageNum } = pageInfo;
    try {
      const { createTimeRange, amountRange, ...rest } = formData;
      const [createTimeStart, createTimeEnd] = createTimeRange || [];
      const [minAmount, maxAmount] = amountRange || [];
      const { obj } = await queryQuotaGoodsList({
        pageNum,
        pageSize,
        ...rest,
        createTimeStart,
        createTimeEnd,
        minAmount,
        maxAmount,
      });
      if (!obj || !obj.list) {
        return { totalSize: 0, list: [] };
      }
      return obj;
    } catch (error) {
      ElMessage.error('查询失败');
      return { totalSize: 0, list: [] };
    }
  };

  /* 页面跳转 */
  const pageJump = (action: E_PAGE_ACTION, goodsCode?: string) => {
    router.push({
      path: `/prepaid/quotaCard/product/${action}`,
      query: {
        goodsCode,
      },
    });
  };

  /* 上架/下架 */
  const goodsStatusToggle = async (goodsCode: string, action: E_GOODS_STATUS) => {
    if (!goodsCode) return ElMessage.error('没有商品编码!');
    try {
      const actionApi = action === E_GOODS_STATUS.UP ? queryQuotaGoodsUp : queryQuotaGoodsDown;
      await actionApi({ goodsCode });
      /* 刷新数据 */
      searchTableRef.value?.fetchData('search');
    } catch (error: any) {
      ElMessage.error(error?.message || '操作失败');
    }
  };

  onMounted(async () => {
    await nextTick();
    searchTableRef.value?.onSearch();
  });
  return {
    formData,
    stockOptions,
    stockFormRef,
    stockFrom,
    stockRules,
    submitForm,
    searchAction,
    pageJump,
    goodsStatusToggle,
    showStockPop,
  };
}
