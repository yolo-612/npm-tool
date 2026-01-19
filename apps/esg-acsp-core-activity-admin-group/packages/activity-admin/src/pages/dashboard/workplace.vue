<route>
  {
  name: "workplace",
  meta: {
      title: "工作台",
      permission: ["*"],
      order:100,
      icon: 'SfHome',
  }
  }
</route>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores';

const router = useRouter();

const userStore = useUserStore();
</script>

<template>
  <div>
    <PageHeader :title="`欢迎回来！${userStore.empCode}`">
      <template #content>
        {{ userStore.permission }}
      </template>
    </PageHeader>
  </div>
</template>

<style scoped>
  p {
    margin-bottom: 10px;
  }
</style>
