<route lang="json5">
{
  name: "configCompSearchTableExample",
  meta: {
    title: "搜索表格案例",
    permission: ["*"],
    order: 100,
    icon: 'HomeFilled',
  }
}
</route>
<template>
  <PageMain title='搜索表格案例'>
    <SearchTable />
  </PageMain>
</template>

<script setup lang="ts">
import SearchTable from '@/components/config-comp/table/SearchTable.vue';
</script>

<style lang='scss' scoped>
</style>
