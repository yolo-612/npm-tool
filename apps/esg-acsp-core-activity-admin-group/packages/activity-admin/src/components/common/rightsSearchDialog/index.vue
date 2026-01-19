<script setup lang="ts">
import {
  FormItemType,
  SearchTable,
  TableColumnType,
  type IFormItem,
  type IPureTableColumnItem,
} from '@fpkg/components-web';
import { ElDialog, ElMessage } from 'element-plus';
import { queryCoupon } from '@/apis/methods/common';
import type { IResQueryCoupon } from '@/apis/methods/common/types';
import useConfig from './useConfig';

const props = withDefaults(
  defineProps<{
      /** 限定权益类型，不传则都展示 */
      types?:(1 | 2)[];
      /** 是否展示权益类型选择，默认为 true */
      isShowTypeSelect?: boolean;
      /** 要展示的字段 */
      columns: (keyof ReturnType<typeof useConfig>['equityColumn'])[];
      /** 搜索时校验权益数据是否符合需求 */
      searchValidateRights?: (
        data: IResQueryCoupon,
      ) => { isValid: boolean; message?: string } | Promise<{ isValid: boolean; message?: string }>;
      /** 点确认时校验权益数据是否符合需求 */
      submitValidateRights?: (
        data: IResQueryCoupon,
      ) => { isValid: boolean; message?: string } | Promise<{ isValid: boolean; message?: string }>;
    }>(),
  { isShowTypeSelect: true, columns: () => ['name', 'pkgDataId'] },
);

const emits = defineEmits<{(e: 'submit', right: IResQueryCoupon): void }>();
const isShow = defineModel<boolean>();

const searchData = ref<{ type: 1 | 2; code: string }>({
  type: 1,
  code: '',
});

watch(
  () => props.types,
  (val) => {
    searchData.value.type = val && val.length ? val[0] : 1;
  },
  {
    immediate: true,
  },
);

watch(
  () => searchData.value.type,
  () => {
    searchData.value.code = '';
  },
);

const { equityColumn } = useConfig();

const searchHeader = computed(() => {
  const searchItemList: IFormItem[] = [
    {
      type: FormItemType.Input,
      name: 'code',
      label: '权益编码',
      fieldProps: {
        placeholder: '请输入权益编码',
        clearable: true,
      },
      rules: {
        required: true,
        message: '请输入权益编码',
      },
    },
  ];
  if (props.isShowTypeSelect) {
    const typeEnums: { label: string; value: 1 | 2 }[] = [
      {
        label: '权益包',
        value: 1,
      },
      {
        label: '限时折扣',
        value: 2,
      },
    ];
    const typeNeedShow = typeof props.types === 'undefined' ? typeEnums : typeEnums.filter((item) => props.types?.includes(item.value));
    searchItemList.unshift({
      type: FormItemType.Select,
      name: 'type',
      label: '权益类型',
      fieldProps: {
        placeholder: '请选择活动类型',
        options: typeNeedShow,
      },
      rules: {
        required: true,
        message: '请选择权益编码',
      },
    });
  }
  return {
    showBtnList: true,
    searchItemList,
  };
});

const columns = computed<IPureTableColumnItem[]>(() => {
  const columns: IPureTableColumnItem[] = props.columns.map((item) => equityColumn[item]);
  columns.push({
    renderType: TableColumnType.Button,
    columnProps: {
      label: '操作',
      prop: 'addButton',
    },
    fieldProps: (row) => {
      return {
        label: '添加',
        type: 'primary',
        onclick: async () => {
          const rightsRecord = row.row;
          if (typeof props.submitValidateRights === 'function') {
            const validResult = await props.submitValidateRights(rightsRecord);
            if (!validResult.isValid) {
              ElMessage.error(validResult.message || '权益数据不符合要求');
              return;
            }
          }
          emits('submit', toRaw(rightsRecord));
        },
      };
    },
  });
  return columns;
});

/* 查询列表数据 */
const searchAction = async (): Promise<any> => {
  try {
    const result = await queryCoupon(searchData.value);
    if (typeof props.searchValidateRights === 'function') {
      const validResult = await props.searchValidateRights(result.obj);
      if (!validResult.isValid) {
        throw new Error(validResult.message || '权益数据不符合要求');
      }
    }
    return { totalSize: 1, list: [result.obj] };
  } catch (e: any) {
    ElMessage.error(e.message);
    return { totalSize: 0, list: [] };
  }
};
</script>
<template>
  <ElDialog v-model="isShow" width="1000" destroy-on-close>
    <SearchTable
      ref="searchTableRef"
      :searchHeader="searchHeader"
      :searchData="searchData"
      :searchAction="searchAction"
      :columns="columns"
      :rowKey="(row: any) => row.id"
      :pagination="{ hidden: true }"
      max-height="max(calc(100vh - 380px),300px)"
    >
    </SearchTable>
  </ElDialog>
</template>

<style lang="scss" scoped></style>
