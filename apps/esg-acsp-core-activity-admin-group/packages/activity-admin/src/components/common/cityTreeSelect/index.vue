<script setup lang="ts">
import { ElTreeSelect } from 'element-plus';

const props = defineProps({
  /** 城市数据 */
  data: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  /** 选中数据:单选时为string， 多选时为string[] */
  value: {
    type: Array as PropType<string | string[]>,
    default: () => [],
  },
  /** 是否多选 */
  isMultiple: {
    type: Boolean,
    default: true,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['change']);

/** 城市选择树形下拉框 ref */
const areaTreeSelectRef = ref();

  interface IAreaTreeData {
    label: string;
    value: string;
    key: string;
    parentId: string | null;
    children: IAreaTreeData[];
    disabled?: boolean;
  }

/** 扁平化数据 */
const flatData = ref<IAreaTreeData[]>([]);

/* 选中数据 */
const selectedData = ref<string | string[]>();

/** 将所有节点扁平化处理，便于查询 */
const getAllNodes = (nodes: any[]): any[] => {
  const result: any[] = [];
  nodes.forEach((node) => {
    result.push(node);
    if (node.children) {
      // 递归调用获取子节点下的所有节点
      const childNodes = getAllNodes(node.children);
      result.push(...childNodes);
    }
  });
  return result;
};

/** 多选处理 */
const onMultipleChecked = (node: IAreaTreeData) => {
  const parentNode = flatData.value.find((n) => n.value === node.parentId);
  let multiResult = [...props.value];

  // 节点是否选中
  const isNodeSelected = multiResult.includes(node.value);
  // 父节点是否选中
  const isParentSelected = parentNode && multiResult.includes(parentNode.value);

  if (isNodeSelected) {
    // 操作节点已在选中列表中 - 取消选中
    multiResult = multiResult.filter((item) => item !== node.value);
  } else if (isParentSelected) {
    // 操作节点不在选中列表中，但父节点在选中列表中 - 取消父节点，添加操作节点外的其他子节点
    multiResult = multiResult.filter((item) => item !== parentNode.value);
    parentNode.children.forEach((item) => {
      if (item.value !== node.value) {
        multiResult.push(item.value);
      }
    });
  } else if (parentNode && parentNode.children.length === 1) {
    // 选中 - 选择直辖市节点时，需保存其省级code
    multiResult.push(parentNode.value);
  } else {
    multiResult.push(node.value);
  }
  return multiResult;
};

/** 节点选中处理 */
const onChecked = (node: any) => {
  let result = [];
  if (props.isMultiple) {
    result = onMultipleChecked(node);
  } else {
    result = [selectedData.value];
  }
  emits('change', result);
};

/** 移除节点处理 */
const onRemove = (value: string) => {
  const currentNode = flatData.value.find((n) => n.value === value);
  onChecked(currentNode);
};

watch(
  () => props.value,
  (val) => {
    if (!val || !val.length) return;
    selectedData.value = val;
  },
  { immediate: true, deep: true },
);

watch(
  () => props.data,
  (val) => {
    if (!val || !val.length) return;
    flatData.value = getAllNodes(val);
  },
  { immediate: true, deep: true },
);
</script>
<template>
  <el-tree-select
    ref="areaTreeSelectRef"
    v-model="selectedData"
    :data="data"
    node-key="value"
    show-checkbox
    :disabled="disabled"
    :multiple="isMultiple"
    filterable
    placeholder="请选择"
    @check="onChecked"
    @remove-tag="onRemove"
  />
</template>

<style lang="scss" scoped>
  :deep(.el-select__selection) {
    max-height: 200px;
    overflow-y: auto;
  }
</style>
