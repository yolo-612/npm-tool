import dayjs from 'dayjs';
import { FormItemType, TableColumnType, type IPureTableColumnItem } from '@fpkg/components-web';
import type { IActivityQuery } from '@/apis/methods/activity/business/types';
import type useListAction from './useListAction';
import {
  OPERATION_COMMIT_AUDIO,
  OPERATION_COPY,
  OPERATION_DELETE,
  OPERATION_DISABLE,
  OPERATION_EDIT,
  OPERATION_EFFECT,
  OPERATION_ENABLE,
} from './operation';
import { renderStatusColumn } from './renderStatusColumn';
import {
  ACTIVITY_STATUS,
  ACTIVITY_TYPE,
} from '../../types';

/** 活动状态列表 */
const ACTIVITY_STATUS_LIST = [
  {
    label: '草稿',
    value: ACTIVITY_STATUS.DRAFT,
  },
  {
    label: '待启用',
    value: ACTIVITY_STATUS.UNSTART,
  },
  {
    label: '启用中',
    value: ACTIVITY_STATUS.PROCESSING,
  },
  {
    label: '手工停用',
    value: ACTIVITY_STATUS.MANUAL_STOP,
  },
  {
    label: '已结束',
    value: ACTIVITY_STATUS.END,
  },
];
const ACTIVITY_STATUS_LABEL_LIST: Record<string, string> = {
  [ACTIVITY_STATUS.DRAFT]: '草稿',
  [ACTIVITY_STATUS.UNSTART]: '待启用',
  [ACTIVITY_STATUS.PROCESSING]: '启用中',
  [ACTIVITY_STATUS.MANUAL_STOP]: '手工停用',
  [ACTIVITY_STATUS.END]: '已结束',
};

// todo 后续会使用
// /** 审核状态列表 */
// const ACTIVITY_APPROVAL_STATUS_LIST = [
//   {
//     label: '待提交审核',
//     value: ACTIVITY_APPROVAL_STATUS.TO_APPROVE,
//   },
//   {
//     label: '审核中',
//     value: ACTIVITY_APPROVAL_STATUS.APPROVING,
//   },
//   {
//     label: '审核通过',
//     value: ACTIVITY_APPROVAL_STATUS.APPROVED,
//   },
//   {
//     label: '审核驳回',
//     value: ACTIVITY_APPROVAL_STATUS.APPROVE_REJECT,
//   },
// ];

/** 活动类型列表 */
const ACTIVITY_TYPE_LIST = [
  {
    label: '线下商机活动',
    value: ACTIVITY_TYPE.BUSINESS_COLLECTION,
  },
];
const ACTIVITY_TYPE_LABEL_LIST: Record<string, string> = {
  [ACTIVITY_TYPE.BUSINESS_COLLECTION]: '线下商机活动',
};

// 表单项的宽度配置
const colProps = { span: 8 };
/* 列表页配置 */
export default function (state: ReturnType<typeof useListAction>) {
  /* 搜索头配置 */
  const searchHeader = {
    showBtnList: true,
    searchItemList: [
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
        type: FormItemType.Select,
        name: 'activityStatus',
        label: '活动状态',
        fieldProps: {
          placeholder: '请选择活动状态',
          clearable: true,
          options: ACTIVITY_STATUS_LIST,
        },
      },
      // todo 后续会使用
      // {
      //   colProps,
      //   type: FormItemType.Select,
      //   name: 'approvalStatus',
      //   label: '审核状态',
      //   fieldProps: {
      //     placeholder: '请选择审核状态',
      //     clearable: true,
      //     options: ACTIVITY_APPROVAL_STATUS_LIST,
      //   },
      // },
      {
        colProps,
        type: FormItemType.Select,
        name: 'type',
        label: '活动类型',
        fieldProps: {
          placeholder: '请选择活动类型',
          clearable: true,
          options: ACTIVITY_TYPE_LIST,
        },
      },
      {
        colProps,
        type: FormItemType.Select,
        name: 'creator',
        label: '创建人工号',
        fieldProps: {
          remote: true,
          filterable: true,
          remoteMethod: state.getStaff,
          options: state.empOptions,
          placeholder: '请填写创建人工号',
          clearable: true,
        },
      },
      {
        colProps,
        type: FormItemType.Select,
        name: 'creatorAreaCode',
        label: '创建人地区代码',
        fieldProps: {
          placeholder: '请选择创建人地区代码',
          clearable: true,
          options: state.areaInfoList,
        },
      },
      {
        colProps,
        type: FormItemType.DatePicker,
        name: 'timeRange',
        label: '活动时间',
        fieldProps: {
          type: 'daterange',
          format: 'YYYY-MM-DD HH:mm:ss',
          clearable: true,
          placeholder: '',
          rangeSeparator: '-',
          startPlaceholder: '选择开始时间',
          endPlaceholder: '选择结束时间',
          onChange: (value: any) => {
            if (value) {
              const [startTimer, endTime] = value;
              state.formData.value.timeRange = [
                dayjs(startTimer).startOf('day').toDate(),
                dayjs(endTime).endOf('day').toDate(),
              ];
            }
          },
        },
      },
    ],
  };

  /* 操作列表 */
  const actionList = ({ row }: any) => {
    return {
      list: [
        {
          label: '提交审核',
          hidden: !OPERATION_COMMIT_AUDIO(row),
          confirm: {
            title: '是否确认提交该条活动进行审批？',
            width: 210,
            onConfirm: () => state.actionCommitAudio(row.code),
          },
          props: {
            link: true,
            type: 'primary',
            size: 'small',
          },
        },
        {
          label: '启用',
          hidden: !OPERATION_ENABLE(row),
          confirm: {
            title: '你是否确定启用这个活动？',
            width: 210,
            onConfirm: () => state.actionEnable(row.code),
          },
          props: {
            link: true,
            type: 'primary',
            size: 'small',
            debounce: 1000,
          },
        },
        {
          label: '停用',
          hidden: !OPERATION_DISABLE(row),
          confirm: {
            title: '你是否确定停用这个活动？',
            width: 210,
            onConfirm: () => state.actionDisable(row.code),
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
          hidden: !OPERATION_EDIT(row),
          props: {
            link: true,
            type: 'primary',
            onClick: () => state.actionEdit(row.code, row.type),
            size: 'small',
          },
        },
        {
          label: '复制',
          hidden: !OPERATION_COPY(row),
          props: {
            link: true,
            type: 'primary',
            onClick: () => state.actionCopy(row.code, row.type),
            size: 'small',
          },
        },
        {
          label: '删除',
          hidden: !OPERATION_DELETE(row),
          confirm: {
            title: '是否确认删除这条活动？',
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
          label: '活动效果',
          hidden: !OPERATION_EFFECT(row),
          props: {
            link: true,
            type: 'primary',
            size: 'small',
            onClick: () => state.actionActivityPopup(row.code),
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
        label: '序号',
        type: 'index',
        minWidth: 60,
      },
    },
    {
      renderType: TableColumnType.Link,
      columnProps: {
        label: '活动名称',
        prop: 'name',
        minWidth: 150,
      },
      fieldProps: ({ row }: any) => {
        return {
          text: row.name,
          style: {
            color: 'var(--el-color-primary)',
          },
          action: () => state.actionView(row.code, row.type),
        };
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '活动编号',
        prop: 'code',
        minWidth: 200,
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '活动类型',
        prop: 'type',
        minWidth: 120,
      },
      render: (val: string) => `${ACTIVITY_TYPE_LABEL_LIST[val] || ''}`,
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '活动开始时间',
        prop: 'startTime',
        minWidth: 200,
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '活动结束时间',
        prop: 'endTime',
        minWidth: 200,
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '活动状态',
        prop: 'activityStatus',
        minWidth: 150,
      },
      render: (val) => {
        const label = ACTIVITY_STATUS_LABEL_LIST[val];
        if (val && label) {
          return {
            component: renderStatusColumn,
            props: {
              value: val,
              label,
            },
          };
        }
        return '';
      },
    },
    // todo 后续会使用
    // {
    //   renderType: TableColumnType.Custom,
    //   columnProps: {
    //     label: '审核状态',
    //     prop: 'approvalStatus',
    //     minWidth: 180,
    //   },
    //   render: (val, _row) => {
    //     const { value, label } = ACTIVITY_APPROVAL_STATUS_LIST.find((item) => item.value === val) || {};
    //     if (value && label) {
    //       return {
    //         component: renderColumn(value, label, value === ACTIVITY_APPROVAL_STATUS.APPROVE_REJECT),
    //       };
    //     }
    //     return '';
    //   },
    // },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '创建人',
        prop: 'creator',
        minWidth: 200,
      },
      render: (text: string | null, obj: { row: IActivityQuery }) => {
        return `${!text ? '-' : text}/(${obj?.row?.empName || ''})`;
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '创建人地区编码',
        prop: 'creatorAreaCode',
        minWidth: 150,
      },
      render: (text: string | null, obj: { row: IActivityQuery }) => {
        return `${!text ? '-' : text}/${obj?.row?.creatorAreaName || ''}`;
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '创建时间',
        prop: 'createTime',
        minWidth: 180,
      },
      render: (text: string | null) => `${text || '-'}`,
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
  };
}
