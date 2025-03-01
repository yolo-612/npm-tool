<script setup lang="ts">
import type { TabProps } from '@/stores/modules/tab-bar/types';
import { useTabBarStore } from '@/stores';

const props = defineProps<{ value: TabProps; index: number }>();
const route = useRoute();
const router = useRouter();
const tabBarStore = useTabBarStore();

const onClickClose = () => {
  tabBarStore.deleteTag(props.index, props.value);
  if (props.value.fullPath === route.fullPath) {
    const latest = tabBarStore.tagList[props.index - 1]; // 获取队列的前一个tab
    router.push(latest.fullPath);
  }
};

const onClickItem = () => {
  router.push(props.value.fullPath);
};

// const findCurrentRouteIndex = () => {
//   return tabBarStore.tagList.findIndex((el) => el.fullPath === route.fullPath);
// };

// const onClickMenu = (action: string) => {
//   const copyTagList = [...tabBarStore.tagList];
//   const currentRouteIdx = findCurrentRouteIndex();
//   let filterList = [];
//   switch (action) {
//     case 'close':
//       onClickClose();
//       break;
//     case 'left':
//       copyTagList.splice(1, props.index - 1);
//       tabBarStore.freshTabList(copyTagList);
//       if (currentRouteIdx < props.index) {
//         router.push(props.value.fullPath);
//       }
//       break;
//     case 'right':
//       copyTagList.splice(props.index + 1);
//       tabBarStore.freshTabList(copyTagList);
//       if (currentRouteIdx > props.index) {
//         router.push(props.value.fullPath);
//       }
//       break;
//     case 'others':
//       filterList = tabBarStore.tagList.filter((el, idx) => idx === 0 || idx === props.index);
//       tabBarStore.freshTabList(filterList);
//       router.push(props.value.fullPath);
//       break;
//     case 'all':
//       tabBarStore.resetTabList();
//       router.push(tabBarStore.tagList[0].fullPath);
//       break;
//     default:
//       break;
//   }
// };
</script>

<template>
  <el-dropdown trigger="contextmenu">
    <span class="TabBarItem" :class="{ activated: value.name === $route.name }" @click="onClickItem">
      <span class="title">{{ value.title || value.name }}</span>
      <el-icon v-if="index !== 0" @click.stop="onClickClose">
        <el-icon><Close /></el-icon>
      </el-icon>
    </span>
    <!-- <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="SfClose" :disabled="index === 0" @click.stop="onClickMenu('close')"
          >关闭当前标签页</el-dropdown-item
        >
        <el-dropdown-item icon="SfLeft" :disabled="index === 0 || index === 1" @click.stop="onClickMenu('left')"
          >关闭左侧标签页</el-dropdown-item
        >
        <el-dropdown-item
          icon="SfRight"
          :disabled="index === tabBarStore.tagList.length - 1"
          @click.stop="onClickMenu('right')"
          >关闭右侧标签页</el-dropdown-item
        >
        <el-dropdown-item icon="SfLevel" @click.stop="onClickMenu('others')">关闭其他标签页</el-dropdown-item>
        <el-dropdown-item icon="SfLoop" @click.stop="onClickMenu('all')">关闭全部标签页</el-dropdown-item>
      </el-dropdown-menu>
    </template> -->
  </el-dropdown>
</template>

<style scoped>
  .TabBarItem {
    display: inline-flex;
    height: 24px;
    font-size: var(--sdesign-font-size-small);
    line-height: 24px;
    border-radius: 2px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 8px;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;

    &.activated {
      color: var(--sdesign-color-brand-6);
      font-weight: var(--sdesign-font-weight-medium);
    }

    .title {
      margin-right: 4px;
    }
  }
</style>
