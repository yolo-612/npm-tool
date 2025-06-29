<script lang="ts" setup>

defineOptions({
  name: 'FieldDatePicker',
  inheritAttrs: false,
});
</script>

<template>
  <el-date-picker type="date" v-bind="$attrs" />
</template>
