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
  <div class="rd-fail">
    <div class="rd-fail-bg"></div>
    <img v-if="prop?.rdFail?.popBackgroundUrl" class="rd-fail-pop" :src="prop.rdFail.popBackgroundUrl" />
  </div>
</template>

<style lang="scss" scoped>
.rd-fail {
  width: 100%;
  height: 100%;
  position: relative;
  .rd-fail-bg {
    width: 100%;
    height: calc(1417px * var(--scale-factor));
    background: var(--rd-fail-bg) no-repeat center center / 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .rd-fail-pop {
    width: calc(674px * var(--scale-factor));
    height: calc(502px * var(--scale-factor));
    position: absolute;
    bottom: calc(50px * var(--scale-factor));
    left: calc(36px * var(--scale-factor));
  }
}
</style>
