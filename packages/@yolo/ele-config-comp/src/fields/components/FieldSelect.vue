<template>
  <!-- 
    核心概念：属性透传 (Attribute Fallthrough)
    ** Vue 在组件渲染时，会自动把所有不在 props 中定义的属性，挂载到最外层根元素上； **
    所以：<el-select v-bind="$attrs"> 即使不这样写，
    外面调用组件时传入的属性也会挂在到el-select标签上去

    验证：去掉v-bind="$attrs" 最外层用div包裹，立马失效
  -->
  <ElSelect v-bind="$attrs">
    <el-option
      v-for="item in props.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    />
  </ElSelect>  
</template>

<script setup lang='ts'>
import type { ISelectOption } from '@/fields/types';

export interface IFieldSelectProps {
  options?: ISelectOption[];
}

const props = defineProps<IFieldSelectProps>();
</script>

<style lang='scss' scoped>

</style>
