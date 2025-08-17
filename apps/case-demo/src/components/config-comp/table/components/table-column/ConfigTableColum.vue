<template>
  <el-table-column v-bind="props.columnProps">
    <!-- 这样没办法将表格的数据传递给自定义列表 -->
    <!-- <template v-if="column.renderType !== TableColumnType.ElColumn">
      <component 
        :is="column.render" 
      />
    </template> -->
    <!-- 这样套一层插槽就可以将数据传递给自定义列表了 -->
    <template v-if="props.renderType !== TableColumnType.ElColumn" #default="scope">
      <!-- 支持自定义组件 -->
      <component 
        v-if="props.renderType === TableColumnType.Custom"
        :is="getRender(scope.row[scope.column.property], scope)" 
        :scope="scope"
      />
      <!-- 支持内部表单域组件 -->
      <component
        v-else
        :is="Fields[`Field${props.renderType}`]"
        v-model="scope.row[scope.column.property]"
        v-bind="getFieldProps(scope)"
        :scope="scope" 
      />
    </template>
  </el-table-column>
</template>

<script setup lang="ts">
import { type ITableColumnItem, TableColumnType } from '@/components/config-comp/table/types';
import Fields from '@/components/config-comp/table/components/table-column/columnFields';


const props = defineProps<ITableColumnItem>();

const getRender = (text: any, scope: any)=> {
  // 应对h函数传入的情况
  if(typeof props.render === 'function') {
    return props.render(text, scope);
  }
  // 应对组件传入的情况
  return props.render || h('div', {}, '未传值');
}

const getFieldProps = (scope: any) => {
  if (typeof props.fieldProps === 'function') return props.fieldProps(scope);
  return props.fieldProps || {};
}

</script>

<style lang='scss' scoped>
</style>
