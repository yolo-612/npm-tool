import { FormItemType, TableColumnType } from '@fpkg/components-web';
import type useAction from './useAction';
import AreaSearchSelect from '@/components/common/areaSearchSelect/index.vue';
import useDict, {
  DIRECT_SEND_ACTIVITY_SOURCE_TYPE_CODE,
  DIRECT_SEND_ACTIVITY_STATUS_TYPE_CODE,
  DIRECT_SEND_HISTORY_STATUS_TYPE_CODE,
  getDictLabelByValue,
  getOptionsFromDict,
} from '@/stores/modules/dict';
import { TIME_RANGE_MAP, type TTimeRange } from './map';

/* 分页 */
export const pagination = { defaultPageSize: 20, pageSizes: [10, 20, 30] };

/* 列表页配置 */
export default function (state: ReturnType<typeof useAction>) {
  const dictStore = useDict();
  dictStore.batchUpdateDict([
    DIRECT_SEND_ACTIVITY_SOURCE_TYPE_CODE,
    DIRECT_SEND_HISTORY_STATUS_TYPE_CODE,
    DIRECT_SEND_ACTIVITY_STATUS_TYPE_CODE,
  ]);

  const searchHeader = computed(() => ({
    showBtnList: true,
    searchItemList: [
      {
        type: FormItemType.Input,
        name: 'couponActivityCode',
        label: '活动编码',
        fieldProps: {
          placeholder: '请输入活动编码',
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
        name: 'source',
        label: '创建来源',
        fieldProps: {
          placeholder: '请选择创建来源',
          clearable: true,
          options: () => getOptionsFromDict(dictStore.dictRecord[DIRECT_SEND_ACTIVITY_SOURCE_TYPE_CODE]),
        },
      },
      {
        type: FormItemType.Input,
        name: 'equityCode',
        label: '权益编码',
        fieldProps: {
          placeholder: '请输入权益编码',
          clearable: true,
        },
      },
      {
        type: FormItemType.Select,
        name: 'status',
        label: '发券状态',
        fieldProps: {
          placeholder: '请选择发券状态',
          clearable: true,
          options: () => getOptionsFromDict(dictStore.dictRecord[DIRECT_SEND_HISTORY_STATUS_TYPE_CODE]),
        },
      },
      {
        type: FormItemType.Input,
        name: 'empCode',
        label: '小哥工号',
        fieldProps: {
          placeholder: '请输入小哥工号',
          clearable: true,
        },
      },
      {
        type: FormItemType.Input,
        name: 'monthCard',
        label: '月结卡号',
        fieldProps: {
          placeholder: '月结卡号',
          clearable: true,
        },
      },
      {
        type: FormItemType.DatePicker,
        name: 'timeRange',
        label: '发券时间',
        fieldProps: {
          type: 'daterange',
          valueFormat: 'YYYY-MM-DD',
          placeholder: '',
          rangeSeparator: '-',
          clearable: true,
          startPlaceholder: '请选择开始时间',
          endPlaceholder: '请选择结束时间',
        },
      },
      {
        type: FormItemType.Select,
        name: 'activityStatus',
        label: '活动状态',
        fieldProps: {
          placeholder: '请选择活动状态',
          options: () => {
            const dict = dictStore.dictRecord[DIRECT_SEND_ACTIVITY_STATUS_TYPE_CODE];
            const list = ['DRAFT', 'NOT_PROCESS', 'ONLINE'];
            const applyDict = dict?.filter((item: any) => !list.includes(item.code));
            return getOptionsFromDict(applyDict || []);
          },
        },
      },
      {
        type: FormItemType.Input,
        name: 'templateCode',
        label: '申请券编码',
        fieldProps: {
          placeholder: '请选择输入申请券编码',
          clearable: true,
        },
      },
      {
        type: FormItemType.Input,
        name: 'templateName',
        colProps: { span: 7 },
        label: '申请券名称',
        fieldProps: {
          placeholder: '请选择输入申请券名称',
          clearable: true,
        },
      },
      {
        type: FormItemType.DatePicker,
        name: 'ecpRange',
        label: '审批完成时间',
        colProps: { span: 9 },
        fieldProps: {
          type: 'daterange',
          placeholder: '',
          rangeSeparator: '-',
          valueFormat: 'YYYY-MM-DD',
          clearable: true,
          startPlaceholder: '请选择开始时间',
          endPlaceholder: '请选择结束时间',
        },
      },
      {
        type: FormItemType.Custom,
        colProps: { span: 10 },
        name: 'empRange',
        label: '小哥范围',
        render: {
          component: AreaSearchSelect,
          props: {
            modelValue: state.formData.empRange,
            onChange: ({ current }: any) => {
              state.formData.empRange = current;
            },
            placeholder: '请选择范围',
            onReady: state.onEmpRangeReady,
          },
        },
      },
    ],
  }));

  const columns = [
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '活动编码',
        prop: 'couponActivityCode',
        minWidth: 180,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '活动名称',
        prop: 'name',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '活动状态',
        prop: 'activityStatus',
        minWidth: 120,
      },
      render: (text: string) => getDictLabelByValue(dictStore.dictRecord[DIRECT_SEND_ACTIVITY_STATUS_TYPE_CODE] || [], text),
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '创建来源',
        prop: 'source',
        minWidth: 120,
      },
      render: (text: string) => getDictLabelByValue(dictStore.dictRecord[DIRECT_SEND_ACTIVITY_SOURCE_TYPE_CODE] || [], text),
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '申请券活动编码',
        prop: 'templateCode',
        minWidth: 180,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '申请券活动名称',
        prop: 'templateName',
        minWidth: 180,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '权益编码',
        prop: 'equityCode',
        minWidth: 180,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '寄件产品',
        prop: 'sendProductType',
        minWidth: 180,
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '寄件周期',
        prop: 'rangeRule',
        minWidth: 180,
      },
      render: (text: any[]) => (text || []).map((range) => TIME_RANGE_MAP[range as TTimeRange]).join('，'),
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '小哥工号',
        prop: 'empCode',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '网点编码',
        prop: 'deptCode',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '分部编码',
        prop: 'divisionCode',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '地区编码',
        prop: 'areaCode',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '客户名称',
        prop: 'customerName',
        minWidth: 180,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '客户月结卡号',
        prop: 'monthCard',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '券张数',
        prop: 'equityCount',
        minWidth: 120,
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '发券状态',
        prop: 'status',
        minWidth: 120,
      },
      render: (text: string) => `${dictStore.dictRecord[DIRECT_SEND_HISTORY_STATUS_TYPE_CODE]?.find((item) => item.value === text)?.name || text}`,
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '审批完成时间',
        prop: 'ecpComplete',
        minWidth: 210,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '发券时间',
        prop: 'sendTime',
        minWidth: 210,
      },
    },
  ];
  return {
    searchHeader,
    columns,
    pagination,
  };
}
