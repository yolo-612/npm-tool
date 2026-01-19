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
  <div class="rd-treasure-write">
    <div class="rd-rd-treasure-write-top">
      <img v-if="prop?.rdTreasure?.bannerUrl" :src="prop.rdTreasure.bannerUrl" />
      <div class="rd-rd-treasure-write-top-text">
        <label>反馈客户竞对商机</label>
        <label><span>专人跟进该用户</span></label>
      </div>
    </div>
    <div class="rd-treasure-write-bg"></div>
  </div>
</template>

<style lang="scss" scoped>
.rd-treasure-write {
  width: 100%;
  height: 100%;
  position: relative;
  .rd-treasure-write-bg {
    width: 100%;
    height: 100%;
    background: var(--rd-treasure-write-bg) no-repeat center center / 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .rd-rd-treasure-write-top {
    width: calc(750px * var(--scale-factor));
    height: calc(380px * var(--scale-factor));
    position: relative;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .rd-rd-treasure-write-top-text {
      position: absolute;
      top: calc(153px * var(--scale-factor));
      left: calc(47px * var(--scale-factor));
      display: flex;
      flex-direction: column;
      label {
        font-size: calc(22px * var(--scale-factor));
        line-height: calc(32px * var(--scale-factor));
        color: #FFF5E8;
        span {
          font-weight: 600;
        }
      }
    }
  }
}
</style>
