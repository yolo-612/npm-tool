<script setup lang="ts">
import { useMenuStore, useSettingsStore } from '@/stores';
const route = useRoute();

const menuStore = useMenuStore();
const settingsStore = useSettingsStore();

// 默认高亮menu
const defaultActive = computed(()=>{
  if (route.meta.activeMenu) return route.meta.activeMenu
  if(settingsStore.settings.menu.menuMode === 'head-side' && menuStore.headerMenus[menuStore.activedIndex]){
    return menuStore.headerMenus[menuStore.activedIndex].path
  }
  return route.path
})

watch(()=>menuStore.headerMenus,()=>{
  console.log("menuStore.headerMenus",menuStore.headerMenus)
  menuStore.setActived(route.path)
},{immediate:true})

const handleSelect = (event: any) => {
  console.log("handleMenuSelect",event)
  // menuStore.setActived(event)
};

</script>

<template>
  <el-menu
    class="HeaderMenu"
    :style="{height: menuStore.topHeaderHeight}"
    :default-active="defaultActive"
    mode="horizontal"
    router
    @select="handleSelect"
  >
    <SidebarMenuItem v-for="item in menuStore.headerMenus" :key="item.path" v-bind="item"></SidebarMenuItem>
  </el-menu>
</template>

<style scoped>

</style>
