<script lang="ts" setup>
import { SearchTable } from '@fpkg/components-web';
import useAction from './composables/useAction';
import useConfig from './composables/useConfig';

definePage({
  meta: {
    title: '小哥发券数据',
    permission: ['directSendHistoryList'],
  },
});

const searchTableRef = ref<InstanceType<typeof SearchTable>>();
const state = useAction(searchTableRef);

const { searchHeader, columns, pagination } = useConfig(state);
</script>

<template>
  <div>
    <PageHeader :title="$route.meta.title" />
    <PageMain>
      <SearchTable
        ref="searchTableRef"
        :searchHeader="searchHeader"
        :searchData="state.formData"
        :searchAction="state.searchAction"
        :columns="columns"
        :pagination="pagination"
        :rowKey="(row: any) => row.id"
        max-height="max(calc(100vh - 380px),300px)"
      >
      </SearchTable>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
  :deep {
    .el-tooltip .el-link {
      color: #bd332d;
    }
  }
</style>
