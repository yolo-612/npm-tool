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
  <div class="rd-treasure-popup">
    <div class="rd-treasure-popup-bg"></div>
    <img v-if="prop?.rdTreasure?.entryPopUrl" :src="prop.rdTreasure.entryPopUrl" class="rd-rd-treasure-popup-pop-up-dragon" />
  </div>
</template>

<style lang="scss" scoped>
.rd-treasure-popup {
  width: 100%;
  height: 100%;
  position: relative;
  .rd-treasure-popup-bg {
    width: 100%;
    height: 100%;
    background: var(--rd-treasure-popup-bg) no-repeat center center / 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .rd-rd-treasure-popup-pop-up-dragon {
    width: calc(617px * var(--scale-factor));
    height: calc(727px * var(--scale-factor));
    position: absolute;
    top: calc(130px * var(--scale-factor));
    left: calc(66.5px * var(--scale-factor));
  }
}
</style>
