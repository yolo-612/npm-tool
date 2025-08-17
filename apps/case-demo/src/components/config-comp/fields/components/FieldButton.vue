<script lang="ts" setup>
import type { IFieldButtonProps } from '@/components/config-comp/fields/types';

defineProps<IFieldButtonProps>();

defineOptions({
  name: 'FieldButton',
});

</script>

<template>
  <div @click.stop>
    <el-popconfirm v-if="confirm" v-bind="confirm">
      <template #reference>
        <el-button v-debounce="props?.debounce" v-bind="props">{{ label || '' }}</el-button>
      </template>
    </el-popconfirm>
    <el-button v-else v-debounce="props?.debounce" v-bind="props">{{ label || '' }}</el-button>
  </div>
</template>
