<script setup lang="ts">
const router = useRouter();
console.log('router', router.getRoutes());
definePage({
  name: 'notFound',
  meta: {
    layout: false,
    title: '404',
    hideInMenu: true,
  },
});
console.log('抱歉，你访问的页面不存在');
</script>

<template>
  <el-result icon="warning" title="404" sub-title="抱歉，你访问的页面不存在"> </el-result>
</template>
