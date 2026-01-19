<script setup lang="ts">
import type { MenuItem } from '@/stores/modules/menu/types';
import * as MenuIconMap from '@/menu/menuIcon';

withDefaults(defineProps<MenuItem>(), {
  title: '标题',
  path: '',
  icon: '',
  children: undefined,
  isLink: false,
});

const onClickLink = (path: string) => {
  window.open(path, '_blank');
};

</script>

<template>
  <el-sub-menu v-if="children && children.length" :index="path">
    <template #title>
      <el-icon v-if="icon && typeof icon !== 'string'" class="el-sub-menu-icon"><component :is="icon" /></el-icon>
      <img v-else-if="icon && typeof icon === 'string'" class="el-sub-menu-image el-sub-menu-icon" :src="icon"/>
      <span>{{ title }}</span>
    </template>

    <template v-if="children && children.length > 0">
      <SidebarMenuItem v-for="item in children" :key="item.path" v-bind="item" />
    </template>
  </el-sub-menu>
  <el-menu-item v-else-if="isLink" @click="onClickLink(path)">
    <el-icon v-if="icon"><component :is="icon" /></el-icon>
    <span>{{ title }}</span>
  </el-menu-item>
  <el-menu-item v-else :index="path">
    <el-icon v-if="icon"><component :is="icon" /></el-icon>
    <span>{{ title }}</span>
  </el-menu-item>
</template>
<style lang="scss" scoped>
.el-sub-menu-icon {
  margin-right: 15px;
}
.el-sub-menu-image {
  width: 16px;
  height: 18px;
}
.el-menu--vertical:not(.el-menu--popup-container).el-menu .el-menu--inline .el-menu-item {
  padding-left: 38px;
  color: rgba(0,0,0,.65);
  &::before {
    content: '';
  }
  &.is-active,
  &.is-active:hover {
    background: #fcf3f5 !important;
    color: rgba(0,0,0,.65) !important;
    padding-left: 42px;
    &::before {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      border-right: 4px solid #db2029;
      content: '';
    }
  }
  &:hover {
    background: #fff1f1 !important;
    color: #141222 !important;
  }
}
</style>
