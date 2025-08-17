<template>
  <!-- TODO: 表格的高度如何配置化 -->
  <el-table v-bind="$attrs" ref="configTableRef" style="width: 100%">
    <!-- TODO: 单选加上勾选的标识 [我在权益的项目中有实现]-->
    <template v-for="item in columns" :key="item.columnProps.prop">
      <ConfigTableColum v-bind="item" v-if="!item.hidden"/>
    </template>
    <!-- 空的 slot -->
    <template #empty>
      <CommonEmpty desc="暂无数据" />
    </template>
  </el-table>
</template>

<script setup lang="ts">
import { type ITableColumnItem } from '@/components/config-comp/table/types';
import ConfigTableColum from '@/components/config-comp/table/components/table-column/ConfigTableColum.vue';
import CommonEmpty from '@/components/config-comp/empty/CommonEmpty.vue';
defineProps<{
  columns: ITableColumnItem[];
}>();

const configTableRef = ref();

defineExpose({
  configTableRef,
});
</script>

<style lang='scss' scoped>
</style>
