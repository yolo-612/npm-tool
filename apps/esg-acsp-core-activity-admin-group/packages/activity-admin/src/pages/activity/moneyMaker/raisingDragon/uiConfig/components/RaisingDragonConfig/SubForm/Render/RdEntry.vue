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
  <div class="rd-entry">
    <img v-if="prop?.rdEntry?.backgroundUrl" :src="prop.rdEntry.backgroundUrl" class="rd-entry-bg" />
    <div class="rd-entry-content"></div>
    <img v-if="prop?.rdEntry?.entryBottomCover" :src="prop.rdEntry.entryBottomCover" class="rd-entry-bottom" />
    <div class="rd-entry-btn"></div>
    <img v-if="prop?.rdEntry?.entryBtnUrl" :src="prop.rdEntry.entryBtnUrl" class="rd-entry-btn-url" />
  </div>
</template>

<style lang="scss" scoped>
.rd-entry {
  width: 100%;
  height: 100%;
  position: relative;
  .rd-entry-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .rd-entry-content {
    width: 100%;
    height: 100%;
    background: var(--rd-entry-content) no-repeat center center / 100% 100%;;
    position: absolute;
    top: 0;
    left: 0;
  }
  .rd-entry-bottom {
    width: 100%;
    height: calc(358px * var(--scale-factor));
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .rd-entry-btn-url {
    width: calc(477px * var(--scale-factor));
    height: calc(165px * var(--scale-factor));
    position: absolute;
    bottom: calc(100px * var(--scale-factor));
    left: calc(152px * var(--scale-factor));
  }
  .rd-entry-btn {
    width: calc(473px * var(--scale-factor));
    height: calc(219px * var(--scale-factor));
    background: var(--rd-entry-btn) no-repeat center center / 100% 100%;
    position: absolute;
    bottom: calc(100px * var(--scale-factor));
    left: calc(152px * var(--scale-factor));
  }
}
</style>
