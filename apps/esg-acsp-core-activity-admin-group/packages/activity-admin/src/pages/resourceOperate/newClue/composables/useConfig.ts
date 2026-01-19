import { FormItemType, TableColumnType } from '@fpkg/components-web';
import { getMonthList } from './map';
import AreaSearchSelect from '@/components/common/areaSearchSelect/index.vue';
import type useAction from './useAction';

/* 月份选择 */
const monthOpt = getMonthList();

/* 分页 */
export const pagination = { defaultPageSize: 20, pageSizes: [10, 20, 30] };

/* 列表页配置 */
export default function (state: ReturnType<typeof useAction>) {
  const searchHeader = computed(() => ({
    showBtnList: true,
    searchItemList: [
      {
        type: FormItemType.Custom,
        name: 'range',
        label: '我的范围',
        render: {
          component: AreaSearchSelect,
          props: {
            modelValue: state.formData.range,
            onChange: ({ current }: any) => {
              state.formData.range = current;
            },
            placeholder: '请选择我的范围',
            onReady: state.onEmpRangeReady,
          },
        },
      },
      {
        type: FormItemType.Select,
        name: 'stateList',
        label: '线索状态',
        fieldProps: {
          placeholder: '请选择线索状态',
          options: () => state.clueStatusOpt.value,
          clearable: true,
          multiple: true,
          collapseTags: true,
          maxCollapseTags: 2,
        },
      },
      {
        type: FormItemType.Select,
        name: 'monthList',
        label: '线索月份',
        fieldProps: {
          placeholder: '请选择线索月份',
          multiple: true,
          clearable: true,
          options: monthOpt,
          collapseTags: true,
          maxCollapseTags: 2,
        },
      },
      {
        type: FormItemType.Input,
        name: 'empCode',
        label: '小哥工号',
        rules: [{ pattern: /^[0-9][a-zA-Z0-9,\s]*$/, message: '数字开头，逗号空格隔开' }],
        fieldProps: {
          placeholder: '单次至多查10个，支持逗号、空格隔开',
          clearable: true,
        },
      },
      {
        type: FormItemType.Input,
        name: 'phone',
        label: '客户加密手机号',
        rules: [{ pattern: /^[a-zA-Z0-9][a-zA-Z0-9,%\s]*$/, message: '数字字母开头，逗号空格隔开' }],
        fieldProps: {
          placeholder: '单次至多查10个，支持逗号、空格隔开',
          clearable: true,
        },
      },
    ],
  }));
  const columns = [
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        type: 'selection',
        reserveSelection: true,
        selectable: (row: any) => row.state === '0',
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '线索月份',
        prop: 'month',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '加密手机号',
        prop: 'phone',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '客户名称',
        prop: 'customerName',
        minWidth: 160,
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '负责小哥',
        prop: 'empCode',
        minWidth: 180,
      },
      render: (text: any, { row }: any) => `${row.empName || ''}${text}`,
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '线索状态',
        prop: 'state',
        minWidth: 100,
      },
      render: (text: any) => `${state.clueStatusMap.value[text]}`,
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '网点编码',
        prop: 'deptCode',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '分部编码',
        prop: 'divisionCode',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '区域编码',
        prop: 'areaCode',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.Button,
      columnProps: {
        label: '操作',
        prop: 'action',
        fixed: 'right',
        minWidth: 100,
      },
      fieldProps: ({ row }: any) => {
        return {
          label: '修改',
          props: {
            onClick: () => state.showEdit('single', row),
            size: 'small',
            disabled: row.state !== '0',
          },
        };
      },
    },
    {
      renderType: TableColumnType.Link,
      columnProps: {
        label: '维护历史',
        fixed: 'right',
        minWidth: 100,
      },
      fieldProps: ({ row }: any) => {
        return {
          text: '详情',
          action: () => state.showHistory(row.id),
        };
      },
    },
  ];
  return {
    searchHeader,
    columns,
    pagination,
  };
}

/* 修改小哥页配置 */
export const editClueTableColumn = [
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '加密手机号',
      prop: 'phone',
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '客户名称',
      prop: 'customerName',
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '原小哥工号',
      prop: 'empCode',
    },
  },
];

/* 历史详情页配置 */
export const historyTableColumn = [
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '维护人工号',
      prop: 'operatorEmpCode',
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '原小哥工号',
      prop: 'previousEmpCode',
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '接收小哥工号',
      prop: 'modifiedEmpCode',
    },
  },
  {
    renderType: TableColumnType.Custom,
    columnProps: {
      label: '维护时间',
      prop: 'operateTime',
    },
    render: (text: any) => `${text}`,
  },
];
