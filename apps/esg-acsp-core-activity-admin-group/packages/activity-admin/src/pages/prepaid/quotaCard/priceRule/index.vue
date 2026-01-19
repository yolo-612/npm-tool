<script lang="ts" setup>
import { SearchTable } from '@fpkg/components-web';
import useListConfig from './composables/useListConfig';
import useListAction from './composables/useListAction';

definePage({
  meta: {
    title: '计价规则列表',
    permission: ['quotaCardPriceRuleList'],
    ignoreCache: true,
  },
});

const tableRef = ref<InstanceType<typeof SearchTable>>();
const state = useListAction(tableRef);
const { searchAction, formData, pageJump } = state;
const { searchHeader, columns } = useListConfig(state);
</script>

<template>
  <div>
    <PageHeader :title="$route.meta.title" />
    <PageMain>
      <SearchTable
        ref="tableRef"
        :search-header="searchHeader"
        :columns="columns"
        :search-action="searchAction"
        :search-data="formData"
        max-height="max(calc(100vh - 410px),300px)"
      >
      <template #suffixBtn>
        <el-button type="primary" icon="plus" @click="pageJump('add')">创建计价规则</el-button>
      </template>
    </SearchTable>
    </PageMain>
  </div>
</template>
