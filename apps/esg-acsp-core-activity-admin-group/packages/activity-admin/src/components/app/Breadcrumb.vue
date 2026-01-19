<script setup lang="ts">
const route = useRoute();

const getBreadcrumb = computed(() => {
  return route.meta?._breadcrumbList || [];
});
</script>

<template>
  <div class="Breadcrumb">
    <el-breadcrumb separator="/">
      <TransitionGroup name="breadcrumb">
        <el-breadcrumb-item key="-1" :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in getBreadcrumb" :key="index" :to="item.path">
          {{ item.title }}
        </el-breadcrumb-item>
      </TransitionGroup>
    </el-breadcrumb>
  </div>
</template>

<style scoped>
.Breadcrumb{
  background-color: var(--sdesign-color-bg-1);
  border-bottom: 1px solid var(--sdesign-color-border-default);
}
.el-breadcrumb{
  background-color: transparent;
}
.breadcrumb-enter-active {
  transition: transform 0.3s, opacity 0.3s;
}

.breadcrumb-enter-from {
  opacity: 0;
  transform: translateX(30px) skewX(-50deg);
}
</style>
