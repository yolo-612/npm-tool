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
  <div class="rd-treasure-list">
    <div class="rd-rd-treasure-list-top">
      <img v-if="prop?.rdTreasure?.bannerUrl" :src="prop.rdTreasure.bannerUrl" />
      <div class="rd-rd-treasure-list-top-text">
        <label>反馈客户竞对商机</label>
        <label>我们会派<span>专人跟进该用户</span></label>
        <label>助力本期育龙整体<span>目标达成</span></label>
      </div>
    </div>
    <div class="rd-treasure-list-bg"></div>
  </div>
</template>

<style lang="scss" scoped>
.rd-treasure-list {
  width: 100%;
  height: 100%;
  position: relative;
  .rd-treasure-list-bg {
    width: 100%;
    height: 100%;
    background: var(--rd-treasure-list-bg) no-repeat center center / 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .rd-rd-treasure-list-top {
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
    .rd-rd-treasure-list-top-text {
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
