<script setup lang="ts">
import { useUserStore, useMenuStore } from '@/stores';
import useMainPage from '@/hook/useMainPage';
import type { RoleItem } from '@/stores/modules/user/types';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const menuStore = useMenuStore();

const topHeaderHeight = inject<string>('topHeaderHeight');

const changeNavItem = (navItem: any) => {
  router.push(navItem.jumpUrl);
};

watch([
  () => menuStore.headerMenus,
  () => route.path,
], () => {
  menuStore.changeActivedIndex(route.path);
}, { immediate: true });
const handleCommand = async (command: string) => {
  if (command === 'logout') {
    const LOGOUT_URL = 'activity-web-backend/user/logout'; // 账号退出的接口地址
    const { origin, href } = window.location;
    window.location.href = `${origin}/${LOGOUT_URL}?target=${href}`;
  }
};

const logOut = () => {
  const LOGOUT_URL = 'activity-web-backend/user/logout'; // 账号退出的接口地址
  const { origin, href } = window.location;
  window.location.href = `${origin}/${LOGOUT_URL}?target=${href}`;
};

const switchRole = (roleItem: RoleItem) => {
  userStore.switchRole(roleItem.roleCode);
  useMainPage().reload();
};
</script>

<template>
  <div class="AppHeader">
    <div class="nav-bar-box">
      <img src="https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1741946655056_160.png" alt="">
      <div class="nav-bar-title">月结智能营销平台</div>
      <ul class="nav-bar">
        <li
          v-for="(navItem, index) in menuStore.headerMenus"
          :key="navItem.path"
          :style="{ height: topHeaderHeight }"
          class="nav-item"
          :class="{ 'active': index === menuStore.activedIndex }"
          @click="changeNavItem(navItem)"
        >{{ navItem.title }}</li>
      </ul>
    </div>
    <ul class="right-header">
      <li>
        <el-icon color="#fff" size="20"><SfUser /></el-icon>
        <span style="margin-left: 6px">{{ userStore.empCode }}</span>
        <!-- <el-icon icon="SfUser">{{ userStore.empCode }}</el-icon> -->
        <!-- <el-icon icon="SfUser">{{ userStore.empCode }}</el-icon> -->
        <!-- 个人账号     -->
        <!-- <el-dropdown @command="handleCommand">
          <p class="header-title">
            <el-avatar class="bg" :size="28" icon="UserFilled"></el-avatar>
          </p>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item icon="SfUser">{{ userStore.empCode }}</el-dropdown-item>
              <el-dropdown-item command="logout" divided icon="SfLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown> -->
      </li>
      <li>
        <el-dropdown @command="handleCommand">
          <div class="header-role">
            <el-icon color="#fff" size="22"><Setting /></el-icon>
            <span style="margin-left: 6px">{{ userStore.roleName }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in userStore.roleData" :key="item.roleId" @click="switchRole(item)">
                <p>{{ item.roleName }}</p>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li>
      <li class="header-logOut" @click="logOut">
        退出
      </li>
      <!-- <li>
        <el-dropdown @command="handleCommand">
          <p class="header-title">
            <el-tag class="ml-2" type="info">{{ userStore.roleName }}</el-tag>
          </p>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in userStore.roleData" :key="item.roleId" @click="switchRole(item)">
                <p>{{ item.roleName }}</p>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </li> -->
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .el-dropdown:focus-visible {
    outline: none;
  }

  .AppHeader {
    position: relative;
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: rgb(28, 37, 59);
    border-bottom: 1px solid var(--sdesign-color-border-default);
    padding: 0 20px;
    .nav-bar-box{
      display: flex;
      align-items: center;
      img{
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
      .nav-bar-title {
        position: relative;
        margin-left: 10px;
        font-weight: 700;
        color: #fff;
        line-height: 26px;
        font-size: 26px;
        &::before {
          position: absolute;
          left: -10px;
          width: 1px;
          height: 26px;
          background: #ccc;
          content: ' ';
        }
      }
      .nav-bar {
        display: flex;
        align-items: center;
        margin-left: 20px;
        .nav-item {
          margin: 0 15px;
          box-sizing: border-box;
          border-bottom: 2px solid transparent;
          color: #999;
          font-size: 16px;
          font-weight: 600;
          line-height: 58px;
          text-align: center;
          cursor: pointer;
          &.active{
            border-bottom-color: #db1a2c;
            color: #fff;
          }
        }
      }
    }

    .right-header {
      display: flex;
      align-items: center;
      color: #fff;
      li {
        display: flex;
        align-items: center;
        margin-left: 15px;
      }

      .header-title {
        cursor: pointer;
        outline: none;
      }
      .header-role {
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        outline: none;
        .el-icon,
        .el-icon svg {
          width: 20px;
          height: 20px
        }
      }
      .header-logOut {
        cursor: pointer;
      }
      .el-dropdown:not(:last-child) {
        cursor: pointer;
        outline: none;
      }
      .el-avatar.bg {
        background-image: linear-gradient(0deg, #eff0f4, #bac4e0);
        opacity: .7;
        :deep(svg path) {
          fill: #000;
        }
      }
    }
  }
</style>
