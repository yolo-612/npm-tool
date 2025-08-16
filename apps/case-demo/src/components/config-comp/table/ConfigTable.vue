<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column 
      v-for="column in tableConfig.columns" 
      :key="column.prop" 
      :prop="column.prop" 
      :label="column.columnConfig.label" 
      :width="column.columnConfig.width" 
    />
  </el-table>
</template>

<script setup lang="ts">
defineProps<{
  tableData: Array<any>;
  tableConfig: {
    columns: Array<{ prop: string; columnConfig: { label: string; width?: string } }>;
  };
}>();

</script>

<style lang='scss' scoped>
</style>
