<script lang="ts" setup>
import type { IFormItem } from '@/src/form';
import { FormItemType } from '@/src/form';
import Fields from './formFields';
import { recompute } from '@/utils';

interface ISubFormItemProps extends IFormItem {
  /** 表单数据 */
  formData: Record<string, any>;
  /* 是否可用 */
  disabled: boolean;
}

const props = defineProps<ISubFormItemProps>();

const renderType = computed(() => props.renderType || props.type);

defineOptions({
  name: 'SubFormItem',
  inheritAttrs: false,
});
</script>

<template>
  <el-form-item
    :label="props.label || ''"
    :prop="props.name"
    :rules="recompute(props.rules || props.elFormItemProps?.rules)"
    :class="`form-item-${props.name}`"
    v-bind="props.elFormItemProps">
    <!-- 自定义了label插槽 -->
    <template v-if="props.customLabel" #label>
      <Fields.CustomSlot :content="props.customLabel" />
    </template>
    <!-- 自定义表单域 -->
    <Fields.CustomSlot
      v-if="renderType === FormItemType.Custom"
      :content="props.customComponent! || props.render!"
      :disabled="disabled ?? false"
    />
    <!-- 内置组件 -->
    <component
      :is="Fields['Field' + renderType]"
      v-else
      v-model="formData[props.name]"
      :disabled="disabled ?? false"
      v-bind="props.fieldProps" />
  </el-form-item>
</template>
