<script setup>
import { useUserStore } from '@/stores';

const userStore = useUserStore();

// 注册退出登录
const handleCommand = async (command) => {
};

const switchRole = (roleCode) => {
};

</script>

<template>
  <div class='AppHeader'>
    <div class='left-header'>
      <img class='logo' src='@/assets/images/pi_logo.svg'>
      <span class='logo-title'>YOLO</span>
    </div>
    <div class='right-header'>
      <!-- 个人账号     -->
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
          <el-tag class='ml-2' type='info'>xxx</el-tag>
        </p>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item 
              v-for='item in userStore.baspRoleData'
              @click='switchRole(item.roleCode)'
            >
              <p>{{ item.roleName }}</p>
            </el-dropdown-item> -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less">
.sf-dropdown:focus-visible {
  outline: none;
}

.AppHeader {
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #ecedec;
  padding: 0 20px;

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
</style>
