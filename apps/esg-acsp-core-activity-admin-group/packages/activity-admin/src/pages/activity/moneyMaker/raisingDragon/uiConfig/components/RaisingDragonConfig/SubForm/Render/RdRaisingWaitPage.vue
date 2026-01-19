<script setup lang="ts">
import type { IFormType } from '../../../../composables/types';

defineProps({
  /** form */
  prop: {
    type: Object as PropType<IFormType>,
    default: () => ({}),
  },
});
</script>

<template>
  <div class="rd-raising-wait-page">
    <img v-if="prop?.rdRaisingCommon?.backgroundUrl" :src="prop.rdRaisingCommon.backgroundUrl" class="rd-raising-wait-page-bg" />
    <img v-if="prop?.rdRaisingCommon?.dragonSeatUrl" :src="prop.rdRaisingCommon.dragonSeatUrl" class="rd-raising-wait-page-dragon" />
    <div class="rd-raising-wait-page-content"></div>
  </div>
</template>

<style lang="scss" scoped>
.rd-raising-wait-page {
  width: 100%;
  height: 100%;
  position: relative;
  .rd-raising-wait-page-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .rd-raising-wait-page-dragon {
    width: calc(615px * var(--scale-factor));
    height: calc(610px * var(--scale-factor));
    position: absolute;
    top: calc(507px * var(--scale-factor));
    left: calc(64px * var(--scale-factor));
  }
  .rd-raising-wait-page-content {
    width: 100%;
    height: 100%;
    background: var(--rd-raising-wait-page-content) no-repeat center center / 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
