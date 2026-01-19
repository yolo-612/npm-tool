<script setup lang="ts">
import { E_PAGE_ACTION } from '@/pages/activity/marketActivity/types';
import Steps from './Steps/index.vue';

definePage({
  meta: {
    title: '查看活动',
    permission: ['MarketActivityDetail'],
  },
});

</script>

<template>
  <Steps :action="E_PAGE_ACTION.DETAIL"></Steps>
</template>
