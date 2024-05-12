<script setup>
import { ref, reactive, inject } from 'vue';
import SidebarMenuItem from '@/components/app/SidebarMenuItem.vue';
import { useMenuStore } from '@/stores';
import { useRoute } from 'vue-router';

const menuStore = useMenuStore()

const route = useRoute()
const defaultActive = ref(route.meta.activeMenu || route.path)

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};

// 菜单是否展开变量提出可以同步main-content去控制宽度
const props = defineProps({
  asideMenuOpen:{
    type: Boolean,
    default: true,
  }
})
const toggleAsideMenu = inject('toggleAsideMenu');
const onCollapseChange = ()=>{
  toggleAsideMenu()
}
</script>

<template>
  <aside class='SidebarMenu'>
    <el-menu
      class='SidebarMenu-menu'
      :default-active="defaultActive"
      :collapse='!asideMenuOpen'
      :router='true'
      @open='handleOpen'
      @close='handleClose'
    >
      <SidebarMenuItem  v-for='(item) in menuStore.menuTree' v-bind='item'></SidebarMenuItem>
    </el-menu>

    <div class='icon-box' @click='onCollapseChange'>
      <el-icon v-if='asideMenuOpen' size='24'><Expand /></el-icon>
      <el-icon v-else size='24'><Fold /></el-icon>
    </div>

  </aside>
</template>

<style>
.SidebarMenu-menu:not(.el-menu--collapse) {
  width: 180px;
}
</style>

<style scoped lang="less">
.SidebarMenu {
  position: relative;
  background-color: #FFFFFF;
  height: 100%;

  .icon-box{
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  }
}

.el-menu{
  --menu-height: 40px;
  --menu-active-color: #409eff;
  --menu-item-border-radius: 4px;
  border-right: none;
}
.el-menu-item{
  height: var(--menu-height);
  margin: 4px;
}
.el-menu-item:hover{
  border-radius: var(--menu-item-border-radius);
}
.el-menu-item.is-active{
  background-color: var(--menu-active-color);
  border-radius: var(--menu-item-border-radius);
}
.el-menu-item.is-active *{
  color: #fff
}
</style>
