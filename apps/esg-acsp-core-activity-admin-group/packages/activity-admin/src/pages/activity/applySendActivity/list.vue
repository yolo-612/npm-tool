<script lang="ts" setup>
import { SearchTable } from '@fpkg/components-web';
import useListAction from './composables/useListAction';
import useListConfig from './composables/useListConfig';

definePage({
  meta: {
    title: '申请券管理',
    permission: ['applySendList'],
  },
});

const searchTableRef = ref<any>();

const state = useListAction(searchTableRef);

const { searchHeader, columns, pagination } = useListConfig(state);
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
        max-height="max(calc(100vh - 200px),300px)"
      >
        <template #suffixBtn>
          <el-button v-debounce type="primary" class="ext-btn" icon="plus" @click="state.showAdd">新建</el-button>
        </template>
      </SearchTable>
    </PageMain>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-col .el-form-item .el-form-item__content) {
  .search-btn-wrap {
    padding: 0;
  }
}
.ext-btn{
  margin-left: 20px;
}

</style>
