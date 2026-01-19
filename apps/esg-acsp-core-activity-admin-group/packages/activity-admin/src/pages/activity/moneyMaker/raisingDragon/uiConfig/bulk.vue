<script setup lang="ts">
import RaisingDragonConfig from './components/RaisingDragonConfig/index.vue';
import { E_RAISING_DRAGON_TYPE } from '../modules/enums';

definePage({
  meta: {
    title: '育龙UI配置-大件',
    permission: ['moneyMakerRaisingDragonUIConfigBulk'],
  },
});
</script>

<template>
  <RaisingDragonConfig :raisingDragonType="E_RAISING_DRAGON_TYPE.BULK" />
</template>

<style lang="scss" scoped>
</style>
