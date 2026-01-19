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
  <div class="rd-help-write" :style="`background-color: ${prop.rdHelp.backgroundColor};`">
    <img v-if="prop?.rdHelp?.backgroundUrl" :src="prop.rdHelp.backgroundUrl" class="rd-help-write-bg" />
    <div class="rd-help-write-content"></div>
  </div>
</template>

<style lang="scss" scoped>
.rd-help-write {
  width: 100%;
  height: 100%;
  position: relative;
  .rd-help-write-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .rd-help-write-content {
    width: 100%;
    height: calc(1500px * var(--scale-factor));
    background: var(--rd-help-write-content) no-repeat center center / 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
