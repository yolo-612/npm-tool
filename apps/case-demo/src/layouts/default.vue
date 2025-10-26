<script setup>
// 带侧边栏的页面
import usePermission from "@/hook/usePermission";
import { useMenuStore, useSettingsStore, useTabBarStore } from '@/stores';

const { checkRoutePermission } = usePermission()
const tabBarStore = useTabBarStore();
const settingsStore = useSettingsStore();
const menuStore = useMenuStore();

const stretch = computed(() => {
  return settingsStore.settings.stretch;
});
const getMainWidth = computed(() => {
  return typeof stretch.value === 'number' ? stretch.value + 'px' : stretch.value ? '1440px' : '100%';
});

const route = useRoute()
</script>

<template>
  <div class='AdminPage'>
    <AppHeader v-if="!settingsStore.settings.hiddenTopHeader"/>
    <SidebarMenu v-if="menuStore.showSidebarMenu"></SidebarMenu>
    <main 
      class='main-content'
      :style="{
        paddingTop: menuStore.topHeaderHeight,
        paddingLeft: menuStore.sideMenuWidth,
      }"
    >
      <TabBar v-if="settingsStore.settings.tabBar" />
      <template v-if="['app1'].includes(route.name)">
        <div id="container"></div>
      </template>
      <RouterView v-slot="{ Component, route }" v-else>
        <transition name="fade" mode="out-in" appear>
          <NotPermission v-if="!checkRoutePermission(route.meta)"/>
          <component 
            :is="Component" 
            v-else-if="route.meta.ignoreCache || settingsStore.settings.ignoreRouteCache"
            :key="route.fullPath"
          />
          <!-- :include 是 keep-alive 的白名单，它指定哪些组件应该被缓存。传入具体的router.name即可  -->
          <keep-alive v-else :include="tabBarStore.getCacheTabList">
            <div
              :style="{
                'max-width': getMainWidth,
                'margin': '0 auto',
                'transition': 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              }"
            >
              <component :is="Component" :key="route.fullPath" />
            </div>
          </keep-alive>
        </transition>         
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
