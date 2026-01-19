<script lang="ts" setup>
import { TableColumnType, PureTable } from '@fpkg/components-web';
import type { useTemplateAction } from '../composables/useTemplateAction';
import { DISCOUNT_TYPE } from '../composables/map';

const props = defineProps({
  type: {
    type: String,
    default: 'add',
  },
  state: {
    type: Object as PropType<ReturnType<typeof useTemplateAction>>,
    required: true,
  },
  processingDisabled: {
    type: Boolean,
    default: false,
  },
});

/* 表格头配置 */
const columns = [
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '权益名称',
      prop: 'equityName',
      minWidth: 120,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '权益编码',
      prop: 'equityCode',
      minWidth: 120,
    },
  },
  {
    renderType: TableColumnType.Custom,
    columnProps: {
      label: '折扣率/金额',
      prop: 'discountValue',
      minWidth: 120,
    },
    render: (discountValue: string) => {
      return props.state.formData.discountType === DISCOUNT_TYPE.DISCOUNT
        ? `${parseFloat((Number(discountValue) * 10).toFixed(1))}折`
        : `${discountValue}元`;
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '张数',
      prop: 'equityCount',
      minWidth: 80,
    },
  },
  {
    renderType: TableColumnType.InputNumber,
    columnProps: {
      label: '发放次数',
      prop: 'equityPkgCount',
      minWidth: 180,
    },
    fieldProps: {
      style: { width: '100%' },
      placeholder: '请输入1-500的整数',
      controlsPosition: 'right',
      min: 1,
      max: 500,
      step: 1,
      precision: 0,
      disabled: props.type === 'detail',
    },
  },
  {
    renderType: TableColumnType.Select,
    columnProps: {
      label: '小哥画像',
      prop: 'staffGroupCode',
      width: 200,
    },
    fieldProps: (record: any, text: any) => {
      return {
        placeholder: '请选择小哥画像',
        options: props.state.portrait.options,
        loading: props.state.portrait.isLoading,
        modelValue: record.row.staffGroupCode,
        remoteMethod: props.state.searchPortraitList,
        remoteShowSuffix: true,
        remote: true,
        filterable: true,
        onChange: (val: string) => {
          props.state.handleChangeStaffGroupCode(record.row, val);
        },
        disabled: props.processingDisabled,
      };
    },
  },
  {
    renderType: TableColumnType.Button,
    columnProps: {
      label: '操作',
      minWidth: 120,
    },
    fieldProps: (record: any) => {
      return {
        label: '删除',
        props: {
          disabled: props.processingDisabled,
          onClick: () => {
            props.state.handleRemoveRightsItem(record.row);
          },
          size: 'small',
        },
      };
    },
  },
];

const onAddBtnClick = () => {
  props.state.showRightSearchDialog();
};
</script>

<template>
  <div class="send-content-table">
    <el-button type="primary" :disabled="state.addRightsDisabled() || props.processingDisabled" class="el-button" @click="onAddBtnClick"
      >添加</el-button
    >
    <PureTable :columns="columns" :data="props.state.formData.equityList" size="small" />
  </div>
</template>

<style lang="scss" scoped>
  .send-content-table {
    width: 96%;
    position: relative;
    .el-button {
      position: absolute;
      top: -40px;
      right: 10px;
    }
  }
</style>
