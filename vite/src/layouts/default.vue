<script setup>
// 带侧边栏的页面
import usePermission from "@/hook/usePermission";
import { useMenuStore, useSettingsStore, useTabBarStore } from '@/stores';

const {checkPermission} = usePermission()
const tabBarStore = useTabBarStore();
const settingStore = useSettingsStore();
const menuStore = useMenuStore();

const stretch = computed(() => {
  return settingsStore.settings.stretch;
});
const getMainWidth = computed(() => {
  return typeof stretch.value === 'number' ? stretch.value + 'px' : stretch.value ? '1440px' : '100%';
});
</script>

<template>
  <div class='AdminPage'>
    <AppHeader/>
    <SidebarMenu v-if="menuStore.showSidebarMenu"></SidebarMenu>
    <main 
      class='main-content'
      :style="{
        paddingTop: menuStore.topHeaderHeight,
        paddingLeft: menuStore.sideMenuWidth,
      }"
    >
      <TabBar v-if="settingStore.settings.tabBar" />
      <!-- TODO：添加keep-alive -->
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
  .main-content{
    position: relative;
    box-sizing: border-box;
    overflow-y: auto;
    min-height: 100vh;
    transition: padding 0.3s cubic-bezier(0.34, 0.69, 0.1, 1);
  }
}
</style>
