<script lang="ts" setup>
import { debounce } from 'lodash-es';
import { fetchTreeData, fetchSearchData, RANGE_MAP } from './config';
import type { ICheckParam, IRangeItem } from './config';

const props = defineProps({
  /** 当前数据 */
  modelValue: {
    type: Array as PropType<IRangeItem[]>,
    default: () => [],
  },
  /** 提示语 */
  placeholder: {
    type: String,
    default: '请选择地区',
  },
  /** 多选限制 */
  multipleLimit: {
    type: Number,
    default: 2,
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['change', 'ready']);

/** el组件双向绑定的范围 */
const range = ref<string[]>([]);

/** 处理后的范围数据 */
const current = ref<IRangeItem[]>([]);

/** 当前的最大范围 */
const largest = ref<IRangeItem[]>([]);

/** 远程搜索 */
const search = reactive<any>({
  input: '',
  res: [],
  loading: false,
});

/** Ref */
const treeSelectRef = ref();
const treeProps = {
  isLeaf: ({ type }: IRangeItem) => (search.input ? true : type >= RANGE_MAP.station),
};
  /** 需要展示的节点 */
const displayNodes = computed(() => {
  return (current.value || []).slice(0, props.multipleLimit || 2);
});
  /** 需要展示+的数量 */
const displayNum = computed(() => (current.value?.length || 0) - props.multipleLimit);

/** 点击选中范围 */
const onTreeCheck = (target: IRangeItem, { checkedKeys, checkedNodes }: Required<ICheckParam>) => {
  const isChecked = checkedKeys.includes(target.value);
  /** 处理搜索选中的逻辑 只能单选 清空之前的数据 合并选中节点 */
  if (search.input && isChecked) {
    formatCheck({ checkedNodes: [target] });
    return;
  }
  /** 处理懒加载的选中 */
  formatCheck({ checkedKeys, checkedNodes });
};

/** 格式化选中范围：父节点全选时只需要父节点 */
const formatCheck = ({ checkedNodes, checkedKeys }: ICheckParam, trigger = true) => {
  const skipCalc = !checkedKeys?.length;
  const applyCheckedNodes = skipCalc
    ? checkedNodes
    : checkedNodes.filter((item) => {
      return !item.pValue || !checkedKeys!.includes(item.pValue);
    });
  current.value = applyCheckedNodes;
  range.value = applyCheckedNodes.map(({ value }) => value);
  if (trigger) {
    treeSelectRef.value?.setCheckedNodes(applyCheckedNodes);
    emits('change', { current: current.value, largest: largest.value });
  }
};

/** 点击删除Tag */
const onCloseTag = (nodeKey?: string) => {
  /** 清空 */
  if (!nodeKey) return formatCheck({ checkedNodes: [] });
  /** 删除 */
  const checkedNodes = current.value.filter((item) => item.value !== nodeKey);
  formatCheck({ checkedNodes });
};

/* 懒加载树的数据 */
const onLoadTreeData = async (node: any, resolve: any) => {
  if (search.input) return resolve([]);
  const loadRes = await fetchTreeData(node.data);
  resolve(loadRes);
  const { value: parentCode } = node.data;
  /** 初次拉取数据 */
  if (!parentCode && loadRes?.length) {
    largest.value = loadRes;
    current.value = [loadRes[0]];
    emits('ready', { current: current.value, largest: largest.value });
    formatCheck({ checkedNodes: current.value });
  }
};

/** 点击远程筛选 */
const searchData = debounce(async (input: string) => {
  search.loading = true;
  search.res = await fetchSearchData(input);
  search.loading = false;
  formatCheck({ checkedNodes: current.value });
}, 400);
const onTreeRemote = (input: string) => {
  search.input = input;
  search.loading = true;
  if (!input) {
    search.loading = false;
    return;
  }
  searchData(input);
};

const onVisibleChange = () => {
  formatCheck({ checkedNodes: current.value });
};

watch(
  () => props.modelValue,
  (val) => {
    formatCheck({ checkedNodes: val });
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div>
    <el-tree-select
      ref="treeSelectRef"
      v-model="range"
      :data="search.input ? search.res : largest"
      :placeholder="props.placeholder"
      :props="treeProps"
      node-key="value"
      show-checkbox
      multiple
      lazy
      checkOnClickNode
      collapseTags
      filterable
      remote
      clearable
      :remote-method="onTreeRemote"
      :loading="search.loading"
      loading-text="搜索中..."
      :disabled="props.disabled"
      :filter-node-method="() => true"
      :max-collapse-tags="props.multipleLimit"
      :load="onLoadTreeData"
      @check="onTreeCheck"
      @remove-tag="onCloseTag"
      @clear="onCloseTag"
      @visible-change="onVisibleChange"
    >
      <template #tag>
        <el-tag
          v-for="node in displayNodes"
          :key="node.value"
          closable
          class="el-tag--info ext-tag--text"
          @close="onCloseTag(node.value)"
        >
          {{ node.label }}
        </el-tag>
        <span v-if="displayNum > 0" class="el-tag el-tag--info ext-tag--text">+{{ displayNum }}</span>
      </template>
    </el-tree-select>
  </div>
</template>

<style lang="scss" scoped>
  .ext-tag--text {
    color: #333;
  }
</style>
