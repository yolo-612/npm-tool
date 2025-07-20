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
import type { IFormItem } from '@/form/types'
import { FormItemType } from '@/form/types'

import { computed } from 'vue'

import FieldCascader from '@/fields/components/FieldCascader.vue'
import FieldCheckbox from '@/fields/components/FieldCheckbox.vue'
import FieldDatePicker from '@/fields/components/FieldDatePicker.vue'
import FieldInput from '@/fields/components/FieldInput.vue'
import FieldInputNumber from '@/fields/components/FieldInputNumber.vue'
import FieldInputNumberRange from '@/fields/components/FieldInputNumberRange.vue'
import FieldLabel from '@/fields/components/FieldLabel.vue'
import FieldLink from '@/fields/components/FieldLink.vue'
import FieldRadio from '@/fields/components/FieldRadio.vue'
import FieldSelect from '@/fields/components/FieldSelect.vue'
import FieldSwitch from '@/fields/components/FieldSwitch.vue'
import FieldTimePicker from '@/fields/components/FieldTimePicker.vue'
import FieldTreeSelect from '@/fields/components/FieldTreeSelect.vue'
import CustomSlot from '@/fields/components/CustomSlot.vue'

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
  if(type === FormItemType.Radio) {
    return FieldRadio
  }
  if(type === FormItemType.Select){
    return FieldSelect
  }
  if(type === FormItemType.Switch){
    return FieldSwitch
  }
  if(type === FormItemType.TimePicker){
    return FieldTimePicker
  }
  if(type === FormItemType.TreeSelect){
    return FieldTreeSelect
  }
  return type
}

defineOptions({
  name: 'SubFormItem',
});
</script>

<style lang='scss' scoped>

</style>
