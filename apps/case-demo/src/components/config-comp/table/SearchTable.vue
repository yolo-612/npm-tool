<template>
  <TableSearchHeader 
    v-if="props.searchHeader"
    ref="headerRef"
    v-bind="props.searchHeader" 
    v-model="props.searchData"
  >
    <template #prefixBtn>
      <slot name="prefixBtn"></slot>
    </template>
    <template #suffixBtn>
      <slot name="suffixBtn"></slot>
    </template>
  </TableSearchHeader>
  <!-- <ConfigTable :columns="props.columns" /> -->
</template>

<script setup lang="ts">
import TableSearchHeader from '@/components/config-comp/table/components/search-header/TableSearchHeader.vue'
// import ConfigTable from '@/components/config-comp/table/ConfigTable.vue';
import type { ITableColumnItem, ISearchTableHeader } from '@/components/config-comp/table/types';

export interface ISearchTableProps {
  searchHeader?: ISearchTableHeader;
  searchData?: any;
  // columns: ITableColumnItem[];
  // pagination?: ElPaginationProps & { hidden?: boolean };
  // searchAction: (page: IPageInfo, action: string) => Promise<{ totalSize: number; list: any[] }>;
}

const props = defineProps<ISearchTableProps>();

</script>

<style lang='scss' scoped>
</style>
