import { TableColumnType } from '@fpkg/components-web';
import { dayjs } from 'element-plus';

export const columns = [
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '券包编码',
      prop: 'equityCode',
      minWidth: 120,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '券包名称',
      prop: 'equityName',
      minWidth: 120,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '券名称',
      prop: 'name',
      minWidth: 120,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '券金额(元)',
      prop: 'amount',
      minWidth: 100,
    },
  },
  {
    renderType: TableColumnType.ElColumn,
    columnProps: {
      label: '券张数',
      prop: 'pieceNum',
      minWidth: 80,
    },
  },
  {
    renderType: TableColumnType.Custom,
    columnProps: {
      label: '生效日',
      prop: 'validDate',
      minWidth: 120,
    },
    render: (text: any) => (text ? dayjs(text).format('YYYY-MM-DD') : ''),
  },
  {
    renderType: TableColumnType.Custom,
    columnProps: {
      label: '失效日',
      prop: 'invalidDate',
      minWidth: 120,
    },
    render: (text: any) => (text ? dayjs(text).format('YYYY-MM-DD') : ''),
  },
];
