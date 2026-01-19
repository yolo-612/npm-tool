<script lang="ts" setup>
defineOptions({
  name: 'FieldInputNumber',
  inheritAttrs: false,
});

</script>

<template>
  <el-input-number v-bind="$attrs" />
</template>
