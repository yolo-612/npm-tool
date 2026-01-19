<script setup lang="ts">
import { E_PAGE_ACTION } from '@/pages/activity/marketActivity/types';
import Steps from './Steps/index.vue';

definePage({
  meta: {
    title: '编辑活动',
    permission: ['MarketActivityEdit'],
  },
});

</script>

<template>
  <Steps :action="E_PAGE_ACTION.EDIT"></Steps>
</template>
