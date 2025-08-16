<route lang="json5">
{
  name: "configCompTableExample",
  meta: {
    title: "表格案例",
    permission: ["*"],
    order: 100,
    icon: 'HomeFilled',
  }
}
</route>
<template>
  <PageMain title='表格案例'>
    <ConfigTable 
      :data="tableData" 
      :columns="columns" 
    />
  </PageMain>
</template>

<script setup lang="ts">
import ConfigTable from '@/components/config-comp/table/ConfigTable.vue';
import { type ITableColumnItem, TableColumnType } from '@/components/config-comp/table/types';


const columns : ITableColumnItem[] = [{
  renderType: TableColumnType.ElColumn,
  columnProps: {
    prop: 'date',
    label: 'Date',
    width: '180'
  }
}, {
  renderType: TableColumnType.ElColumn,
  columnProps: {
    prop: 'name',
    label: 'Name',
    width: '180'
  }
}, {
  renderType: TableColumnType.ElColumn,
  columnProps: {
    prop: 'address',
    label: 'Address'
  }
}]

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style lang='scss' scoped>
</style>
