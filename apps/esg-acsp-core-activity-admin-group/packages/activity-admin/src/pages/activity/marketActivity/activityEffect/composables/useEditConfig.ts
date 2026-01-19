import type { IFormConfig } from '@fpkg/components-web';
import { FormItemType } from '@fpkg/components-web';
import { UPLOAD_FILE_URL } from '@/apis/methods/common';
import type { IPlanDocumentFile } from '@/apis/methods/activity/business/types';
import { downloadFile } from '@/utils/tool';
import type useEditAction from './useEditAction';

/* 查看不可改、 编辑且非(草稿中、解析失败)不可改 */
export default function (state: ReturnType<typeof useEditAction>) {
  /* 表单禁用状态 详情禁用 非(草稿、解析失败)的编辑禁用 */ /** 活动效果补充 */
  const colProps = { span: 12 };
  const formConfig = computed<IFormConfig | any>(() => ({
    subFormList: [
      {
        formItemList: [
          {
            colProps,
            type: FormItemType.InputNumber,
            name: 'newMemberCount',
            label: '现场新增会员数',
            fieldProps: {
              placeholder: '请输入现场新增会员数',
              controlsPosition: 'right',
              precision: 0,
              min: 1,
              max: 999999999,
              clearable: true,
            },
            rules: {
              required: true,
              message: '请输入现场新增会员数',
            },
          },
          {
            colProps,
            type: FormItemType.InputNumber,
            name: 'newClueCount',
            label: '现场新增线索数',
            fieldProps: {
              placeholder: '请输入现场新增线索数',
              controlsPosition: 'right',
              precision: 0,
              min: 1,
              max: 999999999,
              clearable: true,
            },
            rules: {
              required: true,
              message: '请输入现场新增线索数',
            },
          },
          {
            colProps,
            type: FormItemType.InputNumber,
            name: 'storedValueRevenue',
            label: '现场储值卡创收金额',
            fieldProps: {
              placeholder: '请输入现场储值卡创收金额',
              controlsPosition: 'right',
              precision: 2,
              min: 0.01,
              max: 999999999.99,
              clearable: true,
            },
            rules: {
              required: true,
              message: '请输入现场储值卡创收金额',
            },
          },
          {
            colProps,
            type: FormItemType.InputNumber,
            name: 'parcelRevenue',
            label: '现场寄件创收金额',
            fieldProps: {
              placeholder: '请输入现场寄件创收金额',
              controlsPosition: 'right',
              precision: 2,
              min: 0.01,
              max: 999999999.99,
              clearable: true,
            },
            rules: {
              required: true,
              message: '请输入现场寄件创收金额',
            },
          },
          {
            colProps,
            type: FormItemType.InputNumber,
            name: 'actualCost',
            label: '活动实际费用',
            fieldProps: {
              placeholder: '请输入活动实际费用',
              controlsPosition: 'right',
              precision: 2,
              min: 0.01,
              max: 999999999.99,
              clearable: true,
            },
            rules: {
              required: true,
              message: '请输入活动实际费用',
            },
          },
          {
            colProps,
            type: FormItemType.Upload,
            name: 'summaryFile',
            label: '活动总结文件',
            fieldProps: {
              clearable: true,
              action: UPLOAD_FILE_URL,
              data: { expire: -1 },
              accept: '.doc,.docx,.ppt,.pdf,.xls,.xlsx',
              tips: '请上传doc/docx/ppt/pdf/xls/xlsx格式,大小不超过50M',
              size: 1024 * 50,
              onChange: () => {
                const summaryFileDownloadUrl = state.formData.summaryFileDownloadUrl;
                state.formData.summaryFile = summaryFileDownloadUrl?.fileName;
                state.formRef.value?.validateField('summaryFile');
              },
              onRemove: () => {
                state.formData.summaryFile = '';
                state.formData.summaryFileDownloadUrl = undefined;
              },
              onSuccess: (result: { obj: IPlanDocumentFile }) => {
                state.formData.summaryFileDownloadUrl = result.obj;
              },
            },
          },
          {
            colProps: { offset: 12, span: 13 },
            type: FormItemType.Button,
            label: ' ',
            hidden: !state.formData.summaryFile,
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
                  const summaryFileDownloadUrl = state?.formData.summaryFileDownloadUrl;
                  if (summaryFileDownloadUrl) {
                    const url = window.location.protocol.includes('https') ? summaryFileDownloadUrl.httpsUrl : summaryFileDownloadUrl.httpUrl;
                    downloadFile(url + summaryFileDownloadUrl.fileUri, summaryFileDownloadUrl.fileName);
                  }
                },
              },
            },
          },
        ],
      },
      {
        formItemList: [
          {
            type: FormItemType.Button,
            name: 'button',
            colProps: { offset: 19, span: 1.5 },
            fieldProps: {
              label: '取消',
              props: {
                size: 'large',
                onClick: () => state.handleCloseTab(),
              },
            },
          },
          {
            type: FormItemType.Button,
            name: 'submit',
            colProps: { span: 1.5 },
            fieldProps: {
              label: '保存',
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
