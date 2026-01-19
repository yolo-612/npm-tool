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
  <div class="rd-select-empty-icon">
    <img v-if="prop?.rdSelect?.backgroundUrl" :src="prop?.rdSelect?.backgroundUrl"  class="rd-select-empty-icon-bg" />
    <div class="rd-select-empty-icon-content">
      <div v-if="prop?.rdSelect?.emptyIconUrl" class="rd-select-empty-icon-bottom">
        <img :src="prop.rdSelect.emptyIconUrl" />
      </div>
      <span>暂无绑定的PB月结客户</span>
      <span>请联系网点负责人了解详情</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rd-select-empty-icon {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .rd-select-empty-icon-bg {
    width: 100%;
    height: 100%;
  }
  .rd-select-empty-icon-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    .rd-select-empty-icon-bottom {
      width: calc(321px * var(--scale-factor));
      height: calc(321px * var(--scale-factor));
      background: url(https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1734504513430_617.png) no-repeat center center / 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: calc(189px * var(--scale-factor));
        height: calc(286px * var(--scale-factor));
      }
    }
    span {
      margin-bottom: 5px;
      font-size: 12px;
      letter-spacing: 0px;
      color: #FFFFFF;
      font-weight: 500;
    }
  }
}
</style>
