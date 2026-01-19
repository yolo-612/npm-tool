import { TableColumnType, FormItemType } from '@fpkg/components-web';
import { dayjs } from 'element-plus';
import { useRouter } from 'vue-router';
import useDict, { getOptionsFromDict } from '@/stores/modules/dict';

export const pagination = {
  defaultPageSize: 10,
  pageSizes: [10, 20, 30],
};
export function useListConfig() {
  /* 拉取字典配置 */
  const dict = useDict();
  dict.batchUpdateDict(['quota_order_status']);

  const router = useRouter();
  const searchHeader = computed(() => ({
    searchItemList: [
      {
        type: FormItemType.Select,
        name: 'status',
        label: '订单状态',
        fieldProps: {
          placeholder: '请选择订单状态',
          clearable: true,
          options: getOptionsFromDict(dict.dictRecord['quota_order_status']),
        },
      },
      {
        type: FormItemType.Input,
        name: 'orderNo',
        label: '订单编码',
        fieldProps: {
          placeholder: '请填写订单编码',
          clearable: true,
          modelModifiers: { trim: true },
        },
      },
      {
        type: FormItemType.Input,
        name: 'goodsCode',
        label: '商品编码',
        fieldProps: {
          placeholder: '请填写商品编码',
          clearable: true,
          modelModifiers: { trim: true },
        },
      },
      {
        type: FormItemType.Input,
        name: 'monthCard',
        label: '下单月结卡号',
        fieldProps: {
          placeholder: '请填写下单月结卡号',
          clearable: true,
          modelModifiers: { trim: true },
        },
      },
      {
        type: FormItemType.DatePicker,
        name: 'timeRange',
        label: '下单时间',
        fieldProps: {
          type: 'daterange',
          rangeSeparator: '至',
          startPlaceholder: '请选择最早时间',
          endPlaceholder: '请选择最晚时间',
          clearable: true,
          valueFormat: 'YYYY-MM-DD',
        },
      },
    ],
  }));

  const columns = [
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '订单编码',
        prop: 'orderNo',
        minWidth: 180,
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '下单时间',
        prop: 'createTime',
        minWidth: 210,
      },
      render: (text:string) => `${text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : ''}`,
    },

    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '下单月结卡号',
        prop: 'monthCard',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '订单状态',
        prop: 'statusDesc',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '商品编码',
        prop: 'goodsCode',
        minWidth: 180,
      },
    },
    {
      renderType: TableColumnType.Button,
      columnProps: {
        label: '操作',
        prop: 'action',
        minWidth: 120,
      },
      fieldProps: ({ row }: any) => ({
        label: '查看',
        props: {
          link: true,
          type: 'primary',
          onClick: () => {
            router.push({
              path: '/prepaid/quotaCard/order/detail',
              query: {
                orderNo: row.orderNo,
              },
            });
          },
        },
      }),
    },
  ];
  return {
    searchHeader,
    columns,
    pagination,
  };
}
