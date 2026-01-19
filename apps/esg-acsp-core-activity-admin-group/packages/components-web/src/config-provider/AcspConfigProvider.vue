<template>
  <el-config-provider :locale="zhCn">
    <slot></slot>
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn';
defineOptions({
  name: 'AcspConfigProvider'
})
</script>
<style lang="scss" scoped></style>
