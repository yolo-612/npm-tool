<template>
  <el-form-item
    :label="props.label" 
    :rules="props.rules"
    :prop="props.name"
  >
    <component 
      :is="dynamicComponent(props.type)"
      v-bind="props.fieldProps"
      v-model="formData[props.name]"
    ></component>
  </el-form-item>
</template>

<script setup lang='ts'>
import type { IFormItem } from '@/components/config-comp/form/types'
import { FormItemType } from '@/components/config-comp/form/types'

import FieldSelect from '@/components/config-comp/fields/components/FieldSelect.vue'
import FieldInput from '@/components/config-comp/fields/components/FieldInput.vue'

interface ISubFormItemProps extends IFormItem{
  /** 表单数据 */
  formData: Record<string, any>;
  /* 是否可用 */
  disabled: boolean;
}

const props = defineProps<ISubFormItemProps>();

// 动态组件逻辑
const dynamicComponent = (type)=>{
  if(type === FormItemType.Select){
    return FieldSelect
  }
  if(type === FormItemType.Input){
    return FieldInput
  }
  return type
}
</script>

<style lang='scss' scoped>

</style>
