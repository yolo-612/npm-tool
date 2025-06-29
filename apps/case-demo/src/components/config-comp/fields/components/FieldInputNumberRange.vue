<script lang="ts" setup>
import type { ICustomComponent } from '@/components/config-comp/fields/types'
import CustomSlot from '@/components/config-comp/fields/components/CustomSlot.vue'


type TInputNumberRangeItem = number | null | undefined;

export interface IInputRangeNumberRange {
  modelValue: TInputNumberRangeItem[];
  disabled: boolean;
  to: string;
  placeholder: string[];
  prefix?: string | ICustomComponent;
  suffix?: string | ICustomComponent;
  tips?: string;
}

const props = withDefaults(defineProps<IInputRangeNumberRange>(), {
  modelValue: () => [],
  disabled: false,
  to: '至',
  placeholder: () => ['最小值', '最大值'],
});

const emit = defineEmits(['update:modelValue', 'change']);

const range = ref(props.modelValue || []);

// 更新数据
const updateValue = (list: TInputNumberRangeItem[]) => {
  emit('update:modelValue', list);
  emit('change', list);
};

// input焦点事件
const isFocus = ref();

const handleFocus = () => {
  isFocus.value = true;
};

const handleBlur = () => {
  isFocus.value = false;
};

/* 数字是否为空 */
const isEmpty = (value: TInputNumberRangeItem) => {
  return !value && value !== 0;
};

/* 处理变动 */
const handleChange = () => {
  let [min, max] = range.value;
  /* 调整数据大小位置 */
  if (!isEmpty(min) && !isEmpty(max) && (min as number) > (max as number)) {
    [min, max] = [max, min];
  }
  const isAllEmpty = isEmpty(min) && isEmpty(max);

  updateValue(isAllEmpty ? [] : [min, max]);
};

const attrs = useAttrs();

watch(
  () => props.modelValue,
  (val) => {
    range.value = val || [];
  },
  { deep: true },
);
</script>
<template>
  <div>
    <div
      :class="{
        'input-number-range': true,
        'is-disabled': disabled,
        'is-focus': isFocus,
      }">
      <div v-if="props.prefix" class="slot-default slot-prefix">
        <CustomSlot :content="props.prefix" />
      </div>
      <el-input-number
        v-model="(range[0] as number)"
        :disabled="disabled"
        :placeholder="placeholder[0]"
        :controls="false"
        v-bind="attrs"
        @blur="handleBlur"
        @focus="handleFocus"
        @change="handleChange" />
      <div class="to">
        <span>{{ to }}</span>
      </div>
      <el-input-number
        v-model="(range[1] as number)"
        :disabled="disabled"
        :placeholder="placeholder[1]"
        :controls="false"
        v-bind="attrs"
        @blur="handleBlur"
        @focus="handleFocus"
        @change="handleChange" />
      <div v-if="props.suffix" class="slot-default slot-suffix">
        <CustomSlot :content="props.suffix" />
      </div>
    </div>
    <div v-if="props.tips" class="tips">
      {{ props.tips }}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.input-number-range {
  background-color: var(--el-bg-color);
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  padding: 0 2px;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  color: var(--el-input-text-color, var(--el-text-color-regular));
  transition: var(--el-transition-box-shadow);
  transform: translate3d(0, 0, 0);
  overflow: hidden;
}
.is-focus {
  transition: all 0.3s;
  box-shadow: 0 0 0 1px var(--el-color-primary) inset !important;
}
.is-disabled {
  background-color: var(--el-input-bg-color);
  color: var(--el-input-text-color, var(--el-text-color-regular));
  box-shadow: none;
  cursor: not-allowed;
  .to {
    background-color: var(--el-fill-color-light) !important;
    color: var(--el-color-info);
  }
  .slot-default {
    margin: 0;
  }
}
.slot-default {
  align-self: stretch;
  margin: 1px 0;
  padding: 0 15px;
  display: flex;
  align-items: center;
  background-color: var(--el-fill-color-light);
  white-space: nowrap;
  color: var(--el-color-info);
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
}
.slot-prefix {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.slot-suffix {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.to {
  padding: 0 2px;
}
.tips {
  font-size: smaller;
  color: var(--el-color-info);
  line-height: 1.8;
}
:deep(.el-input-number) {
  flex: 1;
}
:deep(.el-input) {
  border: none;
}
:deep(.el-input__wrapper) {
  margin: 0;
  padding: 0 15px;
  background-color: transparent;
  border: none !important;
  box-shadow: none !important;
  &.is-focus {
    border: none !important;
    box-shadow: none !important;
  }
}
</style>
