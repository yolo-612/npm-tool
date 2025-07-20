<script lang="ts" setup>
import type { StyleValue } from 'vue';
import { isEmptyValue, numberWithCommas } from '@/utils';

export interface IFieldLabelProps {
  /** 前缀 */
  prefix?: string;
  /** 值 */
  modelValue: string | number;
  /** 占位符 */
  placeholder?: string;
  /** 占位符样式 */
  placeholderStyle?: StyleValue;
  /** 是否显示多行 默认false */
  multiLine?: boolean;
  /** 是否显示前卫分隔符 */
  thousandsSeparator?: boolean;
}

const props = withDefaults(defineProps<IFieldLabelProps>(), {
  modelValue: '',
  placeholder: '-',
});

defineOptions({
  name: 'FieldLabel',
  inheritAttrs: false,
});

const _modelValue = computed<string | number>(() => {
  if (props.thousandsSeparator) {
    return numberWithCommas(props.modelValue);
  } else {
    return props.modelValue;
  }
});
</script>

<template>
  <div :class="['form-label', { 'multi-line': multiLine }]">
    <label v-if="prefix" class="form-label-prefix">{{ prefix }}</label>
    <template v-if="multiLine">
      <label
        v-if="!isEmptyValue(_modelValue)"
        v-bind="$attrs"
        v-html="typeof _modelValue === 'string' ? _modelValue.replace(/\n/g, '<br />') : _modelValue">
      </label>
      <label v-else-if="placeholder" class="placeholder" :style="placeholderStyle">
        {{ placeholder }}
      </label>
    </template>
    <template v-else>
      <label v-if="!isEmptyValue(_modelValue)" v-bind="$attrs">
        {{ _modelValue }}
      </label>
      <label v-else-if="placeholder" class="placeholder" :style="placeholderStyle">
        {{ placeholder }}
      </label>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.form-label {
  min-height: 20px;
  line-height: 20px;
  display: flex;
  align-items: center;
  height: 20px;

  label {
    color: #333;
    font-size: 14px;
  }
  .form-label-prefix {
    margin-right: 5px;
  }
  &.multi-line {
    height: auto;
    :deep(label) {
      white-space: normal;
      word-break: break-all;
    }
  }
}
</style>
