<template>
  <el-table v-bind="$attrs" style="width: 100%">
    <el-table-column 
      v-for="column in columns" 
      :key="column.columnProps" 
      v-bind="column.columnProps"
    >
      <!-- 这样没办法将表格的数据传递给自定义列表 -->
      <!-- <template v-if="column.renderType !== TableColumnType.ElColumn">
        <component 
          :is="column.render" 
        />
      </template> -->
      <!-- 这样套一层插槽就可以将数据传递给自定义列表了 -->
      <template v-if="column.renderType !== TableColumnType.ElColumn" #default="scope">
        <component 
          :is="getRender(column, scope.row[scope.column.property], scope)" 
          :scope="scope"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { type ITableColumnItem, TableColumnType } from '@/components/config-comp/table/types';

defineProps<{
  columns: ITableColumnItem[];
}>();

const getRender = (column: ITableColumnItem, text: any, scope: any)=> {
  // 应对h函数传入的情况
  if(typeof column.render === 'function') {
    return column.render(text, scope);
  }
  // 应对组件传入的情况
  return column.render || h('div', {}, '未传值');
}

</script>

<style lang='scss' scoped>
</style>
