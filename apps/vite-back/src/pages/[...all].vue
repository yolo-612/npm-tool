<route lang="json5">
{
  name: "notFound",
  meta: {
    layout: false,
    title: "404",
    hideInMenu: true
  }
}
</route>
<script setup lang="ts">
console.log('抱歉，你访问的页面不存在');
</script>

<template>
  <el-result icon="warning" title="404" sub-title="抱歉，你访问的页面不存在[...all.vue]"> </el-result>
</template>
