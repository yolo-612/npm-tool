<script setup>
// 带侧边栏的页面
import { ref,provide } from 'vue';

import { RouterView } from 'vue-router'
import SidebarMenu from '@/components/app/SidebarMenu.vue';
import AppHeader from '@/components/app/AppHeader.vue';

const asideMenuOpen = ref(true);

provide('toggleAsideMenu', () => {
  asideMenuOpen.value = !asideMenuOpen.value;
});

</script>

<template>
  <div class='AdminPage'>
    <div class='app-header-box'><AppHeader/> </div>
    <div class='app-content-box'>
      <div class='sidebar-box'>
        <SidebarMenu :asideMenuOpen='asideMenuOpen'></SidebarMenu>
      </div>
      <main class='main-content' :class='{asideMenuOpen}'>
        <RouterView></RouterView>
      </main>
    </div>
  </div>
</template>

<style scoped>
.AdminPage{
  position: relative;
  width: 100%;
  background-color: #F3F2F2;
}

.AdminPage .app-header-box{
  position: fixed;
  width: 100%;
  height: 48px;
  z-index: 100;
}

.AdminPage .app-content-box{
}

.AdminPage .sidebar-box{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100%;
  padding-top: 50px;
  box-sizing: border-box;
}

.AdminPage .main-content{
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: 50px;
  padding-left: 48px;
  box-sizing: border-box;
  overflow-y: auto;
  min-height: 100vh;
  transition: padding 0.3s cubic-bezier(0.34, 0.69, 0.1, 1);
}
.AdminPage .main-content.asideMenuOpen{
  padding-left: 180px;
}
</style>
