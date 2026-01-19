<script lang="ts" setup>
import { PureTable, TableColumnType } from '@fpkg/components-web';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { queryQuotaOrderDetail } from '@/apis/methods/activity/quotaCard/index';
import type { IQuotaOrderDetailRes } from '@/apis/methods/activity/quotaCard/types';

definePage({
  meta: {
    title: '额度卡订单详情',
    permission: ['quotaCardOrderDetail'],
  },
});

const orderInfoList = [
  {
    label: '订单编码',
    key: 'orderNo',
  },
  {
    label: '下单月结卡号',
    key: 'monthCard',
  },
  {
    label: '下单客户名称',
    key: 'customerName',
  },
  {
    label: '订单金额(元)',
    key: 'amount',
  },
  {
    label: '订单状态',
    key: 'statusDesc',
  },
  {
    label: '下单时间',
    key: 'createTime',
  },
  {
    label: '支付时间',
    key: 'payTime',
  },
];

const columns = [
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '商品编码',
      prop: 'goodsCode',
      minWidth: 180,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '商品名称',
      prop: 'name',
      minWidth: 180,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '商品金额(元)',
      prop: 'goodsPrice',
      minWidth: 180,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '商品数量',
      prop: 'goodsNum',
      minWidth: 180,
    },
  },
];

const route = useRoute();
const data: Partial<IQuotaOrderDetailRes> = reactive({});
const pageLoading = ref(false);
/* 拉取详情 */
const getDetail = async () => {
  const { orderNo } = route.query;
  if (!orderNo) return ElMessage.error('订单编码不能为空');
  try {
    pageLoading.value = true;
    const { obj } = await queryQuotaOrderDetail({ orderNo: orderNo as string });
    Object.assign(data, obj);
  } catch (error: any) {
    ElMessage.error(error?.message || '订单详情拉取失败');
  } finally {
    pageLoading.value = false;
  }
};

onMounted(() => {
  getDetail();
});
</script>

<template>
  <div v-loading="pageLoading">
    <PageHeader :title="$route.meta.title" />
    <PageMain>
      <el-descriptions title="订单信息" :column="2">
        <el-descriptions-item v-for="{ label, key } in orderInfoList" :key="key" :label="label">
          {{ data[key as keyof IQuotaOrderDetailRes] || '--' }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions title="商品信息" class="ext-desc" />
      <PureTable :columns="columns" :data="data.goodsInfo || []" size="small" />
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
  .ext-desc {
    margin-top: 10px;
  }
</style>
