<script setup>
// 带侧边栏的页面
import usePermission from "@/hook/usePermission";
import { useSettingsStore, useTabBarStore } from '@/stores';

const {checkPermission} = usePermission()
const tabBarStore = useTabBarStore();
const settingStore = useSettingsStore();

const asideMenuOpen = ref(true);

const topHeaderHeight = computed(() => {
  return settingStore.settings.hiddenTopHeader ? '0px' : '48px';
});
const leftMenuWidth = ref('180px');

provide('topHeaderHeight', topHeaderHeight);
provide('leftMenuWidth', leftMenuWidth);

provide('toggleAsideMenu', () => {
  asideMenuOpen.value = !asideMenuOpen.value;
  leftMenuWidth.value = asideMenuOpen.value ? '180px' : '48px';
});

provide('asideMenuOpen', asideMenuOpen);
</script>

<template>
  <div class='AdminPage'>
    <div v-if="!settingStore.settings.hiddenTopHeader" class="app-header-box" :style="{height:topHeaderHeight}">
      <AppHeader />
    </div>
    <div class="sidebar-box" :style="{paddingTop:topHeaderHeight}">
      <SidebarMenu :asideMenuOpen="asideMenuOpen"></SidebarMenu>
    </div>
    <main class='main-content' :style="{paddingTop:topHeaderHeight,paddingLeft:leftMenuWidth}">
      <TabBar v-if="settingStore.settings.tabBar" />
      <RouterView v-slot="{ Component, route }">
        <component :is="Component" v-if="checkPermission(route.meta.permission ?? [])"/>
        <NotPermission v-else/>
      </RouterView>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.AdminPage{
  position: relative;
  width: 100%;
  background-color: #F3F2F2;
  .app-header-box {
    position: fixed;
    width: 100%;
    z-index: 100;
  }
  .sidebar-box{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    height: 100%;
    box-sizing: border-box;
  }
  .main-content{
    position: relative;
    box-sizing: border-box;
    overflow-y: auto;
    min-height: 100vh;
    transition: padding 0.3s cubic-bezier(0.34, 0.69, 0.1, 1);
  }
}
</style>
