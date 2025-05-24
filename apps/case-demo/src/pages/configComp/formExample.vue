<route lang="json5">
{
  name: "configCompFormExample",
  meta: {
    title: "表单案例",
    permission: ["*"],
    icon: 'Opportunity',
  }
}
</route>
<template>
  <PageMain title='表单案例'>
    <Button />
  </PageMain>
</template>

<script setup>
import Button from  '@yolo/config-comp/src/button/index.vue'

</script>

<style lang='scss' scoped>

</style>
