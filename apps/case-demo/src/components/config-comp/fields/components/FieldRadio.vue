<script lang="ts" setup>
import { ElRadio, ElRadioGroup } from 'element-plus';
import { isBoolean, isPromise } from 'element-plus/es/utils/types';

type RadioValueType = string | number | boolean | undefined;

export interface IFieldRadioProps {
  options: any,
  /** 是否能取消选择 */
  cancelable?: boolean;
  /** change事件之前调用 */
  beforeChange?: (val: RadioValueType) => Promise<boolean | boolean>;
}

const props = defineProps<IFieldRadioProps>();

const emit = defineEmits(['update:modelValue', 'change']);

defineOptions({
  name: 'FieldRadio',
  inheritAttrs: false,
});

const attrs = useAttrs();

/**
 * Radio点击事件
 */
const onClick = (val: RadioValueType) => {
  if (attrs.disabled) {
    return;
  }
  const isSameVal = val === attrs.modelValue;
  /* 值一样且不需要取消 则不用响应 值不一样或者需要取消则响应 */
  if (!props.cancelable && isSameVal) return;
  const current = props.cancelable && isSameVal ? undefined : val;
  onUpdateModelValue(current);
};

/**
 * el-radio触发update:modelValue方法
 */
const onUpdateModelValue = (val: RadioValueType) => {
  const { beforeChange } = props;
  if (!beforeChange) {
    handleChange(val);
    return;
  }
  const shouldChange = beforeChange(val);
  // 判断值是不是boolean或者Promise类型
  if (!isBoolean(shouldChange) && !isPromise(shouldChange)) {
    throw new Error('beforeChange must retur type `Promise<boolean>` or `boolean`');
  }
  if (isPromise(shouldChange)) {
    shouldChange
      .then((res) => {
        res && handleChange(val);
      })
      .catch(() => {});
  } else {
    shouldChange && handleChange(val);
  }
};

/**
 * 改变值
 */
const handleChange = (val: RadioValueType) => {
  emit('update:modelValue', val);
  emit('change', val);
};
</script>

<template>
  <el-radio-group v-bind="$attrs">
    <el-radio
      v-for="item in props.options"
      :key="item.label"
      v-bind="item"
      :label="item.value"
      @click.prevent="onClick(item.value)">
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>
<style lang="scss" scoped>
.ext-form-radio {
  :deep(.el-radio-group) {
    height: 40px;

    .el-radio__input.is-checked .el-radio__inner {
      border-color: #4360e6;
      background: #4360e6;
      transform: scale(0.8);
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: #000;
      font-size: 14px;
      font-weight: normal;
    }
    .el-radio__inner::after {
      width: 20px;
      height: 20px;
      border: 1px solid #4360e6;
      background-color: transparent !important;
      transition:
        transform 0.02s ease-in,
        -webkit-transform 0.02s ease-in;
    }
  }
}
</style>
