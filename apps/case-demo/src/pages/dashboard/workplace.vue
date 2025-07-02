<route lang="json5">
{
  name: "workplace",
  meta: {
    title: "工作台",
    permission: ["*"],
    order: 100,
    icon: 'HomeFilled',
  }
}
</route>
<template>
  <PageMain title='首页' :async-data='asyncData'>
    <p>
      采用统一的web的模板：<br/><br/>
      具体配置：文件系统路由 + 菜单baseOn：frontend + 菜单侧边：side 
    </p>
  </PageMain>
</template>

<script setup>
</script>

<style lang='scss' scoped>
</style>
