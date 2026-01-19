<script lang="ts" setup>
import type { IPureTableColumnItem } from './types';
import PureTableColumn from './components/table-column/PureTableColumn.vue';
// import { useTableHeight } from './composables/useTableHeight';
import AcspEmpty from '@/src/empty';

defineProps<IPureTableProps>();

defineOptions({
  name: 'PureTable',
  inheritAttrs: false,
});

export interface IPureTableProps {
  columns: IPureTableColumnItem[];
  autoHeight?: Boolean;
}

const pureTableRef = ref();

/* 表单高度 */
// const { tableHeight } = useTableHeight();

defineExpose({
  pureTableRef,
});
</script>
<template>
  <!-- 纯表单渲染 table -->
  <el-table v-bind="$attrs" ref="pureTableRef" style="width: 100%">
    <!-- 单选加上勾选的标识 -->
    <el-table-column v-if="$attrs['highlight-current-row'] !== undefined" width="40">
      <template #default>
        <span class="icon_default select_icon"></span>
        <span class="icon_default unselect_icon"></span>
      </template>
    </el-table-column>
    <!-- column渲染 -->
    <template v-for="item in columns" :key="item.columnProps.prop">
      <pure-table-column v-if="!item.hidden" v-bind="item" />
    </template>
    <!-- 空的 slot -->
    <template #empty>
      <AcspEmpty desc="暂无数据" />
    </template>
  </el-table>
</template>

<style lang="scss" scoped>
.icon_default {
  width: 14px;
  height: 14px;
  box-sizing: border-box;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
.select_icon {
  position: relative;
  background-color: var(--el-color-primary);
  &::after {
    position: absolute;
    content: '';
    width: 6px;
    height: 4px;
    border-left: 2px solid #fff;
    border-bottom: 2px solid #fff;
    top: 3px;
    left: 3px;
    transform: rotate(-45deg);
    border-radius: 2px;
  }
}
.unselect_icon {
  border: 3px solid var(--el-border-color);
}
:deep(.el-table) {
  flex: 1;
  .el-table__body-wrapper {
    .el-scrollbar__view {
      height: 100%;
      .el-table__body tbody tr {
        .select_icon {
          display: none;
        }
        .unselect_icon {
          display: block;
        }
        &.current-row {
          .unselect_icon {
            display: none;
          }
          .select_icon {
            display: block;
            box-shadow: 0 2px 8px rgba(43, 89, 239, 0.2);
          }
        }
      }
      .el-table__empty-block {
        overflow: hidden;
        .el-table__empty-text {
          min-height: 180px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .el-scrollbar__bar {
      &.is-horizontal {
        height: 8px;
      }
      &.is-vertical {
        width: 8px;
      }
    }
  }
}
</style>
