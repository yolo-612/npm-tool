/**
 * @description 活动效果列表
 */
import { TableColumnType, type IPureTableColumnItem } from '@fpkg/components-web';
import EncryptionField from '../EncryptionField.vue';

/* 列表页配置 */
export default function () {
  /* 表格头配置 */
  const columns: IPureTableColumnItem[] = [
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '序号',
        type: 'index',
        minWidth: 60,
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '姓名',
        prop: 'customerName',
        minWidth: 120,
      },
      render: (val: string) => `${val || '-'}`,
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '手机号',
        prop: 'customerPhone',
        minWidth: 130,
      },
      render: (val: string, { row }) => {
        return {
          component: EncryptionField,
          props: {
            id: row.id,
            type: 'phone',
            hide: row.customerPhone,
          },
        };
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '公司名称',
        prop: 'companyName',
        minWidth: 120,
      },
      render: (val: string) => `${val || '-'}`,
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '公司地址',
        prop: 'companyAddr',
        minWidth: 150,
      },
      render: (val: string, { row }) => {
        return {
          component: EncryptionField,
          props: {
            id: row.id,
            type: 'address',
            hide: row.companyAddr,
          },
        };
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '行业',
        prop: 'companyLayer',
        minWidth: 100,
      },
      render: (val: string) => `${val || '-'}`,
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '公司规模',
        prop: 'companyScale',
        minWidth: 100,
      },
      render: (val: string) => `${val || '-'}`,
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '是否有月结卡号',
        prop: 'monthCard',
        minWidth: 130,
      },
      render: (val: string) => `${val ? '有' : '无'}`,
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '月结卡号',
        prop: 'monthCard',
        minWidth: 120,
      },
      render: (val: string) => `${val || '-'}`,
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '每月预估快递费用',
        prop: 'estimatedMonthlyCourierCost',
        minWidth: 160,
      },
      render: (val: string) => `${val ?? '-'}`,
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '意向合作业务',
        prop: 'potentialCooperationBusiness',
        minWidth: 150,
      },
      render: (val: string) => `${val || '-'}`,
    },
  ];

  return {
    columns,
  };
}
