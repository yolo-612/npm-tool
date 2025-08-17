<script lang="ts" setup>
import { ElButton } from 'element-plus';
import type { Slots } from 'vue';

withDefaults(defineProps<ITableSearchContentProps>(), {
  showResetBtn: true,
  showSearchBtn: true,
});

const emits = defineEmits(['search', 'reset']);

defineOptions({
  name: 'TableSearchContent',
  inheritAttrs: false,
});

interface ITableSearchContentProps{
  slots:Slots,
  showSearchBtn?: boolean;
  showResetBtn?: boolean;
}

const attrs = useAttrs();
</script>

<template>
  <!-- 按钮区 -->
  <div class="search-btn-wrap">
    <component v-if="slots?.prefixBtn" :is="slots.prefixBtn" />
    <el-button v-if="showSearchBtn" class="search-btn-search" type="primary" @click="$emit('search')">
      {{ attrs.searchBtnTxt || '查询' }}
    </el-button>
    <el-button v-if="showResetBtn" class="search-btn-reset" @click="$emit('reset')">
      {{ attrs.resetBtnTxt || '重置' }}
    </el-button>
    <component v-if="slots?.suffixBtn" :is="slots.suffixBtn" />
  </div>
</template>

<style lang="scss" scoped>
.search-btn-wrap {
  display: flex;
  justify-content: flex-end;
  padding-right: 10%;
}
</style>
