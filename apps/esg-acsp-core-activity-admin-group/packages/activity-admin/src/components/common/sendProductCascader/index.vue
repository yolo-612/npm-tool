<script setup lang="ts">
import { ElCascader, ElMessage, type CascaderValue } from 'element-plus';

const props = defineProps({
  treeData: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  value: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: true,
  },
  multipleLimit: {
    type: Number,
    default: 0,
  },
  disabledEquity: {
    type: Boolean,
    default: false,
  },
  onChange: {
    type: Function,
    default: () => {},
  },
});

const emits = defineEmits(['onChange']);

defineOptions({
  // 避免 disabled 被继承
  inheritAttrs: false,
});

const cascaderProps = computed(() => {
  return {
    multiple: props.multiple,
  };
});

/* 选中项 */
const selectedValues = ref(props.value);

watch(
  () => props.value,
  (val) => {
    selectedValues.value = val;
  },
  { immediate: true, deep: true },
);

const cascaderRef = ref();

/** 监听选中数量，超过限制数量后限制选中 */
watch(
  () => selectedValues.value,
  (newValue, oldValue) => {
    if (props.multipleLimit && newValue.length > props.multipleLimit) {
      Array.isArray(newValue[0]) && ElMessage.warning(`最多只能选择 ${props.multipleLimit} 种寄件产品`);
      nextTick(() => {
        selectedValues.value = oldValue || [];
        cascaderRef.value?.cascaderPanelRef.value?.setCheckedValue(oldValue);
      });
    }
  },
  {
    immediate: true,
    deep: true,
  },
);
const changeValue = (value: CascaderValue) => props.onChange(value);

</script>
<template>
  <el-cascader
    ref="cascaderRef"
    v-model="selectedValues"
    :props="cascaderProps"
    :placeholder="`最多选择${multipleLimit}种寄件产品`"
    :options="treeData"
    :show-all-levels="false"
    :disabled="disabledEquity"
    filterable
    clearable
    @change="changeValue"
  >
  </el-cascader>
</template>

<style lang="scss" scoped></style>
