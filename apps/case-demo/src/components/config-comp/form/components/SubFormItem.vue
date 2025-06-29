<!-- 
  disabled 是希望可以批量disabled的效果， 
  用props.fieldProps 需要对每一项进行配置disabled
-->
<template>
  <el-form-item
    :label="props.label" 
    :rules="props.rules"
    :prop="props.name"
  >
    <!-- 自定义了label插槽 -->
    <template v-if="props.customLabel" #label>
      <CustomSlot :content="props.customLabel" />
    </template>
    <!-- 自定义表单域 -->
    <CustomSlot
      v-if="renderType === FormItemType.Custom"
      :content="props.customComponent! || props.render!"
      :disabled="props.disabled ?? false"
    />
    <!-- 内置组件 -->
    <component 
      v-else
      :is="dynamicComponent(renderType)"
      v-bind="props.fieldProps"
      v-model="formData[props.name]"
      :disabled="props.disabled ?? false"
    ></component>
  </el-form-item>
</template>

<script setup lang='ts'>
import type { IFormItem } from '@/components/config-comp/form/types'
import { FormItemType } from '@/components/config-comp/form/types'

import FieldCascader from '@/components/config-comp/fields/components/FieldCascader.vue'
import FieldCheckbox from '@/components/config-comp/fields/components/FieldCheckbox.vue'
import FieldDatePicker from '@/components/config-comp/fields/components/FieldDatePicker.vue'
import FieldInput from '@/components/config-comp/fields/components/FieldInput.vue'
import FieldInputNumber from '@/components/config-comp/fields/components/FieldInputNumber.vue'
import FieldInputNumberRange from '@/components/config-comp/fields/components/FieldInputNumberRange.vue'
import FieldLabel from '@/components/config-comp/fields/components/FieldLabel.vue'
import FieldLink from '@/components/config-comp/fields/components/FieldLink.vue'
import FieldSelect from '@/components/config-comp/fields/components/FieldSelect.vue'
import CustomSlot from '@/components/config-comp/fields/components/CustomSlot.vue'

interface ISubFormItemProps extends IFormItem{
  /** 表单数据 */
  formData: Record<string, any>;
  /* 是否可用 */
  disabled?: boolean;
}

const props = defineProps<ISubFormItemProps>();

const renderType = computed<FormItemType>(() => props.renderType || props.type);

// 动态组件逻辑
const dynamicComponent = (type: FormItemType)=>{
  if(type === FormItemType.Cascader){
    return FieldCascader
  }
  if(type === FormItemType.Checkbox){
    return FieldCheckbox
  }
  if(type === FormItemType.DatePicker){
    return FieldDatePicker
  }
  if(type === FormItemType.Input){
    return FieldInput
  }
  if(type === FormItemType.InputNumber){
    return FieldInputNumber
  }
  if(type === FormItemType.InputNumberRange){
    return FieldInputNumberRange
  }
  if(type === FormItemType.Label){
    return FieldLabel
  }
  if(type === FormItemType.Link){
    return FieldLink
  }
  if(type === FormItemType.Select){
    return FieldSelect
  }
  return type
}

defineOptions({
  name: 'SubFormItem',
});
</script>

<style lang='scss' scoped>

</style>
