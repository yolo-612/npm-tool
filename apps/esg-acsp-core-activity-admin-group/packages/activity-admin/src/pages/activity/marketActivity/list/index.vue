<script lang='ts' setup>
import { SearchTable } from '@fpkg/components-web';
import useAction from './composables/useListAction';
import useConfig from './composables/useListConfig';

definePage({
  meta: {
    title: '活动列表',
    permission: ['MarketActivityList'],
    ignoreCache: true,
  },
});
// 搜索table
const searchTableRef = ref();
const state = useAction(searchTableRef);

// 列表配置
const { searchHeader, columns } = useConfig(state);
/* 分页配置 */
const pagination = { defaultPageSize: 10, pageSizes: [10, 20, 50, 100] };

</script>

<template>
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
      max-height="max(calc(100vh - 450px),300px)"
    >
      <template #belowHeader>
        <el-button v-debounce type="primary" icon="plus" class="ext-btn" @click="state.showAdd">新增</el-button>
      </template>
    </SearchTable>
  </PageMain>
</template>

<style lang="scss" scoped>
:deep(.column-status) {
  display: flex;
  align-items: center;
  .circle {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    &.DRAFT, &.UNSTART, &.MANUAL_STOP, &.END {
      background: #acb1b8;
    }
    &.TO_APPROVE {
      background: #acb1b8;
    }
    &.PROCESSING, &.APPROVING {
      background: #0E77D1;
    }
    &.APPROVED {
      background: #63A103;
    }
    &.APPROVE_REJECT {
      background: #DF2127;
    }
  }
  .column-status-text {
    margin: 0 4px;
  }
  .column-status-reason {
    cursor: pointer;
    color: var(--el-color-primary);
  }
}
</style>
