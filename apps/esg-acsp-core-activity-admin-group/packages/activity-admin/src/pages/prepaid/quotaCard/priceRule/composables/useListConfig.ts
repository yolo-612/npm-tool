import { FormItemType, TableColumnType } from '@fpkg/components-web';
import { dayjs } from 'element-plus';
import type useListAction from './useListAction';
import useDict, { getDictCodeByValue, getOptionsFromDict } from '@/stores/modules/dict';

const colProps = { span: 6 };

export const princeRuleColumns = [
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '计价规则编码',
      prop: 'code',
      minWidth: 200,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '计价规则名称',
      prop: 'name',
      minWidth: 160,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '计价规则状态',
      prop: 'statusDesc',
      minWidth: 120,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '主产品',
      prop: 'mainProductTypeName',
      minWidth: 150,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '子产品',
      prop: 'subProductTypeName',
      minWidth: 150,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '卡额度(元)',
      prop: 'quota',
      minWidth: 100,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '卡折扣',
      prop: 'discount',
      minWidth: 80,
    },
  },
  {
    renderType: TableColumnType.Custom,
    columnProps: {
      label: '生效日',
      prop: 'validTimeStart',
      minWidth: 120,
    },
    render: (text: any) => (text ? dayjs(text).format('YYYY-MM-DD') : ''),
  },
  {
    renderType: TableColumnType.Custom,
    columnProps: {
      label: '失效日',
      prop: 'validTimeEnd',
      minWidth: 120,
    },
    render: (text: any) => (text ? dayjs(text).format('YYYY-MM-DD') : ''),
  },
  {
    renderType: TableColumnType.Custom,
    columnProps: {
      label: '创建时间',
      prop: 'createTime',
      minWidth: 180,
    },
    render: (text: any) => (text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : ''),
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '创建人工号',
      prop: 'creator',
      minWidth: 120,
    },
  },
];

export default function (state: ReturnType<typeof useListAction>) {
  const dict = useDict();
  dict.batchUpdateDict(['quota_config_status']);

  const searchHeader = computed(() => ({
    colProps: { span: 7 },
    searchItemList: [
      {
        type: FormItemType.Select,
        name: 'status',
        label: '计价规则状态',
        colProps,
        fieldProps: {
          placeholder: '请选择规则状态',
          clearable: true,
          options: getOptionsFromDict(dict.dictRecord['quota_config_status']),
        },
      },
      {
        type: FormItemType.Input,
        name: 'code',
        label: '计价规则编码',
        colProps,
        fieldProps: {
          placeholder: '请填写规则编码',
          clearable: true,
          modelModifiers: { trim: true },
        },
      },
      {
        type: FormItemType.Input,
        name: 'name',
        label: '计价规则名称',
        colProps,
        fieldProps: {
          placeholder: '请填写规则名称',
          clearable: true,
          modelModifiers: { trim: true },
        },
      },
      {
        type: FormItemType.Input,
        name: 'creator',
        label: '创建人工号',
        colProps,
        fieldProps: {
          placeholder: '请填写创建人工号',
          clearable: true,
          modelModifiers: { trim: true },
        },
      },
      {
        type: FormItemType.Input,
        name: 'mainProductType',
        colProps,
        label: '主产品',
        fieldProps: {
          placeholder: '请填写主产品',
          clearable: true,
          modelModifiers: { trim: true },
        },
      },
      {
        type: FormItemType.Input,
        name: 'subProductType',
        label: '子产品',
        colProps,
        fieldProps: {
          placeholder: '请填写子产品',
          clearable: true,
          modelModifiers: { trim: true },
        },
      },
      {
        type: FormItemType.InputNumber,
        name: 'quota',
        label: '卡额度(元)',
        colProps,
        fieldProps: {
          placeholder: '请填写卡额度',
          clearable: true,
          precision: 0,
        },
      },
      {
        type: FormItemType.InputNumber,
        name: 'discount',
        label: '卡折扣',
        colProps,
        fieldProps: {
          placeholder: '请填写卡折扣',
          clearable: true,
          precision: 2,
        },
      },
      {
        type: FormItemType.DatePicker,
        name: 'validTime',
        label: '配置有效期',
        fieldProps: {
          clearable: true,
          type: 'daterange',
          valueFormat: 'YYYY-MM-DD',
          rangeSeparator: '至',
          startPlaceholder: '请选择最早时间',
          endPlaceholder: '请选择最晚时间',
        },
      },
      {
        type: FormItemType.DatePicker,
        name: 'createTime',
        label: '创建时间',
        fieldProps: {
          clearable: true,
          type: 'daterange',
          rangeSeparator: '至',
          valueFormat: 'YYYY-MM-DD',
          startPlaceholder: '请选择最早时间',
          endPlaceholder: '请选择最晚时间',
        },
      },
    ],
  }));
  /* 操作列表 */
  const actionList = ({ row }: any) => {
    const statusCode = getDictCodeByValue(dict.dictRecord['quota_config_status'], row.status);
    const list = [
      {
        label: '启用',
        hidden: statusCode !== 'INITIAL',
        confirm: {
          title: '确定启用该规则吗？',
          width: 200,
          onConfirm: () => state.toggleConfigStatus('up', row.code),
        },
        props: {
          type: 'primary',
          link: true,
          size: 'small',
          debounce: 1500,
        },
      },
      {
        label: '停用',
        hidden: statusCode !== 'ON',
        confirm: {
          title: '规则停用后其关联商品将失效,确定停用吗？',
          width: 200,
          onConfirm: () => state.toggleConfigStatus('down', row.code),
        },
        props: {
          type: 'primary',
          link: true,
          size: 'small',
          debounce: 1500,
        },
      },
      {
        label: '查看',
        props: {
          type: 'primary',
          link: true,
          size: 'small',
          onClick: () => state.pageJump('detail', row.code),
        },
      },
      {
        label: '复制',
        props: {
          type: 'primary',
          link: true,
          size: 'small',
          onClick: () => state.pageJump('copy', row.code),
        },
      },
    ];
    return { list };
  };
  const columns = [
    ...princeRuleColumns,
    {
      renderType: TableColumnType.Buttons,
      columnProps: {
        label: '操作',
        prop: 'action',
        minWidth: 180,
        fixed: 'right',
      },
      fieldProps: actionList,
    },
  ];
  return {
    columns,
    searchHeader,
  };
}
