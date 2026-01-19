<script lang="ts" setup>
import { TableColumnType, PureTable } from '@fpkg/components-web';
import type useEditAction from '../composables/useEditAction';
import { PAGE_ACTION } from '../types';
import { ACTIVITY_STATUS } from '../const';

const props = defineProps({
  state: {
    type: Object as PropType<ReturnType<typeof useEditAction>>,
    required: true,
  },
  type: {
    type: String as PropType<PAGE_ACTION>,
    default: PAGE_ACTION.DETAIL,
  },
});

/** 是否禁用 */
const isDisabled = computed(() => {
  return props.type === PAGE_ACTION.DETAIL || props.state.detailStatus.value === ACTIVITY_STATUS.PROCESSING;
});

/* 表格头配置 */
const columns = [
  {
    renderType: TableColumnType.Select,
    columnProps: {
      label: '客群',
      prop: 'groupCodeList',
      className: 'reward-rule-required',
    },
    fieldProps: (record: any) => {
      const index = record.$index;
      const groupInfo = props.state.groupInfo.value;
      return {
        placeholder: '请选择客群',
        options: index > -1 && groupInfo.rewardGroupOptions[index]?.length > 0 ? groupInfo.rewardGroupOptions[index] : groupInfo.groupOptions,
        loading: groupInfo.isLoading,
        modelValue: record.row.groupCodeList,
        remoteMethod: (name = '') => { props.state.handleSearchGroupList(name, index); },
        multiple: true,
        multipleLimit: 10,
        remoteShowSuffix: true,
        remote: true,
        filterable: true,
        clearable: true,
        onChange: (list: string[]) => {
          props.state.handleChangeGroup(list, record.$index);
        },
        disabled: isDisabled.value,
      };
    },
  },
  {
    renderType: TableColumnType.InputNumber,
    columnProps: {
      label: '奖励金额',
      prop: 'pointTicket',
      className: 'point-ticket reward-rule-required',
    },
    fieldProps: () => ({
      style: { width: '100%' },
      placeholder: '请输入0.1-1000数字',
      controlsPosition: 'right',
      min: 0.1,
      max: 1000,
      step: 1,
      precision: 1,
      disabled: isDisabled.value,
    }),
  },
  {
    renderType: TableColumnType.InputNumber,
    columnProps: {
      label: '金额上限',
      prop: 'pointTotal',
      className: 'point-total',
    },
    fieldProps: () => ({
      style: { width: '100%' },
      placeholder: '请输入1-5000数字',
      controlsPosition: 'right',
      min: 1,
      max: 5000,
      step: 1,
      precision: 0,
      disabled: isDisabled.value,
    }),
  },
  {
    renderType: TableColumnType.Button,
    columnProps: {
      label: '操作',
    },
    fieldProps: (record: any) => {
      return {
        label: '删除',
        props: {
          disabled: isDisabled.value || props.state.formData.value.rewardList.length === 1,
          size: 'small',
          type: isDisabled.value || props.state.formData.value.rewardList.length === 1 ? 'info' : 'primary',
          onClick: () => {
            props.state.handleRemoveGroupInfo(record.$index);
          },
        },
      };
    },
  },
];

</script>

<template>
  <div class="reward-rule-table">
    <div class="reward-rule-table-title">奖励规则</div>
    <div class="reward-rule-table-button">
      <el-button
        :type="props.state.formData.value.rewardList.length >= 5 || isDisabled ? 'info' : 'primary'"
        :disabled="props.state.formData.value.rewardList.length >= 5 || isDisabled"
        @click="props.state.handleAddGroupInfo()">添加</el-button>
    </div>
    <PureTable :columns="columns" :data="props.state.formData.value.rewardList" size="small" />
  </div>
</template>

<style lang="scss" scoped>
.reward-rule-table {
  width: 96%;
  .reward-rule-table-title:before {
    content: "*";
    color: var(--el-color-danger);
    margin-right: 4px;
  }
  .reward-rule-table-button {
    text-align: right;
    margin-bottom: 10px;
  }
  :deep(.point-ticket .el-input-number) {
    width: 90%!important;
    position: relative;
    &:before {
      position: absolute;
      top: 0;
      right: -30px;
      content: '/票';
    }
  }
  :deep(th.reward-rule-required .cell) {
    &:before {
      content: "*";
      color: var(--el-color-danger);
      margin-right: 4px;
    }
  }
  :deep(.point-total .el-input-number) {
    width: 90%!important;
    position: relative;
    &:before {
      position: absolute;
      top: 0;
      right: -30px;
      content: '/客';
    }
  }
}
</style>
