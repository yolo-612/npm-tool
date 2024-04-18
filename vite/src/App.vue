<script setup>
import AdminPage from '@/layouts/AdminPage.vue';
import { onMounted, ref } from 'vue';
import { appUser } from '@/modules/user.js';

const init = async ()=>{
  const res = await appUser.init()
  console.log(res, '===>')
}

onMounted(()=>{
  init()
})
</script>

<template>
  <div id='app'>
    <AdminPage></AdminPage>
  </div>
</template>

<style scoped>

</style>
