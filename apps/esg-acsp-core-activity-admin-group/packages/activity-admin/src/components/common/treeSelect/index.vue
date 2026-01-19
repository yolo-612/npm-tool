<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ElMessage, ElTreeSelect } from 'element-plus';
import type { Ref, ComputedRef } from 'vue';
import type { ITreeSelectData } from './types';

// 定义 props，使用 value 和 onChange
const props = withDefaults(
  defineProps<{
      treeData?: ITreeSelectData[];
      value: string[];
      onChange?:(values: string[]) => void;
      placeHolder?: string;
      disabled?: boolean;
      multipleLimit?: number;
      multipleLimitText?: string;
    }>(),
  {
    treeData: () => [],
    placeHolder: '请输入',
  },
);

// 定义 selectedValues，用于绑定 ElTreeSelect
const selectedValues: Ref<string[]> = ref([]);

// 定义一个标志位，区分更新的来源
let isInternalChange = false;

// 监听 props.treeData 和 props.value 的变化
watch(
  [() => props.treeData, () => props.value],
  ([newTreeData, newValue]) => {
    if (!isInternalChange) {
      selectedValues.value = expandValues(newTreeData, newValue);
    }
  },
  { immediate: true, deep: true },
);

// 计算需要展示的节点，用于 #tag 插槽
const displayNodes: ComputedRef<ITreeSelectData[]> = computed(() => {
  return getDisplayNodes(props.treeData!, selectedValues.value);
});

// 计算需要提交的数据，即 submitSelectedValues
const submitSelectedValues = computed(() => {
  return displayNodes.value.map((node) => node.value);
});

// 当 selectedValues 变化时，触发 onChange 事件
watch(
  selectedValues,
  () => {
    if (isInternalChange) {
      isInternalChange = false;
      if (typeof props.onChange === 'function') {
        props.onChange(submitSelectedValues.value);
      }
    }
  },
  { deep: true },
);

// 当用户在组件中进行选择时，设置 isInternalChange 为 true
const handleSelectChange = (values: string[]) => {
  isInternalChange = true;
  if (props.multipleLimit && values.length > props.multipleLimit) {
    ElMessage.warning(props.multipleLimitText || `最多只能选择 ${props.multipleLimit} 个节点`);
    return;
  }
  selectedValues.value = values;
};

// 定义函数，将 value 扩展为 selectedValues
function expandValues(treeData: ITreeSelectData[], values: string[]): string[] {
  let result: string[] = [];

  function findNodeAndExpand(node: ITreeSelectData) {
    if (values.includes(node.value)) {
      collectLeafValues(node, result);
    } else if (node.children && node.children.length > 0) {
      node.children.forEach((child) => findNodeAndExpand(child));
    }
  }

  function collectLeafValues(node: ITreeSelectData, result: string[]) {
    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => collectLeafValues(child, result));
    } else {
      result.push(node.value);
    }
  }

  treeData.forEach((node) => findNodeAndExpand(node));

  return result;
}

// 定义 processNode 函数
function processNode(
  node: ITreeSelectData,
  selectedValues: string[],
  resultNodes: ITreeSelectData[],
  nodesToRemove: ITreeSelectData[],
): boolean {
  if (selectedValues.includes(node.value)) {
    resultNodes.push(node);
    return true;
  }

  if (node.children && node.children.length > 0) {
    let allChildrenSelected = true;
    node.children.forEach((child) => {
      let childSelected = processNode(child, selectedValues, resultNodes, nodesToRemove);
      if (!childSelected) {
        allChildrenSelected = false;
      }
    });
    if (allChildrenSelected) {
      resultNodes.push(node);
      nodesToRemove.push(...node.children);
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

// 定义 getDisplayNodes 函数
function getDisplayNodes(treeData: ITreeSelectData[], selectedValues: string[]): ITreeSelectData[] {
  let resultNodes: ITreeSelectData[] = [];
  let nodesToRemove: ITreeSelectData[] = [];

  treeData.forEach((node) => {
    processNode(node, selectedValues, resultNodes, nodesToRemove);
  });

  resultNodes = resultNodes.filter((node) => !nodesToRemove.some((n) => n.value === node.value));

  return resultNodes;
}
</script>

<template>
  <el-tree-select
    :model-value="selectedValues"
    :data="props.treeData"
    show-checkbox
    :check-strictly="false"
    multiple
    :multiple-limit="multipleLimit"
    filterable
    :placeholder="props.placeHolder"
    :disabled="props.disabled"
    @update:model-value="handleSelectChange"
  >
    <template #tag>
      <span v-for="node in displayNodes" :key="node.value" class="el-tag el-tag--info el-tag--small">
        {{ node.label }}
      </span>
    </template>
  </el-tree-select>
</template>

<style scoped>
  .el-tag {
    margin-right: 4px;
  }
</style>
