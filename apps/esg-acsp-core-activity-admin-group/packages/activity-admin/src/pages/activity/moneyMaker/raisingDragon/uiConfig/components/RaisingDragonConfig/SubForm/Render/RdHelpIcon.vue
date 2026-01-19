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
  <div class="rd-help-icon">
    <div class="rd-help-icon-bg"></div>
    <img v-if="prop?.rdHelp?.entryIconUrl" :src="prop.rdHelp.entryIconUrl" class="rd-rd-help-icon-icon" />
  </div>
</template>

<style lang="scss" scoped>
.rd-help-icon {
  width: 100%;
  height: 100%;
  position: relative;
  .rd-help-icon-bg {
    width: 100%;
    height: 100%;
    background: var(--rd-help-icon-bg) no-repeat center center / 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .rd-rd-help-icon-icon {
    width: calc(104px * var(--scale-factor));
    height: calc(121px * var(--scale-factor));
    position: absolute;
    top: calc(500px * var(--scale-factor));
    right: calc(41px * var(--scale-factor));
  }
}
</style>
