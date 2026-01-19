<script lang="ts" setup>
import noDataPng from '@/assets/images/no-data-question-mark.png';

export interface AcspEmpty {
  /** 描述 */
  desc?: string
  /** 子描述 */
  subDesc?: string
  /** 子描述 */
  src?: string
}
const props = withDefaults(defineProps<AcspEmpty>(), {
  desc: '暂无数据',
  src: noDataPng,
});
defineOptions({
  name: 'AcspEmpty',
});
</script>

<template>
  <div class="sasp-empty">
    <img :src="src" alt="暂无数据" />
    <div class="sasp-empty-desc">{{ desc }}</div>
    <div v-if="subDesc" class="sasp-empty-subdesc">{{ subDesc }}</div>
  </div>
</template>
<style lang="scss" scoped>
.sasp-empty {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 147px;
    height: 128px;
  }
  .sasp-empty-desc {
    color: #333;
    font-size: 13px;
    line-height: 13px;
  }
  .sasp-empty-subdesc {
    color: #999;
    font-size: 10px;
    line-height: 10px;
    margin-top: 12px;
  }
}
</style>
