<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router';
import { VueDraggable } from 'vue-draggable-plus';
import { useMenuStore, useTabBarStore } from '@/stores';
import { listenerRouteChange, removeRouteListener } from '@/utils/route-listener';

const tabBarStore = useTabBarStore();
const menuStore = useMenuStore();

const handler = (route: RouteLocationNormalized) => {
  tabBarStore.updateTabList(route);
};

onMounted(() => {
  // 监听路由切换
  listenerRouteChange(handler, true);
});

onBeforeUnmount(() => {
  removeRouteListener(handler);
});
</script>

<template>
  <div class="tab-bar-container">
    <div 
      class="tab-bar-box"
      :style="{
        top:menuStore.topHeaderHeight,
        left:menuStore.sideMenuWidth,
      }"
    >
      <VueDraggable
        v-model="tabBarStore.tagList"
        class="tab-bar-scroll"
        ghostClass="ghost"
        scroll
        :animation="150"
        draggable=".draggableTabbarItem"
        direction="horizontal"
      >
        <TabBarItem
          v-for="(tag, index) in tabBarStore.tagList"
          :key="tag.fullPath"
          :class="{draggableTabbarItem:index!==0}"
          :index="index"
          :value="tag" />
      </VueDraggable>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .tab-bar-container {
    position: relative;
    background-color: #fff;
    height: 32px;

    :deep(.el-dropdown){
      margin-right: 6px;
      background-color: #f5f5f5;
    }

    .tab-bar-box {
      position: fixed;
      left: 48px;
      right: 0;
      display: flex;
      padding: 0 10px;
      border-bottom: 1px solid #e0e0e0;
      height: 32px;
      overflow: hidden;
      z-index: 20;
      background-color: #fff;
      transition: all 0.3s cubic-bezier(0.34, 0.69, 0.1, 1);

      .tab-bar-scroll {
        overflow-x: auto;
        white-space: nowrap;
        height: 48px;
        padding: 4px 0;
      }
    }
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb!important;
  }
</style>
