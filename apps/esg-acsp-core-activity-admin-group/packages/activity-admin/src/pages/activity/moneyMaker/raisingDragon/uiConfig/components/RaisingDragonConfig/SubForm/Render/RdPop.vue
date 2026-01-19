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
  <div class="rd-pop">
    <img v-if="prop?.rdPop?.backgroundUrl" :src="prop.rdPop.backgroundUrl" class="rd-pop-popup" />
    <img v-if="prop?.rdPop?.popBtnUrl" :src="prop.rdPop.popBtnUrl" class="rd-pop-btn-url" />
  </div>
</template>

<style lang="scss" scoped>
.rd-pop {
  width: 100%;
  height: 100%;
  background: var(--rd-pop-bg) no-repeat center center / 100% 100%;
  position: relative;
  .rd-pop-popup {
    width: calc(596px * var(--scale-factor));
    height: calc(823px * var(--scale-factor));
    position: absolute;
    top: calc(155px * var(--scale-factor));
    left: calc(80px * var(--scale-factor));
  }
  .rd-pop-btn-url {
    width: calc(411px * var(--scale-factor));
    height: calc(96px * var(--scale-factor));
    position: absolute;
    top: calc(800px * var(--scale-factor));
    left: calc(183px * var(--scale-factor));
  }
}
</style>
