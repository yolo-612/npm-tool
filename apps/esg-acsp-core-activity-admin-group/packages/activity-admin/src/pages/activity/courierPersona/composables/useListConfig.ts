import { FormItemType, TableColumnType } from '@fpkg/components-web';
import { dayjs } from 'element-plus';
import type useAction from './useListAction';
import useDict, { getDictLabelByValue, getOptionsFromDict, getDictCodeByValue } from '@/stores/modules/dict';

/* 分页 */
export const pagination = { defaultPageSize: 20, pageSizes: [10, 20, 30] };

/* 列表页配置 */
export default function (state: ReturnType<typeof useAction>) {
  const dict = useDict();
  dict.batchUpdateDict(['PortraitStatus', 'PortraitCreateType', 'PortraitUpdateType']);

  const searchHeader = {
    showBtnList: true,
    searchItemList: [
      {
        type: FormItemType.Input,
        name: 'code',
        label: '画像编码',
        fieldProps: {
          placeholder: '请输入画像编码',
          clearable: true,
        },
      },
      {
        type: FormItemType.Input,
        name: 'name',
        label: '画像名称',
        fieldProps: {
          placeholder: '请输入画像名称',
          clearable: true,
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
        type: FormItemType.Select,
        name: 'status',
        label: '画像状态',
        fieldProps: {
          placeholder: '请选择画像状态',
          clearable: true,
          options: () => getOptionsFromDict(dict.dictRecord['PortraitStatus'], true),
        },
      },
      {
        type: FormItemType.Select,
        name: 'createType',
        label: '创建方式',
        fieldProps: {
          placeholder: '请选择创建方式',
          clearable: true,
          options: () => getOptionsFromDict(dict.dictRecord['PortraitCreateType'], true),
        },
      },
    ],
  };

  /* 操作列表 */
  const actionList = ({ row }: any) => {
    const currentCode = getDictCodeByValue(dict.dictRecord['PortraitStatus'], row.status);
    return {
      list: [
        {
          label: '开始',
          hidden: currentCode !== 'DRAFT',
          confirm: {
            title: '你是否确定上线这个画像？',
            width: 210,
            onConfirm: () => state.portraitStatusToggle(row.code, 'start'),
          },
          props: {
            link: true,
            type: 'primary',
            size: 'small',
            debounce: 1000,
          },
        },
        {
          label: '结束',
          hidden: currentCode !== 'PROCESSING',
          confirm: {
            title: '你是否确定结束这个画像？',
            width: 210,
            onConfirm: () => state.portraitStatusToggle(row.code, 'end'),
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
          hidden: !['DRAFT', 'PARSING_FAILED'].includes(currentCode),
          props: {
            link: true,
            type: 'primary',
            size: 'small',
            onClick: () => {
              state.pageJump('edit', row.code);
            },
          },
        },
        {
          label: '查看',
          props: {
            link: true,
            type: 'primary',
            size: 'small',
            onClick: () => {
              state.pageJump('detail', row.code);
            },
          },
        },
        {
          label: '下载',
          hidden: !['DRAFT', 'PROCESSING', 'ENDED'].includes(currentCode),
          props: {
            link: true,
            type: 'primary',
            size: 'small',
            onClick: () => state.downloadPortrait(row.code),
          },
        },
      ],
    };
  };

  const columns = [
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '画像编码',
        prop: 'code',
        minWidth: 180,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '画像名称',
        prop: 'name',
        minWidth: 200,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '人数',
        prop: 'empCount',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '画像状态',
        prop: 'status',
        minWidth: 120,
      },
      render: (text: any) => `${getDictLabelByValue(dict.dictRecord['PortraitStatus'], text)}`,
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '创建方式',
        prop: 'createType',
        minWidth: 120,
      },
      render: (text: any) => `${getDictLabelByValue(dict.dictRecord['PortraitCreateType'], text)}`,
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '更新方式',
        prop: 'updateType',
        minWidth: 120,
      },
      // @ts-ignore
      render: (text: number) => `${getDictLabelByValue(dict.dictRecord['PortraitUpdateType'], text)}`,
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '创建时间',
        prop: 'createTime',
        minWidth: 180,
      },
      render: (text: any) => `${text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '--'}`,
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '画像结束时间',
        prop: 'invalidTime',
        minWidth: 180,
      },
      render: (text: any, { row }:any) => {
        const code = getDictCodeByValue(dict.dictRecord['PortraitStatus'], row.status);
        return `${text && code === 'ENDED' ? dayjs(text).format('YYYY-MM-DD') : '--'}`;
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
      renderType: TableColumnType.Buttons,
      columnProps: {
        label: '操作',
        prop: 'action',
        fixed: 'right',
        minWidth: 200,
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
