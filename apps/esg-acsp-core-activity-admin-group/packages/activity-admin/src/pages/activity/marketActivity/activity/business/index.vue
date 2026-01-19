<script setup lang="ts">
import { E_PAGE_ACTION } from '@/pages/activity/marketActivity/types';
import Steps from './Steps/index.vue';

const route = useRoute();
const action = route.query.code ? E_PAGE_ACTION.COPY : E_PAGE_ACTION.ADD;

definePage({
  meta: {
    title: '新建活动',
    permission: ['MarketActivityAdd'],
  },
});

</script>

<template>
  <Steps :action="action"></Steps>
</template>
