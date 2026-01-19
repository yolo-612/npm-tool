<script setup>
// 带侧边栏的页面
import usePermission from '@/hook/usePermission';
import { useSettingsStore, useTabBarStore, useMenuStore } from '@/stores';

const { checkRoutePermission } = usePermission();
const tabBarStore = useTabBarStore();
const settingStore = useSettingsStore();
const menuStore = useMenuStore();
const route = useRoute();
const router = useRouter();
const routeWaiting = ref(true);

const topHeaderHeight = computed(() => {
  return settingStore.settings.hiddenTopHeader ? '0px' : '56px';
});

provide('topHeaderHeight', topHeaderHeight);

const wrapperMap = new Map();
/* 包一层新的组件 以自由控制缓存 */
const wrap = (fullPath, component) => {
  let wrapper;
  // 重点就是这里，这个组件的名字是完全可控的，
  // 只要自己写好逻辑，每次能找到对应的外壳组件就行，完全可以写成任何自己想要的名字
  // 这就能配合 keep-alive 的 include 属性可控地操作缓存
  if (component) {
    const wrapperName = fullPath;
    if (wrapperMap.has(wrapperName)) {
      wrapper = wrapperMap.get(wrapperName);
    } else {
      wrapper = {
        name: wrapperName,
        render() {
          return h('div', { className: 'vaf-page-wrapper' }, component);
        },
      };
      wrapperMap.set(wrapperName, wrapper);
    }
    return h(wrapper);
  }
};

onMounted(async () => {
  // 路由判断与切换，避免百源数据未加载完毕就跳转到 404 页面
  routeWaiting.value = route.name === 'notFound' && menuStore.menuTree.length === 0;
  await menuStore.menuInitPromise;
  if (route.name === 'notFound') {
    await router.replace({
      path: route.path,
      query: route.query,
    });
    routeWaiting.value = false;
  }
});
</script>

<template>
  <div class="AdminPage">
    <div v-if="!settingStore.settings.hiddenTopHeader" class="app-header-box" :style="{ height: topHeaderHeight }">
      <AppHeader />
    </div>
    <div v-if="menuStore.showSidebarMenu" class="sidebar-box" :style="{ paddingTop: topHeaderHeight }">
      <SidebarMenu :asideMenuOpen="menuStore.asideMenuOpen"></SidebarMenu>
    </div>
    <main v-loading="routeWaiting"
      class="main-content"
      :style="{ paddingTop: topHeaderHeight, paddingLeft: menuStore.sideMenuWidth }"
    >
      <TabBar v-if="settingStore.settings.tabBar" />
      <!--  基于文件系统的路由不显示面包屑    -->
      <Breadcrumb v-if="settingStore.settings.breadcrumb" />
      <RouterView v-if="!routeWaiting" v-slot="{ Component, route }">
        <transition name="fade" mode="out-in" appear>
          <div>
            <NotPermission v-if="!checkRoutePermission(route.meta)" />
            <component
              :is="Component"
              v-else-if="route.meta.ignoreCache || settingStore.settings.ignoreRouteCache"
              :key="route.fullPath"
            />
            <keep-alive :include="tabBarStore.getCacheTabList">
              <component
                :is="wrap(route.fullPath, Component)"
                v-if="
                  checkRoutePermission(route.meta) &&
                  !(route.meta.ignoreCache || settingStore.settings.ignoreRouteCache)
                "
                :key="route.fullPath"
              />
            </keep-alive>
          </div>
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<style lang="scss" scoped>
  .AdminPage {
    position: relative;
    width: 100%;
    background-color: var(--sdesign-color-grey-2);

    .app-header-box {
      position: fixed;
      width: 100%;
      z-index: 100;
    }

    .sidebar-box {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99;
      height: 100%;
      box-sizing: border-box;
    }

    .main-content {
      position: relative;
      box-sizing: border-box;
      overflow-y: auto;
      min-height: 100vh;
      transition: padding 0.3s cubic-bezier(0.34, 0.69, 0.1, 1);
    }
  }
</style>
