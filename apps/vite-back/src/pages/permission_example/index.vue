<route lang="json5">
{
  meta: {
    title: "权限验证",
    permission: ["*"],
    activeMenu: "/permission_example",
    order:10
  }
}
</route>

<script setup lang="ts">
import { useUserStore } from '@/stores';

const userStore = useUserStore();
</script>

<template>
  <div>
    <PageMain title="角色权限">
      <div>{{ userStore.roles }}</div>
    </PageMain>

    <PageMain title="功能权限">
      <div>{{ userStore.permissions }}</div>
    </PageMain>

    <PageMain title="指令权限">
      <p v-permission="['*']">有所有权限：v-permission='["*"]'</p>
      <p v-permission="['operation.create']">运营位创建权限：v-permission='["operation.create"]'</p>
      <p v-permission="['operation.edit']">运营位编辑权限：v-permission='["operation.edit"]'</p>
      <p v-permission="[/operation.review/]">运营位审核权限：v-permission='[/operation.review/]'</p>
    </PageMain>

    <PageMain title="路由权限">
      <RouterLink to="/permission_example/no_permission">跳转到无权限路由</RouterLink>
    </PageMain>
  </div>
</template>

<style scoped>
  p {
    margin-bottom: 10px;
  }
</style>
