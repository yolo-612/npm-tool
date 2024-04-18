<script setup>
// 带侧边栏的页面
import { RouterView } from 'vue-router'
import SidebarMenu from '@/components/app/SidebarMenu.vue';
</script>

<template>
  <div class='AdminPage'>
    <SidebarMenu></SidebarMenu>
    <main class='main'>
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style scoped>
.AdminPage{
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
}

.AdminPage .main{
  flex-grow: 1;
}
</style>
