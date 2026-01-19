import { FormItemType, TableColumnType, type IPureTableColumnItem } from '@fpkg/components-web';
import type useAction from './useAction';
import useDict, { DIRECT_SEND_ACTIVITY_SOURCE_TYPE_CODE, DIRECT_SEND_ACTIVITY_STATUS_TYPE_CODE, getDictCodeByValue } from '@/stores/modules/dict';
import { downloadPortraits } from '../../applySendActivity/composables/useListAction';
import { ACTIVITY_STATUS } from '../const';
import { CUSTOMER_GROUP_TYPE } from '../types';

/* 分页 */
export const pagination = { defaultPageSize: 20, pageSizes: [10, 20, 30] };

/* 列表页配置 */
export default function (state: ReturnType<typeof useAction>) {
  const dict = useDict();
  dict.batchUpdateDict([DIRECT_SEND_ACTIVITY_STATUS_TYPE_CODE, DIRECT_SEND_ACTIVITY_SOURCE_TYPE_CODE]);

  /* 活动状态 */
  const operationShown = {
    online: [ACTIVITY_STATUS.DRAFT],
    edit: [
      ACTIVITY_STATUS.DRAFT,
      ACTIVITY_STATUS.NOT_PROCESS,
      ACTIVITY_STATUS.PROCESSING,
    ],
    view: [
      ACTIVITY_STATUS.DRAFT,
      ACTIVITY_STATUS.APPROVING,
      ACTIVITY_STATUS.ENDED,
      ACTIVITY_STATUS.FAILED,
      ACTIVITY_STATUS.NOT_PROCESS,
      ACTIVITY_STATUS.ONLINE,
      ACTIVITY_STATUS.PROCESSING,
      ACTIVITY_STATUS.REBACK,
      ACTIVITY_STATUS.TO_APPROVE,
    ],
    end: [
      ACTIVITY_STATUS.TO_APPROVE,
      ACTIVITY_STATUS.APPROVING,
      ACTIVITY_STATUS.NOT_PROCESS,
      ACTIVITY_STATUS.PROCESSING,
    ],
    delete: [ACTIVITY_STATUS.DRAFT],
  };

  const searchHeader = {
    showBtnList: true,
    searchItemList: [
      {
        type: FormItemType.Input,
        name: 'code',
        label: '活动编号',
        fieldProps: {
          placeholder: '请输入活动编号',
          clearable: true,
        },
      },
      {
        type: FormItemType.Input,
        name: 'name',
        label: '活动名称',
        fieldProps: {
          placeholder: '请输入活动名称',
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
            return dict.dictRecord[DIRECT_SEND_ACTIVITY_STATUS_TYPE_CODE]?.map((item) => ({
              label: item.name,
              value: item.value,
            }));
          },
        },
      },
      {
        type: FormItemType.Select,
        name: 'source',
        label: '创建来源',
        fieldProps: {
          placeholder: '请选择创建来源',
          clearable: true,
          options: () => {
            return dict.dictRecord[DIRECT_SEND_ACTIVITY_SOURCE_TYPE_CODE]?.map((item) => ({
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
          placeholder: '请输入创建人工号',
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
          'start-placeholder': '请选择开始时间',
          'end-placeholder': '请选择结束时间',
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
      render: (text: string) => `${dict.dictRecord[DIRECT_SEND_ACTIVITY_STATUS_TYPE_CODE].find((item) => item.value === text)?.name || text}`,
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '创建来源',
        prop: 'source',
        minWidth: 120,
      },
      render: (text: string) => `${dict.dictRecord[DIRECT_SEND_ACTIVITY_SOURCE_TYPE_CODE].find((item) => item.value === text)?.name || text}`,
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
      fieldProps: ({ row }) => {
        const sourceCode = getDictCodeByValue(dict.dictRecord[DIRECT_SEND_ACTIVITY_SOURCE_TYPE_CODE], row.source);
        /** 活动状态为进行中或已结束 */
        const statusCheck = [ACTIVITY_STATUS.PROCESSING, ACTIVITY_STATUS.ENDED].includes(row.status);
        /** 来源为后台创建  */
        const showDownload = statusCheck && sourceCode === 'CREATE';
        /** 小哥提报数量为1 大网全量展示大网全量、其他展示数字 */
        const countLabel = row.hasAllEmpCode ? '大网全量' : (sourceCode === 'EMP' ? '1' : `${row.empCount}`);
        const list = [
          {
            label: countLabel,
            props: {
              text: true,
              link: true,
            },
          },
          {
            label: '',
            hidden: !showDownload,
            props: {
              icon: 'Download',
              link: true,
              type: 'primary',
              size: 'large',
              onClick: () => downloadPortraits(row.code, '0'),
              debounce: 1000,
            },
          },
        ];
        return { list };
      },
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
      fieldProps: (obj) => {
        const { row } = obj || {};
        return {
          list: [
            {
              label: '上线',
              hidden: !operationShown.online.includes(row.status),
              confirm: {
                title: '你是否确定上线这个活动？',
                width: 210,
                onConfirm: () => state.actionOnline(row.code),
              },
              props: {
                link: true,
                type: 'primary',
                size: 'small',
              },
            },
            {
              label: '结束',
              hidden: !operationShown.end.includes(row.status),
              confirm: {
                title: '你是否确定结束这个活动？',
                width: 210,
                onConfirm: () => state.actionOffline(row.code),
              },
              props: {
                link: true,
                type: 'primary',
                size: 'small',
              },
            },
            {
              label: '编辑',
              hidden: !operationShown.edit.includes(row.status) || row.source === CUSTOMER_GROUP_TYPE.EMP_CODE,
              props: {
                link: true,
                type: 'primary',
                onClick: () => state.actionEdit(row.code),
                size: 'small',
              },
            },
            {
              label: '查看',
              hidden: !operationShown.view.includes(row.status),
              props: {
                link: true,
                type: 'primary',
                onClick: () => state.actionView(row.code),
                size: 'small',
              },
            },
            {
              label: '删除',
              hidden: !operationShown.delete.includes(row.status),
              confirm: {
                title: '你是否确定删除这个活动？',
                width: 210,
                onConfirm: () => state.actionDelete(row.code),
              },
              props: {
                link: true,
                type: 'primary',
                size: 'small',
              },
            },
          ],
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
