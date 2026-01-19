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
  <div class="rd-wait-page">
    <img v-if="prop?.rdRaisingCommon?.backgroundUrl" :src="prop.rdRaisingCommon.backgroundUrl" class="rd-wait-page-bg" />
    <img v-if="prop?.rdRaisingCommon?.dragonSeatUrl" :src="prop.rdRaisingCommon.dragonSeatUrl" class="rd-wait-page-dragon" />
    <div class="rd-wait-page-content"></div>
  </div>
</template>

<style lang="scss" scoped>
.rd-wait-page {
  width: 100%;
  height: 100%;
  position: relative;
  .rd-wait-page-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .rd-wait-page-dragon {
    width: calc(615px * var(--scale-factor));
    height: calc(610px * var(--scale-factor));
    position: absolute;
    top: calc(507px * var(--scale-factor));
    left: calc(64px * var(--scale-factor));
  }
  .rd-wait-page-content {
    width: 100%;
    height: 100%;
    background: var(--rd-wait-page-content) no-repeat center center / 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
