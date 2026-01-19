<script lang="ts" setup>
  import type { IClueDetailData, IPageParams } from '../composables/types';
  import { SearchTable } from '@fpkg/components-web';
  import { operationDetail } from '@/apis/methods/activity/newClue';
  import { historyTableColumn, pagination } from '../composables/useConfig';
  import { ElMessage } from 'element-plus';

  /* 接收的参数 */
  const props = withDefaults(defineProps<IClueDetailData>(), {
    show: false,
    id: null,
  });

  const emits = defineEmits(['close']);

  /* 弹窗打开事件 */
  const tableRef = ref();
  const onPen = () => {
    tableRef.value?.onSearch();
  };

  /* 拉取详情 */
  const queryDetail = async (params: IPageParams) => {
    if (!props.id) {
      ElMessage.warning('没有线索ID');
      return { list: [], totalSize: 0 };
    }
    try {
      const { pageNum, pageSize } = params;
      const data = {
        pageNum,
        pageSize,
        sourceId: props.id,
      };
      const { obj } = await operationDetail(data);
      return obj || { list: [], totalSize: 0 };
    } catch (error: any) {
      ElMessage.error(error?.message || '拉取失败');
      return { list: [], totalSize: 0 };
    }
  };
</script>

<template>
  <el-dialog v-model="props.show" title="维护历史" width="800" @open="onPen" @close="emits('close')">
    <!-- 单个编辑线索展示 -->
    <SearchTable
      ref="tableRef"
      :columns="historyTableColumn"
      :pagination="{ ...pagination, layout: 'total, prev, pager, next, jumper' }"
      :searchAction="queryDetail"
      max-height="400"
    />
  </el-dialog>
</template>

<style lang="scss" scoped></style>
