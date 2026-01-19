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
  <div class="rd-raising-customer-detail">
    <div class="rd-raising-customer-detail-bg"></div>
    <img
      v-if="prop?.rdRaisingCommon?.taskPopDragonUrl"
      :src="prop.rdRaisingCommon.taskPopDragonUrl"
      class="rd-raising-customer-detail-dragon"
    />
    <div class="rd-raising-customer-detail-content"></div>
  </div>
</template>

<style lang="scss" scoped>
.rd-raising-customer-detail {
  width: 100%;
  height: 100%;
  position: relative;
  .rd-raising-customer-detail-bg {
    width: 100%;
    height: 100%;
    background: var(--rd-raising-customer-detail-bg) no-repeat center center / 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .rd-raising-customer-detail-dragon {
    width: calc(220px * var(--scale-factor));
    height: calc(165px * var(--scale-factor));
    position: absolute;
    top: calc(245px * var(--scale-factor));
    left: calc(41px * var(--scale-factor));
  }
  .rd-raising-customer-detail-content {
    width: 100%;
    height: calc(1478px * var(--scale-factor));
    background: var(--rd-wait-customer-detail-content) no-repeat center center / 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
