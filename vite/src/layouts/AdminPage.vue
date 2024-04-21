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
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #F3F2F2;
}

.AdminPage .main{
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
}
</style>
