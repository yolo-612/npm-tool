<script setup lang="ts">
import { ACTIVITY_COPY_URL, ACTIVITY_TYPE } from '@/pages/activity/marketActivity/types';
import PageHeader from '@/components/app/PageHeader.vue';
import PageMain from '@/components/app/PageMain.vue';

definePage({
  meta: {
    title: '新建活动-选择类型',
    permission: ['MarketActivitySelect'],
  },
});

const activityList = [
  {
    type: ACTIVITY_TYPE.BUSINESS_COLLECTION,
    label: '商机线下收集活动',
    url: ACTIVITY_COPY_URL.BUSINESS_COLLECTION,
    image: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1741069143959_896.jpg',
  },
];

</script>

<template>
  <PageHeader :title="$route.meta.title" />
  <PageMain>
    <h3>请选择活动类型</h3>
    <div class="activity-create-container">
      <div
        v-for="item in activityList"
        :key="item.type"
        class="activity-create-container-item"
        @click="() => $router.push(item.url)"
      >
        <img :src="item.image" />
        <span>{{ item.label }}</span>
      </div>
    </div>
  </PageMain>
</template>

<style lang='scss' scoped>
.activity-create-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .activity-create-container-item {
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 300px;
      height: 534px;
    }
    span {
      margin-top: 20px;
      font-size: 24px;
      font-weight: bold;
      color: #333333;
    }
  }
}
</style>
