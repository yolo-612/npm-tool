<script setup>
import { useMenuStore, useSettingsStore, useUserStore } from '@/stores';

const userStore = useUserStore();
const settingsStore = useSettingsStore();
const menuStore = useMenuStore();

// 注册退出登录
const handleCommand = async (command) => {
  if (command === 'logout') {
    console.log('点击退出登录');
  }
};

const switchRole = (roleCode) => {
  userStore.switchRole(roleCode)
};

</script>

<template>
  <div class='AppHeader' :style="{height:menuStore.topHeaderHeight}">
    <div class="AppHeader-content">
      <div class='left-header' :style="{minWidth:menuStore.sideMenuWidthDefault}">
        <img class='logo' src='@/assets/images/pi_logo.svg'>
        <span class='logo-title'>YOLO</span>
      </div>
      <div class="header-menu">
        <HeaderMenu v-if="settingsStore.settings.menu.menuMode !== 'side'"/>
      </div>
      <div class='right-header'>
        <!-- 个人账号 -->
        <el-dropdown @command='handleCommand'>
          <p class='header-title'>
            <el-avatar class='bg' :size='24' icon='UserFilled'></el-avatar>
          </p>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon='User'>{{ userStore.empCode }}</el-dropdown-item>
              <el-dropdown-item command='logout' divided icon='Logout'>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- 角色    -->
        <el-dropdown @command='handleCommand'>
          <p class='header-title'>
            <el-tag class='ml-2' type='info'>{{ userStore.roleName }}</el-tag>
          </p>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item 
                v-for='item in userStore.RoleData'
                @click='switchRole(item.roleCode)'
              >
                <p>{{ item.roleName }}</p>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.AppHeader {
  position: fixed;
  width: 100%;
  z-index: 100;

  .AppHeader-content {
    position: relative;
    display: flex;
    height: 100%;
    background-color: #fff;
    border-bottom: 1px solid #e0e0e0;
    padding: 0 20px 0 0;
    box-sizing: content-box;
    .left-header {
      display: flex;
      align-items: center;

      .logo {
        position: relative;
        cursor: pointer;
        width: 34px;
        height: 32px;
        margin-right: 10px;
      }

      .logo-title {
        font-size: 18px;
        font-weight: 500;
      }
    }
    .header-menu{
      flex: 1;
    }
    .right-header {
      display: flex;
      align-items: center;

      .header-title{
        cursor: pointer;
        outline: none;
      }

      .el-dropdown:not(:last-child) {
        cursor: pointer;
        outline: none;
        margin-right: 10px;
      }

    }
  }
}
</style>
