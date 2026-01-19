import { FormItemType, TableColumnType } from '@fpkg/components-web';
import type { IFormConfig, IPureTableColumnItem } from '@fpkg/components-web';
import { computed } from 'vue';
import { dayjs, ElMessage } from 'element-plus';
import type useAction from './useEditAction';
import useDict, { RIGHTS_TYPE_TYPE_CODE } from '@/stores/modules/dict';
import UploadPoster from '../components/UploadPoster.vue';
import { PAGE_ACTION } from './types';

const isDate = (value: any) => Object.prototype.toString.call(value) !== '[object Date]';

export default function (state: ReturnType<typeof useAction>, type: PAGE_ACTION) {
  const dictStore = useDict();
  dictStore.updateDict(RIGHTS_TYPE_TYPE_CODE);

  const isDetail = type === PAGE_ACTION.DETAIL;

  const config = computed<IFormConfig>(() => ({
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
              disabled: isDetail || state.isProcessing.value,
              placeholder: '最多20字',
              maxlength: 20,
              modelModifiers: { trim: true },
            },
            rules: [
              {
                required: true,
                message: '请输入活动名称',
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
              disabled: isDetail || state.isProcessing.value,
              valueFormat: 'YYYY-MM-DD HH:mm:ss',
            },
            rules: [
              {
                required: true,
                message: '请输入活动开始时间',
              },
              {
                validator: (_rule: any, value: any, callback: any) => {
                  const targetValue = value ? new Date(value) : value;
                  // 非进行中，需要校验开始时间
                  if (!state.isProcessing.value && targetValue?.getTime() < new Date().getTime()) {
                    callback(new Error('活动开始时间不能小于当前时间'));
                    return;
                  }
                  if (state.formData.endTime && targetValue?.getTime() >= new Date(state.formData.endTime)?.getTime()) {
                    callback(new Error('活动开始时间必须小于活动结束时间'));
                    return;
                  }
                  callback();
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
              disabledDate: (time: Date) => time.getTime() < Date.now() - 24 * 60 * 60 * 1000,
              disabled: isDetail,
              valueFormat: 'YYYY-MM-DD HH:mm:ss',
            },
            rules: [
              {
                required: true,
                message: '请输入活动结束时间',
              },
              {
                validator: (_rule: any, value: any, callback: any) => {
                  console.log('value: ', value);
                  const targetValue = value ? new Date(value) : value;
                  if (targetValue?.getTime() < new Date().getTime()) {
                    callback(new Error('活动结束时间不能小于当前时间'));
                    return;
                  }
                  if (state.formData.startTime && targetValue?.getTime() <= new Date(state.formData.startTime).getTime()) {
                    callback(new Error('活动开始时间必须小于活动结束时间'));
                    return;
                  }
                  callback();
                },
              },
            ],
          },
        ],
      },
      {
        header: {
          title: '物料配置',
          isActive: true,
        },
        formItemList: [
          {
            colProps: { span: 13 },
            type: FormItemType.Custom,
            name: 'activityPosterUrl',
            label: '精准营销推广海报',
            customComponent: {
              component: UploadPoster,
              props: {
                url: state.formData.activityPosterUrl,
                onChange: state.onChangeActivityPosterUrl,
                disabled: isDetail,
              },
            },
            rules: [
              {
                required: true,
                message: '请上传海报',
              },
            ],
          },
          {
            colProps: { span: 13 },
            type: FormItemType.Custom,
            name: 'DBQBPosterUrl',
            label: '夺宝奇兵推广海报',
            customComponent: {
              component: UploadPoster,
              props: {
                url: state.formData.DBQBPosterUrl,
                onChange: state.onChangeDBQBPosterUrl,
                disabled: isDetail,
              },
            },
            rules: [
              {
                required: true,
                message: '请上传海报',
              },
            ],
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
                onClick: () => state.submitForm(),
                debounce: 1000,
              },
            },
          },
        ],
      },
    ],
  }));

  return { formConfig: config };
}
