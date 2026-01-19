<script lang="ts" setup>
import { SearchTable } from '@fpkg/components-web';
import useAction from './composables/useAction';
import useConfig from './composables/useConfig';

definePage({
  meta: {
    title: '直发券管理',
    permission: ['directSendList'],
    ignoreCache: true,
  },
});

const searchTableRef = ref<any>();

const state = useAction(searchTableRef);
const { updateDictData } = state;
updateDictData();

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
        max-height="max(calc(100vh - 200px),300px)"
        @selection-change="state.handleSelectionChange"
      >
        <template #suffixBtn>
          <el-button v-debounce type="primary" class="ext-btn" icon="plus" @click="state.showAdd">新建</el-button>
        </template>
      </SearchTable>
    </PageMain>
    <DiscountGiftManageDetail ref="cesRef" />
  </div>
</template>

<style lang="scss" scoped>
  :deep {
    .el-tooltip .el-link {
      color: #bd332d;
    }
  }
  .ext-btn{
    margin-left: 20px;
  }
</style>
