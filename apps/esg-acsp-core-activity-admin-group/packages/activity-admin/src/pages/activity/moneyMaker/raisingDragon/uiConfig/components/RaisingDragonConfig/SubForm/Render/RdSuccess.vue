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
  <div class="rd-success">
    <img v-if="prop?.rdSuccess?.backgroundUrl" :src="prop.rdSuccess.backgroundUrl" class="rd-success-bg" />
    <div class="rd-success-bg-container">
      <img v-if="prop?.rdSuccess?.popBackgroundUrl" :src="prop.rdSuccess.popBackgroundUrl" class="rd-success-popup" />
      <img v-if="prop?.rdSuccess?.bottomCoverUrl" :src="prop.rdSuccess.bottomCoverUrl" class="rd-success-bottom" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rd-success {
  width: 100%;
  height: 100%;
  position: relative;
  .rd-success-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .rd-success-bg-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .6);
    .rd-success-popup {
      width: calc(750px * var(--scale-factor));
      height: calc(522px * var(--scale-factor));
      position: absolute;
      bottom: calc(180px * var(--scale-factor));
      left: 0;
    }
    .rd-success-bottom {
      width: 100%;
      height: calc(318px * var(--scale-factor));
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
