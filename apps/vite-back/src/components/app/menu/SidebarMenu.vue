<script setup>
import { useMenuStore } from '@/stores';

const route = useRoute()

const menuStore = useMenuStore()

// 默认高亮menu
const defaultActive = computed(() => route.meta.activeMenu || route.path);

const onCollapseChange = ()=>{
  menuStore.toggleAsideMenu()
}
</script>

<template>
  <aside
    class="SidebarMenu"
    :style="{
      paddingTop:menuStore.topHeaderHeight,
      width: menuStore.sideMenuWidth,
    }">
    <el-menu
      class='SidebarMenu-menu'
      :default-active="defaultActive"
      :collapse="!menuStore.asideMenuOpen"
      router
    >
      <SidebarMenuItem  v-for="item in menuStore.sideMenus" :key="item.path" v-bind='item'></SidebarMenuItem>
    </el-menu>

    <div class='icon-box' @click='onCollapseChange'>
      <el-icon v-if='menuStore.asideMenuOpen' size='24'><Expand /></el-icon>
      <el-icon v-else size='24'><Fold /></el-icon>
    </div>

  </aside>
</template>

<style scoped lang="scss">
.SidebarMenu {
  position: fixed;
  height: 100%;
  border-right: 1px solid #e0e0e0;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  z-index: 99;
  box-sizing: border-box;
  transition: padding-top 0.3s cubic-bezier(0.34, 0.69, 0.1, 1);
  transition: width 0.3s cubic-bezier(0.55, 0, 0.1, 1);

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
    color: #333;
  }
}

</style>
