<script setup lang="ts">
import type { IActivityCollectionType } from '@/apis/methods/activity/business/types';
import OptionList from './OptionList.vue';

const props = defineProps({
  /** 是否禁用 */
  isDisabled: {
    type: Boolean,
    default: false,
  },
  /** 收集项列表 */
  collectionList: {
    type: Array as PropType<IActivityCollectionType[]>,
    default: [],
  },
  /** 回调方法 */
  handleChangeOptions: {
    type: Function,
    default: () => {},
  },
});

/** 切换checkbox */
const handleChange = (key: string, checked: boolean) => {
  props.handleChangeOptions(key, checked);
};

// 收集项列表-必选
const requireList = ref<IActivityCollectionType[]>([]);
// 收集项列表-可选
const optionList = ref<IActivityCollectionType[]>([]);

watch(
  () => props.collectionList,
  (list) => {
    requireList.value = list.filter((item) => item.isOptional === 0);
    optionList.value = list.filter((item) => item.isOptional === 1);
  },
  {
    immediate: true,
    deep: true,
  },
);

</script>

<template>
  <div class="collection">
    <span>活动必要收集项</span>
    <OptionList
      is-required
      :is-disabled="isDisabled"
      :collection-list="requireList"
    />
    <span>活动选择收集项，可自行选择收集</span>
    <OptionList
      :is-required="false"
      :is-disabled="isDisabled"
      :collection-list="optionList"
      @handle-change="handleChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.collection {
  width: 100%;
  span {
    display: inline-block;
    margin-top: 15px;
    margin-bottom: 10px;
  }
}
</style>
