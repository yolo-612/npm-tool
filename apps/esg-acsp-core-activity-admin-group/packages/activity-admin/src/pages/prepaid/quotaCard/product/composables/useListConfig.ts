import { dayjs } from 'element-plus';
import { FormItemType, TableColumnType } from '@fpkg/components-web';
import useDict, { getDictCodeByValue, getOptionsFromDict } from '@/stores/modules/dict';
import type useAction from './useListAction';
import {
  E_GOODS_STATUS, E_PAGE_ACTION, E_STATUS_TYPES, QUOTA_GOODS_STATUS,
} from './types';

const colProps = { span: 6 };

/* 列表页配置 */
export default function (state: ReturnType<typeof useAction>) {
  const dict = useDict();
  dict.batchUpdateDict([QUOTA_GOODS_STATUS]);

  const searchHeader = {
    searchItemList: [
      {
        colProps,
        type: FormItemType.Select,
        name: 'status',
        label: '商品状态',
        fieldProps: {
          placeholder: '请选择商品状态',
          clearable: true,
          options: () => getOptionsFromDict(dict.dictRecord[QUOTA_GOODS_STATUS]),
        },
      },
      {
        colProps,
        type: FormItemType.Input,
        name: 'goodsCode',
        label: '商品编码',
        fieldProps: {
          placeholder: '请输入商品编码',
          clearable: true,
          modelModifiers: { trim: true },
        },
      },
      {
        colProps,
        type: FormItemType.Input,
        name: 'name',
        label: '商品名称',
        fieldProps: {
          placeholder: '请输入商品名称',
          clearable: true,
          modelModifiers: { trim: true },
        },
      },
      {
        colProps,
        type: FormItemType.Input,
        name: 'creator',
        label: '创建人工号',
        fieldProps: {
          placeholder: '请输入创建人工号',
          clearable: true,
          modelModifiers: { trim: true },
        },
      },
      {
        type: FormItemType.DatePicker,
        name: 'createTimeRange',
        label: '创建时间',
        fieldProps: {
          type: 'daterange',
          clearable: true,
          rangeSeparator: '至',
          valueFormat: 'YYYY-MM-DD',
          startPlaceholder: '请选择最早时间',
          endPlaceholder: '请选择最晚时间',
        },
      },
      {
        type: FormItemType.InputNumberRange,
        name: 'amountRange',
        label: '金额（元）',
        fieldProps: {
          placeholder: ['最小金额', '最大金额'],
          to: '至',
          max: 999999999,
          min: 0.01,
          precision: 2,
        },
      },
    ],
  };

  /* 操作列表 */
  const actionList = ({ row }: any) => {
    const statusKey = getDictCodeByValue(dict.dictRecord[QUOTA_GOODS_STATUS], row.status) as E_STATUS_TYPES;
    return {
      list: [
        {
          label: '上架',
          hidden: ![E_STATUS_TYPES.IN_STORE].includes(statusKey),
          confirm: {
            title: '你是否确定上架这个商品？',
            width: 210,
            onConfirm: () => state.goodsStatusToggle(row.goodsCode, E_GOODS_STATUS.UP),
          },
          props: {
            link: true,
            type: 'primary',
            size: 'small',
            debounce: 1000,
          },
        },
        {
          label: '下架',
          hidden: ![E_STATUS_TYPES.SELLING].includes(statusKey),
          confirm: {
            title: '你是否确定下架这个商品？',
            width: 210,
            onConfirm: () => state.goodsStatusToggle(row.goodsCode, E_GOODS_STATUS.DOWN),
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
          hidden: ![E_STATUS_TYPES.IN_STORE].includes(statusKey),
          props: {
            link: true,
            type: 'primary',
            size: 'small',
            onClick: () => {
              state.pageJump(E_PAGE_ACTION.EDIT, row.goodsCode);
            },
          },
        },
        {
          label: '查看',
          // hidden: ![E_STATUS_TYPES.IN_STORE, E_STATUS_TYPES.SELLING, E_STATUS_TYPES.SELLOUT].includes(statusKey),
          props: {
            link: true,
            type: 'primary',
            size: 'small',
            onClick: () => {
              state.pageJump(E_PAGE_ACTION.DETAIL, row.goodsCode);
            },
          },
        },
        {
          label: '调整库存',
          hidden: ![E_STATUS_TYPES.IN_STORE, E_STATUS_TYPES.SELLOUT].includes(statusKey),
          props: {
            link: true,
            type: 'primary',
            size: 'small',
            onClick: () => state.showStockPop(row),
          },
        },
        {
          label: '复制',
          // hidden: ![E_STATUS_TYPES.IN_STORE, E_STATUS_TYPES.SELLING, E_STATUS_TYPES.SELLOUT].includes(statusKey),
          props: {
            link: true,
            type: 'primary',
            size: 'small',
            onClick: () => {
              state.pageJump(E_PAGE_ACTION.ADD, row.goodsCode);
            },
          },
        },
      ],
    };
  };

  const columns = [
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '商品编码',
        prop: 'goodsCode',
        minWidth: 180,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '商品名称',
        prop: 'name',
        minWidth: 200,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '商品状态',
        prop: 'statusDesc',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '金额（元）',
        prop: 'quotaAmount',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '库存',
        prop: 'stock',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '销量',
        prop: 'saleCounts',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '创建时间',
        prop: 'createTime',
        minWidth: 180,
      },
      render: (text: any) => `${text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '--'}`,
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '创建人工号',
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
    pagination: {},
  };
}
