import { FormItemType, TableColumnType } from '@fpkg/components-web';
import { dayjs } from 'element-plus';
import useDict, { getDictCodeByValue, getOptionsFromDict, getDictLabelByValue } from '@/stores/modules/dict';
import type useListAction from './useListAction';

const colProps = { span: 6 };

export default function (state:ReturnType<typeof useListAction>) {
  const dict = useDict();
  dict.batchUpdateDict(['QuotaEquityStatus']);

  const searchHeader = computed(() => ({
    colProps: { span: 7 },
    searchItemList: [
      {
        type: FormItemType.Select,
        name: 'status',
        label: '调价券包状态',
        colProps,
        fieldProps: {
          placeholder: '请选择券包状态',
          clearable: true,
          options: getOptionsFromDict(dict.dictRecord['QuotaEquityStatus']),
        },
      },
      {
        type: FormItemType.Input,
        name: 'equityCode',
        label: '调价券包编码',
        colProps,
        fieldProps: {
          placeholder: '请填写券包编码',
          clearable: true,
          modelModifiers: { trim: true },
        },
      },
      {
        type: FormItemType.Input,
        name: 'equityName',
        label: '调价券包名称',
        colProps,
        fieldProps: {
          placeholder: '请填写券包名称',
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
    const statusCode = getDictCodeByValue(dict.dictRecord['QuotaEquityStatus'], row.status);
    const list = [
      {
        label: '启用',
        hidden: statusCode !== 'PENDING_ACTIVATION',
        confirm: {
          title: '确定启用该券包吗？',
          width: 200,
          onConfirm: () => state.toggleCouponStatus('start', row.equityCode),
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
        hidden: statusCode !== 'ACTIVATING',
        confirm: {
          title: '确定停用该券包吗？',
          width: 200,
          onConfirm: () => state.toggleCouponStatus('stop', row.equityCode),
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
          onClick: () => state.openCouponModel('detail', row.equityCode),
        },
      },
    ];
    return { list };
  };
  const columns = [
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '调价券包编码',
        prop: 'equityCode',
        minWidth: 180,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '调价券包名称',
        prop: 'equityName',
        minWidth: 180,
      },
    },
    // {
    //   renderType: TableColumnType.ElColumn,
    //   columnProps: {
    //     label: '券名称',
    //     prop: 'name',
    //     minWidth: 180,
    //   },
    // },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '调价券包状态',
        prop: 'status',
        minWidth: 120,
      },
      render: (text: any) => getDictLabelByValue(dict.dictRecord['QuotaEquityStatus'], text),
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '券金额(元)',
        prop: 'amount',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '生效日',
        prop: 'validDate',
        minWidth: 150,
      },
      render: (text: any) => (text ? dayjs(text).format('YYYY-MM-DD') : ''),
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '失效日',
        prop: 'invalidDate',
        minWidth: 150,
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
        minWidth: 180,
      },
    },
    {
      renderType: TableColumnType.Buttons,
      columnProps: {
        label: '操作',
        prop: 'action',
        minWidth: 140,
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
