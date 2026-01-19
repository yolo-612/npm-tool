<script lang='ts' setup>
import { SearchTable } from '@fpkg/components-web';
import useAction from './composables/useListAction';
import useConfig from './composables/useListConfig';

definePage({
  meta: {
    title: '育龙活动配置列表',
    permission: ['moneyMakerRaisingDragonActivityConfigList'],
    ignoreCache: true,
  },
});
// 搜索table
const searchTableRef = ref();
const state = useAction(searchTableRef);

// 列表配置
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
        max-height="max(calc(100vh - 420px),300px)"
      >
        <template #suffixBtn>
          <el-button v-debounce type="primary" icon="plus" class="ext-btn" @click="state.showAdd">新增</el-button>
        </template>
      </SearchTable>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
</style>
