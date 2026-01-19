import type { IFormConfig } from '@fpkg/components-web';
import { FormItemType } from '@fpkg/components-web';
import type useEditAction from './useEditAction';
import UploadPersona from '../components/UploadPersona.vue';
import useDict, { getOptionsFromDict, getDictCodeByValue } from '@/stores/modules/dict';
import type { TPageAction } from './types';

/* 查看不可改、 编辑且非(草稿中、解析失败)不可改 */
export default function (state: ReturnType<typeof useEditAction>, type: TPageAction = 'add') {
  /* 拉取字典配置 */
  const dict = useDict();
  dict.batchUpdateDict(['PortraitStatus', 'PortraitCreateType', 'PortraitUpdateType', 'PortraitValidType']);

  /* 表单禁用状态 详情禁用 非(草稿、解析失败)的编辑禁用 */
  const isDisabled = computed(() => {
    if (!state.formData.code) return false;
    const currentCode = getDictCodeByValue(dict.dictRecord['PortraitStatus'], state.formData.status as number);
    const isDetail = type === 'detail';
    const unEditable = type === 'edit' && !['DRAFT', 'PARSING_FAILED'].includes(currentCode);
    return isDetail || unEditable;
  });

  /* 上传画像显示隐藏 */
  const showUpload = computed(() => {
    const code = getDictCodeByValue(dict.dictRecord['PortraitCreateType'], state.formData.createType);
    return code === 'FILE';
  });

  /* 画像有效期显示隐藏 */
  const showEndTime = computed(() => {
    const code = getDictCodeByValue(dict.dictRecord['PortraitValidType'], state.formData.validType as number);
    return code === 'FIXED_VALID';
  });

  const formConfig = computed<IFormConfig>(() => ({
    subFormList: [
      {
        header: {
          title: '基础信息',
        },
        formItemList: [
          {
            colProps: { span: 13 },
            type: FormItemType.Input,
            name: 'name',
            label: '画像名称',
            fieldProps: {
              placeholder: '请填写不超过20个字的画像名称',
              clearable: true,
              maxlength: 20,
              disabled: isDisabled.value,
            },
            rules: {
              required: true,
              message: '请输入画像名称',
            },
          },
          {
            colProps: { span: 13 },
            type: FormItemType.Select,
            name: 'createType',
            label: '创建方式',
            fieldProps: {
              placeholder: '请选择创建方式',
              clearable: true,
              options: getOptionsFromDict(dict.dictRecord['PortraitCreateType'], true),
              disabled: isDisabled.value,
              onChange: () => {
                state.formData.url = '';
              },
            },
            rules: {
              required: true,
              message: '请选择创建方式',
            },
          },
          {
            colProps: { span: 13 },
            hidden: !showUpload.value,
            type: FormItemType.Custom,
            name: 'url',
            label: '上传画像',
            customComponent: {
              component: UploadPersona,
              props: {
                url: state.formData.url,
                onChange: state.onChangeUrl,
                disabled: isDisabled.value,
              },
            },
            rules: {
              required: showUpload.value,
              message: '请上传画像',
            },
          },
          {
            colProps: { span: 13 },
            type: FormItemType.Radio,
            name: 'validType',
            label: '画像有效期',
            fieldProps: {
              disabled: isDisabled.value,
              onChange: () => {
                state.formData.invalidTime = '';
              },
              options: getOptionsFromDict(dict.dictRecord['PortraitValidType'], true),
            },
            rules: {
              required: true,
              message: '请选择发券客户层级',
            },
          },
          {
            colProps: { span: 13 },
            type: FormItemType.DatePicker,
            hidden: !showEndTime.value,
            name: 'invalidTime',
            label: '失效时间',
            fieldProps: {
              clearable: true,
              disabled: isDisabled.value,
              valueFormat: 'YYYY-MM-DD',
              disabledDate: (time: Date) => time.getTime() < Date.now() - 24 * 60 * 60 * 1000,
            },
            rules: {
              required: showEndTime.value,
              message: '请输入失效时间',
            },
          },
          {
            colProps: { span: 13 },
            type: FormItemType.Radio,
            name: 'updateType',
            defaultValue: 0,
            label: '更新方式',
            fieldProps: {
              disabled: isDisabled.value,
              options: getOptionsFromDict(dict.dictRecord['PortraitUpdateType'], true),
            },
            rules: {
              required: true,
              message: '请选择更新方式',
            },
          },
          {
            colProps: { span: 20 },
            type: FormItemType.Input,
            name: 'remark',
            label: '备注',
            fieldProps: {
              disabled: isDisabled.value,
              placeholder: '请填写备注，最多200字',
              type: 'textarea',
              rows: 4,
              maxlength: 200,
            },
          },
          {
            colProps: { span: 2, offset: 18 },
            type: FormItemType.Button,
            name: '',
            hidden: type === 'detail',
            fieldProps: {
              label: type === 'add' ? '提交' : '保存',
              props: {
                type: 'primary',
                size: 'large',
                loading: state.loading.submit,
                onClick: state.submitForm,
              },
            },
          },
        ],
      },
    ],
  }));

  return { formConfig };
}
