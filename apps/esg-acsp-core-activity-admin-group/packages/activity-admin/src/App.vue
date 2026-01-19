<script setup>
// import { useSettingsStore } from '@/stores';
import { AcspConfigProvider } from '@fpkg/components-web';

// const settingsStore = useSettingsStore();

// if (import.meta.env.DEV) {
// 开发模式才显示生成代码工具
// const initNewCodeTool = async () => {
//   // 按需加载
//   const { showNewCodeTool, hideNewCodeTool } = await import('@/components/app/NewCodeTool');

//   watch(() => settingsStore.settings.hiddenNewCodeTool, (hiddenNewCodeTool) => {
//     if (!showNewCodeTool || !hideNewCodeTool) return;
//     hiddenNewCodeTool ? hideNewCodeTool() : showNewCodeTool();
//   }, { immediate: true });
// };

// initNewCodeTool();
// }
</script>

<template>
  <AcspConfigProvider>
    <RouterView></RouterView>
  </AcspConfigProvider>
  <!-- <AppSettings/> -->
</template>
