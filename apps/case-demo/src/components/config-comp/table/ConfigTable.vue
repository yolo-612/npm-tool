<template>
  <el-table v-bind="$attrs" style="width: 100%">
    <template v-for="item in columns" :key="item.columnProps.prop">
      <ConfigTableColum v-bind="item" v-if="!item.hidden"/>
    </template>
  </el-table>
</template>

<script setup lang="ts">
import { type ITableColumnItem } from '@/components/config-comp/table/types';
import ConfigTableColum from '@/components/config-comp/table/components/table-column/ConfigTableColum.vue';

defineProps<{
  columns: ITableColumnItem[];
}>();
</script>

<style lang='scss' scoped>
</style>
