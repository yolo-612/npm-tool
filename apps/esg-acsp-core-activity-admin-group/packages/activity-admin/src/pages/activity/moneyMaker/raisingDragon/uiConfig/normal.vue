<script setup lang="ts">
import RaisingDragonConfig from './components/RaisingDragonConfig/index.vue';
import { E_RAISING_DRAGON_TYPE } from '../modules/enums';

definePage({
  meta: {
    title: '育龙UI配置-常规',
    permission: ['moneyMakerRaisingDragonUIConfigNormal'],
  },
});

</script>

<template>
  <RaisingDragonConfig :raisingDragonType="E_RAISING_DRAGON_TYPE.NORMAL" />
</template>
