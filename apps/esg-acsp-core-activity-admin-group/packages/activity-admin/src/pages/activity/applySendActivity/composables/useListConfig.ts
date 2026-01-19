import { FormItemType, TableColumnType, type IPureTableColumnItem } from '@fpkg/components-web';
import type useListAction from './useListAction';
import useDict, { APPLY_SEND_ACTIVITY_STATUS_TYPE_CODE } from '@/stores/modules/dict';
import { ACTIVITY_STATUS } from './map';

/* 分页配置 */
export const pagination = { defaultPageSize: 20, pageSizes: [10, 20, 30] };

/* 操作权限 */
const operationShown = {
  online: [ACTIVITY_STATUS.DRAFT],
  view: [
    ACTIVITY_STATUS.DRAFT,
    ACTIVITY_STATUS.ENDED,
    ACTIVITY_STATUS.NOT_PROCESS,
    ACTIVITY_STATUS.ONLINE,
    ACTIVITY_STATUS.PROCESSING,
  ],
  edit: [
    ACTIVITY_STATUS.DRAFT,
    ACTIVITY_STATUS.NOT_PROCESS,
    ACTIVITY_STATUS.PROCESSING,
  ],
  end: [ACTIVITY_STATUS.NOT_PROCESS, ACTIVITY_STATUS.PROCESSING],
  delete: [ACTIVITY_STATUS.DRAFT],
  copy: [
    ACTIVITY_STATUS.DRAFT,
    ACTIVITY_STATUS.ENDED,
    ACTIVITY_STATUS.NOT_PROCESS,
    ACTIVITY_STATUS.ONLINE,
    ACTIVITY_STATUS.PROCESSING,
  ],
};

/* 列表页配置 */
export default function (state: ReturnType<typeof useListAction>) {
  const dict = useDict();
  dict.batchUpdateDict([APPLY_SEND_ACTIVITY_STATUS_TYPE_CODE]);

  /* 搜索头配置 */
  const searchHeader = {
    showBtnList: true,
    colProps: { span: 24 },
    searchItemList: [
      {
        type: FormItemType.Input,
        name: 'code',
        label: '活动编号',
        fieldProps: {
          placeholder: '请填写活动编号',
          clearable: true,
        },
      },
      {
        type: FormItemType.Input,
        name: 'name',
        label: '活动名称',
        fieldProps: {
          placeholder: '请填写活动名称',
          clearable: true,
        },
      },
      {
        type: FormItemType.Select,
        name: 'status',
        label: '活动状态',
        fieldProps: {
          placeholder: '请选择活动状态',
          clearable: true,
          options: () => {
            return dict.dictRecord[APPLY_SEND_ACTIVITY_STATUS_TYPE_CODE]?.map((item) => ({
              label: item.name,
              value: item.value,
            }));
          },
        },
      },
      {
        type: FormItemType.Input,
        name: 'creator',
        label: '创建人工号',
        fieldProps: {
          placeholder: '请填写创建人工号',
          clearable: true,
        },
      },
      {
        type: FormItemType.DatePicker,
        name: 'startTime',
        label: '开始时间',
        fieldProps: {
          type: 'daterange',
          placeholder: '',
          'range-separator': '-',
          clearable: true,
          'start-placeholder': '选择开始时间',
          'end-placeholder': '选择结束时间',
        },
      },
      {
        type: FormItemType.DatePicker,
        name: 'endTime',
        label: '结束时间',
        fieldProps: {
          type: 'daterange',
          placeholder: '',
          'range-separator': '-',
          clearable: true,
          'start-placeholder': '请选择开始时间',
          'end-placeholder': '请选择结束时间',
        },
      },
    ],
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
        minWidth: 180,
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '活动状态',
        prop: 'status',
        minWidth: 120,
      },
      render: (text: string) => `${dict.dictRecord[APPLY_SEND_ACTIVITY_STATUS_TYPE_CODE]?.find((item) => item.value === text)?.name || text}`,
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '活动时间',
        prop: 'activityRange',
        showOverflowTooltip: false,
        minWidth: 200,
      },
      render: (text: any, { row }: any) => `${row.startTime} - ${row.endTime}`,
    },
    {
      renderType: TableColumnType.Buttons,
      columnProps: {
        label: '小哥人数',
        prop: 'empCount',
        minWidth: 180,
      },
      fieldProps: ({ row }) => ({
        list: [
          {
            label: row.hasAllEmpCode ? '大网全量' : `${row.empCount}`,
            props: {
              text: true,
              link: true,
            },
          },
          {
            label: '',
            hidden: ![ACTIVITY_STATUS.PROCESSING, ACTIVITY_STATUS.ENDED].includes(row.status),
            props: {
              icon: 'Download',
              link: true,
              type: 'primary',
              size: 'large',
              onClick: () => state.downloadPortraits(row.code, '1'),
              debounce: 1000,
            },
          },
        ],
      }),
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '创建人',
        prop: 'creator',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '上线时间',
        prop: 'upTime',
        minWidth: 200,
      },
      render: (text: string | null) => `${!text ? '-' : text}`,
    },
    {
      renderType: TableColumnType.Buttons,
      columnProps: {
        label: '操作',
        prop: 'action',
        fixed: 'right',
        minWidth: 200,
      },
      fieldProps: (row) => ({
        list: [
          {
            label: '上线',
            hidden: !operationShown.online.includes(row.row.status),
            confirm: {
              title: '你是否确定上线这个活动？',
              width: 210,
              onConfirm: () => state.actionOnline(row.row.code),
            },
            props: {
              link: true,
              type: 'primary',
              size: 'small',
            },
          },
          {
            label: '编辑',
            hidden: !operationShown.edit.includes(row.row.status),
            props: {
              link: true,
              type: 'primary',
              onClick: () => state.actionEdit(row.row.code),
              size: 'small',
            },
          },
          {
            label: '查看',
            hidden: !operationShown.view.includes(row.row.status),
            props: {
              link: true,
              type: 'primary',
              onClick: () => state.actionView(row.row.code),
              size: 'small',
            },
          },
          {
            label: '删除',
            hidden: !operationShown.delete.includes(row.row.status),
            confirm: {
              title: '你是否确定删除这个活动？',
              width: 210,
              onConfirm: () => state.actionDelete(row.row.code),
            },
            props: {
              link: true,
              type: 'primary',
              size: 'small',
            },
          },
          {
            label: '结束',
            hidden: !operationShown.end.includes(row.row.status),
            confirm: {
              title: '你是否确定结束这个活动？',
              width: 210,
              onConfirm: () => state.actionOffline(row.row.code),
            },
            props: {
              link: true,
              type: 'primary',
              size: 'small',
            },
          },
          {
            label: '复制',
            hidden: !operationShown.copy.includes(row.row.status),
            props: {
              link: true,
              type: 'primary',
              size: 'small',
              onClick: () => state.actionCopy(row.row.code),
            },
          },
        ],
      }),
    },
  ];

  return {
    searchHeader,
    columns,
    pagination,
  };
}
