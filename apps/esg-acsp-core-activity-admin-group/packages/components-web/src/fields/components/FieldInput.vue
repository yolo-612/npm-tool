<script lang="ts" setup>
import type { ICustomComponent } from '../types';
import CustomSlot from './CustomSlot.vue';

type TInputSlotType = 'suffix' | 'prefix';

export interface IFieldInputProps {
  slots?: {
    /* 前后缀的组件或样式 */
    [key in TInputSlotType]: string | ICustomComponent;
  };
}

defineProps<IFieldInputProps>();

defineOptions({
  name: 'FieldInput',
  inheritAttrs: false,
});

</script>

<template>
  <el-input :placeholder="$attrs.disabled ? '-' : '请输入'" v-bind="$attrs">
    <!-- 渲染插槽 -->
    <template v-for="(slot, slotName) in slots || {}" #[slotName]>
      <CustomSlot :key="slotName" :content="slot" />
    </template>
  </el-input>
</template>
