<script setup lang="ts">
import type { IActivityCollectionType } from '@/apis/methods/activity/business/types';

const props = defineProps({
  /** 是否必选 */
  isRequired: {
    type: Boolean,
    default: false,
  },
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
});

/** 回调 */
const emits = defineEmits(['handleChange']);

</script>

<template>
  <div class="collection">
    <div class="collection-header">
      <el-row :gutter="10">
        <el-col v-if="!isRequired" :span="2">
          <div class="collection-title">
            <el-checkbox checked disabled />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="collection-title">输入项</div>
        </el-col>
        <el-col :span="isRequired ? 18 : 16">
          <div class="collection-title">描述</div>
        </el-col>
      </el-row>
    </div>
    <div class="collection-body">
      <el-row v-for="(item, index) in collectionList" :key="index" :gutter="10">
        <el-col v-if="!isRequired" :span="2">
          <div class="collection-content">
            <el-checkbox
              :model-value="item?.isSelected === 1"
              :disabled="isDisabled"
              @change="(checked: boolean) => emits('handleChange', item?.fillInKey, checked)"
            />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="collection-content">{{ item?.inputName }}</div>
        </el-col>
        <el-col :span="isRequired ? 18 : 16">
          <div class="collection-content">{{ item?.inputDesc }}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.collection {
  width: 100%;
  .collection-header {
    background-color: #fafafa;
    border: 1px solid #e6e6e6;
    height: 50px;
    .collection-title {
      height: 100%;
      padding-left: 20px;
      line-height: 50px;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .collection-body {
    .collection-content {
      height: 100%;
      padding-left: 20px;
      line-height: 50px;
      font-size: 14px;
      border-bottom: 1px solid #e6e6e6;
    }
  }
}
</style>
