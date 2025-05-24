<script lang="ts" setup>
import SvgIcon from '@/src/svg-icon';

export interface IIntroButtonProps {
  /** 标题 */
  type: 'tooltip';
  /** 图标大小 */
  size?: number;
  /** drawer大小 */
  maxWidth?: string | number;
}
withDefaults(defineProps<IIntroButtonProps>(), {
  type: 'tooltip',
  size: 18,
});
defineOptions({
  name: 'IntroButton',
  inheritAttrs: false,
});

</script>

<template>
  <div class="intro-button">
    <el-tooltip popper-class="yolo-tooltip-popper" placement="top" v-bind="$attrs">
      <SvgIcon icon-name="info_exclamation_mark" :size="size" class="icon-btn" />
    </el-tooltip>
  </div>
</template>
<style lang="scss" scoped>
.intro-button {
  display: inline-block;
  padding: 0;
  .icon-btn {
    cursor: pointer;
    color: #999;
    &:hover {
      color: #1f6cff;
    }
  }
}
.icon-btn {
  color: #999;
  &:hover {
    color: #1f6cff;
  }
}
</style>
