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
  <div class="rd-select">
    <img v-if="prop?.rdSelect?.backgroundUrl" :src="prop.rdSelect.backgroundUrl" class="rd-select-bg" />
    <div class="rd-select-content"></div>
  </div>
</template>

<style lang="scss" scoped>
.rd-select {
  width: 100%;
  height: 100%;
  position: relative;
  .rd-select-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .rd-select-content {
    width: 100%;
    height: 100%;
    background: var(--rd-select-content) no-repeat center center / 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
