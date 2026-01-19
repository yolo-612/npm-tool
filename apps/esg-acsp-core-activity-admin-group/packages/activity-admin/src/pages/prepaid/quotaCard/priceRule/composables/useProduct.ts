/* 获取产品列表 */
import { defineStore } from 'pinia';
import { queryQuotaConfigProductList } from '@/apis/methods/activity/quotaCard';
import type { IQuotaConfigProductItem } from '@/apis/methods/activity/quotaCard/types';

const useQuotaProductStore = defineStore('quotaProduct', () => {
  const productList = ref<({ value: string; label: string } & IQuotaConfigProductItem)[]>([]);
  const hasFetch = ref(false);
  /* 拉取子产品列表 */
  const getProductList = async () => {
    if (productList.value.length || hasFetch.value) return;
    try {
      hasFetch.value = true;
      const { obj = [] } = await queryQuotaConfigProductList({});
      const targetList = (obj || []).map((item) => {
        return { label: item.productTypeName, value: item.productTypeName, ...item };
      });
      productList.value = targetList || [];
    } catch (error: any) {
      productList.value = [];
    }
  };
  /* 直接拉取子产品列表 */
  getProductList();

  /* 根据value拿到项 */
  const getProductItem = (uniqVal: string) => {
    if (!uniqVal) return {} as IQuotaConfigProductItem;
    const item = productList.value.find((item) => item.value === uniqVal);
    return (item || {}) as IQuotaConfigProductItem;
  };

  return { productList, getProductItem };
});

export default useQuotaProductStore;
