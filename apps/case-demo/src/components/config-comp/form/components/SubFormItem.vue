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

import FieldSelect from '../../fields/components/FieldSelect.vue'

interface ISubFormItemProps extends IFormItem{
  /** 表单数据 */
  formData: Record<string, any>;
  /* 是否可用 */
  disabled: boolean;
}

const props = defineProps<ISubFormItemProps>();

// 动态组件逻辑
const dynamicComponent = (type)=>{
  if(type === 'FieldSelect'){
    return FieldSelect
  }
  return type
}
</script>

<style lang='scss' scoped>

</style>
