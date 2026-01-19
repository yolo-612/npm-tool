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
  <div class="rd-treasure-icon">
    <div class="rd-treasure-icon-bg"></div>
    <img v-if="prop?.rdTreasure?.entryIconUrl" :src="prop.rdTreasure.entryIconUrl" class="rd-rd-treasure-icon-icon" />
  </div>
</template>

<style lang="scss" scoped>
.rd-treasure-icon {
  width: 100%;
  height: 100%;
  position: relative;
  .rd-treasure-icon-bg {
    width: 100%;
    height: 100%;
    background: var(--rd-treasure-icon-bg) no-repeat center center / 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .rd-rd-treasure-icon-icon {
    width: calc(104px * var(--scale-factor));
    height: calc(121px * var(--scale-factor));
    position: absolute;
    top: calc(357px * var(--scale-factor));
    right: calc(41px * var(--scale-factor));
  }
}
</style>
