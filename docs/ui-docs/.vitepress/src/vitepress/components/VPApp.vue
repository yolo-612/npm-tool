<script lang="ts" setup>
import { VTBackdrop } from '../../core';
import { useSidebar } from '../composables/sidebar';
import { useRoute } from 'vitepress';
import VPNav from './VPNav.vue';
import VPLocalNav from './VPLocalNav.vue';
import VPSkipLink from './VPSkipLink.vue';
import VPAnnouncer from './VPAnnouncer.vue';
import VPSidebar from './VPSidebar.vue';
import VPContent from './VPContent.vue';
import VPTheme from './VPTheme.vue';
import { onMounted, onUnmounted, provide, watchEffect, ref, watch } from 'vue';

const {
  isOpen: isSidebarOpen,
  open: openSidebar,
  close: closeSidebar
} = useSidebar();

const route = useRoute();
const theme = ref('blue');
const handleClick = (e: any) => {
  theme.value = e;
  document
    .getElementsByTagName('html')[0]
    .setAttribute('data-theme', theme.value);
};

// A11y: cache the element that opened the Sidebar (the menu button)
//   then focus that button again when Menu is closed with Escape key
let triggerElement: HTMLButtonElement | undefined;
watchEffect(() => {
  triggerElement = isSidebarOpen.value
    ? (document.activeElement as HTMLButtonElement)
    : undefined;
});

watch(
  () => route.path,
  () => {
    // visible.value = false;
  }
);

const isComponent = () => {
  return route.path.includes('component');
};

const onEsacpe = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isSidebarOpen.value) {
    closeSidebar();
    triggerElement?.focus();
  }
};

onMounted(() => {
  window.addEventListener('keyup', onEsacpe);
  // 默认红主题
  document
    .getElementsByTagName('html')[0]
    .setAttribute('data-theme', theme.value);
});
onUnmounted(() => {
  window.removeEventListener('keyup', onEsacpe);
});

provide('close-sidebar', closeSidebar);
const visible = ref(false);
</script>

<template>
  <div class="VPApp">
    <VPSkipLink />
    <VTBackdrop class="backdrop" :show="isSidebarOpen" @click="closeSidebar" />
    <slot name="banner" />
    <!-- <VPNav /> -->
    <VPLocalNav :open="isSidebarOpen" @open-menu="openSidebar" />
    <VPSidebar :open="isSidebarOpen">
      <template #top>
        <slot name="sidebar-top" />
        <div v-if="isComponent()" class="toGuide">
          <a href="/guide/installation.html">使用指南</a>
        </div>
        <div v-if="!isComponent()" class="toGuide">
          <a href="/component/color.html">组件</a>
        </div>
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </VPSidebar>
    <VPContent>
      <template #content-top>
        <slot name="content-top" />
      </template>
      <template #content-bottom>
        <slot name="content-bottom" />
      </template>
      <template #aside-top>
        <slot name="aside-top" />
      </template>
      <template #aside-mid>
        <slot name="aside-mid" />
      </template>
      <template #aside-bottom>
        <slot name="aside-bottom" />
      </template>
      <template #footer-before>
        <slot name="footer-before" />
      </template>
      <template #footer-after>
        <slot name="footer-after" />
      </template>
    </VPContent>
    <VPAnnouncer />
    <!-- 主题变更 -->
    <el-popover placement="top" title="样式变更" :width="320">
      <slot class="global">
        <el-radio-group v-model="theme" class="bg" @change="handleClick">
          <el-radio-button value="blue">蓝色主题</el-radio-button>
          <el-radio-button value="red">红色主题</el-radio-button>
        </el-radio-group>
      </slot>
      <!-- <VPTheme /> -->
      <template #reference>
        <div class="fixed-widgets">
          <span
            class="fixed-widgets-avatar ant-dropdown-trigger ant-avatar ant-avatar-circle ant-avatar-icon"
            style="
              width: 44px;
              height: 44px;
              line-height: 44px;
              font-size: 22px;
            "
          >
            <span role="img" class="anticon">
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="currentColor"
              >
                <g fillRule="evenodd">
                  <g fillRule="nonzero">
                    <path
                      d="M7.02 3.635l12.518 12.518a1.863 1.863 0 010 2.635l-1.317 1.318a1.863 1.863 0 01-2.635 0L3.068 7.588A2.795 2.795 0 117.02 3.635zm2.09 14.428a.932.932 0 110 1.864.932.932 0 010-1.864zm-.043-9.747L7.75 9.635l9.154 9.153 1.318-1.317-9.154-9.155zM3.52 12.473c.514 0 .931.417.931.931v.932h.932a.932.932 0 110 1.864h-.932v.931a.932.932 0 01-1.863 0l-.001-.931h-.93a.932.932 0 010-1.864h.93v-.932c0-.514.418-.931.933-.931zm15.374-3.727a1.398 1.398 0 110 2.795 1.398 1.398 0 010-2.795zM4.385 4.953a.932.932 0 000 1.317l2.046 2.047L7.75 7 5.703 4.953a.932.932 0 00-1.318 0zM14.701.36a.932.932 0 01.931.932v.931h.932a.932.932 0 010 1.864h-.933l.001.932a.932.932 0 11-1.863 0l-.001-.932h-.93a.932.932 0 110-1.864h.93v-.931a.932.932 0 01.933-.932z"
                    ></path>
                  </g>
                </g>
              </svg>
            </span>
          </span>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<style scoped>
.VPApp {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--vt-c-bg);
  transition: background-color 0.5s;
  padding-top: var(--vt-banner-height);
}

.backdrop {
  z-index: var(--vp-z-index-backdrop);
}

.fixed-widgets {
  position: fixed;
  right: 40px;
  bottom: 100px;
  z-index: 2147483640;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.fixed-widgets .fixed-widgets-avatar {
  color: #000;
  background-color: #fff;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
    0 9px 28px 8px #0000000d;
  transition: color 0.3s;
}

.toGuide {
  text-align: right;
  font-size: 14px;
  a {
    background-color: var(--sdesign-color-green-5);
    padding: 6px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    color: var(--vt-c-white);
  }
}
</style>
