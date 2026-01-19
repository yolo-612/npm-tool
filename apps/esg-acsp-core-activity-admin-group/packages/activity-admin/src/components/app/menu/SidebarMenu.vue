<script setup lang="ts">
import { useMenuStore, useSettingsStore } from '@/stores';

defineProps({
  asideMenuOpen: {
    type: Boolean,
    default: true,
  },
});

const route = useRoute();

const menuStore = useMenuStore();
const settingsStore = useSettingsStore();

// 默认高亮menu
const defaultActive = computed(() => route.meta.activeMenu || route.path);

// 是否蓝色主题
const isBlueTheme = computed(() => settingsStore.settings.theme === 'blue');

const handleOpen = (key:string, keyPath:string) => {};
const handleClose = (key:string, keyPath:string) => {};
const onCollapseChange = () => {
  menuStore.toggleAsideMenu();
};
</script>

<template>
  <aside class="SidebarMenu" :class="{'is-dark': isBlueTheme}">
    <el-menu
      class="SidebarMenu-menu"
      :class="{'is-dark': isBlueTheme}"
      :default-active="defaultActive"
      :collapse="!asideMenuOpen"
      router
      @open="handleOpen"
      @close="handleClose"
    >
      <SidebarMenuItem v-for="item in menuStore.sideMenus" :key="item.path" v-bind="item"></SidebarMenuItem>
    </el-menu>

    <div class="icon-box" @click="onCollapseChange">
      <el-icon v-if="!asideMenuOpen" size="24"><SfMenu /></el-icon>
      <el-icon v-else size="24"><SfHideMenu /></el-icon>
    </div>
  </aside>
</template>

<style>
  .SidebarMenu-menu:not(.el-menu--collapse) {
    width: 180px;
  }
</style>

<style lang="scss" scoped>
  .SidebarMenu {
    position: relative;
    height: 100%;
    border-right: 1px solid var(--sdesign-color-border-default);
    background-color: var(--sdesign-color-white);
    display: flex;
    flex-direction: column;

    .SidebarMenu-menu{
      flex:1;
      box-shadow: inset 0 0 0 transparent,inset 0 -10px 10px -10px rgb(0 0 0 / 12%);
    }

    .icon-box {
      display: flex;
      position: relative;
      width: 100%;
      height: 48px;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      color: var(--sdesign-color-grey-11);
    }

    &.is-dark{
      background-color: var(--sdesign-color-grey-12);

      .SidebarMenu-menu{
        box-shadow: inset 0 0 0 transparent,inset 0 -10px 10px -10px var(--sdesign-color-grey-9);
      }

      .icon-box{
        color: var(--sdesign-color-grey-5);
      }
    }
  }
</style>
