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
  <ConfigTable ref="tableRef" :columns="props.columns" :data="tableData"/>
  <!-- table和分页的间隙 -->
  <div class="below-table"><slot name="belowTable"></slot></div>
</template>

<script setup lang="ts">
import TableSearchHeader from '@/components/config-comp/table/components/search-header/TableSearchHeader.vue'
// import ConfigTable from '@/components/config-comp/table/ConfigTable.vue';
import type { ITableColumnItem, ISearchTableHeader } from '@/components/config-comp/table/types';

defineOptions({
  name: 'SearchTable',
  inheritAttrs: false,
});

export interface ISearchTableProps {
  searchHeader?: ISearchTableHeader;
  searchData?: any;
  columns: ITableColumnItem[];
  // pagination?: ElPaginationProps & { hidden?: boolean };
  // searchAction: (page: IPageInfo, action: string) => Promise<{ totalSize: number; list: any[] }>;
}

const props = defineProps<ISearchTableProps>();

const headerRef = ref(null);
const tableRef = ref<any>(null);

const getPureTableRef = () => {
  return tableRef.value?.pureTableRef;
};

const onSearch = () => {
  console.log('搜索');
};
const onReset = () => {
  console.log('重置');
};

const tableData = ref<any[]>([]);

</script>

<style lang='scss' scoped>
</style>
