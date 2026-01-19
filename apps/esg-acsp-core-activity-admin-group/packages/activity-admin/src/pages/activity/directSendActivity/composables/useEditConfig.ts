import { dayjs, ElMessage } from 'element-plus';
import { computed } from 'vue';
import { FormItemType, TableColumnType, validateImgDimensions } from '@fpkg/components-web';
import type { IPureTableColumnItem } from '@fpkg/components-web';
import { UPLOAD_URL } from '@/apis/methods/common';
import useDict, { RIGHTS_TYPE_TYPE_CODE } from '@/stores/modules/dict';
import {
  CUSTOMER_GROUP_TYPE,
  CUSTOMER_SCOPE,
  CUSTOMER_SCOPE_OPTION,
  DEDUCTION_TYPE,
  PAGE_ACTION,
  REWARD_FLAG,
  REWARD_FLAG_OPTION,
  REWARD_TYPE,
  REWARD_TYPE_OPTION,
  SINGLE_TICKET,
  SINGLE_TICKET_OPTION,
} from '../types';
import RightsTable from '../components/RightsTable.vue';
import RewardRule from '../components/RewardRule.vue';
import type useAction from './useEditAction';
import { ACTIVITY_STATUS } from '../const';

function useEditConfig(state: ReturnType<typeof useAction>, type?: PAGE_ACTION) {
  const dictStore = useDict();
  dictStore.updateDict(RIGHTS_TYPE_TYPE_CODE);

  const processingDisabled = computed(() => {
    return type === PAGE_ACTION.DETAIL || state.detailStatus.value === ACTIVITY_STATUS.PROCESSING;
  });

  const config = computed<any>(() => ({
    type,
    subFormList: [
      {
        header: {
          title: '基础信息',
          isActive: true,
        },
        formItemList: [
          {
            colProps: { span: 13 },
            type: FormItemType.Input,
            name: 'name',
            label: '活动名称',
            fieldProps: {
              placeholder: '最多10字',
              disabled: processingDisabled.value,
            },
            rules: [
              {
                required: true,
                message: '请输入活动名称',
              },
              {
                max: 10,
                message: '最多输入10个字',
              },
            ],
          },
        ],
      },
      {
        formItemList: [
          {
            colProps: { span: 8 },
            type: FormItemType.DatePicker,
            name: 'startTime',
            label: '活动开始时间',
            fieldProps: {
              type: 'datetime',
              placeholder: '请选择开始时间',
              clearable: true,
              disabledDate: (time: Date) => time.getTime() < Date.now() - 24 * 60 * 60 * 1000,
              valueFormat: 'YYYY-MM-DD HH:mm:ss',
              disabled: processingDisabled.value,
            },
            rules: [
              {
                required: true,
                message: '请输入活动开始时间',
              },
              {
                validator: (_rule: any, value: any, callback: any) => {
                  const data = {
                    startTime: value,
                    endTime: state.formData.value.endTime,
                    equityEndType: state.formData.value.equityEndType,
                    equityEndTime: state.formData.value.equityEndTime,
                    rightsEndTime: state.formData.value.rightsEndTime,
                    rightsStartTime: state.formData.value.rightsStartTime,
                    couponTypeCount: state.formData.value.couponTypeCount,
                  };
                  const validResult = state.validateRightsTime(data, 'startTime');
                  if (!validResult.isValid) {
                    callback(new Error(validResult.message));
                  } else {
                    callback();
                  }
                },
              },
            ],
          },
          {
            colProps: { span: 8 },
            type: FormItemType.DatePicker,
            name: 'endTime',
            label: '活动结束时间',
            fieldProps: {
              type: 'datetime',
              placeholder: '请选择结束时间',
              clearable: true,
              disabledDate: (time: Date) => time.getTime() < dayjs().add(1, 'day').startOf('day').valueOf(),
              valueFormat: 'YYYY-MM-DD HH:mm:ss',
              defaultTime: [dayjs().endOf('day')],
            },
            rules: [
              {
                required: true,
                message: '请输入活动结束时间',
              },
              {
                validator: (_rule: any, value: any, callback: any) => {
                  const data = {
                    endTime: value,
                    startTime: state.formData.value.startTime,
                    equityEndType: state.formData.value.equityEndType,
                    equityEndTime: state.formData.value.equityEndTime,
                    rightsEndTime: state.formData.value.rightsEndTime,
                    rightsStartTime: state.formData.value.rightsStartTime,
                    couponTypeCount: state.formData.value.couponTypeCount,
                  };
                  const validResult = state.validateRightsTime(data, 'endTime');
                  if (!validResult.isValid) {
                    callback(new Error(validResult.message));
                  } else {
                    callback();
                  }
                },
              },
            ],
          },
          {
            colProps: { span: 13 },
            type: FormItemType.Radio,
            name: 'customerLayer',
            label: '发券客户层级',
            defaultValue: '0',
            fieldProps: {
              options: [{ label: 'PB 2.1-2.2', value: '0' }],
              disabled: processingDisabled.value,
            },
            rules: {
              required: true,
              message: '请选择发券客户层级',
            },
          },
          {
            colProps: { span: 13 },
            type: FormItemType.Radio,
            name: 'customerGroupType',
            label: '发券客户范围',
            defaultValue: CUSTOMER_SCOPE.AREA,
            fieldProps: {
              options: CUSTOMER_SCOPE_OPTION,
              onChange: state.handleChangeCustomerGroupType,
              disabled: processingDisabled.value || state.formData.value.source === CUSTOMER_GROUP_TYPE.EMP_CODE,
            },
            rules: {
              required: true,
              message: '请选择发券客户范围',
            },
          },
        ],
      },
      {
        header: {
          title: '发放内容',
          isActive: true,
        },
        rowProps: {
          gutter: 22,
          justify: 'space-between',
          align: 'middle',
          tag: 'div',
        },
        formItemList: [
          {
            colProps: { span: 22 },
            type: FormItemType.Label,
            name: 'desc-to-user',
            fieldProps: {
              modelValue: '1.请注意券的有效期，券的结束时间不能早于活动结束时间；2.1个发券活动最多添加1个发放内容。',
            },
          },
          {
            colProps: { span: 2 },
            type: FormItemType.Button,
            name: 'add',

            fieldProps: {
              label: '添加',
              props: {
                type: processingDisabled.value ? 'info' : 'primary',
                disabled: processingDisabled.value,
              },
              onclick: () => {
                state.showRightSearchDialog();
              },
            },
          },
          {
            colProps: { span: 24 },
            type: FormItemType.Custom,
            name: 'pureTable',
            customComponent: {
              component: RightsTable,
              props: {
                state,
                type,
              },
            },
          },
        ],
      },
      {
        header: { title: '奖励与客群配置' },
        formItemList: [
          {
            colProps: { span: 24 },
            type: FormItemType.Radio,
            name: 'rewardFlag',
            label: '是否奖励',
            defaultValue: REWARD_FLAG.YES,
            fieldProps: {
              options: REWARD_FLAG_OPTION,
              onChange: () => {
                state.handleChangeRewardFlag();
              },
              disabled: processingDisabled.value,
            },
            rules: {
              required: true,
              message: '请选择奖励类型',
            },
          },
          {
            colProps: { span: 13 },
            hidden: state.formData.value.rewardFlag !== REWARD_FLAG.YES,
            type: FormItemType.Input,
            name: 'rewardProjectCode',
            label: '预算编码',
            fieldProps: {
              placeholder: '请输入预算编码',
              maxlength: 15,
            },
            rules: [
              {
                required: true,
                message: '请输入预算编码',
              },
              {
                max: 15,
                message: '最多输入15个字',
              },
            ],
          },
          {
            colProps: { span: 13 },
            hidden: state.formData.value.rewardFlag !== REWARD_FLAG.YES,
            type: FormItemType.Select,
            name: 'rewardStatisticalType',
            label: '奖励类型',
            defaultValue: REWARD_TYPE.TICKET,
            fieldProps: {
              options: REWARD_TYPE_OPTION,
              placeholder: '请选择奖励类型',
              disabled: processingDisabled.value,
            },
            rules: [{ required: true, message: '请选择奖励类型' }],
          },
          {
            colProps: { span: 13 },
            hidden: state.formData.value.rewardFlag !== REWARD_FLAG.YES,
            type: FormItemType.Radio,
            name: 'taskAction',
            label: '单票统计逻辑',
            defaultValue: SINGLE_TICKET.TICKET_USED_EQUITY,
            fieldProps: {
              options: SINGLE_TICKET_OPTION,
              disabled: processingDisabled.value,
            },
            rules: {
              required: true,
              message: '请选择单票统计逻辑',
            },
          },
          {
            colProps: { span: 24 },
            hidden: state.formData.value.rewardFlag !== REWARD_FLAG.YES,
            type: FormItemType.Custom,
            name: 'rewardList',
            customComponent: {
              component: RewardRule,
              props: {
                state,
                type,
              },
            },
          },
          {
            colProps: { span: 8 },
            hidden: state.formData.value.rewardFlag !== REWARD_FLAG.NO,
            type: FormItemType.Select,
            name: 'codeList',
            label: '客群',
            fieldProps: {
              placeholder: '请选择客群',
              options: state.groupInfo.value.groupOptions,
              loading: state.groupInfo.value.isLoading,
              modelValue: state.formData.value.codeList,
              remoteMethod: (name = '') => { state.handleSearchGroupList(name); },
              multiple: true,
              multipleLimit: 10,
              remoteShowSuffix: true,
              remote: true,
              filterable: true,
              clearable: true,
              disabled: processingDisabled.value,
              onChange: (list: string[]) => {
                state.handleChangeGroup(list);
              },
            },
            rules: {
              required: true,
              message: '请选择客群',
            },
          },
        ],
        hidden: state.formData.value.source === CUSTOMER_GROUP_TYPE.EMP_CODE,
      },
      {
        header: { title: '物料配置' },
        formItemList: [
          {
            colProps: { span: 22 },
            label: '场景图片',
            type: FormItemType.Upload,
            name: 'titleTag',
            fieldProps: {
              disabled: type === 'detail',
              listType: 'picture-card',
              tips: '请上传png、jpg、jpeg、gif格式，单张图片尺寸146 x 46，大小不超过100kb',
              accept: '.png,.jpg,.jpeg,.gif',
              size: 100,
              limit: 1,
              action: UPLOAD_URL,
              beforeUpload: async (file: File) => {
                const { valid, msg } = await validateImgDimensions(file, { width: 146, height: 46 });
                if (!valid)ElMessage.error(msg);
                return valid;
              },
              onPreview: ({ url }: { url: string }) => {
                url && window.open(url);
              },
            },
          },
          {
            hidden: state.formData.value.source === CUSTOMER_GROUP_TYPE.EMP_CODE,
            colProps: { span: 22 },
            label: '卡片背景',
            type: FormItemType.Upload,
            name: 'cardBackground',
            fieldProps: {
              disabled: type === 'detail',
              listType: 'picture-card',
              tips: '请上传png、jpg、jpeg格式，单张图片尺寸686 x 278，大小不超过100kb',
              accept: '.png,.jpg,.jpeg',
              size: 100,
              limit: 1,
              action: UPLOAD_URL,
              beforeUpload: async (file: File) => {
                const { valid, msg } = await validateImgDimensions(file, { width: 686, height: 278 });
                if (!valid)ElMessage.error(msg);
                return valid;
              },
              onPreview: ({ url }: { url: string }) => {
                url && window.open(url);
              },
            },
          },
        ],
      },
      {
        formItemList: [
          {
            type: FormItemType.Button,
            name: 'submit',
            colProps: { offset: 16 },
            fieldProps: {
              label: '提交',
              props: {
                type: type === 'detail' ? 'info' : 'primary',
                size: 'large',
                disabled: type === 'detail',
                onClick: () => state.submit(),
                debounce: 1000,
              },
            },
          },
        ],
      },
    ],
  }));

  /** 权益展示列表配置 */
  const rightsTableColumns: IPureTableColumnItem[] = [
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '权益名称',
        prop: 'equityName',
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '权益编码',
        prop: 'equityCode',
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '券类型',
        prop: 'equityType',
      },
      render: (text: string) => {
        return dictStore.dictRecord[RIGHTS_TYPE_TYPE_CODE]?.find((item) => item.value === text)?.name || text;
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '折扣类型',
        prop: 'discountType',
      },
      render: (text: keyof typeof DEDUCTION_TYPE) => {
        return text?.length > 0 ? DEDUCTION_TYPE[text] : '';
      },
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '折扣率/金额',
        prop: 'discountValue',
      },
      render: (deductionValue: string, row: any) => {
        const { discountType } = row.row;
        return discountType === '10'
          ? `${parseFloat((Number(deductionValue) * 10).toFixed(1))}折`
          : `${deductionValue}元`;
      },
    },
    {
      renderType: TableColumnType.ElColumn,
      columnProps: {
        label: '张数',
        prop: 'equityCount',
      },
    },
    {
      renderType: TableColumnType.InputNumber,
      columnProps: {
        label: '发券次数',
        prop: 'equityPkgCount',
      },
      fieldProps: () => ({
        min: 1,
        max: 500,
        defaultValue: 1,
        precision: 0,
        controlsPosition: 'right',
        style: { width: '110px' },
        disabled: processingDisabled.value,
      }),
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '开始时间',
        prop: 'equityStartTime',
      },
      render: (time: string, row: any) => `${row?.row?.equityStartType === '2' ? '发放即生效' : dayjs(time).format('YYYY-MM-DD')}`,
    },
    {
      renderType: TableColumnType.Custom,
      columnProps: {
        label: '结束时间',
        prop: 'equityEndTime',
      },
      render: (time: string, row: any) => `${
        row?.row?.equityEndType === '2'
          ? `发放后${row.row.couponValidDuration}天失效`
          : dayjs(time).format('YYYY-MM-DD')
      }`,
    },
    {
      renderType: TableColumnType.Select,
      columnProps: {
        label: '小哥画像',
        prop: 'staffGroupCode',
      },
      fieldProps: () => ({
        placeholder: '请选择小哥画像',
        options: state.portrait.value.options,
        loading: state.portrait.value.isLoading,
        modelValue: state.formData.value.staffGroupCode,
        onChange: state.handleChangeStaffGroupCode,
        remoteMethod: state.searchPortraitList,
        remoteShowSuffix: true,
        remote: true,
        filterable: true,
        disabled: processingDisabled.value || state.formData.value.customerGroupType === CUSTOMER_SCOPE.CUSTOMER,
      }),
    },
    {
      renderType: TableColumnType.Button,
      columnProps: {
        label: '操作',
        prop: 'actions',
      },
      fieldProps: ({ row }: any) => {
        return {
          label: '删除',

          props: {
            disabled: processingDisabled.value,
            onClick: () => state.handleRemoveRights(),
            size: 'small',
          },
        };
      },
    },
  ];

  return { formConfig: config, rightsTableColumns };
}

export default useEditConfig;
