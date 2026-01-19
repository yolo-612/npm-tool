<script lang="ts" setup>
import type { TCustomSlots, IPureTableColumnItem } from '@/src/table';
import { TableColumnType } from '@/src/table';
import Fields from './columnFields';

const props = defineProps<IPureTableColumnItem>();

defineOptions({
  name: 'PureTableColumn',
  inheritAttrs: false,
});

/* 获取render的内容 */
const getRender = (txt: any, scope: any): TCustomSlots => {
  if (typeof props.render === 'function') return props.render(txt, scope);
  // @ts-ignore
  return props.render || { component: null, props: {} };
};

const getFieldProps = (scope: any) => {
  if (typeof props.fieldProps === 'function') return props.fieldProps(scope);
  return props.fieldProps || {};
};
</script>
<template>
  <!-- 多级表头嵌套 -->
  <template v-if="props.subColumns">
    <el-table-column v-bind="props.columnProps">
      <template v-for="item in props.subColumns" :key="item.columnProps.prop">
        <pure-table-column v-if="!item.hidden" v-bind="item" />
      </template>
    </el-table-column>
  </template>
  <el-table-column show-overflow-tooltip v-bind="props.columnProps">
    <!-- 非elColumn时渲染 自定义render（内部表单是有默认组件、可以只用render的props） -->
    <template v-if="props.renderType !== TableColumnType.ElColumn" #default="scope">
      <!-- 自定义组件 -->
      <Fields.CustomSlot
        v-if="props.renderType === TableColumnType.Custom"
        :content="getRender(scope.row[scope.column.property], scope)"
        :scope="scope" />
      <!-- 其他内置Field组件 -->
      <component
        :is="Fields[`Field${props.renderType}`]"
        v-else
        v-bind="getFieldProps(scope)"
        v-model="scope.row[scope.column.property]"
        :scope="scope" />
    </template>
    <!-- 自定义插槽 -->
    <template v-for="(slot, slotName) in props.slots" #[slotName]="scope">
      <Fields.CustomSlot :key="slotName" :content="slot" :scope="scope" />
    </template>
  </el-table-column>
</template>
