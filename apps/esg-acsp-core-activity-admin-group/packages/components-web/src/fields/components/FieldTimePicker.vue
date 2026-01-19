<script lang="ts" setup>

defineOptions({
  name: 'FieldTimePicker',
  inheritAttrs: false,
});
</script>

<template>
  <el-time-picker v-bind="$attrs" />
</template>
