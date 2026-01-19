<script setup lang="ts">
import PageHeader from '@/components/app/PageHeader.vue';
import PageMain from '@/components/app/PageMain.vue';

definePage({
  meta: {
    title: '育龙UI配置',
    permission: ['moneyMakerRaisingDragonUIConfig'],
  },
});

/**
 * 育龙计划类型列表
 */
const raisingDragonList = [
  {
    name: '育龙计划',
    url: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1734158502936_756.jpg',
    path: '/activity/moneyMaker/raisingDragon/uiConfig/normal',
  },
  {
    name: '大件育龙计划',
    url: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1734158475958_159.jpg',
    path: '/activity/moneyMaker/raisingDragon/uiConfig/bulk',
  },
  {
    name: '育龙挑战',
    url: 'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1739864656010_616.png',
    path: '/activity/moneyMaker/raisingDragon/uiConfig/challenge',
  },
];

</script>

<template>
  <PageHeader :title="$route.meta.title" />
  <PageMain>
    <div class="money-maker-raising-dragon__list">
      <div
        v-for="item in raisingDragonList"
        :key="item.path"
        class="money-maker-raising-dragon__cell"
        @click="$router.push(item.path)"
      >
        <img :src="item.url" :alt="item.name">
        <span>{{ item.name }}</span>
      </div>
    </div>
  </PageMain>
</template>

<style lang="scss" scoped>
.money-maker-raising-dragon__list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .money-maker-raising-dragon__cell {
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
