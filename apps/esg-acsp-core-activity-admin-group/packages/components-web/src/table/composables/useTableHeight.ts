import {
  reactive, onMounted, onActivated, toRefs,
} from 'vue';
import type { Ref } from 'vue';
import { debounceFn } from '@/utils';
import type { ElTableType } from '../types';

export interface IUseTableHeightState {
  tableHeight: number
  /** tableRef */
  tableRef: ElTableType | null
}

export interface IUseTableHeightReturn {
  tableHeight: Ref<number>
  tableRef: Ref<ElTableType | null>
  onResize: () => void
}

type useTableHeight = IUseTableHeightReturn

export function useTableHeight(): useTableHeight {
  const state = reactive<IUseTableHeightState>({
    tableHeight: 200,
    tableRef: null,
  });
  const calculateTableHeight = () => {
    setTimeout(() => {
      state.tableHeight = state.tableRef?.$el.clientHeight || 0;
    }, 50);
  };

  const onResize = debounceFn(calculateTableHeight, 200);

  onMounted(() => {
    calculateTableHeight();
  });

  onActivated(() => {
    calculateTableHeight();
  });

  return {
    onResize,
    ...toRefs(state),
  };
}
