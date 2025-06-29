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

import FieldSelect from '@/components/config-comp/fields/components/FieldSelect.vue'
import FieldInput from '@/components/config-comp/fields/components/FieldInput.vue'
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
  if(type === FormItemType.Select){
    return FieldSelect
  }
  if(type === FormItemType.Input){
    return FieldInput
  }
  return type
}

defineOptions({
  name: 'SubFormItem',
});
</script>

<style lang='scss' scoped>

</style>
