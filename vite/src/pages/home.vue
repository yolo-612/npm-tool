<template>
  <ContentPage title='首页' :async-data='asyncData'>
    <p>首页内容</p>
    <p>首页内容</p>
    <p>首页内容</p>
  </ContentPage>
</template>

<script setup>

import ContentPage from '@/layouts/ContentPage.vue';
import { sleep } from '@/utils/index.js';


const asyncData = async ()=>{
  await sleep(1000)
  return Promise.reject(new Error('网络错误'))
}

</script>

<style lang='less'>

</style>
