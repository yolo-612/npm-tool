import { FormItemType, TableColumnType, type IPureTableColumnItem } from '@fpkg/components-web';
import useDict, { getDictCodeByValue, getOptionsFromDict } from '@/stores/modules/dict';
import type useListAction from './useListAction';
import { ACTIVITY_STATUS, DRAGON_ACTIVITY_STATUS } from './types';
import { E_RAISING_DRAGON, E_RAISING_DRAGON_LABEL } from '../../modules/enums';

/* 分页配置 */
export const pagination = { defaultPageSize: 20, pageSizes: [10, 20, 30] };

/* 操作权限 */
const operationShown = {
  online: [ACTIVITY_STATUS.DRAFT],
  view: [
    ACTIVITY_STATUS.DRAFT,
    ACTIVITY_STATUS.ENDED,
    ACTIVITY_STATUS.NOT_PROCESS,
    ACTIVITY_STATUS.OFF_LINE,
    ACTIVITY_STATUS.PROCESSING,
  ],
  edit: [ACTIVITY_STATUS.DRAFT, ACTIVITY_STATUS.NOT_PROCESS, ACTIVITY_STATUS.PROCESSING],
  end: [ACTIVITY_STATUS.NOT_PROCESS],
  delete: [ACTIVITY_STATUS.DRAFT],
};

const colProps = { span: 6 };

/* 列表页配置 */
export default function (state: ReturnType<typeof useListAction>) {
  const dict = useDict();
  dict.batchUpdateDict([DRAGON_ACTIVITY_STATUS]);

  // 业务类型
  const modelList = [
    {
      label: E_RAISING_DRAGON_LABEL.NORMAL,
      value: E_RAISING_DRAGON.NORMAL,
    },
    {
      label: E_RAISING_DRAGON_LABEL.BULK,
      value: E_RAISING_DRAGON.BULK,
    },
    {
      label: E_RAISING_DRAGON_LABEL.CHALLENGE,
      value: E_RAISING_DRAGON.CHALLENGE,
    },
  ];

  /* 搜索头配置 */
  const searchHeader = {
    showBtnList: true,
    searchItemList: [
      {
        colProps,
        type: FormItemType.Input,
        name: 'code',
        label: '活动编号',
        fieldProps: {
          placeholder: '请填写活动编号',
          clearable: true,
        },
      },
      {
        colProps,
        type: FormItemType.Input,
        name: 'name',
        label: '活动名称',
        fieldProps: {
          placeholder: '请填写活动名称',
          clearable: true,
        },
      },
      {
        colProps,
        type: FormItemType.Select,
        name: 'model',
        label: '业务类型',
        fieldProps: {
          placeholder: '请选择业务类型',
          clearable: true,
          options: modelList,
        },
      },
      {
        colProps,
        type: FormItemType.Select,
        name: 'status',
        label: '活动状态',
        fieldProps: {
          placeholder: '请选择活动状态',
          clearable: true,
          options: () => {
            return getOptionsFromDict(dict.dictRecord[DRAGON_ACTIVITY_STATUS]);
          },
        },
      },
      {
        colProps,
        type: FormItemType.Input,
        name: 'creator',
        label: '创建人工号',
        fieldProps: {
          placeholder: '请填写创建人工号',
          clearable: true,
        },
      },
      {
        colProps: { span: 8 },
        type: FormItemType.DatePicker,
        name: 'startTime',
        label: '开始时间',
        fieldProps: {
          type: 'daterange',
          clearable: true,
          placeholder: '',
          rangeSeparator: '-',
          startPlaceholder: '选择开始时间',
          endPlaceholder: '选择结束时间',
        },
      },
      {
        colProps: { span: 8 },
        type: FormItemType.DatePicker,
        name: 'endTime',
        label: '结束时间',
        fieldProps: {
          type: 'daterange',
          placeholder: '',
          clearable: true,
          rangeSeparator: '-',
          startPlaceholder: '请选择开始时间',
          endPlaceholder: '请选择结束时间',
        },
      },
    ],
  };

  /* 操作列表 */
  const actionList = ({ row }: any) => {
    const statusKey = getDictCodeByValue(dict.dictRecord[DRAGON_ACTIVITY_STATUS], row.status) as ACTIVITY_STATUS;
    return {
      list: [
        {
          label: '上线',
          hidden: !operationShown.online.includes(statusKey),
          confirm: {
            title: '你是否确定上线这个活动？',
            width: 210,
            onConfirm: () => state.actionOnline(row.code),
          },
          props: {
            link: true,
            type: 'primary',
            size: 'small',
            debounce: 1000,
          },
        },
        {
          label: '编辑',
          hidden: !operationShown.edit.includes(statusKey),
          props: {
            link: true,
            type: 'primary',
            onClick: () => state.actionEdit(row.code),
            size: 'small',
          },
        },
        {
          label: '查看',
          hidden: !operationShown.view.includes(statusKey),
          props: {
            link: true,
            type: 'primary',
            onClick: () => state.actionView(row.code),
            size: 'small',
          },
        },
        {
          label: '删除',
          hidden: !operationShown.delete.includes(statusKey),
          confirm: {
            title: '你是否确定删除这个活动？',
            width: 210,
            onConfirm: () => state.actionDelete(row.code),
          },
          props: {
            link: true,
            type: 'primary',
            size: 'small',
            debounce: 1000,
          },
        },
        {
          label: '下线',
          hidden: !operationShown.end.includes(statusKey),
          confirm: {
            title: '你是否确定下线这个活动？',
            width: 210,
            onConfirm: () => state.actionOffline(row.code),
          },
          props: {
            link: true,
            type: 'primary',
            size: 'small',
            debounce: 1000,
          },
        },
      ],
    };
  };

  /* 表格头配置 */
  const columns: IPureTableColumnItem[] = [
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '活动编号',
        prop: 'code',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '活动名称',
        prop: 'name',
        minWidth: 150,
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '业务类型',
        prop: 'model',
        minWidth: 100,
      },
      render: (val: number) => `${modelList.find((item) => item.value === val)?.label || ''}`,
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '活动状态',
        prop: 'status',
        minWidth: 100,
      },
      render: (val: string) => `${dict.dictRecord[DRAGON_ACTIVITY_STATUS]?.find((item: { value: string; }) => item.value === val)?.name || val}`,
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '活动时间',
        prop: 'activityRange',
        showOverflowTooltip: false,
        minWidth: 230,
      },
      render: (text: any, { row }: any) => `${row.startTime} - ${row.endTime}`,
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '创建人',
        prop: 'creator',
        minWidth: 80,
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '上线时间',
        prop: 'upTime',
        minWidth: 180,
      },
      render: (text: string | null) => `${!text ? '-' : text}`,
    },
    {
      renderType: TableColumnType.Buttons,
      columnProps: {
        label: '操作',
        prop: 'action',
        fixed: 'right',
        minWidth: 160,
      },
      fieldProps: actionList,
    },
  ];

  return {
    searchHeader,
    columns,
    pagination,
  };
}
