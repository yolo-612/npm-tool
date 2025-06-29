<template>
  <ElInput v-bind="$attrs">
    <template v-for="(slot, slotName) in props.slots" #[slotName]>
      <CustomSlot :content="slot" :key="slotName"/>
    </template>
  </ElInput>
</template>

<script setup lang='ts'>
import type { ICustomComponent } from '@/components/config-comp/fields/types'
import CustomSlot from '@/components/config-comp/fields/components/CustomSlot.vue'

type TInputSlotType = 'suffix' | 'prefix' | 'prepend' | 'append';

export interface IFieldInputProps {
  slots?: {
    /* 前后缀的组件或样式 */
    [key in TInputSlotType]: string | ICustomComponent;
  };
}

const props = defineProps<IFieldInputProps>();

</script>

<style lang='scss' scoped>

</style>
