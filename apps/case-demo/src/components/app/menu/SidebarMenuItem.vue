<script setup lang="ts">
import type { MenuItem } from '@/stores/modules/menu/types';

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
      <el-icon v-if="icon"><component :is="icon" /></el-icon>
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
