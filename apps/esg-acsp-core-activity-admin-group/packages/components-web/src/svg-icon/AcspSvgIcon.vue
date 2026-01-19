<script lang="ts" setup>

export interface SvgIcon {
  /* icon名字 文件名 */
  iconName: string;
  /* 尺寸 */
  size?: number;
  /* 颜色 */
  color?: string;
}

const props = defineProps<SvgIcon>();

const style = computed(() => {
  const { size, color } = props;
  const size_ = props.size && { width: size + 'px', height: size + 'px' };
  const color_ = props.color && { color: color, fill: color };
  return { ...size_, ...color_ };
});

</script>

<template>
  <svg
    class="acsp-svg-icon"
    aria-hidden="true"
    :style="style"
  >
    <use :xlink:href="`#componentsWeb-icon-${iconName}`" />
  </svg>
</template>
<style lang="scss">
.acsp-svg-icon {
  position: relative;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    cursor: pointer;
    z-index: 1;
  }
}
</style>
