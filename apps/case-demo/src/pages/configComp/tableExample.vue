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
import DemoTableCustomColumn from '@/components/config-comp/DemoTableCustomColumn.vue'; 

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
}, 
// 场景1：配置化 组合 表格列的数据 【分为h函数的场景 + 自定义组件传入的场景】
{
  renderType: TableColumnType.Custom,
  columnProps: {
    prop: 'customColumn-h-render',
    label: '自定义列-render',
    width: '180'
  },
  render: (text, scope)=> h('div', {}, 1212+scope.row.address)
}, {
  renderType: TableColumnType.Custom,
  columnProps: {
    prop: 'customColumn-component',
    label: '自定义列-component',
    width: '180'
  },
  render: DemoTableCustomColumn
},{
  renderType: TableColumnType.Custom,
  columnProps: {
    prop: 'customColumn-no-params',
    label: '自定义列-未传参render',
    width: '180'
  },
}, {
  renderType: TableColumnType.Custom,
  columnProps: {
    prop: 'action',
    label: '操作',
    width: '180'
  },
  render: ()=> h('div', {}, [
    h('el-button', { type: 'primary' }, '编辑'),
    h('el-button', { type: 'danger' }, '删除')
  ])
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
