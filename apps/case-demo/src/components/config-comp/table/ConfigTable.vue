<template>
  <el-table v-bind="$attrs" style="width: 100%">
    <el-table-column 
      v-for="column in columns" 
      :key="column.columnProps" 
      v-bind="column.columnProps"
    />
  </el-table>
</template>

<script setup lang="ts">
defineProps<{
  columns: Array<{ columnProps: any }>
}>();

</script>

<style lang='scss' scoped>
</style>
