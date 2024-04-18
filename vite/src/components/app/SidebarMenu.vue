<script setup>
import { reactive, ref } from 'vue';
import SidebarMenuItem from '@/components/app/SidebarMenuItem.vue';
import {getMenusInfo} from '@/modules/menu.js';

const isCollapse = ref(false);
const menuInfo = reactive(getMenusInfo())
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

const onCollapseChange = ()=>{
  isCollapse.value = !isCollapse.value;
}
</script>


<template>
  <aside class='SidebarMenu'>
    <!-- <img class="logo" src='@/assets/images/logo.png'> -->
    <el-menu
      class='SidebarMenu-menu'
      :default-active="menuInfo.defaultActive"
      :collapse='isCollapse'
      :router='true'
      @open='handleOpen'
      @close='handleClose'
    >
      <SidebarMenuItem  v-for='(item) in menuInfo.menus' v-bind='item'></SidebarMenuItem>
    </el-menu>

    <div class='icon-box' @click='onCollapseChange'>
      <el-icon v-if='isCollapse' size='24'><Expand /></el-icon>
      <el-icon v-else size='24'><Fold /></el-icon>
    </div>

  </aside>
</template>

<style>
.SidebarMenu-menu:not(.el-menu--collapse) {
  width: 180px;
}
</style>

<style scoped>
.SidebarMenu {
  position: relative;
  background-color: #FFFFFF;
  padding: 25px 8px 10px 8px;
}

.SidebarMenu .logo{
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  width: 34px;
  height: 32px;
}

.SidebarMenu .icon-box{
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}
</style>
