<template>
  <TableSearchHeader 
    v-if="props.searchHeader"
    ref="headerRef"
    v-bind="props.searchHeader" 
    v-model="props.searchData"
    @search="onSearch"
    @reset="onReset"
  >
    <template #prefixBtn>
      <slot name="prefixBtn"></slot>
    </template>
    <template #suffixBtn>
      <slot name="suffixBtn"></slot>
    </template>
  </TableSearchHeader>
  <!-- 头和table的空隙 -->
  <div class="below-header"><slot name="belowHeader"></slot></div>
  <ConfigTable 
    ref="tableRef" 
    v-loading="loading"
    :columns="props.columns" 
    :data="tableData"
  />
  <!-- table和分页的间隙 -->
  <div class="below-table"><slot name="belowTable"></slot></div>
</template>

<script setup lang="ts">
import TableSearchHeader from '@/components/config-comp/table/components/search-header/TableSearchHeader.vue'
import ConfigTable from '@/components/config-comp/table/ConfigTable.vue';
import { useSearchTable } from '@/components/config-comp/table/composables/useSearchTable';
import type { ITableColumnItem, ISearchTableHeader, IPageInfo } from '@/components/config-comp/table/types';

defineOptions({
  name: 'SearchTable',
  inheritAttrs: false,
});

export interface ISearchTableProps {
  searchHeader?: ISearchTableHeader;
  searchData?: any;
  columns: ITableColumnItem[];
  // pagination?: ElPaginationProps & { hidden?: boolean };
  searchAction: (page: IPageInfo, action: string) => Promise<{ totalSize: number; list: any[] }>;
}

const props = defineProps<ISearchTableProps>();

const headerRef = ref(null);
const tableRef = ref<any>(null);

const getPureTableRef = () => {
  return tableRef.value?.pureTableRef;
};

const { tableData, loading, pageInfo, onSearch, onReset, onPageChange, fetchData } = useSearchTable({
  searchAction: props.searchAction,
  headerRef,
});

defineExpose({
  getPureTableRef,
  fetchData,
});

</script>

<style lang='scss' scoped>
</style>
