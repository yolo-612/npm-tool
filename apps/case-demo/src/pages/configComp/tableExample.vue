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
  <PageMain title='表格案例' :async-data='asyncData'>
    <ConfigTable 
      :tableData="tableData" 
      :tableConfig="tableConfig" 
    />
  </PageMain>
</template>

<script setup>
import ConfigTable from '@/components/config-comp/table/ConfigTable.vue';

const tableConfig = {
  columns: [{
    prop: 'date',
    columnConfig: { label: 'Date', width: '180' }
  }, {
    prop: 'name',
    columnConfig: { label: 'Name', width: '180' }
  }, {
    prop: 'address',
    columnConfig: { label: 'Address' }
  }]
}

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
