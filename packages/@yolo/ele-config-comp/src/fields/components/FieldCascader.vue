<script lang="ts" setup>
defineOptions({
  name: 'FieldCascader',
  inheritAttrs: false,
});
</script>

<template>
  <el-cascader v-bind="$attrs"> </el-cascader>
</template>
<style lang="scss" scoped>
:deep(.el-cascader) {
  width: 100%;
}
</style>
