<script lang="ts" setup>
import { SearchTable } from '@fpkg/components-web';
import useAction from './composables/useAction';
import useConfig from './composables/useConfig';
import EditEmp from './components/EditEmp.vue';
import EditHistory from './components/EditHistory.vue';

definePage({
  name: 'newClue',
  meta: {
    title: '新签线索维护',
    permission: ['newClue'],
  },
});
const searchTableRef = ref<any>(null);

const state = useAction(searchTableRef);
const {
  formData, editData, showEdit, searchList, getDictData, searchAction, handleSelectionChange, historyData,
} = state;
getDictData();
const { searchHeader, columns, pagination } = useConfig(state);
</script>

<template>
  <div>
    <PageHeader :title="$route.meta.title" />
    <PageMain>
      <SearchTable
        ref="searchTableRef"
        :searchHeader="searchHeader"
        :searchData="formData"
        :columns="columns"
        :searchAction="searchAction"
        :pagination="pagination"
        :rowKey="(row: any) => row.id"
        max-height="max(calc(100vh - 380px),300px)"
        @selection-change="handleSelectionChange"
      >
        <template #belowHeader>
          <el-button v-debounce type="primary" class="ext-btn" @click="showEdit('batch')">批量修改</el-button>
        </template>
      </SearchTable>
      <EditEmp v-bind="editData" @success="searchList" @close="editData.show = false" />
      <EditHistory v-bind="historyData" @close="historyData.show = false" />
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
