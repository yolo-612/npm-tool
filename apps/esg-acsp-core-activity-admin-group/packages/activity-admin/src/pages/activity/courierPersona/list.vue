<script lang="ts" setup>
import { SearchTable } from '@fpkg/components-web';
import useAction from './composables/useListAction';
import useConfig from './composables/useListConfig';

definePage({
  meta: {
    title: '小哥画像',
    permission: ['empPortrait'],
    ignoreCache: true,
  },
});
const searchTableRef = ref();
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
        max-height="max(calc(100vh - 360px),300px)"
      >
        <template #suffixBtn>
          <el-button v-debounce="1000" type="primary" class="ext-btn" icon="plus" @click="state.pageJump('add')">
            新建
          </el-button>
        </template>
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
  .ext-btn {
    margin-left: 20px;
  }
</style>
