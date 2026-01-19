import type { IFormConfig } from '@fpkg/components-web';
import { FormItemType } from '@fpkg/components-web';
import dayjs from 'dayjs';
import sendProductCascader from '@/components/common/sendProductCascader/index.vue';
import type { ICityFlowDirection } from '@/apis/methods/activity/applySendActivity/types';
import useDict, { RIGHTS_TYPE_TYPE_CODE } from '@/stores/modules/dict';
import {
  PERIOD_OPTION,
  CUSTOMER_LAYER_OPTION,
  CUSTOMER_GROUP_TYPE_OPTION,
  EQUITY_START_TIME_OPTION,
  EQUITY_END_TIME_OPTION,
  EQUITY_START_TIME_TYPE,
  EQUITY_END_TIME_TYPE,
  EQUITY_TYPE_OPTION,
  DISCOUNT_TYPE_OPTION,
  EQUITY_TYPE,
  ACTIVITY_STATUS,
} from './map';
import SendContentTable from '../components/SendContentTable.vue';
import type { useTemplateAction } from './useTemplateAction';
import type { TPageAction } from './types';
import CityFlowDirection from '../components/CityFlowDirection.vue';

/* 通用布局 */
const colProps = {
  span: 10,
  offset: 2,
};

/** 折扣类型 */
export const DEDUCTION_TYPE = {
  // eslint-disable-next-line quote-props
  '10': '折扣',
  // eslint-disable-next-line quote-props
  '20': '固定金额',
};

export const useTemplateConfig = (state: ReturnType<typeof useTemplateAction>, type?: TPageAction) => {
  const dictStore = useDict();
  dictStore.updateDict(RIGHTS_TYPE_TYPE_CODE);

  /* 全部周期 */
  const weeks = [1, 2, 3, 4, 5, 6, 7];

  /** 禁止权益活动编辑 */
  const disabledEquity = computed(() => {
    return [ACTIVITY_STATUS.NOT_PROCESS, ACTIVITY_STATUS.PROCESSING].includes(state.detailStatus.value) || type === 'detail';
  });

  /** 进行中不可编辑 */
  const processingDisabled = computed(() => ACTIVITY_STATUS.PROCESSING === state.detailStatus.value || type === 'detail');

  const formConfig = computed<IFormConfig>(() => ({
    subFormList: [
      /* 基础信息配置 */
      {
        header: { title: '基础信息' },
        formItemList: [
          {
            type: FormItemType.Input,
            name: 'name',
            label: '活动名称',
            fieldProps: {
              placeholder: '最多10字',
              clearable: true,
              maxlength: 10,
              disabled: type === 'detail' || processingDisabled.value,
            },
            rules: [
              {
                required: true,
                message: '请填写活动名称',
              },
            ],
          },
        ],
      },
      {
        formItemList: [
          {
            type: FormItemType.DatePicker,
            name: 'startTime',
            label: '活动开始时间',
            colProps: { span: 8 },
            fieldProps: {
              type: 'datetime',
              clearable: true,
              placeholder: '请选择开始时间',
              disabled: type === 'detail' || processingDisabled.value,
              disabledDate: (time: Date) => time.getTime() < new Date().setHours(0, 0, 0, 0),
              valueFormat: 'YYYY-MM-DD HH:mm:ss',
              onChange: () => {
                state.handleActivityRangeChange();
              },
            },
            rules: state.validateActivityRange('startTime'),
          },
          {
            type: FormItemType.DatePicker,
            name: 'endTime',
            label: '活动结束时间',
            colProps,
            fieldProps: {
              type: 'datetime',
              clearable: true,
              placeholder: '请选择结束时间',
              disabled: type === 'detail',
              disabledDate: (time: Date) => time.getTime() < dayjs().add(1, 'day').startOf('day').valueOf(),
              valueFormat: 'YYYY-MM-DD HH:mm:ss',
              onChange: () => {
                state.handleActivityRangeChange();
              },
            },
            rules: state.validateActivityRange('endTime'),
          },
          {
            type: FormItemType.Radio,
            name: 'customerLayer',
            label: '发券客户层级',
            fieldProps: {
              options: CUSTOMER_LAYER_OPTION,
              disabled: processingDisabled.value,
            },
            rules: [
              {
                required: true,
                message: '请选择发券客户层级',
              },
            ],
          },
          {
            type: FormItemType.Radio,
            name: 'customerGroupType',
            label: '发券客户范围',
            colProps,
            fieldProps: {
              options: CUSTOMER_GROUP_TYPE_OPTION,
              disabled: processingDisabled.value,
            },
            rules: [
              {
                required: true,
                message: '请选择发券客户范围',
              },
            ],
          },
          {
            type: FormItemType.InputNumber,
            name: 'weight',
            label: '活动优先级',
            colProps: { span: 10 },
            fieldProps: {
              placeholder: '请输入整数1-100，数值越大代表优先级越高',
              clearable: true,
              max: 100,
              min: 1,
              disabled: type === 'detail',
            },
            rules: [{ required: true, message: '请输入活动优先级' }],
          },
        ],
      },
      /* 权益条件配置 */
      {
        header: { title: '权益条件' },
        formItemList: [
          {
            type: FormItemType.Radio,
            name: 'equityStartType',
            label: '权益开始时间',
            colProps: state.formData.equityStartType === EQUITY_START_TIME_TYPE.INSTEAD ? { span: 20 } : undefined,
            fieldProps: {
              options: EQUITY_START_TIME_OPTION,
              disabled: disabledEquity.value,
              onChange: () => {
                state.handleEquityStartTypeChange();
              },
            },
            rules: [
              {
                required: true,
                message: '请选择权益开始时间',
              },
            ],
          },
          {
            type: FormItemType.DatePicker,
            hidden: state.formData.equityStartType === EQUITY_START_TIME_TYPE.INSTEAD,
            name: 'equityStartTime',
            label: '生效日期',
            colProps,
            fieldProps: {
              clearable: true,
              placeholder: '请选择生效日期',
              disabled: disabledEquity.value,
            },
            rules: [
              {
                required: state.formData.equityStartType === EQUITY_START_TIME_TYPE.ORDER_TIME,
                message: '请选择生效日期',
              },
            ],
          },
          {
            type: FormItemType.Radio,
            name: 'equityEndType',
            label: '权益结束时间',
            fieldProps: {
              options: EQUITY_END_TIME_OPTION,
              disabled: disabledEquity.value,
              onChange: (val: EQUITY_END_TIME_TYPE) => {
                state.handleEquityEndTypeChange(val);
              },
            },
            rules: [
              {
                required: true,
                message: '请选择权益结束时间',
              },
            ],
          },
          {
            type: FormItemType.DatePicker,
            hidden: state.formData.equityEndType === EQUITY_END_TIME_TYPE.DYNAMIC,
            name: 'equityEndTime',
            label: '失效日期',
            colProps,
            fieldProps: {
              clearable: true,
              placeholder: '请选择失效日期',
              disabled: disabledEquity.value || !state.formData.startTime || !state.formData.endTime,
              disabledDate: (time: Date) => {
                const date = state.formData.startTime && state.formData.endTime ? new Date(state.formData.endTime) : new Date();
                return time.getTime() < date.setHours(0, 0, 0, 0);
              },
            },
            rules: state.validateEquityEndTime(),
          },
          {
            type: FormItemType.InputNumber,
            name: 'equityEndDay',
            label: '有效天数',
            colProps,
            hidden: state.formData.equityEndType === EQUITY_END_TIME_TYPE.FIXED,
            fieldProps: {
              placeholder: '必填，1-365天',
              clearable: true,
              max: 365,
              min: 1,
              disabled: disabledEquity.value,
            },
            rules: [
              {
                required: state.formData.equityEndType === EQUITY_END_TIME_TYPE.DYNAMIC,
                message: '必填，1-365天',
              },
            ],
          },
          {
            type: FormItemType.Checkbox,
            name: 'rangeRule',
            label: '周期选择',
            colProps: { span: 20 },
            fieldProps: {
              outOptions: [
                {
                  label: '所有周期',
                  checked: state.formData.rangeRule.length === weeks.length,
                  indeterminate: state.formData.rangeRule.length > 0 && state.formData.rangeRule.length < weeks.length,
                  disabled: disabledEquity.value,
                  onChange: (value: boolean) => {
                    // @ts-ignore
                    state.formData.rangeRule = value ? weeks : [];
                  },
                },
              ],
              options: PERIOD_OPTION,
              disabled: disabledEquity.value,
            },
            rules: [
              {
                required: true,
                message: '请选择周期',
              },
            ],
          },
          {
            type: FormItemType.Custom,
            name: 'sendProductType',
            label: '寄件产品类型',
            colProps: { span: 12 },
            customComponent: {
              component: sendProductCascader,
              props: {
                treeData: state.sendProductTypeList.options,
                value: state.formData.sendProductType,
                disabledEquity: disabledEquity.value,
                multiple: true,
                multipleLimit: 20,
                multipleLimitText: '最多选择20种寄件产品',
                onChange: (value: string[]) => {
                  state.formData.sendProductType = value.map((item: string) => item[1]);
                  state.validateSendProductType();
                },
              },
            },
            rules: {
              required: true,
              message: '最多选择20种寄件产品',
            },
          },
          {
            type: FormItemType.InputNumberRange,
            name: 'weightRange',
            label: '寄件重量',
            colProps: { span: 20, class: 'send-weight-range-col' },
            elFormItemProps: { class: 'send-weight-range-form-item' },
            fieldProps: {
              suffix: 'kg',
              tips: '两个值都不填写表示没有重量限制，两个都填写表示限制只在这个公斤段，并且包含前后的两个数字',
              precision: 3,
              min: 0,
              max: 9999.999,
              disabled: disabledEquity.value,
              onchange: () => {
                state.handleWeightRangeChange();
              },
            },
            rules: state.validateWeightRange(),
          },
          {
            type: FormItemType.Select,
            name: 'equityType',
            label: '券类型',
            fieldProps: {
              options: EQUITY_TYPE_OPTION,
              placeholder: '请选择券类型',
              disabled: disabledEquity.value,
              onChange: () => {
                state.handleEquityTypeChange();
              },
            },
            rules: [{ required: true, message: '请选择券类型' }],
          },
          {
            type: FormItemType.InputNumberRange,
            name: 'limitTime',
            label: '时段限制',
            colProps: { ...colProps, class: 'limit-time-col' },
            hidden: !state.formData.equityType || state.formData.equityType === EQUITY_TYPE.COUPON,
            fieldProps: {
              min: 0,
              max: 24,
              tips: '时段区间为左闭右开，如选择9~14，则表示9:00:00~13:59:59',
              disabled: disabledEquity.value,
            },
            rules: state.validateLimitTime(),
          },
          {
            type: FormItemType.Custom,
            name: 'cityFlowDirectionListFullMinus',
            label: '流向限制',
            colProps: { span: 20, class: 'city-flow-direction-col' },
            customComponent: {
              component: CityFlowDirection,
              props: {
                state,
                type,
                disabledEquity: disabledEquity.value,
                onChange: (value: ICityFlowDirection[]) => {
                  console.log('城市流向value', value);
                  state.formData.cityFlowDirectionListFullMinus = value;
                },
              },
            },
          },
          {
            type: FormItemType.Select,
            name: 'discountType',
            rules: [{ required: true, message: '请选择折扣类型' }],
            label: '折扣类型',
            fieldProps: {
              options: DISCOUNT_TYPE_OPTION,
              placeholder: '请选择折扣类型',
              disabled: disabledEquity.value,
            },
          },
        ],
      },
      /** 权益展示列表配置 */
      {
        header: { title: '发放内容', subTitle: '只能添加与权益信息配置一致的权益券' },
        formItemList: [
          {
            type: FormItemType.Custom,
            name: '',
            label: '',
            colProps: { span: 23 },
            customComponent: {
              component: SendContentTable,
              props: {
                state,
                type,
                processingDisabled: processingDisabled.value,
              },
            },
          },
        ],
      },
      /* 提交按钮 */
      {
        formItemList: [
          {
            type: FormItemType.Button,
            colProps: { offset: 12 },
            name: '',
            hidden: type === 'detail',
            fieldProps: {
              label: '提交',
              props: {
                type: 'primary',
                size: 'large',
                onClick: () => {
                  state.submit();
                },
              },
            },
          },
        ],
      },
    ],
  }));

  return { formConfig };
};
