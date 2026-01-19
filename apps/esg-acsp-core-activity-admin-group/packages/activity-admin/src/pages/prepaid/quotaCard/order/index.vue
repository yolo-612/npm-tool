<script lang="ts" setup>
import { SearchTable } from '@fpkg/components-web';
import { useListConfig } from './composables/useListConfig';
import useListAction from './composables/useListAction';

definePage({
  meta: {
    title: '订单列表',
    permission: ['quotaCardOrderList'],
    ignoreCache: true,
  },
});

const quotaOrderSearchTableRef = ref<InstanceType<typeof SearchTable>>();

const { formData, searchAction } = useListAction(quotaOrderSearchTableRef);
const { searchHeader, columns, pagination } = useListConfig();

</script>

<template>
  <div>
    <PageHeader :title="$route.meta.title" />
    <PageMain>
      <SearchTable
        ref="quotaOrderSearchTableRef"
        :search-header="searchHeader"
        :search-data="formData"
        :columns="columns"
        :pagination="pagination"
        :search-action="searchAction"
        :rowKey="(row: any) => row.orderNo"
        max-height="max(calc(100vh - 360px),300px)"
      />
    </PageMain>
  </div>
</template>

<style lang="scss" scoped></style>
