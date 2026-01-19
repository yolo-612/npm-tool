<script lang="ts" setup>
import { PureTable } from '@/src/table';
import type { IPureTableColumnItem } from '@/src/table';

interface IFieldTableProps {
  modelValue: any[];
  columns: IPureTableColumnItem[];
}
defineProps<IFieldTableProps>();
const attrs = useAttrs();

</script>

<template>
  <PureTable :data="modelValue" :columns="columns" v-bind="attrs" />
</template>
