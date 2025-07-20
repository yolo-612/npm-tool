<script lang="ts" setup>
import type { IFieldLinkProps } from '@/fields/types'

const props = defineProps<IFieldLinkProps>();

defineOptions({
  name: 'FieldLink',
  inheritAttrs: false,
});

const onClick = () => {
  if (props.action) {
    props.action();
    return;
  }
  if (props.linkUrl) {
    window.open(props.linkUrl);
  }
};
</script>

<template>
  <el-link v-bind="$attrs" @click="onClick">{{ label }}</el-link>
</template>
