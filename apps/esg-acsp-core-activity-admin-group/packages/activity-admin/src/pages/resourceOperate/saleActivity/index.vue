<script lang="ts" setup>
import { SearchTable } from '@fpkg/components-web';
import useAction from './composables/useAction';
import useConfig from './composables/useConfig';

definePage({
  name: 'saleActivity',
  meta: {
    title: '销售营销管理',
    permission: ['saleActivity'],
  },
});
const searchTableRef = ref<any>(null);

const state = useAction(searchTableRef);
const { searchHeader, columns, pagination } = useConfig(state);
</script>

<template>
  <div class="page">
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
        max-height="max(calc(100vh - 200px),300px)"
      >
        <template #belowHeader>
          <el-button v-debounce type="primary" class="ext-btn" @click="state.showAdd">新增</el-button>
        </template>
      </SearchTable>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
  .page :deep {
    .el-tooltip .el-link {
      color: #bd332d;
    }
  }
</style>
