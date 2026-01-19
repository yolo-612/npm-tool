import { h } from 'vue';
import dayjs from 'dayjs';
import type { IFormConfig } from '@fpkg/components-web';
import { FormItemType } from '@fpkg/components-web';
import useDict, { getDictCodeByValue } from '@/stores/modules/dict';
import type useEditAction from './useEditAction';
import {
  ACTIVITY_STATUS,
  DRAGON_ACTIVITY_STATUS,
  E_PAGE_ACTION,
} from './types';
import { E_RAISING_DRAGON, E_RAISING_DRAGON_LABEL } from '../../modules/enums';

/* 查看不可改、 编辑且非(草稿中、解析失败)不可改 */
export default function (state: ReturnType<typeof useEditAction>, action: E_PAGE_ACTION = E_PAGE_ACTION.ADD) {
  /** store 字典 */
  const dict = useDict();
  dict.batchUpdateDict([DRAGON_ACTIVITY_STATUS]);
  const statusKey = computed(() => getDictCodeByValue(dict.dictRecord[DRAGON_ACTIVITY_STATUS], state.formData.status) as ACTIVITY_STATUS);

  /* 表单禁用状态 详情禁用 非(草稿、解析失败)的编辑禁用 */
  const isDisabled = computed(() => {
    if (!state.formData.code) return false;
    return action === E_PAGE_ACTION.DETAIL;
  });

  // 设置挖宝周期以及提报周期
  const setCycleTime = (cultivateStartTime: string, val: string) => {
    if (cultivateStartTime && val) {
      const endTimeAdd15 = dayjs(val).add(15, 'day').format('YYYY-MM-DD'); // 15天后
      const endTime14 = dayjs(val).subtract(14, 'day').format('YYYY-MM-DD'); // 14天后
      state.formData.treasureCycle = cultivateStartTime + ' ~ ' + endTimeAdd15;
      state.formData.expensesCycle = cultivateStartTime + ' ~ ' + endTime14;
    } else {
      state.formData.treasureCycle = '-';
      state.formData.expensesCycle = '-';
    }
  };

  /** 监听选龙时间变化 */
  watch(() => state.formData.selectRangeTime, (val) => {
    if (val && val.length === 2) {
      // 计算育龙开始时间
      const cultivateStartTime = dayjs(val[1]).add(1, 'day').format('YYYY-MM-DD');
      state.formData.cultivateStartTime = cultivateStartTime;
      // 如果育龙开始时间大于结束时间，则重置结束日期
      const endTime = state.formData.endTime;
      const startTime = dayjs(cultivateStartTime).toDate().getTime();
      const endTime14 = dayjs(endTime).subtract(14, 'day').toDate().getTime();
      if (startTime > endTime14) {
        state.formData.endTime = '';
        return;
      }
      // 设置挖宝周期以及提报周期
      setCycleTime(cultivateStartTime, endTime);
    } else {
      state.formData.cultivateStartTime = '';
      state.formData.treasureCycle = '-';
      state.formData.expensesCycle = '-';
    }
    // 育龙开始时间的校验
    state.formRef.value?.validateField('cultivateStartTime');
  });

  /** 监听育龙时间的变化 */
  watch(() => state.formData.endTime, (val) => {
    const cultivateStartTime = state.formData.cultivateStartTime;
    setCycleTime(cultivateStartTime, val);
  });

  /** 激励规则配置 */
  watch(() => state.formData.rewardType, (isReward: boolean) => {
    // 使用 !isReward 进行判断时会漏掉 0、null、undefined等,
    if (isReward === false) {
      /** 目标达成奖励提成比例 */
      state.formData.targetRate = undefined;
      /** 超出目标部分提成比例 */
      state.formData.excessRate = undefined;
      /** 补偿部分提成比例 */
      state.formData.compensateRate = undefined;
      /** 获取补偿下限百分比 */
      state.formData.compensateIncome = undefined;
    }
  });

  /** 获取选龙持续时间 */
  const selectDragonSustainTime = computed(() => {
    let dateTime = 0;
    const selectRangeTime = state.formData.selectRangeTime;
    if (selectRangeTime && selectRangeTime.length === 2) {
      dateTime = dayjs(selectRangeTime[1]).diff(selectRangeTime[0], 'day') + 1;
    }
    return dateTime || '-';
  });

  /** 获取育龙持续时间 */
  const cultivateDragonSustainTime = computed(() => {
    let dateTime = 0;
    if (state.formData.endTime && state.formData.cultivateStartTime) {
      dateTime = dayjs(state.formData.endTime).diff(state.formData.cultivateStartTime, 'day') + 1; // 天
    }
    return dateTime || '-';
  });

  /** 格式化持续时间 */
  const formatSustainTime = (title: string, date: number | string) => {
    return h('div', { class: 'sustain-text' }, [
      title,
      h(
        'span',
        {
          style: {
            margin: '0 5px', color: 'red', fontWeight: 'bold', fontSize: '18px',
          },
        },
        date,
      ),
      ' 天',
    ]);
  };

  // 自定义验证选龙周期函数
  const validateDateRange = (rule: any, value: [Date, Date] | [], callback: (error?: Error) => void) => {
    if (value && value.length === 2) {
      const [startDate, endDate] = value;
      if (startDate >= endDate) {
        callback(new Error('结束时间要大于开始时间'));
      } else {
        callback();
      }
    } else {
      callback();
    }
  };

  const formConfig = computed<IFormConfig | any>(() => ({
    subFormList: [
      {
        header: {
          title: '基础信息',
        },
        formItemList: [
          {
            colProps: { span: 13 },
            type: FormItemType.Label,
            name: 'type',
            label: '活动类型',
            fieldProps: {
              modelValue: '育龙计划',
            },
          },
          {
            colProps: { span: 13 },
            type: FormItemType.Radio,
            name: 'model',
            label: '业务类型',
            defaultValue: 0,
            fieldProps: {
              options: [
                { label: E_RAISING_DRAGON_LABEL.NORMAL, value: E_RAISING_DRAGON.NORMAL },
                { label: E_RAISING_DRAGON_LABEL.BULK, value: E_RAISING_DRAGON.BULK },
                { label: E_RAISING_DRAGON_LABEL.CHALLENGE, value: E_RAISING_DRAGON.CHALLENGE },
              ],
              onChange: (val: number) => {
                if (val === E_RAISING_DRAGON.CHALLENGE) {
                  state.formData.rewardType = false;
                } else {
                  state.formData.rewardType = true;
                  state.formData.activityDesc = '';
                }
              },
              disabled: isDisabled.value || action === E_PAGE_ACTION.EDIT,
            },
            rules: {
              required: true,
              message: '请选择业务类型',
            },
          },
          {
            colProps: { span: 13 },
            type: FormItemType.Input,
            name: 'name',
            label: '活动名称',
            fieldProps: {
              placeholder: '最多20字',
              clearable: true,
              maxlength: 20,
              modelModifiers: { trim: true },
              disabled: isDisabled.value,
            },
            rules: {
              required: true,
              message: '请输入活动名称(最多20字)',
            },
          },
          {
            colProps: { span: 13 },
            type: FormItemType.Input,
            name: 'activityDesc',
            label: '来搞钱活动文案',
            hidden: state.formData.model !== E_RAISING_DRAGON.CHALLENGE,
            fieldProps: {
              placeholder: '最多10字',
              clearable: true,
              maxlength: 10,
              modelModifiers: { trim: true },
              disabled: isDisabled.value || statusKey.value === ACTIVITY_STATUS.PROCESSING,
            },
            rules: {
              required: true,
              message: '请输入来搞钱活动文案(最多10字)',
            },
          },
        ],
      },
      {
        header: {
          title: '时间配置',
        },
        formItemList: [
          {
            colProps: { span: 13 },
            type: FormItemType.DatePicker,
            name: 'selectRangeTime',
            label: '选龙周期',
            fieldProps: {
              type: 'daterange',
              clearable: true,
              rangeSeparator: '至',
              valueFormat: 'YYYY-MM-DD',
              startPlaceholder: '请选择开始时间',
              endPlaceholder: '请选择结束时间',
              disabledDate: (time: Date) => {
                return time.getTime() < dayjs().startOf('day').valueOf();
              },
              disabled: isDisabled.value || statusKey.value === ACTIVITY_STATUS.PROCESSING,
            },
            rules: [
              { required: true, message: '请选择完整的时间' },
              { validator: validateDateRange, trigger: 'change' },
            ],
          },
          {
            colProps: { span: 6 },
            type: FormItemType.Custom,
            customComponent: {
              component: formatSustainTime('选龙持续', selectDragonSustainTime.value),
            },
          },
          {
            colProps: { span: 6 },
            type: FormItemType.DatePicker,
            name: 'cultivateStartTime',
            label: '育龙周期',
            fieldProps: {
              type: 'date',
              clearable: true,
              valueFormat: 'YYYY-MM-DD',
              placeholder: '请选择开始时间',
              disabled: true,
            },
            rules: {
              required: true,
              message: '请选择开始时间',
            },
          },
          {
            colProps: { span: 1 },
            type: FormItemType.Label,
            name: 'type',
            fieldProps: {
              modelValue: '至',
            },
            elFormItemProps: {
              style: 'margin-left: 10px;',
            },
          },
          {
            colProps: { span: 6 },
            type: FormItemType.DatePicker,
            name: 'endTime',
            fieldProps: {
              type: 'date',
              clearable: true,
              valueFormat: 'YYYY-MM-DD',
              placeholder: '请选择结束时间',
              disabledDate: (time: Date) => {
                let result = false;
                if (state?.formData?.cultivateStartTime) {
                  const timeAdd14 = dayjs(state.formData.cultivateStartTime).add(14, 'day').valueOf(); // 14天后
                  if (time.getTime() < timeAdd14) result = true;
                }
                if (time.getTime() < Date.now()) result = true;
                return result;
              },
              disabled: isDisabled.value,
            },
            rules: {
              required: true,
              message: '请选择结束时间',
            },
          },
          {
            colProps: { span: 6 },
            type: FormItemType.Custom,
            customComponent: {
              component: formatSustainTime('育龙持续', cultivateDragonSustainTime.value),
            },
          },
          {
            colProps: { span: 13 },
            type: FormItemType.Label,
            name: 'treasure',
            label: '挖宝入口周期',
            fieldProps: {
              modelValue: state.formData.treasureCycle,
            },
          },
          {
            colProps: { span: 13 },
            type: FormItemType.Label,
            name: 'forward',
            label: '挖宝提报周期',
            fieldProps: {
              modelValue: state.formData.expensesCycle,
            },
          },
        ],
      },
      {
        header: {
          title: '激励规则配置',
        },
        formItemList: [
          {
            colProps: { span: 13 },
            type: FormItemType.Switch,
            name: 'rewardType',
            label: '是否激励',
            fieldProps: {
              disabled: true,
            },
            rules: {
              required: true,
            },
          },
          {
            colProps: { span: 13 },
            type: FormItemType.InputNumber,
            name: 'targetRate',
            label: '目标达成奖励提成比例（%）',
            hidden: !state.formData.rewardType,
            fieldProps: {
              placeholder: '0.01-100',
              controlsPosition: 'right',
              precision: 2,
              min: 0.01,
              max: 100,
              step: 0.01,
              clearable: true,
              disabled: isDisabled.value || statusKey.value === ACTIVITY_STATUS.PROCESSING,
            },
            rules: {
              required: true,
              message: '请输入目标达成奖励提成比例',
            },
          },
          {
            colProps: { span: 13 },
            type: FormItemType.InputNumber,
            name: 'excessRate',
            label: '超出目标部分提成比例（%）',
            hidden: !state.formData.rewardType,
            fieldProps: {
              placeholder: '0.01-100',
              controlsPosition: 'right',
              precision: 2,
              min: 0.01,
              max: 100,
              step: 0.01,
              clearable: true,
              disabled: isDisabled.value || statusKey.value === ACTIVITY_STATUS.PROCESSING,
            },
            rules: {
              required: true,
              message: '请输入超出目标部分提成比例',
            },
          },
          {
            colProps: { span: 13 },
            type: FormItemType.InputNumber,
            name: 'compensateRate',
            label: '补偿部分提成比例（%）',
            hidden: !state.formData.rewardType,
            fieldProps: {
              placeholder: '0.01-100',
              controlsPosition: 'right',
              precision: 2,
              min: 0.01,
              max: 100,
              step: 0.01,
              clearable: true,
              disabled: isDisabled.value || statusKey.value === ACTIVITY_STATUS.PROCESSING,
            },
            rules: {
              required: true,
              message: '请输入补偿部分提成比例',
            },
          },
          {
            colProps: { span: 13 },
            type: FormItemType.InputNumber,
            name: 'compensateIncome',
            label: '获取补偿下限百分比（%）',
            hidden: !state.formData.rewardType,
            fieldProps: {
              placeholder: '0.01-100',
              controlsPosition: 'right',
              precision: 2,
              min: 0.01,
              max: 100,
              step: 0.01,
              clearable: true,
              disabled: isDisabled.value || statusKey.value === ACTIVITY_STATUS.PROCESSING,
            },
            rules: {
              required: true,
              message: '请输入获取补偿下限百分比',
            },
          },
        ],
      },
      {
        formItemList: [
          {
            type: FormItemType.Button,
            name: 'submit',
            colProps: { offset: 12 },
            hidden: action === E_PAGE_ACTION.DETAIL,
            fieldProps: {
              label: action === E_PAGE_ACTION.ADD ? '创建' : '保存',
              props: {
                type: 'primary',
                size: 'large',
                loading: state.loading.submit,
                onClick: () => state.submitForm(),
              },
            },
          },
        ],
      },
    ],
  }));

  return { formConfig };
}
