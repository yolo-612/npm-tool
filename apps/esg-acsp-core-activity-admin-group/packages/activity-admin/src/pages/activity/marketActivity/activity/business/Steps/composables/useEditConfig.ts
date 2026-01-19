import dayjs from 'dayjs';
import type { IFormConfig } from '@fpkg/components-web';
import { FormItemType } from '@fpkg/components-web';
import { UPLOAD_FILE_URL } from '@/apis/methods/common';
import type { IPlanDocumentFile } from '@/apis/methods/activity/business/types';
import { ACTIVITY_STATUS, E_PAGE_ACTION } from '@/pages/activity/marketActivity/types';
import CollectionItem from '@/pages/activity/marketActivity/activity/business/components/CollectionItem/index.vue';
import { downloadFile } from '@/utils/tool';
import type useEditAction from './useEditAction';

/* 查看不可改、 编辑且非(草稿中、解析失败)不可改 */
export default function (state: ReturnType<typeof useEditAction>, action: E_PAGE_ACTION = E_PAGE_ACTION.ADD) {
  /* 表单禁用状态 详情禁用 非(草稿、解析失败)的编辑禁用 */
  const isDisabled = computed(() => {
    if (!state.formData.code) return false;
    return action === E_PAGE_ACTION.DETAIL;
  });

  const colProps = { span: 12 };
  const formConfig = computed<IFormConfig | any>(() => ({
    subFormList: [
      {
        header: {
          title: '基础信息',
        },
        formItemList: [
          {
            colProps,
            type: FormItemType.Input,
            name: 'name',
            label: '活动名称',
            fieldProps: {
              placeholder: '请输入活动名称',
              clearable: true,
              maxlength: 30,
              modelModifiers: { trim: true },
              disabled: isDisabled.value || (action === E_PAGE_ACTION.EDIT && state.activityBasic.activityStatus !== ACTIVITY_STATUS.DRAFT),
            },
            rules: {
              required: true,
              message: '请输入活动名称',
            },
          },
          {
            colProps,
            type: FormItemType.Input,
            name: 'code',
            label: '活动编码',
            fieldProps: {
              disabled: true,
            },
            rules: {
              required: true,
              message: '请输入活动编码',
            },
          },
          {
            colProps: { span: 6 },
            type: FormItemType.DatePicker,
            name: 'startTime',
            label: '活动时间',
            fieldProps: {
              type: 'datetime',
              clearable: true,
              format: 'YYYY-MM-DD HH:mm:ss',
              placeholder: '请选择开始时间',
              disabledDate: (time: Date) => time.getTime() < dayjs().startOf('day').valueOf(),
              onChange: (value: string) => {
                if (
                  value
                  && state.activityBasic.endTime
                  && dayjs(value).isAfter(dayjs(state.activityBasic.endTime))
                ) {
                  state.activityBasic.startTime = state.activityBasic.endTime;
                }
              },
              disabled: isDisabled.value || (action === E_PAGE_ACTION.EDIT && state.activityBasic.activityStatus !== ACTIVITY_STATUS.DRAFT),
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
              modelValue: '-',
            },
          },
          {
            colProps: { span: 5 },
            type: FormItemType.DatePicker,
            name: 'endTime',
            fieldProps: {
              type: 'datetime',
              clearable: true,
              format: 'YYYY-MM-DD HH:mm:ss',
              defaultTime: [dayjs().endOf('day')],
              placeholder: '请选择结束时间',
              disabledDate: (time: Date) => time.getTime() < dayjs().startOf('day').valueOf(),
              onChange: (value: string) => {
                if (
                  value
                  && state.activityBasic.startTime
                  && dayjs(value).isBefore(dayjs(state.activityBasic.startTime))
                ) {
                  state.activityBasic.endTime = state.activityBasic.startTime;
                }
              },
              disabled: isDisabled.value,
            },
            rules: {
              required: true,
              message: '请选择结束时间',
            },
          },
          {
            colProps,
            type: FormItemType.Input,
            name: 'creator',
            label: '创建人',
            fieldProps: {
              disabled: true,
            },
            rules: {
              required: true,
              message: '请输入创建人',
            },
          },
          {
            colProps,
            type: FormItemType.Input,
            name: 'creatorAreaCode',
            label: '创建人地区代码',
            fieldProps: {
              disabled: true,
            },
            rules: {
              required: true,
              message: '请输入创建人地区代码',
            },
          },
          {
            colProps,
            type: FormItemType.InputNumber,
            name: 'estimateParticipantCount',
            label: '预估参与人数',
            fieldProps: {
              placeholder: '请输入预估参与人数',
              clearable: true,
              precision: 0,
              min: 1,
              step: 1,
              max: 999999999,
              controlsPosition: 'right',
              disabled: isDisabled.value,
            },
            rules: {
              required: true,
              message: '请输入',
            },
          },
          {
            colProps,
            type: FormItemType.InputNumber,
            name: 'budgetAmount',
            label: '活动预算金额',
            fieldProps: {
              placeholder: '请输入活动预算金额',
              precision: 2,
              min: 0.01,
              step: 0.01,
              max: 999999999.99,
              clearable: true,
              controlsPosition: 'right',
              disabled: isDisabled.value,
            },
            rules: {
              required: true,
              message: '请输入',
            },
          },
          {
            colProps,
            type: FormItemType.Input,
            name: 'activityDesc',
            label: '活动简介',
            fieldProps: {
              type: 'textarea',
              placeholder: '请简要描述活动的背景、目的、内容，300字以内',
              clearable: true,
              maxlength: 300,
              modelModifiers: { trim: true },
              disabled: isDisabled.value,
            },
            rules: {
              required: true,
              message: '请输入活动简介',
            },
          },
          {
            colProps: { span: 8 },
            type: FormItemType.Upload,
            name: 'planDocument',
            label: '活动方案文件',
            fieldProps: {
              clearable: true,
              action: UPLOAD_FILE_URL,
              data: { expire: -1 },
              accept: '.doc,.docx,.ppt,.pdf,.xls,.xlsx',
              tips: '请上传doc/docx/ppt/pdf/xls/xlsx格式,大小不超过50M',
              size: 1024 * 50,
              onChange: () => {
                const planDocumentFile = state.activityExtend.planDocumentFile;
                state.activityExtend.planDocument = planDocumentFile?.fileName;
                state.formRef.value?.validateField('planDocument');
              },
              onRemove: () => {
                state.activityExtend.planDocument = '';
                state.activityExtend.planDocumentFile = undefined;
              },
              onSuccess: (result: { obj: IPlanDocumentFile }) => {
                state.activityExtend.planDocumentFile = result.obj;
              },
              disabled: isDisabled.value,
            },
            rules: {
              required: true,
              message: '请上传活动方案文件',
            },
          },
          {
            type: FormItemType.Button,
            colProps: { span: 8, offset: 2 },
            fieldProps: {
              label: '下载活动方案模板',
              props: {
                type: 'primary',
                text: true,
                onClick: () => {
                  downloadFile(
                    'https://acsp-public-static.sf-express.com/sfcdn/sfosspublic001/luban/1741682226690_29.xlsx',
                    '下载活动方案模板.xlsx',
                  );
                },
              },
            },
            hidden: state.activityExtend.planDocument,
          },
          {
            colProps: { span: 18 },
            type: FormItemType.Button,
            label: ' ',
            fieldProps: {
              label: '下载',
              style: {
                marginTop: '-30px',
                marginLeft: '-10px',
              },
              props: {
                type: 'primary',
                text: true,
                onClick: () => {
                  const planDocumentFile = state?.activityExtend.planDocumentFile;
                  if (planDocumentFile) {
                    const url = window.location.protocol.includes('https') ? planDocumentFile.httpsUrl : planDocumentFile.httpUrl;
                    downloadFile(url + planDocumentFile.fileUri, planDocumentFile.fileName);
                  }
                },
              },
            },
            hidden: !state.activityExtend.planDocument,
          },
        ],
      },
      {
        header: {
          title: '线索收集模板',
        },
        formItemList: [
          {
            colProps: { span: 24 },
            type: FormItemType.Custom,
            render: {
              component: CollectionItem,
              props: {
                isDisabled: isDisabled.value,
                collectionList: state.restField.collectionList,
                handleChangeOptions: (key: string, checked: boolean) => {
                  state.restField.collectionList.forEach((item) => {
                    if (item.fillInKey === key) {
                      item.isSelected = checked ? 1 : 0;
                    }
                  });
                },
              },
            },
          },
        ],
      },
    ],
  }));

  return { formConfig };
}
