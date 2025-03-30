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
    <p>首页内容</p>
  </PageMain>
</template>

<script setup>
import PageMain from '@/components/app/PageMain.vue';
import { sleep } from '@/utils/index.js';


const asyncData = async ()=>{
  await sleep(1000)
  // return Promise.reject(new Error('网络错误'))
  // throw new Error('网络错误11')
}

</script>

<style lang='scss' scoped>
</style>
